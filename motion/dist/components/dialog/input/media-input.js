import { BaseComponent } from '../../components.js';
export class MediaSectionInput extends BaseComponent {
    constructor() {
        super(`
    <div>
      <div class="for__container">
        <label for="title">Title</label>
        <input type="text" id="title" />
      </div>

    <div class="for__container">
      <label for="url">URL</label>
      <input type="text" id="url" />
    </div>
    </div>
`);
    }
    get title() {
        const element = this.element.querySelector('#title');
        return element.value;
    }
    get url() {
        const element = this.element.querySelector('#url');
        return element.value;
    }
}
