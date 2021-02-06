/*
BaseComponent
Encapsulate the HTML element creation
외부에서는 어떻게 HTML element 만드는지 상관하지 않고, 무엇을 만들고 싶은지 string 형태로 전달한다
그리고 이렇게 BaseComponent로 제공되는 API가 있다면, BaseComponent를 여기저기 전달하고, BaseComponent로 의사소통하기 보다는
인터페이스를 만들어준다
*/

export interface Component{
  attachTo(parent:HTMLElement, position?:InsertPosition):void
}

// T는 HTML을 상속받는 Element 타입만 가능하다
export class BaseComponent<T extends HTMLElement> implements Component{
  protected readonly element:T 
  // element 안의 상태는 변경가능하지만, element 자체를 변경시킬 수 없다
  constructor(htmlString:string){
    const template = document.createElement('template')
    // innerHTML 사용하면 string type으로 코드작성 가능
    // 사용자에게 전달받은 title, url 같은 것들을 ${}형식으로 바로 전달하면 사용자가 바로 접근할 수 있다
    // 이러한 것은 위험하기 때문에 사용자에게 전달받은 것을 innerHTML로 전달하느 것은 위험하다 
    // 템플릿 안의 요소에 접근해서 필요한 것만 전달해주는 것이 더 안전하다
    // mdn docs - https://developer.mozilla.org/ko/docs/Web/HTML/Element/template
    // 강의 qna에 자세한 정보 있음
    template.innerHTML = htmlString

    this.element = template.content.firstElementChild! as T
    
  }
  // 함수 호출하면, 알아서 page 요소를 부모 요소 다음에 추가해준다
  attachTo(parent:HTMLElement, position:InsertPosition = 'afterbegin'){
    parent.insertAdjacentElement(position, this.element )
  }
}