{
  // Unition Type이 OR이였다면
  // Intersection Types : and 같은 개념
  // 다양한 타입들을 하나로 묶어서 선언할 수 있다

  // union이 발생할 수 있는 모든 케이스 중에 한가지를 선택하는 것이었다면
  // intersection은 모든 것을 다 합한 것을 의미한다

  type Student = {
    name: string;
    score: number;
  };

  type Worker = {
    employedId: number;
    work: () => void;
  };

  function internWork(person: Student & Worker) {
    // person은 Student와 Worker가 합쳐진 것이기 때문에 아래 모두를 출력할 수 있다
    console.log(person.name, person.score, person.employedId, person.work());
  }

  // 따라서 Student 타입과 Worker 타입 모든 데이터가 들어있는 object를 전달해야 한다

  internWork({ name: "kim", score: 1, employedId: 123, work: () => {} });
}
