{
  /**
   * Print Loading State
   */
  type LoadingState = {
    state: "loading";
  };

  type SuccessState = {
    state: "success";
    response: {
      body: string;
    };
  };

  type FailState = {
    state: "fail";
    reason: string;
  };

  // ResourceLoadState은 union type
  type ResourceLoadState = LoadingState | SuccessState | FailState;

  printLoginState({ state: "loading" }); // 👀 loading...
  printLoginState({ state: "success", response: { body: "loaded" } }); // 😃 loaded
  printLoginState({ state: "fail", reason: "no network" }); // 😱 no network

  function printLoginState(state: ResourceLoadState) {
    switch (state.state) {
      case "loading":
        console.log("loading");
        break;
      case "success":
        console.log(state.response.body);
        break;
      case "fail":
        console.log(state.reason);
        break;
      default:
        throw new Error(`unknown state ${state}`);
    }
  }

  // if vs switch ?

  // 대게 유니온 타입경우 여러 케이스별로 다른 로직을 적용할때는 switch가 더 좋아요.
  // 지금 같은 경우에도 다른 타입(retrying 재시도중)을 추가 한다면 추가된 케이스는 전부다 else에 들어가서 예상하지 못한 오류가 발생하겠죠~? :)
}
