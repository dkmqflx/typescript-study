{
  type Video = {
    id:string;
    title:string;
    url:string,
    data:string
  }

  type VideoMetadata = Pick<Video, 'id'|'title'>

  function getVideo(id:string):Video{
    return {
      id,
      title:'video',
      url:'https://',
      data:'byte-data'
    }
  }

  // video에 관련된 간략한 데이터만 리턴
  // Pick 사용하면 원하는 속성이나 value만 뽑아서 사용할 수 있다
  // 즉 몇가지 타입만 사용할 때 Pick 사용하면 좋다
  function getVideoMetadata(id:string):VideoMetadata{
    return {
      id: id,
      title:'title'
    }
  }


}