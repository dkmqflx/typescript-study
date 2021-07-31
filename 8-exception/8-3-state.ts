{
  // 따라서 에러 발생하는 경우에는 다음과 같이
  // union type과 discriminated union을 사용한다
  // 가급적이면 프로그래밍 할 때 성공했을 상태, 실패했을 상태등을 예상해서
  // 처리해준다

  // 즉, 프로그래밍을 할 때 내가 예상할 수 있는 상태, 성공 상태와 실패상태를
  // 타입으로 정의해주는 것이 조금더 깔끔하고 안정적이고 예상가능하게 프로그래밍을 할 수 있다

  type NetworkErrorState = {
    result: "fail";
    reason: "offline" | "down" | "timeout"; // 실패한 이유를 세부적으로 작성해준다
  };

  type SuccessState = {
    result: "success";
  };

  type ResultState = SuccessState | NetworkErrorState;

  class NetworkClient {
    // 네트워크 접속 메소드
    // 어떤 state가 되는지 타입을 정해준다
    tryConnect(): ResultState {
      // 에러에따라 처리해준다
      // offline 에러가 발생한 경우
      return { result: "fail", reason: "offline" };
    }
  }

  class UserService {
    // dependency injection
    constructor(private client: NetworkClient) {}

    login() {
      return this.client.tryConnect();
      // login logic
    }
  }

  class App {
    constructor(private userService: UserService) {}

    run() {
      const status = this.userService.login();
      // 네 :) 네트워크 에러, 서버에서 존재 하지 않는 사용자 등 우리가 예상할 수 있는 모든 에러 케이스에 대해서
      // 따로 Error State를 만들어 두었기 떄문에 (이때 타입스크립트의 union타입을 사용)
      // 따로 try, catch는 사용해줄 필요가 없어요.

      // 실패한 경우 try catch 대신 아래처럼 처리해줄 수 있다
      if (status.result === "fail") {
        console.log(status.reason);
      }
    }
  }

  const client = new NetworkClient();
  const service = new UserService(client);

  const app = new App(service); // error 발생
  app.run();
}

/*

Q.에러와 예외의 차이가 헷갈립니다!


사용자가 잘못된 정보를 넘기는 경우, 서버가 다운된 경우 같은 발생하면 안되지만 개발 단계에서 막을 수 없는 상황...
즉, 일어날려면 일어날 수 밖에 없는 상황을 '예외'라는 용어로 부른다고 생각했습니다.



그래서 로그인할 때 만날 수 있는 offline, down, timeout이라는 상황들도 '예외'라는 용어로 부른다고 생각했는데, 
선생님께서는 '에러'라는 용어로 부르셔서 질문을 올립니다.



'예외'랑 '에러'는 딱 명확히 이거는 예외 이거는 에러라고 언제나 명확히 구분하기 힘든 용어인가요?
아니면 '예외'도 포괄적으로 에러라고 부르기도 하는건가요?
아니면 그냥 개발 단계에서 발생을 막을 수 있든 없든, 그런 상황이 일어날거라고 예상할 수만 있다면 에러라고 하는 것인가요?
애당초 이렇게 용어를 명확히 구분하려는 것이 무의미한 것인가요 😭?



A. 좋은 질문 이예요 :) 


말씀하신 것처럼 예외(Exception)는 프로그램에서 발생할 수 있는 예외적인 상황에 대해 얘기해요. 
파일을 정상적으로 읽어 오지 못했거나, 네트워크에 접속이 안된다던지요.

에러는 시스템 에러, 메모리 에러, 문법 에러 등 예외적인 상황을 포함하는 조금더 포괄적인 것을 말할 수 있을 것 같아요.


제가 말하고 싶은 포인트는 이런 용어 적인 정의보다는, 간혹 개발자 분들이 성공적인 케이스만 (Happy Path 라고 부르지요) 
생각해서 프로그램을 작성하고 그 외적인 것들은 다 예외로 간주하는 경우가 많은데요. 
그렇게 프로그래밍을 하면 프로그램의 안정성과 사용성이 떨어지고 유지보수도 어려워요.



발생할 수 있는 예외에 대해 무작정 (Try-Catch) 또는 throw new Error() 예외 처리를 하기 보다는, 
예상 가능한 예외 상황이라면 제가 영상에서 보여드린 예제처럼 에러 상태를 정의해서 예외 적인 상황이 아니라, 
우리가 예상하고 있는 에러 상황(상태)로 간주해서 각기 다른 처리를 해주는것이 좋다고 생각해요 :)


*/
