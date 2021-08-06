{
  // 많이 사용된다
  type PageInfo = {
    title: string;
  };

  type Page = "home" | "about" | "contact";

  // Record는 묶어주는 역할을 한다
  // Page를 key로, pageInfo를 value로 갖는다
  // map과 비슷하게 하나와 또 다른 하나를 묶어준다
  const nav: Record<Page, PageInfo> = {
    home: { title: "Home" },
    about: { title: "About" },
    contact: { title: "Contact" },
  };

  type Product = "cat" | "dog";
  type NewProduct = Capitalize<Product>; // 'Cat' | 'Dog' 대문자만 사용가능

  /*

  Q. 
  Record 타입을 분석해보다 궁금한점이 생겼습니다.
  type Record<K extends keyof any, T> = {    [P in K]: T;  };
  
  Omit 에서도 그렇고 Record에서도 그렇고
  K extends keyof any 라고 적혀있는걸 볼 수 있는데,

  1. 어떤 타입이든 구애받지 않고 허용된다면 그냥 K 라고 쓰면 될텐데 
  왜  뒤에 extends keyof any 를 붙이는 것인지 궁금합니다.

  2. Record에 마우스를 올려보면 K extends string | number | symbol 으로 뜨는 걸 확인할 수 있는데,
  K는  any 타입의 키를 상속받는 것인데 왜  특정 타입이 정해지는 걸까요??  그냥 그렇게 정해진 건가요?

  검색해본결과 K 는 오브젝트의 key 타입으로 되는 것이라, 
  오브젝트의 key로 가능한 타입만 받아 올 수 있도록 제한하기위해 extends keyof any 를 
  붙인다고 되어있는데 맞는걸까요?.?

  그냥 넘어가려다 보니 아쉬워서 알아보고 있는데, 알려고 할 수록 더 헷갈려지는거 같아요 👽

  A. 

  타입스크립트도 점진적으로 개선되어 지고 있는 언어라,

  가끔 이해가 안되는 부분이 나오면 내잘못이 아니라, 이 언어가 점점 개선되어져 가고 있어서 이 부분이 조금 이상하구나! 하고 넘어가면 되욬ㅋㅋㅋㅋ

  https://www.typescriptlang.org/docs/handbook/advanced-types.html#mapped-types

  오래된 문서라 지금은 deprecated 되었지만, 여기에 보시면 이런글을 보실 수 있어요

  Note that keyof any represents the type of any value that can be used as 
  an index to an object. in ohterworldds, keyof any is currently equal to 
  string | number | symbol

  즉, 
  keyof any === string | number | symbol
  
  */

  /*
  
  TS에는 굉장히 많은 유틸리티 타입이 있고 
  그 중에서도 Readonly, Nullable, record, Partial 같은 것들 많이 사용된다
  */
}
