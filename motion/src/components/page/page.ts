import { BaseComponent, Component } from './../components.js';

export interface Composable {
  addChild(child: Component): void;
}

// 각각의 vidoe, note 같은 이런 섹션들을 감쌀 수 있는 컨테이너는 무조건 Component와 Composable 인터페이스를 구현한다
interface SectionContainer extends Component, Composable {
  setOnCloseListener(listener: OnCloseListener): void;
  setOnDragStateListener(listener: OnDragStateListenr<SectionContainer>): void;
  muteChildren(state: 'mute' | 'unmute'): void;
  getBoundingRect(): DOMRect;
  onDropped(): void;
}

type OnCloseListener = () => void;

type DragState = 'start' | 'stop' | 'enter' | 'leave';
// drag해서 요소를 start, stop할 수 있다
// 그리고 다른 요소 입장에서는 drag한 요소가, 내 위에 enter, leave될 수 있다
type OnDragStateListenr<T extends Component> = (target: T, state: DragState) => void;
// target을 pageItemComponent라고 하면 해당 컴포넌트 밖에 사용하지 못하고
// Component라고 하면 PageItemComponent 서브타입을 전달하는 순간 타입의 정보 사라진다
// 따라서 타입이 안전하지만 보존되는 제네릭 사용한다

type SectionContainerConstructor = {
  new (): SectionContainer;
};

// beforebegin을ㅇ 사용해서 drop target 윗부분에 추가하기 때문에 ,
// 아래에서 위로 drag 할 때, drop over 요소 중간에서 놓아도 순서가 바뀌지만
// 위에서 아래 drag 할 때, drop over 요소 중간에 놓아도 순서가 바뀌지 않는다
// 해당 문제를 해결해야 한다

export class PageItemComponent extends BaseComponent<HTMLElement> implements SectionContainer {
  private closeListner?: OnCloseListener;
  private dragStateListener?: OnDragStateListenr<PageItemComponent>;

  constructor() {
    super(
      `
      <li draggable="true" class="page-item">
        <section class="page-item__body">
        </section>
        <div class="page-item__controls">
        <button class="close">&times;</button>
      </div>
      </li>
      `
    );

    const closeBtn = this.element.querySelector('.close')! as HTMLButtonElement;
    closeBtn.onclick = () => {
      this.closeListner && this.closeListner();
    };

    this.element.addEventListener('dragstart', (event: DragEvent) => {
      this.onDragStart(event);
    });

    this.element.addEventListener('dragend', (event: DragEvent) => {
      this.onDragEnd(event);
    });

    this.element.addEventListener('dragenter', (event: DragEvent) => {
      this.onDragEnter(event);
    });

    this.element.addEventListener('dragleave', (event: DragEvent) => {
      this.onDragLeave(event);
    });
  }

  onDragStart(_: DragEvent) {
    this.notifyDragObservers('start');
    this.element.classList.add('lifted');
  }

  onDragEnd(_: DragEvent) {
    this.notifyDragObservers('stop');
    this.element.classList.remove('lifted');
  }

  onDragEnter(_: DragEvent) {
    this.notifyDragObservers('enter');
    this.element.classList.add('drop-area');
  }

  onDragLeave(_: DragEvent) {
    this.notifyDragObservers('leave');
    this.element.classList.remove('drop-area');
  }

  onDropped() {
    this.element.classList.remove('drop-area');
  }

  notifyDragObservers(state: DragState) {
    this.dragStateListener && this.dragStateListener(this, state);
  }

  addChild(child: Component) {
    const container = this.element.querySelector('.page-item__body')! as HTMLElement;
    child.attachTo(container);
  }

  // close listener를 등록한다
  setOnCloseListener(listener: OnCloseListener) {
    this.closeListner = listener;
  }

  setOnDragStateListener(listener: OnDragStateListenr<PageItemComponent>) {
    //내가 드래그가 되고 있다, 내가 누군지, 드래그가 되고 있는 상태를 알려준다
    this.dragStateListener = listener;
  }

