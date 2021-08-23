import { Component } from './components/components';
import { TodoComponent } from './components/page/item/todo.js';
import { NoteComponent } from './components/page/item/note.js';
import { ImageComponent } from './components/page/item/image.js';
import { Composable, PageComponent, PageItemComponent } from './components/page/page.js';
import { VideoComponent } from './components/page/item/video.js';
import { InputDialog } from './components/dialog/dialog.js';

class App {
  private readonly page: Component & Composable;

  constructor(appRoot: HTMLElement) {
    this.page = new PageComponent(PageItemComponent);
    this.page.attachTo(appRoot);

    const image = new ImageComponent('Image Title', 'https://picsum.photos/600/300');

    this.page.addChild(image);

    const note = new NoteComponent('Note Title', 'Note body');
    this.page.addChild(note);

    const todo = new TodoComponent('Todo Title', 'Todo Item');
    this.page.addChild(todo);

    const video = new VideoComponent('Vidoe Title', 'https://youtu.be/8AqRRtUA7ko');
    this.page.addChild(video);

    const imageBtn = document.querySelector('#new-image')! as HTMLButtonElement;
    imageBtn.addEventListener('click', () => {
      const dialog = new InputDialog();

      dialog.setOnCloseListener(() => {
        dialog.removeFrom(document.body);
      });

      dialog.setOnSubmitListener(() => {
        // 섹션을 만들어서 페이지에 추가해준다
        dialog.removeFrom(document.body);
      });

      dialog.attachTo(document.body);
    });
  }
}

new App(document.querySelector('.document')! as HTMLElement);

/*
Q.

실무에선 어떤식으로 TS가 쓰이고 있는지 궁금합니다 ㅎㅎㅎ!!!


A.
실무라고 하더라도 어떤 프로젝트를 하냐에 따라서 쓰임새가 다를 것 같아요 :) 

정말 심플하고 정적인 웹사이트 수준이라면 리액트에서 제공하는 클래스 또는 함수형 컴포넌트만 이용해서
Props & States 들의 인자와 또 함수들에 타입을 정해주는 정도로 제한적으로 사용할 것 같구요.


프론트엔드에 조금더 복잡한 로직이 들어 있고, 동적인 요소들이 많다면, 지금 우리가 이번 프로젝트에서 사용하는 것처럼,
다양한 로직들을 클래스로 묶어서 상속과 다양한 디자인 패턴들을 이용해서 프로그램을 만들어 나가겠죠? :)


리액트에서 보셨겠지만 youtube나 firebase를 쓸때 우리가 그냥 컴포넌트에서 모든 로직을 처리 하는것이 아니라, 
컴포넌트 UI 는 최대한 UI를 보여주는 것들만 하게 (최대한 멍청하게 만들어 놓곸ㅋ) 서비스에 관련된 로직은 별도로 클래스를 만들어 둔것처럼 타입스크립트로도 그렇게 해요 :)


제가 일하는 곳은 사용자가 디자인을 만들수 있는 프론트엔드 단에서 꽤 많은 로직과 처리 해야 하는 것들이 많기 때문에 
객체지향과 함수형 그리고 꽤 다양한 디자인 패턴을 이용해서 아키텍쳐가 만들어져 있어요 🙆‍♀️



다음에 기회가 되면 리액트 + 타입스크립트 한번 만들어 볼께요~ :)
*/
