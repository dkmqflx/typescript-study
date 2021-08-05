type Check<T> = T extends string ? boolean : number;
// 기존에 주어진 타입이문자열을 상속하면 boolean, 아니면 number 타입이 된다

type Type = Check<string>; // Type은 boolean이 된다

type TypeName<T> = T extends string
  ? "string"
  : T extends number
  ? "number"
  : T extends boolean
  ? "boolean"
  : T extends undefined
  ? "undefined"
  : T extends Function
  ? "function"
  : "object";

type T0 = TypeName<string>; // 'string' 이라는 문자열 타입
type T1 = TypeName<"a">; // 'strsing' 타입, a도 문자열이므로
type T2 = TypeName<() => void>; // 'function' 타입

// conditional 타입은 이 타입을 써야지라고 조건적으로 결정할 수 있는 타입
