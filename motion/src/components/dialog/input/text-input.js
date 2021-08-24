"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextSectionInput = void 0;
const components_js_1 = require("../../components.js");
class TextSectionInput extends components_js_1.BaseComponent {
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
    get title() {
        const element = this.element.querySelector('#title');
        return element.value;
    }
    get body() {
        const element = this.element.querySelector('#body');
        return element.value;
    }
}
exports.TextSectionInput = TextSectionInput;
