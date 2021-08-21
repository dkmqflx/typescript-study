import { BaseComponent } from '../../components.js';
export class ImageComponent extends BaseComponent {
    constructor(title, url) {
        super(`<setion class="image">
        <div class="image__holder">
          <img class="image__thumbnail" />
        </div>
        <p class="image__title"></p>
      </setion>`);
        const imageElement = this.element.querySelector('.image__thumbnail');
        imageElement.src = url;
        imageElement.alt = title;
        const titleElement = this.element.querySelector('.image__title');
        titleElement.textContent = title;
    }
}
