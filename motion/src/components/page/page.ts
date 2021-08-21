import { BaseComponent } from './../components.js';

export class PageComponent extends BaseComponent<HTMLUListElement> {
  constructor() {
    // 부모 클래스의 생성사 호출할 때 super 사용한다
    super('<ul class="page">This is PageComponent</ul>');
  }
}
