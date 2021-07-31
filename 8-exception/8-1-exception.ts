// exception은 예상치 못한 에러를 말한다
// 최대한 어플리케이션 안에서 해결하려고 노력하다가
// 정 안되면 사용자에게 문제가 발생했다는 것을 알려주어야 한다
// 이와 반대로 예상할 수 있는 것을 error state라고 한다
// 예상할 수 있는 error state를 exception으로 간주해서 처리하지 않거나 잘못 처리하는 경우가 있다
// 예상 할 수 있는 error 인지 예상치 못한 exceptoin인지 구분해서 처리해야 한다

// Java는 Exception 이라는 클래스 있따
// JavaScript는 Error 라는 클래스 있다

// const array = new Array(100000000000000000000000000000000000)
// 이렇게 너무 큰 배열 만들면 만들 때는 error 메시지 없고 경고만 확인할 수 있다
// 하지만 너무 큰 배열 만들고 ts-node로 실행하면 rangeError 메시지 볼 수 있다

// 또 다른 예시는 switch 문의 default 부분의 throw error
// switch 문 안에서 error를 쓴 것을 확인할 수 있다

/*
아래 move 함수는 컴파일에서는 에러가 없고 사용자가 나중에 he를 인자로 전달했을 때
에러가 발생한다

function move(direction: 'up'|'down'|'left'|'right' |'he') {
  switch (direction) {
    case "up":
      position.y += 1;
      break;
    case "down":
      position.y -= 1;
      break;
    case "right":
      position.x += 1;
      break;
    case "left":
      position.x -= 1;
      break;
    default:
      throw new Error(`unknown direction ${direction}`);
  }
}
*/

// 만약 direction에 he라는 타입이 전달되면
// 보통 컴파일 단계에서 실수하지 않도록 아래처럼 트릭을 사용해서 처리해준다
// 즉 컴파일 할 때 Error가 발생해서 컴파일 시간 때 수정을 할 수 있도록 한다

/*
function move(direction: "up" | "down" | "left" | "right" | "he") {
  switch (direction) {
    case "up":
      position.y += 1;
      break;
    case "down":
      position.y -= 1;
      break;
    case "right":
      position.x += 1;
      break;
    case "left":
      position.x -= 1;
      break;
    default:
      const invalid: never = direction;
      // string은 never에 할당될 수 없다는 에러 메시지 발생
      // 그 이유는 he가 default 문으로 와서 never 타입에 할당되기 때문
      throw new Error(`unknown direction ${invalid}`);
  }
}
*/

/*
function move(direction: "up" | "down" | "left" | "right" | "he") {
  switch (direction) {
    case "up":
      position.y += 1;
      break;
    case "down":
      position.y -= 1;
      break;
    case "right":
      position.x += 1;
      break;
    case "left":
      position.x -= 1;
      break;
    case "he":
      position.x -= 1;
      break;
    default:
      const invalid: never = direction;
      // 하지만 위에 he를 처리해주면, default에 올 수 있는 것은 never 상태 밖에 
      // 없기 때문에 에러가 더 이상 발생하지 않는다 
      throw new Error(`unknown direction ${invalid}`);
  }
}
*/

// Error(Exception) Handling : 3가지 단계로 나뉜다
// try -> 에러 발생할 수 있는 부분
// catch -> 에러 잡는다
// finally -> 에러 발생하든 안하든 실행

// 파일 읽는 함수
function readFile(fileName: string): string {
  // 파일의 이름이 존재하지 않는 경우
  if (fileName === "not exist") {
    throw new Error(`file not exist ${fileName}`);
  }

  // 파일이 있을 때만 파일의 컨텐츠를 리턴한다
  return `file contents`;
}

// 파일 닫는 함수
function closeFile(file: string) {}

const fileName = "file";
console.log(readFile(fileName));
closeFile(fileName);

const fileName2 = "not exist";
console.log(readFile(fileName2)); // error 발생
closeFile(fileName2);

// 따라서 에러가 발생할 수 있는 부분은 try로 감싸준다
// 단, try는 정말 에러가 발생할 것 같은 부분만 감싸준다

const fileName3 = "not exist";

try {
  console.log(readFile(fileName3)); // error 발생
} catch (error) {
  // catch 이용해서 error 잡는다
  console.log(`catched!!`);
} finally {
  //에러 발생유무 상관없이 항상 실행되는 부분
  closeFile(fileName3);
  console.log(`finally!!`);
}

function run() {
  const fileName = "not exist";

  try {
    console.log(readFile(fileName3)); // error 발생
  } catch (error) {
    // catch 이용해서 error 잡는다
    console.log(`catched!!`);
    return;
  }

  closeFile(fileName);
  console.log("closed!");

  // finally 부분 없기 때문에 error 발생하면 file 닫히지 안고 return 된다
}

run();

function run2() {
  const fileName = "not exist";

  try {
    console.log(readFile(fileName3)); // error 발생
  } catch (error) {
    // catch 이용해서 error 잡는다
    console.log(`catched!!`);
    return;
  } finally {
    closeFile(fileName);
    console.log("closed!");
  }

  // catch에서 리턴했으메도 불구하고
  // finally 실행된다
}

run2();
