import { TextSectionInput } from './components/dialog/input/text-input.js';
import { MediaSectionInput } from './components/dialog/input/media-input.js';
import { Component } from './components/components';
import { TodoComponent } from './components/page/item/todo.js';
import { NoteComponent } from './components/page/item/note.js';
import { ImageComponent } from './components/page/item/image.js';
import { Composable, PageComponent, PageItemComponent } from './components/page/page.js';
import { VideoComponent } from './components/page/item/video.js';
import { InputDialog, MediaData, TextData } from './components/dialog/dialog.js';

type InputComponentConstructor<T extends (MediaData | TextData) & Component> = {
  new (): T;
  // MediaSectionInput 또는 TextSectionInput을 만드는 타입이 된다
};

class App {
  private readonly page: Component & Composable;

  constructor(appRoot: HTMLElement, private dialogRoot: HTMLElement) {
    this.page = new PageComponent(PageItemComponent);
    this.page.attachTo(appRoot);

    this.bindElementToDialog<MediaSectionInput>(
      '#new-image',
      MediaSectionInput,
      (input: MediaSectionInput) => new ImageComponent(input.title, input.url)
    );

    this.bindElementToDialog<MediaSectionInput>(
      '#new-video',
      MediaSectionInput,
      (input: MediaSectionInput) => new VideoComponent(input.title, input.url)
    );

    this.bindElementToDialog<TextSectionInput>(
      '#new-note',
      TextSectionInput,
      (input: TextSectionInput) => new NoteComponent(input.title, input.body)
    );

    this.bindElementToDialog<TextSectionInput>(
      '#new-todo',
      TextSectionInput,
      (input: TextSectionInput) => new TodoComponent(input.title, input.body)
    );
  }

  // 반복적으로 쓰이는 것 있다면 함수로 만들어준다
  // 그리고 차이나는 부분을 인자로 받아온다

  // private bindElementToDialog<T extends MediaSectionInput | TextSectionInput
  // MediaSectionInput | TextSectionInput 다 쓰고 있는데 커플링이 되어있다는 것이 문제
  // Media 관련 데이터(title, url 이외)를 가지고 있는 다른 인풋을 만들고 싶다면
  // MediaSectionInput에서 수정을 해야한다. 확장성이 떨어진다

  // 아래처럼하면 다양한 Media 또는 Text data를 구현하는 것들을 받을 수 있다
  private bindElementToDialog<T extends (MediaData | TextData) & Component>(
    selector: string,
    InputComponent: InputComponentConstructor<T>,
    makeSection: (input: T) => Component
    //  MediaSectionInput | TextSectionInput 을 인자로 받아서 컴포넌트를 만드는 함수
  ) {
    const element = document.querySelector(selector)! as HTMLButtonElement;
    element.addEventListener('click', () => {
      const dialog = new InputDialog();
      const input = new InputComponent();

      dialog.addChild(input);
      dialog.attachTo(this.dialogRoot);

      dialog.setOnCloseListener(() => {
        dialog.removeFrom(this.dialogRoot);
      });

      dialog.setOnSubmitListener(() => {
        const image = makeSection(input);
        this.page.addChild(image);
        dialog.removeFrom(this.dialogRoot);
      });
    });
  }
}

new App(document.querySelector('.document')! as HTMLElement, document.body);
