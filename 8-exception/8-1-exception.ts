// exception은 예상치 못한 에러를 말한다
// 최대한 어플리켕션 안에서 해결하려고 노력하다가 
// 정 안되면 사용자에게 문제가 발생했다는 것을 알려주어야 한다
// 이와 반대로 예상할 수 있는 것을 error state라고 한다
// 예상할 수 있는 error state를 exception으로 간주해서 처리하지 않거나 잘못 처리하는 경우가 있다
// 예상 할 수 있는 error 인지 예상치 못한 exceptoin인지 구분해서 처리해야 한다

// Java는 Exception 이라는 클래스 있따
// JavaScript는 Error 라는 클래스 있다

//const array = new Array(100000000000000000000000000000000000) // error 메시지 업삳
// 하지만 너무 큰 배열 만들고 ts-node로 실행하면 rangeError 메시지 볼 수 있다

// 또 다른 예시는 switch 문의 default 부분의 throw error

// Error(Exception) Handling : 3가지 단계로 나뉜다
// try -> 에러 발생할 수 있는 부분
// catch -> 에러 잡느다
// finally -> 에러 발생하든 안하든 실행

// 파일 읽는 함수 
function readFile(fileName:string):string{
  if(fileName === 'not exist'){
    throw new Error(`file not exist ${fileName}`)
  }

  return `file contents`
}

// 파일 닫는 함수 
function closeFile(file:string){

}

const fileName = 'file'
console.log(readFile(fileName))
closeFile(fileName)

const fileName2 = 'not exist'
console.log(readFile(fileName2)) // error 발생
closeFile(fileName2)


// 따라서 에러가 발생할 수 있는 부분은 try로 감싸준다
// 단, try는 정말 에러가 발생할 것 같은 부분만 감싸준다


const fileName3 = 'not exist'

try{
  console.log(readFile(fileName3)) // error 발생

}catch(error){
  // catch 이용해서 error 잡는다
  console.log(`catched!!`)
}finally{
  //에러 발생유무 상관없이 항상 실행되는 부분
  closeFile(fileName3)
  console.log(`finally!!`)

}


function run(){
  const fileName = 'not exist'

  try{
    console.log(readFile(fileName3)) // error 발생
  
  }catch(error){
    // catch 이용해서 error 잡는다
    console.log(`catched!!`)
    return
  }
  
  closeFile(fileName)
  console.log('closed!')

  // finally 부분 없기 때문에 error 발생하면 file 닫히지 안고 return 된다

}

run() 


function run2(){
  const fileName = 'not exist'

  try{
    console.log(readFile(fileName3)) // error 발생
  
  }catch(error){
    // catch 이용해서 error 잡는다
    console.log(`catched!!`)
    return
  }finally{
    closeFile(fileName)
    console.log('closed!')

  }
  
  // catch에서 리턴했으메도 불구하고 
  // finally 실행된다

}

run2()