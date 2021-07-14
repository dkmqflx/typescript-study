{
  // type alias는 새로운 타입을 내가 정의할 수 있는 것

  type Text = string;
  // Text라는 새로운 타입은 문자열을 말한다

  const name: string = "sdfsdf";
  const name2: Text = "dfs";

  type Num = number;

  // object 형태도 정의 할 수 있다
  type Student = {
    name: string;
    age: number;
  };

  // 항상 name이라는 문자열과 age라는 숫자형만 넣을 수 있다
  const student: Student = {
    name: "sdf",
    age: 123,
  };

  // String Literal Types
  // 실제 값 자체를 타입으로 정할 수 있다
  type Name = "name";
  let sdfName: Name;
  // sdfName = 'named' error 발생
  sdfName = "name"; // 동일한 name이라는 문자열만 가능

  type JSON = "json";
  const json: JSON = "json";

  type Boal = true;
  const isCat: Boal = true;
}
