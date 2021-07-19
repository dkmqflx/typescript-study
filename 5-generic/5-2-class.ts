{
  // either: a or b
  interface Either {
    left: () => number;
    right(): number;
  }

  class SimpleEither implements Either {
    constructor(private leftValue: number, private rightValue: number) {}

    left(): number {
      return this.leftValue;
    }
    right(): number {
      return this.rightValue;
    }
  }

  const either = new SimpleEither(4, 5);
  either.left(); // 4
  either.right(); // 5

  // Typoe의 T, Item I, value의 V도 많이 쓰고 한글자로 주로 표현한다
  // 인터페이스에는 L 또는 R이라는 타입이 있는데, 이것은 뭔지 모르고 사용자가 정한다
  // 사용자가 L, R을 같은 타입으로도, 혹은 다른 타입으로도 사용할 수 있다
  interface Either2<L, R> {
    left: () => L; // left 함수 호출하면 L이라는 타입 반환
    right(): R;
  }

  // 숫자 뿐 아니라 다른 타입도 받을 수 있도록 만들려면 제네릭을 사용한다

  class SimpleEither2<L, R> implements Either2<L, R> {
    constructor(private leftValue: L, private rightValue: R) {}

    left(): L {
      return this.leftValue;
    }
    right(): R {
      return this.rightValue;
    }
  }

  const either2: Either2<number, number> = new SimpleEither2(4, 5);
  either2.left(); // 4
  either2.right(); // 5

  // 서로 다른 타입을 넣을 수 있다
  const best = new SimpleEither2(4, "hello");
  const best2 = new SimpleEither2({ name: "hello" }, "hello");
}
