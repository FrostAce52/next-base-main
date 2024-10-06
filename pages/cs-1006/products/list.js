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
    const baseURL =
      'https://my-json-server.typicode.com/eyesofkids/json-fake-data/products'

    const res = await fetch(baseURL)
    const resData = await res.json()
    console.log(resData)

    setProducts(resData)
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
              <Link href={`/cs-1006/products/${product.id}`}>
                {product.name}
              </Link>
            </li>
          )
        })}
      </ul>
    </>
  )
}
