{

  // SuccessState와 FailState 모두 result라는 키를 가지고 있지만 다른 값을 가지고 있다
  // discriminated union은 
  // union 타입에 차별화되는 이름이 동일한 타입을 둠으로써 
  // 간편하게 구분할 수 있는 것을 말한다

  
  type SuccessState = {
    result:'success';
    response:{
      body:string;
    }
  }

  type FailState = {
    result:'fail'
    reason:string
  }

  type LoginState = SuccessState | FailState


  function printLoginState(state:LoginState):void{

    if(state.result === 'success'){
      console.log(`success! ${state.response.body}`)
    }else{
      // LoginState에는 타입 두가지 밖에 없으므로 FailState인 것 TS가 알 수 있다
      console.log(`fail! ${state.reason}`)
    }
    
  }
  const state:SuccessState = {result:'success', response:{body:'success'}}
  printLoginState(state)

}