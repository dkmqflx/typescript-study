### Reference

- [타입스크립트 + 객체지향 프로그래밍 마스터 과정](https://academy.dream-coding.com/courses/typescript)


### 1.1 타입스크립트란 ? 

- TS는 superset of JS

- JS에 없는 class, interface, generics, types 등이 있다

- JS도 엄밀히 말하면 객체지향언어, prototype based로 객체 지향 프로그래밍을 할 수 있기 때문

- ES6의 class도 prototype 기반이다

- JS는 dynamically typed 프로그래밍이 동작할 때 실시간으로 타입이 결정되어서 런타임 환경 때 에러가 발생한다

- TS는 staticaslly typed 컴파일 때 에러를 잡을 수 있다

- JS는 Prototype-based이므로 객체지향이라고 할 수 있다

- ES6에서 class 도입되었지만  Prototype-based이고 클래스만으로 할 수 있는 것 많이 없다

- 하지만 TS에는 class, interface, generic, types등 있다

---

### 1.2 타입스크립트가 뜨는 이유

- 자바스크립트는 프로그램이 동작할 때 타입이 결정된다 

- 반면에 타입스크립트는 타입이 정적으로 결정된다 

- 즉, 우리가 코딩할 때 타입이 결정되기 때문에, 즉각적으로 에러를 받아볼 수 있다

- 동적 타입언어 (Dynamically Typed Languages)
    - JS
    - 파이썬
    - 루비

- 정적 타입언어(Statically Typed Languages)
    - Ruest
    - C++
    - Go
    - Java

- 작성한 코드를 프로그램 형태로 동작시키기 위해서는 그 프로그램이 동작하는 환경에서 이해할 수 있는 연어나 바이너리 형태로 변환해주는 작업을 거쳐야 한다 

- 이러한 역할을 하는 것이 컴파일러 

- 코드를 컴파일 하는 시점에 타입이 결정되고 알 수 있다면 정적타입언어(Statically type)

- 프로그램이 동작할 때, 런타임 환경 때 타입이 결정되고 확인되는 경우는 즉, 실행시간이 되어야 타입을 알 수 있다면 동적타입 언어(Dynamically type)

- 타입스크립트는 컴파일 하면 자바스크립트가 튀어나오는데 그 전에 타입체크를 해주는 것

- 동적타입언어의 경우 아래처럼 숫자를 할당했다가, 문자열을 할당할 수 있다

- 컴파일 시간에도 문제가 없고 런타임 때 어떠한 타입이 할당되었느냐로 타입이 동적으로 결정된다

```js
let age = 10
age = '10'

// no type at programming time and compile time

```

- 정적 타입 언어의 경우 타입을 명시해서 선언해주어야 하고, 다른 타입을 할당할 수 없다
```ts
let age:number = 10
age='hello' // error

// type of variable is known at compile time


```

- JS는 타입이 없기 때문에 가독성이 떨어진다 

- 해당 함수가 어떠한 타입의 데이터를 받아 연산하는지 등에 대한 정보를 얻을 수 없다 

- 그리고 내가 개발을 할 때 빠르게 에러와 관련된 이슈를 알아보기 힘들다

- TS는 실시간으로 개발할 때 에러에 대한 정보를 받아볼 수 있고 안전성 있는 소프트웨어를 만들 수 있다

- TS는 강력한 OOP 개발을 할 수 있다 

- OOP는 객체를 위주로 프로그래밍을 한다

- TS의 장점
    - 정적 타입 언어로 더 안전성 있는 코딩 가능하다

    - 강력한 OOP 위한 여러가지 것들 지원

---

### 1.3 타입스크립트를 공부하는 방법

- JS 에 대한 기본 이해가 필요하다

- TS의 강력한 타입 시스템을 이해하는 것이 중요하다 

- 어떤 타입을 언제 써야 하는지를 정확하게 이해해야 한다 

- 또한 제네릭, 인터페이스와 같은 개념들도 있기 때문에 OOP에 관한 원칙도 이해하고 있어야 한다


---

### 1.4 필요한 준비물 설치

- setting.json 에서 strict null 검색 후, **Strict Null Checks**를 해준다

  - Node.js

    - JavaScript runtime environment (framework) that executes JavaScript code outside a web browser

    - "JavaScript everywhere"
  
  - NPM

      - package manager

      - Publish and share course code of Node.js packages

      - simplify installation, updating, and uninstallation of packages

  - npm 명령어로 TS를 설치해준다 
  
  - 이 TS 툴은 TS 코드를 JS 코드로 변환해주는 컴파일러

  - 즉,타입스크립트는 컴파일러 툴도 함께 제공해준다

  ```bash
  # 전역으로 설치

  $ npm install -g typescript

  ```

--- 

### 1.5 꼭 북마크 해둬야 하는 사이트

- [공식 사이트](https://www.typescriptlang.org/download)

- docs와 handbook 참고한다

- 업데이트가 빈번하기 때문에 공식문서에 있는 것들이 현재 버전과 잘 맞지 않는 부분도 있다

- What's new 탭에서 새로운 업데이트에 대한 정보도 확인을 한다

- commnity에서 도움받을 수도 있다


---

### 1.6 함께 공식사이트 읽어보기 (타입스크립트 포인트 정리)

- Typed JavaScript at Any Scale.(어떤 규모의 프로젝트에서도 사용할 수 있는 타입이 있는 자바스크립트)

- By understanding JavaScript, TypeScript saves you time catching errors and providing fixes before you run code.

- TypeScript validates your JavaScript ahead of time (ts는 js의 에러를 빠르게 잡아낼 수 있다)

- TypeScript code is transformed into JavaScript code via the TypeScript compiler or Babel.

---

### 1.7 심심풀이 땅콩 🥜 한번 사용해 보기

- TS config에서 작성된 TS 코드를 어떤 버전의 JS로 변환할 지 선택할 수 있다 

- 이 때 모든 버전에서 호환되도록 낮은 버전을 선택할수록 변환되었을 때의 코드의 양이 많아지게 되고 

- 나중에 번들링해서 배포했을 때 사용자가 다운 받아야 하는 코드의 양이 많아질 수 있다

- 따라서 무작정 버전을 낮추는 것이 아니라 우리의 서비스를 사용하는 사용자가 어떠한 버전이 많은지를 조사하고 정말 필요한 버전까지만 지원하는 것이 좋다 

---

###  1.8 타입스크립트 컴파일러 툴 소개

```ts
// main.ts

console.log('hello world')

//node main.ts 정상적으로 출력된다 

```

- node는 JS 실행 환경이기 때문에 JS 코드를 이해할 수 있지만 정상적으로 console 값이 출력되는 이유는, console도 js에서 사용되는 문법이기 때문이다 

- 하지만 아래처럼 TS 문법이 사용되면 에러가 발생한다 

```ts
// main.ts

console.log('hello world')

class Car{
  engine:number;
  constructor(){
    this.engine = 1;
  }
}

// 에러발생 

```

- 이는 브라우저 환경에서도 마찬가지이다 

- 아래처럼 TS 파일 불러오면, 실행할 수 없다는 에러 발생한다

- 브라우저는 TS를 바로 실행할 수 없다 

```html
<!-- index.html -->

<script src='main.ts'></script>


```

- 따라서 앞서 설치한 TS 툴을 사용해서 TS 코드를 JS 코드로 변환해주어야 한다 

```bash
$ tsc main.ts

# main.js 파일이 생성된다

$ node main.js
```

- 이처럼 변환하지 않고 바로 실행할 수 있는 툴이 있다

- ts-node

- TS 코드를 JS로 변환해서 바로 node에서 실행할 수 있도록 도와준다 

```bash

$ npm install -g ts-node

$ ts-node main.ts

# ts 파일 js로 변환에서 노드에서 실행할 수 있다

$ tsc -h 
# 가능한 모든 옵션 확인할 수 있다

$ tsc -w main.ts
# watch 모드
# 매번 컴파일 실행하지 않아도 변경 사항이 자동으로 자바스크립트로 컴파일 된다 

```

- 실제로 업무를 할대는 tsc -w 또는 다른 개발툴을 쓴다