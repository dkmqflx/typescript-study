{
  // Stack
  // LIFO, Last In First Out

  // push
  // pop

  // interface 사용하면 좋은 점은 다른 지금 스택을 사용하는 사람들이
  // 나중에 다른 stack으로 변경하던가, 다른 종류의 스택을 도입 하더라도
  // 이것을 사용하는 사용자는 내부적인 부분 몰라도 된다는 장점이 있다
  // 즉, 다른 종류의 스택을 도입하더라도 사용하는 사람들은 그냥 인터페이스만 쓰고 있기 때문에
  // 전혀 변경할 것이 없다

  interface Stack {
    readonly size: number; // stack의 size를 알기 위해, 읽을 수만 있다
    push(value: string): void;
    pop(): string;
  }

  // 스택을 구현하려면 연결리스트를 사용하면 된다.

  type stackNode = {
    // 우리가 한단계 감싸는 무엇인가를 만든다면 불변성을 유지하는 것이 좋다
    // 한번 값이들어오면 변하지 않도록, 불변성을 유지할 수 있도록 한다 => readonly 사용
    readonly value: string;
    // next:stackNode | undefined
    readonly next?: stackNode;
    // next는 다음 stackNode를 가리킬 수 있거나 없다
    // 만약 가장 처음 노드라면 next가 없다
    // 최신 TS 버전에서는 값이 있을 수도 있고 없을 수도 있는 경우
    // next : stackNode | undefined 대신 위처럼 같이 작성한다
    // optional인 경우 값이 있으면 stackNode 타입이고 없으면 undefined 가 된다
  };

  // 스택 클래스는 Stack 인터페이스를 구현한 것

  class StackImpl implements Stack {
    // readonly 선언하면 다른 값 할당못하니까. private으로 구현
    // 그리고 아래 getter에서 size를 읽어올 수 있도록 한다
    private _size: number = 0; // 내부에서만 쓰이는 경우 보통 변수앞 _ 붙여준다
    private head?: stackNode; // head는 값을 가리킬 수도, 가리키지 않을 수도 있다

    // stack을 처음 만들 때 stack의 size를 정한다
    constructor(private capacity: number) {}

    // interface에는 size라는 변수로 선언되어있지만
    // getter 함수는 일반 변수처럼 호출하니까 ?
    get size(): number {
      return this._size;
    }

    push(value: string) {
      if (this.size === this.capacity) {
        throw new Error("Stack is full");
      }
      const node: stackNode = { value, next: this.head }; //next 보다 prev가 더 와닿는 표현인 것 같다
      this.head = node;
      this._size++;
    }

    // stack이 비어있는 경우 head는 없다.
    // string | undefined로 정의하면, 사용자가 값이 있는지 없는지 유효성 체크를 해주어야 하기 때문에
    // pop을 사용하면 무조건 값을 반환하도록 만드는 것이 좋다
    pop(): string {
      // stack이 비어있는지 비어있지 않는지 확인한다
      // null == undefined -> true
      // null === undefined -> false
      // this.head === undefined로 하지 않는 이유는
      // head가 null 또는 undefined 일 수 있기 때문에 strict check 말고 ==로 해준다

      //
      if (this.head == null) {
        throw new Error("Stack is empty!");
      }
      const node = this.head; // 제거하고자 하는 노드
      this.head = node.next;
      this._size--;
      console.log("head: ", this.head);
      return node.value;
    }
  }

  const stack = new StackImpl(10);
  stack.push("first");
  stack.push("second");
  stack.push("third");

  while (stack.size !== 0) {
    console.log(stack.pop());
  }

  stack.pop(); //error
}

/* 
동작하는 방법 - 5.3 QnA
stack.push('Ellie 1');
head -> { value: 'Ellie 1', next?: undefined }

stack.push('Bob 2');
head -> { value: 'Bob 2', next?: {value: 'Ellie 1', next?: undefined }

stack.push('Steve 3');
head -> { value: 'Steve 3', next?: {value: 'Bob 2', next?: {value: 'Ellie 1', next?: undefined }



stack.pop();
current head는 Steve 3을 value로 갖고 있으므로
Steve 3을 return하고, next에 있는 StackNode 
즉 Bob 2를 push 했을 때 head 위치로 변경하게 됩니다.

this.head = node.next
==>> next?: {value: 'Bob 2', next?: {value: 'Ellie 1', next? : undefined }
Steve 3 은 리스트에서 제외되게 됩니다.


stack.pop();
current head는 Bob 2를 value로 갖고 있으므로
Bob2를 return하고, next에 있는 StackNode 
즉 Ellie 1을  push 했을 때 head 위치로 변경하게 됩니다.

this.head = node.next
==>> next?: {value: 'Ellie 1', next? undefined }
Bob 2 는 리스트에서 제외되게 됩니다.



stack.pop();
current head는 Ellie 1을 value로 갖고 있으므로
Ellie 1을 return하고, next는 undefined 즉 더이상 데이터 없음을 의미합니다.
this.head = node.next

==>> next?: undefined
Ellie 1은 리스트에서 제외되게 됩니다.



현재 head의 위치는 undefined이므로 이후 다시 pop을 실행하면
에러가 발생하게 됩니다.

*/
