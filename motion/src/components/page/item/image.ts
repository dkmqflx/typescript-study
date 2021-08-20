export class ImageComponent {
  private element: HTMLElement;
  // Typescript 클래스는 클래스 몸체에 클래스 프로퍼티를 사전 선언하여야 한다.

  constructor(title: string, url: string) {
    const template = document.createElement('template');
    template.innerHTML = `
    <setion class="image">
      <div class="image__holder">
        <img class="image__thumbnail" />
      </div>
      <p class="image__title"></p>
    </setion>`;

    this.element = template.content.firstElementChild! as HTMLElement;

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

  attachTo(parent: HTMLElement, position: InsertPosition = 'afterbegin') {
    parent.insertAdjacentElement(position, this.element);
  }
}

/*

  title과 url은 사용자에게 입력받은 데이터를 설정하는 것
  그래서 사용자가 HTML이나 JS 같은 위험한 코드를 작성하면, 
  사용자가 동적으로 HTML 태그를 만들 수 있게 된다.
  string 형태의 HTML은 ${title} 처럼 innerHTML로 적용해도 상관 없지만 
  사용자에게 전달받은 데이터를 innerHTML로 벡틱 안에 ${title}  설정하는 것은 위험하다
  따라서 template 안에 접근해서 필요한 요소만 업데이트 해준다 


  textContent는 단순히 텍스트를 읽어오고 쓰는 아이예요.
  만약 자식노드를 여러개 가지고 있는 부모 노드의 textContent를 읽게 되면 자식 요소들의 모든 태그들이 
  그냥 텍스트 형태로 반환되는것을 볼 수 있어요. 사용자에게 어떻게 보여지는지 스타일링에 대한 정보도 없기 때문에 
  정말 노드 자체에 들어있는 내용을 텍스트로 반환하게 되어요. 
  그래서 textContent를 써서 텍스트를 읽을때는 CSS에 대한 정보도 없이, 
  브라우저에 어떻게 표기 되는지 확인을 하지 않아도 되어서 (reflow) 읽는 속도가 innerHTML보다 빠르답니다.
  사용자에게 보여지고 있는 (html 태그 정보들 없이) 텍스트를 읽어와야 한다면 innerHTML을 쓰는것이 맞고, 
  노드에 있는 모든 내용을 텍스트로 읽어 와야 한다면 textContent를 써야 해요. 



  innerHTML은 HTML 태그를 포함한 string을 설정할 수 있는 아이로, 간단하게 코드에서 
  string template으로 자식 HTML 노드들을 추가 할 수 있어요 :) 
  앞에서 언급한것과 같이 innerHTML을 써서 정보를 읽게 되면 CSS 정보와 지금 브라우저에서 
  어떻게 표기 되고 있는지 확인하는 절차가 필요하기 떄문에 순수 textContent 보다는 느려요 
  (이 속도는 정말 미미한 속도의 차이라 자주 호출되는 함수에서 쓰지 않는다면 그렇게 크게 걱정하지 않으셔도 되요)



  읽을때는 그런 차이가 있지만 innerHTML, textContent 둘다 텍스트를 설정할때 
  현재 요소의 너비와 높이에 영향을 준다면 (지금 있는 텍스트보다 많은 내용을 입력하게 되면) 
  둘다 설정시 layout이 발생하게 되어요 :) 



  보안상의 문제는 innerHTML에서 XSS(Cross Site Scripting) attack 보안 문제가 있는데 
  이는 사용자에게 입력을 받아온 데이터를 innerHTML로 설정할 경우 문제가 되어요. 
  즉 임의의 사용자가 input을 통해서 script를 포함한 텍스트를 입력해서 공격을 할 수 있죠 :) 



  우리의 예제 같은 경우는 코드상에서 코드로 추가 하는거라 괜찮아요.
  사용자에게 입력 받는 input의 경우는 꼭 innerHTML 보다는 textContent를 사용해야 해요.



설명이 길어져 버렸네요 🤣
  */
