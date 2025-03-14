
// Stack
// LIFO, Last In First Out


// push
// pop

// interface 사용하면 다른 stack으로 변경하던가 하더라도 사용자는 내부적인 부분 몰라도 된다는 장점이 있다
interface Stack<T>{
  readonly size:number // stack의 size를 알기 위해, 읽을 수만 있다 
  push(value:T):void
  pop():T;
}

type stackNode<T> = {
  // 한번 값이들어오면 변하지 않도록, 불변성을 유지할 수 있도록 한다
  readonly value:T;
  // next:stackNode | undefined
  readonly next?:stackNode<T>; //최신 TS 버전에서는 값이 있을 수도 있고 없을 수도 있는경우 다음과 같이 작성한다
}


class StackImpl<T> implements Stack<T>{

  // readonly선언하면 다른 값 할당못하니까. private으로 구현
  private _size:number = 0 // 내부에서만 쓰이는 경우 보통 변수앞 _ 붙여준다
  private head?:stackNode<T>; // head는 값을 가리킬 수도, 가리키지 않을 수도 있다
  

  // stack을 처음 만들 때 stack의 size를 정한다
  constructor(private capacity:number){}


  // interface에는 size라는 변수로 선언되어있지만
  // getter 함수는 일반 변수처럼 호출하니까 ?
  get size():number{
    return this._size
  }




  push(value:T){
    if(this.size === this.capacity){
      throw new Error('Stack is full')
    }
    // const node:stackNode<T>={value, next:this.head } 
    // 앞에 head의 타입이 명확하기 때문에 타입 추론을 사용해서 타입의 정보 생략할 수 있다

    const node={value, next:this.head } 
    this.head = node;
    this._size++;
  }

  // stack이 비어있는 경우 head는 없다.
  // string | undefined로 정의하면, 사용자가 값이 있는지 없는지 유효성 체크를 해주어야 하기 때문에 
  // pop을 사용하면 무조건 값을 반환하도록 만드는 것이 좋다
  pop():T{
    // stack이 비어있는지 비어있지 않는지 확인한다
    // null == undefined -> true
    // null === undefined -> false
    // this.head === undefined로 하지 않는 이유는
    // head가 null 또는 undefined 일 수 있기 때문에 strict check 말고 ==로 해준다
  

    if(this.head == null){
      throw new Error('Stack is empty!')
    }
    const node = this.head
    this.head = node.next
    this._size--; 
    console.log("head: ", this.head)
    return node.value
  }

}

// const stack = new StackImpl(10) , 타입을 명확하게 해주지 않으면 unknown이 되기 때문에 타입을 명확하게 해준다
const stack = new StackImpl<string>(10)
stack.push('first')
stack.push('second')

while(stack.size!==0){
  console.log(stack.pop())
}


const stack2 = new StackImpl<number>(10)
stack2.push(1)
stack2.push(2)

while(stack2.size!==0){
  console.log(stack2.pop())
}


// stack.pop() //error