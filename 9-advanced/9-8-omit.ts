{
  type Video = {
    id:string;
    title:string;
    url:string,
    data:string
  }

  type VideoMetadata = Omit<Video, 'url' | 'data'>

  function getVideo2(id:string):Video{
    return {
      id,
      title:'video',
      url:'https://',
      data:'byte-data'
    }
  }

  // video에 관련된 간략한 데이터만 리턴
  // Omit은 Pick 과 반대로 원하는 것을 뺄 수 있다
  function getVideoMetadata2(id:string):VideoMetadata{
    return {
      id: id,
      title:'title'
    }
  }


}