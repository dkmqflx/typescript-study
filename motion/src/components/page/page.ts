import { BaseComponent, Component } from './../components.js';

export interface Composable {
  addChild(child: Component): void;
}

// 각각의 vidoe, note 같은 이런 섹션들을 감쌀 수 있는 컨테이너는 무조건 Component와 Composable 인터페이스를 구현한다
interface SectionContainer extends Component, Composable {
  setOnCloseListener(listener: OnCloseListener): void;
  setOnDragStateListener(listener: OnDragStateListenr<SectionContainer>): void;
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
  // 생성자를 정의하는 타입
  // 아무 것도 전달받지 않는 생성자인데
  // 생성자를 호출하면 SectionContainer 인터페이스를 규격하는 어떤 클래스라도 괜찮다
};

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
  }

  onDragEnd(_: DragEvent) {
    this.notifyDragObservers('stop');
  }

  onDragEnter(_: DragEvent) {
    this.notifyDragObservers('enter');
  }

  onDragLeave(_: DragEvent) {
    this.notifyDragObservers('leave');
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
}
export class PageComponent extends BaseComponent<HTMLUListElement> implements Composable {
  // 생성자에 어떤 타입의 데이터를 만들 수 있는지 정의해준다
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
    console.log('dragover', event);
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    console.log('drop', event);
  }

  addChild(section: Component) {
    const item = new this.pageItemConstructor();

    item.addChild(section);
    item.attachTo(this.element, 'beforeend');
    item.setOnCloseListener(() => item.removeFrom(this.element));
    item.setOnDragStateListener((target: SectionContainer, state: DragState) => {
      console.log(target, state);
    });
  }
}

/*

Q.
closeListener를 인스턴스 생성시 받지 않는 이유

처음에는 아래와 같이 pageItemComponent의 인스턴스를 생성할 때 closeListener를 받으면 되는 것 아닌가 하고 생각했는데 
constructor(private closeListener?: OnCloseListener) {}

그렇게 하지 않고 
setOnCloseListener(listener: OnCloseListener) { }
를 이용해 인스턴스 생성 후에 지정하는 것은 특별한 이유가 있는건가요?

혼자 생각한 것은 이렇게 하면 인스턴스 생성 후에 필요할 때 콜백함수를 바꿔줄 수 있겠구나인데...

이 경우에는 그럴 일이 없지 않은가 싶어서 질문드립니다.

A.
좋은 질문 이예요 👍 보통 이벤트 관련 등록 함수들은 생성자 보다는 
별도로 등록하는 함수를 만들고 있어요. 우리가 컴포넌트를 만들어서 다른 개발자들이 사용할 수 있도록 API를 만드는 경우에도, 
그리고 다른 브라우저나 노드 그 외 오픈소스 프로젝트들도 그렇게 제공하고 있지요 :)

이유는 "등록하다"는 필요에 의해서, 추후에 등록될 수 있으므로 인스턴스를 생성하는 시점 보다는, 
그 후에 유동성있게 추가 될 수 있도록 만들기 위해서죠.

생성자는 인스턴스를 만들기 위해서 정말 꼭! 필요한 요소들만 인자로 받아오는 것이 좋아요.
*/
