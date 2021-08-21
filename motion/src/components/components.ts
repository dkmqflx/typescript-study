/*
attchTo라는 API가 있는데, 이렇게 API가 있다면 
BaseComponent를 여기저기 전달하고, BaseComponent로 의사소통 하는 것 보다는
Interface를 쓰는 것이 좋다 
*/

export interface Component {
  attachTo(parent: HTMLElement, position?: InsertPosition): void;
}

/*
* Encapsulate the HTML element creation
BaseComponent는 HTMLElement를 만드는 것을 Encapsulate 한다 
그래서 외부에서는 우리가 어떻게 HTMLElement를 만드는지 상관하지 않고
string type의 element를 전달해주기만 하면 된다

element라고 하는 클래스 멤버 변수는 protected readonly 키워드를 가지고 있죠?

오직 상속하는 클래스에서만 접근이 가능하고(이때, 읽기만 가능함), 외부에서는 접근이 불가능해요. 
생성자에 문자열 형태의 HTML만 전달 받으면 내부적으로 외부에서는 보이지 않는 element라는 요소를 생성하므로 
캡슐화되었다고 볼 수 있어요.

*/
export class BaseComponent<T extends HTMLElement> implements Component {
  protected readonly element: T;
  // 요소 안의 상태들은 변경이 가능하지만, 요소 자체를 다른 것으로 변경하는 것은 안된다
  constructor(htmlString: string) {
    const template = document.createElement('template');
    template.innerHTML = htmlString;
    this.element = template.content.firstElementChild! as T;
  }

  attachTo(parent: HTMLElement, position: InsertPosition = 'afterbegin') {
    parent.insertAdjacentElement(position, this.element);
  }
}

/* template element
A built-in <template> element serves as a storage for HTML markup templates. 
The browser ignores it contents, only checks for syntax validity, 
but we can access and use it in JavaScript, 
to create other elements.
*/

/*
제네릭 관련 질문

엘리님 안녕하세요. 강의 잘 듣고 있습니다!

리팩토링 과정에서 제네릭을 활용하셨는데 궁금한 점이 있어서 질문드립니다.

공통된 부분을 분리하여 베이스 컴포넌트를 작성한 후 HTMLElement를 상속한 모든 요소가 이용할 수 있도록 제네릭으로 
설정을 하신 것은 이해가 잘 됩니다.

그런데 super()를 호출할 때 전달하는 인자는 템플릿에 들어갈 문자열이라서 string 타입인데, 
개발자의 실수로 html element가 아닌 이상한 문자열을 전달할 수도 있겠다는 생각이 들어서요. 
이 때  'as T' 로 타입을 명시하는 것에 문제는 없을까요?


좋은 질문이예요 :)

우선, 텍스트나 HTML에 문법 오류가 있는 경우 런타임 에러가 아니라, 불완전한 요소로 인식이 되기 때문에
 심각한 오류는 발생하지 않을 것 같구요. 저 부분을 사용자에게 실시간으로 받아오는 거라면 위험할 수도 있겠지만 
 (프로그램이 예상하는데로 동작하지 않을 수 있으므로) 개발단계에서 발생할 수 있는 에러죵? :)

그래서, 개발자의 실수로 잘못된 HTML 문자열을 전달하는 것인 개발단계에서 발생하는 코딩 실수 이므로 
개발하는 단계에서 잘못된 점을 빠르게 파악 할 수 있을 것 같아요. 
개발하다가 프로그램을 동작시켜서 검증단계에서 발견하거나 유닛테스팅에서도 파악 할 수 있을 것 같아요 :)
*/

/*

Q.
interface에 BaseComponent의 element도 Interface에 들어가야하지 않을까요?
들어가야 사용자가 interface를 보고 element를 사용하지 않을까..? 하는 생각이 들어서요

음... 제가 생각해본결과 element는 BaseComponent 내부에서 동작하기 위한 것이라서 안넣은거고 
실제로 사용자는 attachTo 함수만 사용하기 때문에 Interface에는 attachTo만 들어간것같습니다!

그렇습니다 ❤️  정확하게 생각하셨어요 👍

만약 Component 인터페이스를 이용하는 사용자들이 element에 직접적으로 접근해서 읽고/쓰고 해야 한다면 
인터페이스에 추가해 볼 수 있겠지만, 캡슐화 원칙에 어긋나지 않을까요?

우리 같은 경우에는 컴포넌트를 만들때 생성하는 element를 외부에서 보거나 변경하지 않게 잘 숨겨두고 싶기 때문에 
인터페이스에는 추가해 두지 않았어요
*/

/*
Q.BaseComponent에서 <T extends HTMLElement> 와 관련해 질문이 있습니다.

protected readonly element: HTMLElement; 
멤버변수를 위와 같이 직접 설정해주는 것과

generic으로 <T extends HTMLElement> 설정한 뒤
protected readonly element: T;


이렇게 설정해주는 것의 차이를 잘 모르겠습니다.결국 T는 HTMLElement를 상속받은 타입 중 하나일 것인데
HTMLElement는 모든 html요소를 아우르는 타입이기 때문에

protected readonly element: HTMLElement;


이렇게 작성하여도, html에 속하는 어떤 요소를 전달하든 문제없이 작동하지 않나요?
실제로 잘 작동하는 것을 확인했습니다!
그런데 굳이 제네릭으로 타입을 지정해주는 이유가 궁금합니다.


A.

좋은 질문이예요 👍 
BaseComponent 내부적으로만 보면 동일해요 :)

하지만, BaseComponent를 상속하는, 예를 들어 ImageComponent가 있다고 가정하면, 
ImageComponent는 HTMLElement보다는 조금더 세부적인 HTMLImageElement로 만들고 싶어요.

class ImageComponent extends BaseComponent<HTMLImageElement> 
이렇게 정의해 볼 수 있겠죠?


나중에 BackgroundImageComponent, BigImageComponent 조금더 세부적인 요소를 만들고 싶다면 
ImageComponent를 상속하게 될테고, 우리는 이제 알죠!
element는 반드시 이미지 요소여야 한다는걸, 제네릭 타입에서 그걸 보장해 주죠 :)

이처럼 제네릭 타입은, 유연성이 더해지고 또 타입의 안정성도 더해진답니다 🤓
*/
