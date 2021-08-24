"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediaSectionInput = void 0;
const components_js_1 = require("../../components.js");
class MediaSectionInput extends components_js_1.BaseComponent {
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
    // getter를 이용해서 입력된 URL을 읽어온다
    get title() {
        const element = this.element.querySelector('#title');
        return element.value;
    }
    get url() {
        const element = this.element.querySelector('#url');
        return element.value;
    }
}
exports.MediaSectionInput = MediaSectionInput;
