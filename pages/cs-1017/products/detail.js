import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

// 路由: `/products/任何其它list之外` 都算
// 使用查詢字串: `detail?pid=1`
export default function Detail(props) {
  const [product, setProduct] = useState({
    id: 0,
    picture: '',
    stock: 0,
    name: '',
    price: 0,
    tags: '',
  })
  // 第1步: 宣告路由器
  // router.query 物件值，裡面會包含pid屬性值
  // router.isReady 布林值，初次渲染會是false，next會經過"水合化作用"(相當於SSR)後，再渲染一次，讓isReady改變為true，代表水合化完成，此時才能得到query值
  const router = useRouter()

  const getProduct = async (pid) => {
    const baseURL =
      'https://my-json-server.typicode.com/eyesofkids/json-fake-data/products'

    // try catch
    try {
      const res = await fetch(baseURL + '/' + pid)
      const resData = await res.json()
      console.log(resData)

      if (typeof resData === 'object' && resData.id) {
        setProduct(resData)
      } else {
        console.warn('資料類型錯誤')
      }
    } catch (e) {
      console.warn(e)
    }
  }

  // 第2步: 用useEffect監聽router.isReady變動，當改變為true時代表query有pid可以使用了
  useEffect(() => {
    if (router.isReady) {
      //這裡可以確保得到router.query.pid
      getProduct(router.query.pid)
    }
    // 以下為省略eslint檢查一行
    // eslint-disable-next-line
  }, [router.isReady])

  return (
    <>
      <h1>商品詳細頁(查詢字串qs)</h1>
      <p>ID: {product.id !== 0 && product.id}</p>
      <p>名稱: {product.name && product.name}</p>
      <p>價格: {product.price !== 0 && product.price}</p>
    </>
  )
}
