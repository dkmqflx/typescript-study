{
  // Union Types: OR로 이해하면 된다
  // 발생할 수 있는 모든 케이스 중에 하나만 선택한다

  type Direction = 'left' | 'right' | 'up' | 'down'

  function move(direction:Direction){
    console.log(direction)
  }

  move('down')

  type TileSize = 8 | 16 | 32
  const tile:TileSize = 8
  // const tile:TileSize = 11 error

  //function : login =? success or fail

  type SuccessState = {
    response:{
      body:string;
    }
  }

  type FailState = {
    reason:string
  }

  type LoginState = SuccessState | FailState

  function login(id:string, password:string): LoginState {
    // success case
    return {
      response:{
        body:'logged in!'
      }
    }
  }


  // printLoginState(state)
  // success -> 'success!', body
  // fail -> 'fail' , reason

  // 이렇게 할 수 있지만 그렇게 좋은 방법 아니다 
  function printLoginStateNotReco(state:LoginState):void{
    if('response' in state){
      console.log(`success! ${state.response.body}`)
    }else{
      // LoginState에는 타입 두가지 밖에 없으므로 FailState인 것 TS가 알 수 있다
      console.log(`fail! ${state.reason}`)
    }
    
  }
  const state:SuccessState = {response:{body:'success'}}
  printLoginStateNotReco(state)


}