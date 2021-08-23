import { Component } from './components/components';
import { TodoComponent } from './components/page/item/todo.js';
import { NoteComponent } from './components/page/item/note.js';
import { ImageComponent } from './components/page/item/image.js';
import { Composable, PageComponent, PageItemComponent } from './components/page/page.js';
import { VideoComponent } from './components/page/item/video.js';

class App {
  // private readonly page: PageComponent;
  // 나중에 pageComponent를 외부에서 받아올 수 있다
  // 따라서 PageComponent라고 coupling 하기 보다는
  // page는 Component 중 하나이고 Composable interface구현한 것이라고 처리해준다

  private readonly page: Component & Composable;

  constructor(appRoot: HTMLElement) {
    this.page = new PageComponent(PageItemComponent);
    this.page.attachTo(appRoot);
    //생성자 안에서 PageComponent를 만들고 있는데, 안에서 다른 어떤 클래스를 만드는 것은 위험하다
    // 이런 것들은 디펱던시 인젝션을 이용해서 외부로 주입을 받는 것이 더 확장가능하고
    // 나중에 유닛 테스트를 해나가기에도 좋다 -> 나중에 수정

    const image = new ImageComponent('Image Title', 'https://picsum.photos/600/300');

    // image.attachTo(appRoot, 'beforebegin');
    /*
    
    페이지 안에서 내부적으로 전달받은 컴포넌트를 PageitemComponent로 한단계 감싸서
    페이지 안에다가 추가해준다.
    그러면 page가 알아서 Component로 한단계 감싼 다음 만들어준다 
    이러한 내부사항을 신경쓰지 않고 아래처럼 변경할 수 있다 
    */
    this.page.addChild(image);

    const note = new NoteComponent('Note Title', 'Note body');
    this.page.addChild(note);

    const todo = new TodoComponent('Todo Title', 'Todo Item');
    this.page.addChild(todo);

    const video = new VideoComponent('Vidoe Title', 'https://youtu.be/8AqRRtUA7ko');
    this.page.addChild(video);
  }
}

new App(document.querySelector('.document')! as HTMLElement);

/*
Q.

intersection 부분 질문있습니당.

안녕하세요 엘리쌤~

7:08초에
page : Composable & Comonent 부분을 강의를 듣기 전에
Composable | Component로 작성했는데 이렇게 작성하니 에러가 발생하더라구요.

this.page = new PageComponent()
this.page.attachTo(appRoot) 를 하면
'Composable' 형식에 'attachTo' 속성이 없습니다' 라는 에러가 발생하는데,
PageComponent는 BaseComponent를 상속받았기 때문에  attachTo와 addChild 모두 갖고 있기 때문에 사용할 수 있을 줄 알았는데 왜 에러가 나는지 궁금합니다..!


A.
Page는 Composable 하면서 (Composable 인터페이스에 있는 모든 함수들을 사용할 수 있으면서) 또 Component 이기도 하죠? 그래서 이것도 맞고! 그리고 저것도! 라는 개념은 intersection & 를 쓰셔야 해요 😆

유니온 타입 | 이거는: 이거 이거나 또는 저거! 둘장에 하나! 일때 사용하는거랍니다.
*/
