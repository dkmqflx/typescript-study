import { BaseComponent } from '../../components.js';

export class TextSectionInput extends BaseComponent<HTMLElement> {
  constructor() {
    super(`
    <div>
      <div class="for__container">
        <label for="title">Title</label>
        <input type="text" id="title" />
      </div>

    <div class="for__container">
      <label for="body">Body</label>
      <textarea type="text" row="3" id="body"></textarea>
    </div>
    </div>
`);
  }

  // getter를 이용해서 입력된 URL을 읽어온다

  get title(): string {
    const element = this.element.querySelector('#title')! as HTMLInputElement;
    return element.value;
  }
  get body(): string {
    const element = this.element.querySelector('#body')! as HTMLInputElement;
    return element.value;
  }
}
