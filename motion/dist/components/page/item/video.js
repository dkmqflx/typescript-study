import { BaseComponent } from '../../components.js';
export class VideoComponent extends BaseComponent {
    constructor(title, url) {
        super(`<section class="video">
        <div class="video__player">
        <iframe class="video__iframe"></iframe>
        <h3 class="video__title"></h3>
        </div>
      </section>
    `);
        console.log(url);
        const iframe = this.element.querySelector('.video__iframe');
        iframe.src = 'https://youtu.be/8AqRRtUA7ko';
        const titleElement = this.element.querySelector('.video__title');
        titleElement.textContent = title;
    }
}
