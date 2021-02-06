{
  // 많이 사용된다
  type PageInfo = {
    title:string
  }

  type Page = 'home' | 'about' | 'contact'

  // Record는 묶어주는 역할을 한다 
  // Page를 key로, pageInfo를 value로 갖는다
  // map과 비슷하게 하나와 또 다른 하나를 묶어준다
  const nav: Record<Page, PageInfo> = {
    home: {title: 'Home'},
    about :{title: 'About'},
    contact:{title: 'Contact'}
  }

  type Product = 'cat' | 'dog'
  type NewProduct = Capitalize<Product> // 'Cat' | 'Dog'처럼 대문자로 사용가능
}