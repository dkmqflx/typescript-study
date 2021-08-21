import { TodoComponent } from './components/page/item/todo.js';
import { NoteComponent } from './components/page/item/note.js';
import { ImageComponent } from './components/page/item/image.js';
import { PageComponent } from './components/page/page.js';

class App {
  private readonly page: PageComponent;
  constructor(appRoot: HTMLElement) {
    this.page = new PageComponent();
    this.page.attachTo(appRoot);

    const image = new ImageComponent(
      'Image Title',
      'https://picsum.photos/600/300'
    );
    image.attachTo(appRoot, 'beforebegin');

    const note = new NoteComponent('Note Title', 'Note body');
    note.attachTo(appRoot, 'beforebegin');

    const todo = new TodoComponent('Todo Title', 'Todo Item');
    todo.attachTo(appRoot, 'beforebegin');
  }
}

new App(document.querySelector('.document')! as HTMLElement);

/*
querySelector는 HTMLElement 또는 null을 받을 수 있는데 
index.html에 main이 명확하게 정의되어 있고, 해당 className을 가져 오는 것이므로 
type assertion을 사용할 수 있다
*/

/*
Q.
app.ts에서 
new App(document.querySelector(".document"));
이렇게 되어있는데 변수에 담지 않은 형태는 어떤 맥락을 가지게 되는지 궁금합니다.

1. 변수에 담지 않고 만들어진 객체는 어디에 존재하는건가요..? 메모리 어딘가에서 그냥 떠있는건가요?? 

2. 그렇다면 gc의 대상인걸까요..??gc의 대상이라면 추후 이슈가 발생할까요? @_@

3.강의에서는 어떤 맥락으로 사용한걸로 이해해야할까요..? 

A.
1. ES 모듈을 사용하기 때문에, 글로벌이 아니라 모듈 스코프로 객체가 할당되어요
하지만 할당된 객체를 가리키는 변수가 없기 때문에 그 누구도 이 객체에 접근할 수는 없죠 :) 메모리 어딘가에 있을뿐

2. App 생성자에 보시면 this.page 에 관련해서 attachTo를 호출하는걸 볼 수 있어요 
그리고 연계된 함수에서 this.page를 참조하고 있죠? 그렇게 때문에 생성된 App 오브젝트를 참조하고 있는 코드가 있으므로,
gc 되지 않아요

3. 보통은 오브젝트를 만들면 변수에 할당해서 추후에 다시 참조하거나, 
수정하는 목적으로 쓰지만 지금 App 같은 경우는 앱에 관련됨 모든 정보와 오브젝트를 가지고 있는 시작 엔트리 포인트라, 
별도의 변수를 할당해 주지 않았어요 



GC에 대해 깊이 있게 알아 보고 싶으시면 여기 한번 봐보세요:

https://developer.mozilla.org/ko/docs/Web/JavaScript/Memory_Management
*/

/*
Q. 
여기서 의문이 생겨서 질문드려요
page 를 멤버변수로서 등록하고
this.page 이렇게 사용하는데
const page = new PageComponent();
이렇게 그냥 변수에 할당하는 것이랑 어떤점이 다른지 궁금합니다!
오직 생성자 함수 밖의 다른 메소드에서 사용 할 수 있다는 점 때문인가요
아니면 다른 차이점이 있을까요??

A.
지금의 경우처럼 생성자에서 멤버 변수의 오브젝트를 만들 별도의 디펜던시(함수 인자)가 필요한 경우가 아니라면, 
말씀하신것처럼 멤머 변수 선언하면서 초기값을 할당할 수 있어요 👍

별도의 디펜던시가 필요 없는 멤버 변수는 선언하면서 초기값을 할당하고,

필요한 멤버 변수만 선언만 해놓고 생성자에서 할당하는 방식으로

많이 쓰고 있어요 :)
*/

/*
Q.
mport { PageComponent } from './components/page/page.js'

부분에서 page.ts 에 있는 PageComponent를 사용하는데 왜 확장자가 .js가 되는건가요?

A.

리액트와 혼동이 오셨군요 :) 

지금 PageComponent는 우리가 정의한 클래스예요. 
지금 모션 프로젝트에서는 리액트 라이브러리를 쓰지도 않고 리액트 컴포넌트를 상속하지도 
않은 순수 타입스크립트 클래스 이기 때문에 tsx 확장자를 사용하지 않아도 되어요 🙌


A.
원래 node에서 import export를 사용할 땐 웹팩에서 번들링 해서 사용하기 때문에 
뒤에 .js확장자를 붙이지 않아도 사용 가능하게 해주는 것으로 알고 있습니다.
하지만 저희가 지금 하고 있는 프로젝트는 웹팩을 사용하고 있지 않으며  
html에서 script를 불러올 때 type="module"을 지정하고 사용하므로 
.js확장자를 붙여줘야 브라우저가 이해할 수 있는 것으로 알고 있습니다:)
*/