  muteChildren(state: 'mute' | 'unmute') {
    if (state === 'mute') {
      this.element.classList.add('mute-children');
    } else {
      this.element.classList.remove('mute-children');
    }
  }

  getBoundingRect(): DOMRect {
    return this.element.getBoundingClientRect();
  }
}
export class PageComponent extends BaseComponent<HTMLUListElement> implements Composable {
  // children은 가지고 있는 모든 자식 요소들에 대해서 알고있다
  private children = new Set<SectionContainer>(); // Set은 중복된 요소 가지지 않는다
  private dragTarget?: SectionContainer;
  private dropTarget?: SectionContainer;

  constructor(private pageItemConstructor: SectionContainerConstructor) {
    // 부모 클래스의 생성사 호출할 때 super 사용한다
    super('<ul class="page"></ul>');

    // drag 한 요소가 내 위로 올라왔을 때
    this.element.addEventListener('dragover', (event: DragEvent) => {
      this.onDragOver(event);
    });

    this.element.addEventListener('drop', (event: DragEvent) => {
      this.onDrop(event);
    });
  }

  onDragOver(event: DragEvent) {
    // https://developer.mozilla.org/ko/docs/Web/API/HTML_Drag_and_Drop_API
    // preventDefault 해주는 부분, 드롭 지역 정의하기 참고
    event.preventDefault();
    // console.log('dragover', event);
  }

  onDrop(event: DragEvent) {
    event.preventDefault();

    // 여기에서 위치를 바꿔주면 된다
    if (!this.dropTarget) {
      // drop할 곳 없는 경우
      return;
    }

    // 지금 drag하고 있는 것과 drop target이 다르다면
    if (this.dragTarget && this.dragTarget !== this.dropTarget) {
      const dropY = event.clientY;
      const srcElement = this.dragTarget.getBoundingRect();

      // drag하고 있는 것을 현재 페이지에서 삭제한다
      this.dragTarget.removeFrom(this.element);

      // drop 하는 위치에 따라, 아래에서 위로 올릴 때는 drop 요소 위에
      // 위에서 아래로 drop 하면 drop 요소 아래에 위치한다
      this.dropTarget.attach(this.dragTarget, dropY < srcElement.y ? 'beforebegin' : 'afterend');
    }

    // drop이 끝나면
    this.dropTarget.onDropped();
  }

  addChild(section: Component) {
    const item = new this.pageItemConstructor();

    item.addChild(section);
    item.attachTo(this.element, 'beforeend');
    item.setOnCloseListener(() => {
      item.removeFrom(this.element);
      this.children.delete(item);
    });

    this.children.add(item);

    // 상태가 변경되면 콜백함수에서 알 수 있다
    item.setOnDragStateListener((target: SectionContainer, state: DragState) => {
      switch (state) {
        case 'start':
          this.dragTarget = target;
          // drag 시작되면 모든 pointer를 mute 해준다
          this.updateSections('mute');
          break;
        case 'stop':
          this.dragTarget = undefined; // drag 끝나면 drag 하는 것이 없어진다
          this.updateSections('unmute');
          break;
        case 'enter':
          this.dropTarget = target;
          break;
        case 'leave':
          this.dropTarget = undefined;
          break;
        default:
          throw new Error(`unsupported state: ${state}`);
      }
    });
  }
  // 전체적인 페이지 안에서 drag한 요소가 들어가고 나오는 것을 확인하고 싶지만
  // 다른 li 태그, 자식 요소들에도 들어갔다 나오고 하면서 enter 와 leave가 반복된다
  // drop 하자마자 다른 요소들은 pointer events를 제거함으로써 pointer events가 발생하지않도록 한다
  // 이를 위해 사용하는 것이 updateSections 함수

  private updateSections(state: 'mute' | 'unmute') {
    this.children.forEach((section: SectionContainer) => {
      section.muteChildren(state);
    });
  }
}
