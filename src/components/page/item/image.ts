export class ImageComponent{
  private element:HTMLElement
  constructor(title:string, url:string ){
    const template = document.createElement('template')
    // innerHTML 사용하면 string type으로 코드작성 가능
    // 사용자에게 전달받은 title, url 같은 것들을 ${}형식으로 바로 전달하면 사용자가 바로 접근할 수 있다
    // 이러한 것은 위험하기 때문에 사용자에게 전달받은 것을 innerHTML로 전달하느 것은 위험하다 
    // 템플릿 안의 요소에 접근해서 필요한 것만 전달해주는 것이 더 안전하다
    // mdn docs - https://developer.mozilla.org/ko/docs/Web/HTML/Element/template
    template.innerHTML = 
    `
    <section class="image">
      <div class="image__holder">
        <img class="image__thumbnail">
      </div>
      <p class="image__title"></p>
    </section>
    `
    this.element = template.content.firstElementChild! as HTMLElement

    const imageElement = this.element.querySelector('.image__thumbnail')! as HTMLImageElement
    imageElement.src = url
    imageElement.alt = title

    const titleElement = this.element.querySelector('.image__title')! as HTMLParagraphElement
    titleElement.textContent = title

  }

  attachTo(parent:HTMLElement, position:InsertPosition = 'afterbegin'){
    parent.insertAdjacentElement(position, this.element )
  }
}