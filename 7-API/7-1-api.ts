// 공식 문서를 볼 수 있지만 API를 사용해서 어떤 스펙으로 작성되어 있는지 확인할 수 있다

Array;

type Student = {
  passed: boolean;
};

const students: Student[] = [
  { passed: true },
  { passed: true },
  { passed: false },
];

// 모든 요소가 true 여아지 결과가 true가 된다
const result = students.every((student) => student.passed);
console.log("result: ", result); // false

class Animal {}

class Cat extends Animal {
  isCat: boolean = true;
}

class Dog extends Animal {
  isDog: boolean = true;
}

const animals: Animal[] = [new Cat(), new Cat(), new Dog()];

function isCat(animal: Animal): animal is Cat {
  // animal을 Cat으로 casting한 다음에 isCat 함수가 있는지 확인
  return (animal as Cat).isCat !== undefined;
}

// every를 돌면서 cat인지 아닌지 확인한다
console.log(animals.every<Cat>(isCat));
// true, true, false 출력

//every<S extends T>(predicate: (value: T, index: number, array: T[]) => value is S, thisArg?: any): this is S[];
// S라는 타입은 배열 T에서 지정한 그 어떤 서브타입도 될 수 있다
//  this is S[]; -> 마지막에 배열이 S 타입인지 아닌지 확인하는 것

/*

잘 작성된 코드를 보기만 해도 실력이 늘 수 있다
여기서 잘 작성된 코드는 오픈소스 
오프소스 코드 보면서 이렇게 사용할 수 있구나, 하면서 배우면 실력 는다 
Vscode, TS 모두 MS의 오픈소스 프로젝트

하지만 여기서 TS 언어 자체를 개발 할 때 필요한 스타일 가이드와 
실제로 제품을 만들 때 쓸 수 있는 코드의 스타일 가이드는 다를 수 있다
그래서 실제로 제품을 만들 때 쓴느 코드를 보면서 감을 쌓아나가는 것이 중요하다 

라이브러리 쓸 때 내부적으로 구현되어 있는 것 확인하는 것이 좋다
이렇게 하면서 실력이 는다 

오픈소스 코드는 src와 test로 나누어져 있다
그래서 어떤 식으로 각각 되어있는지 확인할 수 있다 


*/

/*


Q.
interface ConcatArray<T> {
    readonly length: number;
    readonly [n: number]: T;
    join(separator?: string): string;
    slice(start?: number, end?: number): T[];
}

1. 
[n : number] : T 에서 n은 항상 number이기 때문에 숫자로이루어진 배열인 number[ ] 이 
와야할것같은데 어떻게 T 라는제네릭으로 지정해줄 수 있는지 잘 모르겠습니다. 
그리고 length는 배열의 길이를 나타내는값인거 같은데 , [n: number] 는 어떤걸 나타내는 것인가욥 ..??

2.
언제 T [ ]  타입이고 언제 ConcatArray<T> 타입인지 잘 구분이 되지않습니다.
아래에있는 join의 경우엔 구분자가 있을경우 string 타입이라는걸 한눈에 이해할수 있지만 concat의 경우엔 잘 이해가 되지않습니다. 

3. concat에 전달되는 item은  T나 concatArray<T>로 이루어진 배열이라는 것을 알 수 있는데, 인자로 단순 string이나 number를 넣어도 왜 타입에러가 나지 않는걸까요??

const arr1 = [1,2,3,4,5]
const arr2 = 6
const result = arr1.concat( arr2 ) // [1,2,3,4,5,6]
arr2 는  일반 number이지 않은가요??

A.

1. 

배열에서 인덱스로 아이템들을 접근할 수 있죠?
array[1]
array[2]

그것을 정의하는걸로 이해 하시면 되요
[n: number]: T;
숫자(배열 인덱스)로 접근하면, 리턴되는 값은 배열의 아이템인 T 타입



2. 

사용하는 오브젝트가 그냥 일반 배열인지 또는 ConcatArray 배열로 만들어 졌는지에 따라서 사용되어지는 타입이 달리질 수 있어요
참고로, ConcatArray는 Array ([]) 클래스를 상속한, 자식 클래스랍니다



3. 


함수의 인자를 이렇게 받도록 정의하면

method(...args: number)
method(1,2,3) 이렇게 배열을 전달해 줘도 되고,  // args는 [1,2,3]
method(1) 이렇게 하나를 전달해 줘도 되요 // args는 [1]



그런데 concat 정의에 보시면 
method(...args: number[]) 이런식으로 되어있죠?
그럼 배열을 여러개 전달해도 된다는 말이예요 :)


*/

/*
Q.
type-predicates 질문입니다.
1. 
value is S라는것이 타입스크립트에서 별도로 만든 문법인지 궁금합니다.

2. 
리턴형태( value is S)는 이해하는 부분이 아닌 value is S형태로 써야하는구나 정도로 생각하고 넘어가는게 맞는건가 
아니면 제가 공부해야할 어떤 문법이나 지식이있는건가 궁금해서 질문드립니다.


A.
좋은 질문이예요 :) 타입스크립트에 타입 확인을 위한 함수를 만들때 사용할 수 있는 문법이예요:
 https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates

여기 Type Predicates라고 보시면 

function isFish(pet: Fish | Bird): pet is Fish {
  return (pet as Fish).swim !== undefined;
}
함수 정의를 보시면 인자로 Fish나 Bird 타입 두가지를 가질 수 있는 값을 전달하면

함수에서 Fish 타입일 경우에만 true로 전달한다고 볼 수 있어요 :)

*/

/*
Q.
api 읽는 중에 this 부분이 무엇인지 잘 모르겠습니다

아래의 두 배열의 API에 쓰이는 this 키워드가  의미하는 바를 잘 모르겠습니다.



1. sort(compareFn?: (a: T, b: T) => number): this;

2. every<S extends T>(predicate: (value: T, index: number, array: T[]) => value is S, thisArg?: any): this is S[];



cmd를 누르고 확인해보면 Array가 다시 검색되는데, 그럼 왜 굳이 this라는 키워드를 쓰는거지하는 잘모르겠습니다.

가령 1의 경우 this 대신에 T[]로 하면안되는건가요?


A.
1. this 를 리턴한다는것은 그 클래스, 자기 자신을 리턴한다와 동일해요 :)

array.sort() -> 리턴값은 정렬된 아이템들을 담고 있는 array 자신


2. this is S[] 

이 부분은 타입스크립트에서만 있는 문법으로, 비슷한 질문을 하신 질문글을 공유해 드릴께요:

https://academy.dream-coding.com/courses/take/typescript/lessons/20066044-8-2-api/discussions/2519953
*/
