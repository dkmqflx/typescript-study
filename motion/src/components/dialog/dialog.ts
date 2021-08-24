import { Component, BaseComponent } from './../components.js';
import { Composable } from '../page/page.js';

type OnCloseListener = () => void;
type OnSubmitListener = () => void;

export interface MediaData {
  readonly title: string;
  readonly url: string;
}

export interface TextData {
  readonly title: string;
  readonly body: string;
}

export class InputDialog extends BaseComponent<HTMLElement> implements Composable {
  closeListener?: OnCloseListener;
  submitListener?: OnSubmitListener;

  constructor() {
    super(
      `<dialog class="dialog">
          <div class="dialog__container">
            <button class="close">&times;</button>
            <div id="dialog__body"></div>
            <button class="dialog__submit">ADD</button>
          </div>
        </dialog>
        `
    );
    const closeBtn = this.element.querySelector('.close')! as HTMLElement;

    closeBtn.onclick = () => {
      this.closeListener && this.closeListener();
    };
    const submitBtn = this.element.querySelector('.dialog__submit')! as HTMLElement;

    submitBtn.onclick = () => {
      this.submitListener && this.submitListener();
    };
  }

  setOnCloseListener(listener: OnCloseListener) {
    this.closeListener = listener;
  }

  setOnSubmitListener(listener: OnSubmitListener) {
    this.submitListener = listener;
  }

  addChild(child: Component) {
    const body = this.element.querySelector('#dialog__body')! as HTMLElement;
    child.attachTo(body);
  }
}

/*
Q. 버튼 이벤트 리스너 연결할 때 콜백 받는 이유

안녕하세요 선생님! 강의 너무 재밌게 잘 보고 있습니다. 🥰

이벤트 등록시키는 부분에서 궁금한 부분이 있어서 질문드리게 됐습니다.

dialog 클래스에서 닫기 버튼과 등록 버튼을 각각 외부에서 받아온 listener를  dialog 클래스 
내부의 이벤트 리스너에 등록시키는 방식으로 이벤트를 연결하셨는데 이렇게 코드를 짜면 
어떤 부분이 좋은 건지 궁금합니다.

혼자 생각해본 이유들로는...

콜백 함수를 사용하면 웹 API의 콜백큐를 이용해  해당 함수 실행을 할 수 있어서 웹브라우저를 
조금 더 부드럽게 동작시킬 수 있다는 장점을 가져가기 위함인지

아니면 attachTo, removeFrom과 같이 컴포넌트 클래스라면 모두 사용하는 
공통적인 메세드의 중복을 피하게 위함인지 

아니면 제가 생각하지 못한 다른 이유가 있는 것이 있는지 궁금합니다 ㅜㅜ 
이런식으로 코드를 짜본 적이 없어서 힘들게 따라가고 있지만 많이 배우게 해주셔서 감사해요


A.
너무 좋은 질문 이예요 👍

지금 AddPopup 클래스는 어떤 일을 하는 아이인가요?

사용자에게 입력을 받을 입력 폼을 보여주고, 입력을 완료하는 버튼 하나와 
그리고 취소하는 클로즈 버튼 하나가 있죠?

즉, 사용자에게 우리가 필요한 데이터를 받아와서 입력을 완료 하거나, 
취소 둘중에 하나를 할 수 있는 클래스예요. 어떤 데이터가 필요한지, 
버튼이 클릭되면 어떤 일들을 해야 하는지, 취소 버튼이 클릭 되면 
어떻게 되어야 하는지는 외부에서 콜백함수로 받기 때문에, 
이 AddPopup 완전히 유연하고! 재사용성이 짱 높은 클래스죠 :)

페이지에서뿐 아니라, 나중에 사용자에게 데이터를 받을 일이 있다면 
이 AddPopup 클래스를 이용 할 수 있어요. 중요한 메인 로직은 콜백함수로 받아오기 때문이죠! :)

결론: 콜백함수는 함수나, 클래스의 재사용성을 높여줍니다 :)


예를 들어 setTimeout(callback, time) 같은 WebApi도 주된 기능은, 
전달된 특정한 시간이 지나면 우리가 전달한 콜백함수를 호출하는 타이머 같은 아이죠?

그래서 어떤 경우에는 특정한 시간이 지나서 무언가를 수행해야 한다면 이 setTimeout을 이용할 수 있죠.  
만약 이 setTimeout이 특정한 시간이 지나면 자체적으로 콘솔에 로그를 출력하기만 하는 함수라면 
재사용성이 완전 떨어지겠죠? 🤣

*/
