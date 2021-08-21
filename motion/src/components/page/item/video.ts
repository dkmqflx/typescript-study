import { BaseComponent } from '../../components.js';

export class VideoComponent extends BaseComponent<HTMLElement> {
  constructor(title: string, url: string) {
    super(
      `<section class="video">
        <div class="video__player">
        <iframe class="video__iframe"></iframe>
        <h3 class="video__title"></h3>
        </div>
      </section>
    `
    );
    console.log(url);

    const iframe = this.element.querySelector(
      '.video__iframe'
    )! as HTMLIFrameElement;
    iframe.src = 'https://youtu.be/8AqRRtUA7ko'; // url -> videoId -> embed url만 추출

    const titleElement = this.element.querySelector(
      '.video__title'
    )! as HTMLHeadingElement;

    titleElement.textContent = title;
  }
}

// <iframe
// width="1280"
// height="720"
// src="https://www.youtube.com/embed/8AqRRtUA7ko"
// title="YouTube video player"
// frameborder="0"
// allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
