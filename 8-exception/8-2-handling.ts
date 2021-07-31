{
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
      this.userService.login();
    }
  }

  const app = new App(service);
  // error 발생
  app.run();

  // error 메시지보면 어떤 순서로 에러가 발생했는지 위에서 부터 확인할 수 있다

  class NetworkClient2 {
    // 네트워크 접속 메소드
    tryConnect(): void {
      throw new Error("no network!");
    }
  }

  class UserService2 {
    // dependency injection
    constructor(private client: NetworkClient2) {}

    login() {
      this.client.tryConnect();

      // 아래처럼 에러 처리하면 에러 잡아주었기 때문에 App2클래스 부분의 run 함수도 실행된다
      // App2 클래스 에서는 에러가 발생한 지도 모른다
      // 하지만 어떠한 처리도 해주지 않았기 때문에 차라리 이 부분말고
      // 에러를 처리할 수 있는 부분에서 에러를 처리하는 것이 더 좋다

      // 중요한 것은 내가 정확하게, 우아하게, 고급스럽게 에러가 발생했을 때 처리할 수 있는 것이 아니라면
      // catch 하지 않는 것이 더 낫다
      // 따라서 이것을 처리할 수 있는 곳에서 try 하는 것이 더 좋다

      // try{
      //   this.client.tryConnect()
      //   // login logic
      // }catch(error){
      //   console.log("catched!!")
      //   //
      // }
    }
  }

  const client2 = new NetworkClient2();
  const service2 = new UserService2(client2);
  service2.login(); // error 발생

  class App2 {
    constructor(private userService: UserService2) {}

    // run(){
    //   this.userService.login()
    // }

    run() {
      try {
        this.userService.login();
        // 로그인 후 에러가 발생하면 의미있는 일을 해줄 수 있다
      } catch (error) {
        // 이곳에서 에러를 처리해준다
        // show dialog to user
        console.log(`error !`);
      }
    }
  }

  const app2 = new App2(service2); // error 발생
  app2.run();
}

/*

UserService 클래스에 client를 DI라고 부르는데,

  그럼, App 클래스에서 userService도 DI라고 부르나용?

  class UserService {

    constructor(private client: NetworkClient) {}

    login() {

      this.client.tryConnect();

    }

  }

  class App {

    constructor(private userService: UserService) {}

    run() {

      try {

        this.userService.login();

      } catch (error) {

        // show dialog to use

      }

    }

  }

그렇죠~! :) 

둘다 클래스 내부에서 직접 생성해서 사용하는것이 아니라,

외부에서 만들어진 인스턴스를 생성자에 인자로 주입 받아서 쓰기 때문에

필요한 것들이 (의존하는 Dependency)가 외부로 부터 주입(injection) 되었죠 :)*/
