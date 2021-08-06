'use strict';
// 보통은 src 폴더 안에 기능별로 폴더를 만들어서 작업한다
// target인 es5로 작성되어있다
var Car = /** @class */ (function () {
  function Car() {
    this.engine = 0;
  }
  Car.prototype.move = function () {
    var engine = this.engine + 1;
    console.log('engine?');
    console.log(engine);
  };
  return Car;
})();
var car = new Car();
car.move();
//# sourceMappingURL=main.js.map
