import { BaseComponent } from '../../components.js';

export class VideoComponent extends BaseComponent<HTMLElement> {
  constructor(title: string, url: string) {
    super(
      `<section class="video">
        <div class="video__player">
        <iframe class="video__iframe"></iframe>
        <h3 class="page-item__title video__title"></h3>        </div>
      </section>
    `
    );

    const iframe = this.element.querySelector('.video__iframe')! as HTMLIFrameElement;
    iframe.src = this.convertToEmbeddedURl(url);

    /*
    
    사용자는 

    1. 주소창에서 url을 복사하거나 
    https://www.youtube.com/watch?v=8AqRRtUA7ko&t=215s

    2. 유튜브의 동영상 url 복사를 통해 url을 가져올 수 있다
    https://youtu.be/8AqRRtUA7ko

    다양한 형태의 url을 받았을 때 id를 추출해서 embed url을 만들어주어야 한다
    */

    const titleElement = this.element.querySelector('.video__title')! as HTMLHeadingElement;

    titleElement.textContent = title;
  }

  private convertToEmbeddedURl(url: string): string {
    const regExp =
      /^(?:https?:\/\/)?(?:www\.)?(?:(?:youtube.com\/(?:(?:watch\?v=)|(?:embed\/))([a-zA-Z0-9-]{11}))|(?:youtu.be\/([a-zA-Z0-9-]{11})))/;
    const match = url.match(regExp);
    const videoId = match ? match[1] || match[2] : undefined;

    if (videoId) {
      return `https://www.youtube.com/embed/${videoId}`;
    }
    return url;
  }
}

// <iframe
// width="1280"
// height="720"
// src="https://www.youtube.com/embed/8AqRRtUA7ko"
// title="YouTube video player"
// frameborder="0"
// allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
