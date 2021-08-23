import { BaseComponent, Component } from './../components.js';

/*

composable 

여러가지를 모아서 조립하고 묶을 수 있다는 읭미 
composable 인터페이스를 규격하면 다른 요소들을 함께 조립할 수 있는 아이를 말한다

*/

export interface Composable {
  addChild(child: Component): void;
}

// 아무런 인자를 전달받지도 리턴하지도 않는다
type OnCloseListener = () => void;

class PageItemComponent extends BaseComponent<HTMLElement> implements Composable {
  private closeListner?: OnCloseListener;
  // 외부로 부터 전달받은 콜백함수를 저장하는 변수
  constructor() {
    super(
      `
      <li class="page-item">
        <section class="page-item__body">
          <div class="page-item__controls">
            <button class="close">&times;</button>
          </div>
        </section>
      </li>
      `
    );

    const closeBtn = this.element.querySelector('.close')! as HTMLButtonElement;
    closeBtn.onclick = () => {
      this.closeListner && this.closeListner();
    };
  }

  addChild(child: Component) {
    const container = this.element.querySelector('.page-item__body')! as HTMLElement;
    child.attachTo(container);
  }

  // close listener를 등록한다
  setOnCloseListener(listener: OnCloseListener) {
    this.closeListner = listener;
  }
}
export class PageComponent extends BaseComponent<HTMLUListElement> implements Composable {
  constructor() {
    // 부모 클래스의 생성사 호출할 때 super 사용한다
    super('<ul class="page"></ul>');
  }
  addChild(section: Component) {
    const item = new PageItemComponent();
    item.addChild(section);
    item.attachTo(this.element, 'beforeend');
    item.setOnCloseListener(() => item.removeFrom(this.element));
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
