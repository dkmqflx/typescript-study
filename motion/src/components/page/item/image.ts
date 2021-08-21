import { BaseComponent } from '../../components.js';

export class ImageComponent extends BaseComponent<HTMLElement> {
  // Typescript 클래스는 클래스 몸체에 클래스 프로퍼티를 사전 선언하여야 한다.

  constructor(title: string, url: string) {
    super(
      `<setion class="image">
        <div class="image__holder">
          <img class="image__thumbnail" />
        </div>
        <p class="image__title"></p>
      </setion>`
    );

    const imageElement = this.element.querySelector(
      '.image__thumbnail'
    )! as HTMLImageElement;

    imageElement.src = url;
    imageElement.alt = title;

    const titleElement = this.element.querySelector(
      '.image__title'
    )! as HTMLParagraphElement;

    titleElement.textContent = title;
  }
}

/*
Q.
super와 this가 아직도 조금 헤깔리는 부분입니다. ㅜㅠ
자식 class에서 super.element로 하면 에러가 나고,
this.elememt로 해야 에러없이 잘 렌더링됩니다.

실질적으로 부모의 element를 부르고있기때문에,super가 맞는거 아닌가요 ?
왜  super로 하면 에러가 나는건가요 ?

A.
아! 그 부분에서 헷갈릴 수도 있겠군요 :)

상속을 하게 되면 기본적으로는 부모 클래스에서 가지고 있는 모든 멤버 변수(속성), 
함수(행동) 들에 대해서 자식 클래스가 모두 다 가지게 됩니다.

그래서 자식 클래스에서 this 키워드로 멤버 변수와 함수들에 접근할 수 있게 되죠.
하지만 생성자, 함수에 한해서만 자식 클래스가 상속을 하면서 변경을 할 수 있게 되고 
(이걸 오버라이딩 이라고 하죠?) 이때 자식에서 재정의된 함수를 호출하고 싶다면 this를, 
부모클래스에서 원래 작성된 함수 (또는 생성자)를 호출하고 싶다면 super를 써야 해요 😊

이해가 잘 되셨으면 좋겠는데, 더 헷갈리면 답글 부탁드려요 

정확하게 다시 설명해 드리면,

상속을 하는 순간, 부모 클래스에 있는 모든것들을(멤버 변수와 함수들) 내걸로 가지게 됩니다.
상속을 하는 순간, 부모의 모든것들이 내것이 되므로, 나 자체를 가리키는 this를 통해서 속성과 함수에 접근이 가능하죠.


다만, 부모로 부터 상속받은 함수(행동)이 마음에 들지 않아서 추가적으로 변경해야 하면 오버라이딩을 
통해 재정의를 할 수 있는데, 이때 기존의 부모 행동을 참조 하고 싶을때 
super라는 키워드를 통해서 부모의 행동에 접근할 수 있어요.


*/
