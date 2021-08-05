{
  // 많이 사용된다

  type ToDo = {
    title: string;
    description: string;
  };

  // tood를 보여주는 함수
  function display1(todo: ToDo) {
    // todo.title = 'ja' // 하지만 이렇게 임의로 바꿀 수도 있다, 불변성을 보장해주어야 한다
  }

  // 흔하게 쓰는 모든 종류의 타입은 utility type이라고해서 타입스크립트 개발자들이 만들어 놓았다
  // 즉 이미 많은 타입이 정의되어 있기 때문에
  // 9-3-map에서 처럼 타입을 일일이 정의해주지 않아도 된다
  // control 누르고 ReadOnly 하면 모든 utility class가 정의된 것을 확인할 수 있다
  function display(todo: Readonly<ToDo>) {
    // todo.title = 'ja' // error
  }
}
