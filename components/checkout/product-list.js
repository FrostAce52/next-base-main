import React from 'react'
import products from '@/data/Product.json'
import styles from './cart.module.css'

export default function ProductList({ onAdd = () => {} }) {
  return (
    <>
      <ul className={styles['list']}>
        {products.map((product) => {
          return (
            <li key={product.id} className={styles['item']}>
              <div className={styles['w-400']}>{product.name}</div>
              <div>{product.price}</div>
              <div>
                <button
                  onClick={() => {
                    // 呼叫父層元件的onAdd函式，並傳入product物件
                    onAdd(product)
                  }}
                >
                  加入購物車
                </button>
              </div>
            </li>
          )
        })}
      </ul>
    </>
  )
}
