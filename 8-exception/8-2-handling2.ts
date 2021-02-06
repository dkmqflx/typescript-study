{
  

  class TimeoutError extends Error{

  }

  class OfflineError extends Error{

  }


  class NetworkClient{

    // 네트워크 접속 메소드 
    tryConnect():void{
      throw new Error('no network!')
    }
  }

  class UserService{
    // dependency injection
    constructor(private client:NetworkClient){

    }

    login(){
        this.client.tryConnect()
        // login logic
    }
  }

  const client = new NetworkClient()
  const service = new UserService(client)
  service.login() // error 발생

  class App{
    constructor(private userService: UserService){}

    run(){
      try{
        this.userService.login()
      }catch(error){
        // 여기 error의 타입은 any 타입이다
        // 따라서 타입에 대한 정보가 사라지기 때문에 아래처럼 처리해줄 수가 없다 
        // 따라서 exception 정말 예상치 못한 경우에만 사용하고
        // 왠만하면 Error state를 사용한다

        // error가 OfflineError의 인스턴스라면
        // if(error instanceof OfflineError){
        //   // error 처리 logic 
        // }

      console.log(`error !`)
      }
  
    }


  }

const app = new App(service) // error 발생
app.run()
}