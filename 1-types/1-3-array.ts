{
  // Array
  // 배열은 같은 타입만 가질 수 있다
  const fruits: string[] = ["1,", "2"];

  // 둘 다 같은 방법
  const score: number[] = [1, 2];
  const score2: Array<number> = [1, 2];

  // 주어진 데이터를 변경할 수 없도록
  // object의 불변성을 보장하는 것 중요하기 때문에 readonly 많이 쓰인다
  function printArray(fruits: readonly string[]) {
    // fruits.push(3), error
  }

  // 위 둘다 같은 방법 중 차이점이 있다면, 이렇게는 선언 안됨
  // function printArray2(fruits:readonly Array<string>){}

  // Tuple
  // 배열이긴 배열인데 서로다른 타입을 함께 가질 수 있는 배열

  let student: [string, number]; // 첫번째 타입은 string, 두번째 타입은 number
  student = ["name", 12];
  student[0]; // name
  student[1]; // 12
  // tuple 대신에 object, 클래스 형태로 사용한다
  // 즉 아래처럼 명시해서 사용하는 방법 사용한다
  // student.name
  // studetn.age

  // tuple 사용 권장하지 않는다.
  // 요소에 접근할 때 index로 접근하는 것 좋지 않다
  // index가 무엇을 가리키는지 알 수 없기 때문이다
  // 따라서 Tuple -> interface, type alias, class로 대체해서 사용

  // object destructuring을 사용해서 index 안에 뭐가 있는지 알 수 있도록 하는 방법은 있다
  const [name, age] = student;

  // 리액트에서는 useState가 tuple 형태였다

  // const [state, setState] = useState(0)
  // useState로 전달되는 변수가 숫자도 될 수 있고, 문자열이 될 수도 있다
  // 그리고 업데이트 할 수 있는 API와 state 값을 서로 다른 두가지 타입으로 동적으로 만들어서 리턴해주어서
  // 사용하는 사람이 각각의 이름을 정의해서 사용할 수 있다
  // 이는 tuple을 잘 사용한 예시

  // 무엇인가 동적으로 리턴하는데 클래스나 인터페이스로 묶기에는 애매할 때는 tuple 사용할 수 있지만
  // 일반적으로는 사용하지 않고, 타입 앨리어스나 인터페이스로 대체해서 사용한다
  // 대체해서 사용할 수 있는데 튜플을 남용하는 것은 좋지 않다

  //  질문)

  // 아래와 같이 코드를 작성했을때,
  // fruits배열의 요소 각각에는 readonly가 적용되지만
  // fruits배열 자체는 다른 배열로 덮어서 저장이 되더라고요...
  // > fruits배열 자체에 불변을 선언할 수는 없는지 궁금합니다!

  function printArray2(fruits: readonly string[]) {
    fruits = ["🥕", "🍋"]; // readonly 작동안함.

    // fruits[0] = "🍑"; // readonly보장됨

    console.log(fruits);
  }

  printArray(["🍓", "🍒", "🍑"]);

  // 전달된 인자의 이름을 함수 내에서 로컬 변수로 다시 덮어 씌우는것은 (Shadowed Variable 이라고 불려요)
  // 위험한 행위로, 가능하면 하지 않는 것이 좋구요.
  // 순수 TS config로 방지할 수 있는 방법은 없구, EsLint와 같은 툴을 이용하면 컴파일 시간에 방지 할 수 있어요 :)
}
