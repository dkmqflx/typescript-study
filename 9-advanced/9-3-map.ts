{
  // map type은 기존에 있는 타입을 이용하면서 조금 다른 형태로 변환할 수 있는 것

  type Video = {
    title: string;
    author: string;
  };

  // Video인데 title이나 author가 있어도 되고 없어도 되는 경우, 다음과 같이 선언할 수 있다
  // type VideoOptional = {
  //   title?:string;
  //   author?:string
  // }

  /* 
    다만 이 경우 Video에서 description:string이  추가 되는 경우
    type Video = {
      title:string;
      author:string;
      description:string;
    }

  아래 처럼, description:title 를 추가해야 되는 번거로움이 있다

    type VideoOptional = {
      title?:string;
      author?:string
      description?:title
    }
  
  또 다른 예시로 readonly 타입으로 만들고 싶다면 아래처럼 또 작성을 해주어야 한다 

    type VideoReadonly = {
      readonly title?:string;
      readonly author?:string
      readonly description?:title
    }
  
  이외에도 또 다른 변화가 있다면 일일히 수정을 해주어야 한다

  이러한 것들을 간편하게 해주고 재사용성을 높일 수 있는 것이 map type이다

  */

  // Optional type 은 어떤 타입이라도 받아올 수 있는 타입

  // [1.2].map(x=>x*x)
  // [1,4], map을 이용해서 각각을 다른 것으로 변환하는 것이 가능하다
  type Optional<T> = {
    [P in keyof T]?: T[P];
    // T가 가진 key들 중에 있는 P라는 key는 T[P] 타입을 가진다

    // [] 부분은 for...in과 동일, object의 모든 key를 돌 수 있다
  };

  // 일일이 ?를 원래 Video key에 선언할 필요가 없다
  // 이처럼 map 타입 사용하면 재사용성을 높일 수 있다
  type VideoOptional = Optional<Video>;
  const videoOp: VideoOptional = {
    title: "hi",
    // 하지만 animal:'dd' 처럼 Video 타입에 없던 타입을 넣게 되면 에러가 발생한다
  };

  // 다음과 같이 readonly의 경우에도 map 타입을 사용할 수 있따

  // type VideoReadOnly = {
  //   readonly title:string;
  //   readonly author:string;
  // }

  // 이 타입을 쓰는 오브젝트는 값을 변경시킬 수 없다
  type ReadOnly<T> = {
    readonly [P in keyof T]: T[P];
  };

  type Animal = {
    name: string;
    age: number;
  };

  const animal: Optional<Animal> = {
    age: 10,
  };
  animal.age = 20; // 다른 값으로 변경 가능

  const video2: ReadOnly<Video> = {
    title: "hi",
    author: "hi",
  };
  // video2.title = 'hi2' // error

  // 기존의 value 타입을 쓰거나 null이 가능한 타입
  type Nullable<T> = {
    [P in keyof T]: T[P] | null;
  };

  const obj2: Nullable<Video> = {
    title: null,
    author: null,
  };

  type Proxy<T> = {
    get(): T;
    set(value: T): void;
  };

  // 전달되는 타입을 Proxy 타입으로 한단계 더 감싸준다
  type Proxify<T> = {
    [P in keyof T]: Proxy<T[P]>;
  };

  // 어떤 오브젝트의 모든 키들에 대해 읽고 쓰는 (get/set) 함수를 정의하는 타입을 만들고 싶을때 사용할 수 있어요 :)
  // https://dev.to/mattzgg_94/typescript-use-mapped-type-to-implement-a-proxy-4im2
}
