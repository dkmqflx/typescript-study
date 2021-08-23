import { BaseComponent, Component } from './../components.js';

/*

composable 

여러가지를 모아서 조립하고 묶을 수 있다는 읭미 
composable 인터페이스를 규격하면 다른 요소들을 함께 조립할 수 있는 아이를 말한다

*/

export interface Composable {
  addChild(child: Component): void;
}

class PageItemComponent extends BaseComponent<HTMLElement> implements Composable {
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
  }

  addChild(child: Component) {
    const container = this.element.querySelector('.page-item__body')! as HTMLElement;
    child.attachTo(container);
  }
  //어떤 child가 들어오는지 알 수 없지만, Component 인터페이스를 를 규격하는
  // child를 우리가 원하는 곳에 붙일 수 있다
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
    // 우리가 만든 item을 현재 페이지에 붙여준다
  }
}
