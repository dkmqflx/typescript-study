{
  // Union Types: OR로 이해하면 된다
  // 발생할 수 있는 모든 케이스 중에 하나만 선택한다
  // 1-4에서 설명한 type aliase에서 특정한 값을 타입으로 설정할 수 있는 것이 여기에 활용된다

  type Direction = "left" | "right" | "up" | "down";

  function move(direction: Direction) {
    console.log(direction);
  }

  move("down");

  // 이처럼 이것 또는 저것, 모든 가능한 케이스 중에 발생할 수 있는 딱 하나를 담을 수 있는 타입을 만들고 싶을 때
  // union type을 사용한다

  type TileSize = 8 | 16 | 32;
  const tile: TileSize = 8;
  // const tile:TileSize = 11 // error, 다른 숫자 올 수 없다

  // union type, 타입스크립트에서 활용도 매우 높다

  //function : login -> success or fail
  // 로그인이라는 함수 있는데 실패할 수도, 성공할 수도 있다
  // 성공하는 경우, 네트워크에서 받아온 response를 리턴하고
  // 실패하면 실패한 이유를 알려주는 함수이다

  type SuccessState = {
    response: {
      body: string;
    };
  };

  type FailState = {
    reason: string;
  };

  // unition type도 return 타입에 | 을 사용해서 바로 명시하기 보다, 이런 식으로 별도의 타입으로 만들어서 사용한다
  type LoginState = SuccessState | FailState;

  function login(id: string, password: string): LoginState {
    // success case
    return {
      response: {
        body: "logged in!",
      },
    };
  }

  // 네트워크 통신을 하는 비동기로 해야하니까 이렇게 프로미스로 리턴할 수 도 있다

  function loginPromise(id: string, password: string): Promise<LoginState> {
    return new Promise((resolve, reject) => {
      const result = {
        response: {
          body: "logged in!",
        },
      };
      resolve(result);
    });
  }

  // 로그인하고 받은 state를 출력하는 함수
  // printLoginState(state)
  // success -> 'success!', body
  // fail -> 'fail' , reason

  // 이렇게 할 수 있지만 그렇게 좋은 방법 아니다
  function printLoginStateNotReco(state: LoginState): void {
    // 'response'라는 Key가 state 객체에 있는 경우
    if ("response" in state) {
      console.log(`success! ${state.response.body}`);
    } else {
      // LoginState에는 타입 두가지 밖에 없으므로 FailState인 것 TS가 알 수 있다
      console.log(`fail! ${state.reason}`);
    }
  }
  const state: SuccessState = { response: { body: "success" } };
  printLoginStateNotReco(state);
}

// 문법 원칙이 오브젝트를 만드는 경우에는 , 쉼표로 구분을 하구요

// const obj = { }

// return { response: '', reponse2:'' }

// 타입 정의, 인터페이스 정의는 ; 세미클론으로 구분을 해요

// interface Maker {

//   limit: number;

//   ...

// }

// type Maker = {

//   limit: number;

// }
