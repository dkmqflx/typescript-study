{class NetworkClient{

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
    this.userService.login()
  }
}

const app = new App(service) // error 발생
app.run()

// error 메시지보면 어떤 순서로 에러가 발생했는지 위에서 부터 확인할 수 있다



class NetworkClient2{

  // 네트워크 접속 메소드 
  tryConnect():void{
    throw new Error('no network!')
  }
}

class UserService2{
  // dependency injection
  constructor(private client:NetworkClient2){

  }

  login(){

    this.client.tryConnect()

    // 아래처럼 에러 처리하면 에러 잡아주었기 때문에 App클래스 부분의 run 함수도 실행된다
    // App 클래스 에서는 에러가 발생한 지도 모른다
    // 하지만 어떠한 처리도 해주지 않았기 때문에 차라리 이 부분말고 
    // 에러를 처리할 수 있는 부분에서 에러를 처리하는 것이 더 좋다

    // try{
    //   this.client.tryConnect()
    //   // login logic
    // }catch(error){
    //   console.log("catched!!")
    //   // 
    // }
    
    
  }
}

const client2 = new NetworkClient2()
const service2 = new UserService2(client2)
service2.login() // error 발생

class App2{
  constructor(private userService: UserService2){}

  // run(){
  //   this.userService.login()
  // }

  run(){
    try{
      this.userService.login()
    }catch(error){
    // 이곳에서 에러를 처리해준다
    // show dialog to user
    console.log(`error !`)
    }

  }

}

const app2= new App2(service2) // error 발생
app2.run()

}