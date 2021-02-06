{
  // Unition Type이 OR이였다면
  // Intersection Types : and 같은 개념
  // 다양한 타입들을 하나로 묶어서 선언할 수 있다

  type Student = {
    name:string;
    score:number
  }

  type Worker = {
    employedId:number;
    work:()=>void;
  }

  function internWork(person:Student & Worker){

    // person은 Student와 Worker가 합쳐진 것이기 때문에 아래 모두를 출력할 수 있다
    console.log(person.name, person.score, person.employedId, person.work())
  }

  internWork({name:'kim', score:1, employedId:123, work:()=>{}})
}