import { ImageComponent } from './components/page/item/image.js';
import {PageComponent} from './components/page/page.js'

class App{
  private readonly page:PageComponent
  constructor(appRoot:HTMLElement){
    this.page = new PageComponent();
    this.page.attachTo(appRoot)
    const image = new ImageComponent('Image Title', 'https://picsum.photos/600/300')
    image.attachTo(appRoot, 'beforeend')

  }
}


// document.querySelector는 null 도 return 할 수 있다
// 그러나 여기서는 null이 아닌 것이 확실하므로 
new App(document.querySelector('.document')! as HTMLElement)

