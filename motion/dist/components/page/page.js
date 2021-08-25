import { BaseComponent } from './../components.js';
export class PageItemComponent extends BaseComponent {
    constructor() {
        super(`
      <li draggable="true" class="page-item">
        <section class="page-item__body">
        </section>
        <div class="page-item__controls">
        <button class="close">&times;</button>
      </div>
      </li>
      `);
        const closeBtn = this.element.querySelector('.close');
        closeBtn.onclick = () => {
            this.closeListner && this.closeListner();
        };
        this.element.addEventListener('dragstart', (event) => {
            this.onDragStart(event);
        });
        this.element.addEventListener('dragend', (event) => {
            this.onDragEnd(event);
        });
    }
    onDragStart(event) {
        console.log('dragStart', event);
    }
    onDragEnd(event) {
        console.log('dragEnd', event);
    }
    addChild(child) {
        const container = this.element.querySelector('.page-item__body');
        child.attachTo(container);
    }
    setOnCloseListener(listener) {
        this.closeListner = listener;
    }
}
export class PageComponent extends BaseComponent {
    constructor(pageItemConstructor) {
        super('<ul class="page"></ul>');
        this.pageItemConstructor = pageItemConstructor;
        this.element.addEventListener('dragover', (event) => {
            this.onDragOver(event);
        });
        this.element.addEventListener('drop', (event) => {
            this.onDrop(event);
        });
    }
    onDragOver(event) {
        event.preventDefault();
        console.log('dragover', event);
    }
    onDrop(event) {
        event.preventDefault();
        console.log('drop', event);
    }
    addChild(section) {
        const item = new this.pageItemConstructor();
        item.addChild(section);
        item.attachTo(this.element, 'beforeend');
        item.setOnCloseListener(() => item.removeFrom(this.element));
    }
}
