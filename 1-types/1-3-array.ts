{
  // Array
  const fruits:string[] = ['1,','2']

  // 둘 다 같은 방법
  const score:number[] = [1,2]
  const score2:Array<number> = [1,2]

  // 주어진 데이터를 변경할 수 없도록
  // object의 불변성을 보장하는 것 중요하기 때문에 readonly 많이 쓰인다
  function printArray(fruits:readonly string[]){
    // fruits.push(3), error

  }

  // 이렇게는 선언 안됨
  // function printArray2(fruits:readonly Array<string>){}

  // Tuple
  // 서로다른 타입을 함께 가질 수 있는 배열
  // tuple 사용 권장하지 않는다.
  // 요소에 접근할 때 index로 접근하는 것 좋지 않다
  // index가 무엇을 가리키는지 알 수 없기 때문이다
  
  // Tuple -> interface, type alias, class로 대체해서 사용
  let student:[string, number];
  student = ['name', 12]
  student[0] // name
  student[1] // 12
  // tuple 대신에 object, 클래스 형태로 사용한다 
  // 즉 아래처럼 명시해서 사용하는 방법 사용한다 
  // student.name
  // studetn.age
  
  // object destructuring을 사용해서 index 안에 뭐가 있는지 알 수 있도록 하는 방법은 있다 
  const [name, age] = student

  // 리액트에서는 useState가 tuple 형태였다
  // 이는 tuple을 잘 사용한 예시
  // const [state, setState] = useState(0)

  // 무엇인가 동적으로 리턴하는데 클래스나 인터페이스로 묶기에는 애매할 때는 tuple 사용할 수 있지만
  // 일반적으로는 사용하지 않는다 

}