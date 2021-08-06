{
  type Video = {
    id: string;
    title: string;
    url: string;
    data: string;
  };

  type VideoMetadata = Omit<Video, "url" | "data">;

  function getVideo2(id: string): Video {
    return {
      id,
      title: "video",
      url: "https://",
      data: "byte-data",
    };
  }

  // video에 관련된 간략한 데이터만 리턴
  // Omit은 Pick 과 반대로 원하는 것을 뺄 수 있다
  function getVideoMetadata2(id: string): VideoMetadata {
    return {
      id: id,
      title: "title",
    };
  }

  /*

  Q.
  type Exclude<T, U> = T extends U ? never : T;
  type a = Exclude<'url' | 'id' | 'title' | 'data', 'url'> 

  [T in keyof S] 를 하게 되면 map 처럼 돌면서 새로운 타입을 반환해주는데 

  여기서 궁금한점이 extends도 유니온타입들을 반복하면서 도는건가요?
  아 질문이 잘못된 것 같습니다. extends가 아니라 유니온 타입이 Exclude의 T에 들어가게 되면 
  각각의 타입마다 condition을 체크하고 다시 반환해주는지가 궁금한거였습니다. 
  실제로 테스트해보니 맞는 것 같습니다!

  A.
  네 :) 그쵸, 그러면 'url'을 제외한 나머지 타입들만 a타입에 해당하겠죠




  */
}
