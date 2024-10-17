import React, { useState, useEffect } from 'react'
import Link from 'next/link'
// [
//   {
//     id: 1,
//     picture: 'https://via.placeholder.com/150',
//     stock: 5,
//     name: 'iPhone 12 Pro',
//     price: 25000,
//     tags: '蘋果,大螢幕',
//   },
//   {
//     id: 2,
//     picture: 'https://via.placeholder.com/150',
//     stock: 5,
//     name: 'iPhone 12',
//     price: 15000,
//     tags: '蘋果,小螢幕',
//   },
// ]

// 路由: `/products/list`
export default function List(props) {
  const [products, setProducts] = useState([])

  // 向伺服器獲取資料
  const getProducts = async () => {
    const baseURL = 'http://localhost:3005/api/my-product'

    // try catch
    try {
      const res = await fetch(baseURL)
      const resData = await res.json()
      console.log(resData)

      if (
        resData.status === 'success' &&
        Array.isArray(resData.data.products)
      ) {
        setProducts(resData.data.products)
      } else {
        console.warn('資料類型錯誤')
      }
    } catch (e) {
      console.warn(e)
    }
  }

  useEffect(() => {
    getProducts()
  }, [])

  return (
    <>
      <h1>商品列表頁</h1>
      <ul>
        {products.map((product) => {
          return (
            <li key={product.id}>
              <Link
                href={`/cs-1017/products/${product.id}`}
                //qs版本: href={`/cs-1017/products/detail?pid=${product.id}`}
              >
                {product.name}
              </Link>
            </li>
          )
        })}
      </ul>
    </>
  )
}
