export class PageComponent {
  private element:HTMLUListElement
  constructor(){
    this.element = document.createElement('ul')
    this.element.setAttribute('class', 'page')
    this.element.textContent = 'This is PageComponent'
  }

  // 함수 호출하면, 알아서 page 요소를 부모 요소 다음에 추가해주낟
  attachTo(parent:HTMLElement, position:InsertPosition = 'afterbegin'){
    parent.insertAdjacentElement(position, this.element )
  }
  
}