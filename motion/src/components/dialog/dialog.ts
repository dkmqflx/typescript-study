import { Component, BaseComponent } from './../components.js';
import { Composable } from '../page/page.js';

type OnCloseListener = () => void;
type OnSubmitListener = () => void;

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

    // 항상 이벤트는 내부적으로 처리하는 것이 아니라, 리스너를 외부에서 주입 받아서
    // 등록된 리스너가 있다면 그것을 호출해주는 방식으로 해야 한다

    closeBtn.onclick = () => {
      this.closeListener && this.closeListener();
    };
    const submitBtn = this.element.querySelector('.dialog__submit')! as HTMLElement;

    submitBtn.onclick = () => {
      this.submitListener && this.submitListener();
    };

    /*
    closeBtn.addEventListern('click', '')
    보통은 close 버튼의 adddEventListner를 등록해서 사용하는 것이 좋다 
    우리가 close 버튼에 다른 것이 이벤트가 등록이 되면 
    다른 곳에서 다른 이벤트 리스너를 계속 등록할 수 있고, 다수의 이벤트가 등록되어져 있으면 
    드록된 순서대로 콜백함수가 호출이 된다 

    onclick에 이렇게 할당하는 것은 기존에 다른 리스너가 등록되어져 있으면
    그것을 덮어 씌우는 그런 효과가 있다 

    따라서 내가 이 컴포넌트 안에서 등록하는 곳이 한군데라면 onclick을 할당하는 것이 괜찮지만
    만약에 버튼을 다른 곳에서도 사용한다면 onclick 보다는 addEventLister를 사용해서 처리하는 것이 더 좋다 
    */
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
