import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
// 載入指示動畫
import Loader from '@/components/loader'
// 路由: `/products/任何其它list之外` 都算
// 資料夾中的`[pid].js`檔案，代表在這資料夾中，除了根(索引)路由(index.js)與靜態路由(有名稱的例如list.js)之外，都算這個檔案中的實作結果，例如`/product/123`
export default function Detail(props) {
  const [product, setProduct] = useState({
    id: 0,
    picture: '',
    stock: 0,
    name: '',
    price: 0,
    tags: '',
  })

  // 宣告載入指示用的狀態
  // 預設為true代表一開始就是呈現載入動畫，正在和伺服器要求資料
  const [loading, setLoading] = useState(true)

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
        // 關閉載入指示, 1.5秒
        setTimeout(() => {
          setLoading(false)
        }, 1500)
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

  const display = (
    <>
      <h1>商品詳細頁</h1>
      <p>ID: {product.id}</p>
      <p>名稱: {product.name}</p>
      <p>價格: {product.price}</p>
    </>
  )

  return <>{loading ? <Loader /> : display}</>
}
