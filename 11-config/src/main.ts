// 보통은 src 폴더 안에 기능별로 폴더를 만들어서 작업한다

class Car {
  engine = 0;
  move() {
    const engine = this.engine + 1; // 엔진의 숫자 증가
    console.log('engine?');
    console.log(engine);
  }
}

const car = new Car();
car.move();

// ts는 컴파일 할 때 가장 처음 만나는 ts를 기준으로 폴더를 만든다
