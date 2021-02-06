import {BaseComponent} from './../components.js'

export class PageComponent extends BaseComponent<HTMLUListElement>{
  constructor(){
    // 상속하는 경우 부모 클래스의 생성자를 호출해주어야 한다 
    super(`<ul class="page">This is PageComponent!</ul>`)

  }

  

  
}