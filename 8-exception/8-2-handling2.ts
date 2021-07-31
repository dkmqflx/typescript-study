{
  // 조금 더 상세한 에러 종류를 정의해준다

  class TimeoutError extends Error {}

  class OfflineError extends Error {}

  class NetworkClient {
    // 네트워크 접속 메소드
    tryConnect(): void {
      throw new Error("no network!");
    }
  }

  class UserService {
    // dependency injection
    constructor(private client: NetworkClient) {}

    login() {
      this.client.tryConnect();
      // login logic
    }
  }

  const client = new NetworkClient();
  const service = new UserService(client);
  service.login(); // error 발생

  class App {
    constructor(private userService: UserService) {}

    run() {
      try {
        this.userService.login();
      } catch (error) {
        // 여기 try - catch의 error의 타입은 any 타입이다
        // 따라서 타입에 대한 정보가 사라지기 때문에 아래처럼 처리해줄 수가 없다
        // 따라서 exception 가급적 정말 예상치 못한 경우에만 사용하고
        // 조금 더 세부적인 에러를 결정하고 싶을 때는
        // Error state를 사용하는 것이 더 좋다

        // error가 OfflineError의 인스턴스라면
        // if(error instanceof OfflineError){
        //   // error 처리 logic
        // }

        console.log(`error !`);
      }
    }
  }

  const app = new App(service); // error 발생
  app.run();
}

// 참고: TypeScript에서 구현된 catch()에는 어떠한 타입정보도 전달되지 않아서
//  instanceOf를 사용할 수 없어요 😭

// 가능한 경우
// tsconfig에서 target을 es6이상으로 하시면 되실텐데,
// 그 이전 버전으로 설정해두시면 안되실 거예요 :)
