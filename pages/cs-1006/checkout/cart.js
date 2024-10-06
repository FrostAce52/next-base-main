import { useState } from 'react'
import ProductList from '@/components/checkout/product-list'
import CartList from '@/components/checkout/cart-list'
import styles from '@/components/checkout/cart.module.css'
import { FaShoppingCart } from 'react-icons/fa'

export default function Cart() {
  // 購物車中的購買項目
  const [items, setItems] = useState([])

  // 新增商品到購物車
  const onAdd = (product) => {
    // 先判斷此商品是否已經在購物車中
    const foundIndex = items.findIndex((v) => v.id === product.id)

    if (foundIndex !== -1) {
      // 有找到 --> 遞增商品數量
      const nextItems = items.map((v, i) => {
        if (v.id === product.id) {
          return { ...v, qty: v.qty + 1 }
        } else {
          return v
        }
      })
      setItems(nextItems)
    } else {
      // 否則 ---> 新增商品到購物車
      // 注意購買項目和商品物件間差了一個數量qty屬性
      const newItem = { ...product, qty: 1 }
      const nextItems = [newItem, ...items]
      setItems(nextItems)
    }
  }

  const onIncrease = (productId) => {
    const nextItems = items.map((v, i) => {
      if (v.id === productId) {
        return { ...v, qty: v.qty + 1 }
      } else {
        return v
      }
    })
    setItems(nextItems)
  }

  const onDecrease = (productId) => {
    const nextItems = items.map((v, i) => {
      if (v.id === productId) {
        return { ...v, qty: v.qty - 1 }
      } else {
        return v
      }
    })
    setItems(nextItems)
  }

  const onRemove = (productId) => {
    const nextItems = items.filter((v) => v.id !== productId)
    setItems(nextItems)
  }

  return (
    <>
      <div className={styles['container']}>
        <div className={styles['navbar']}>
          <div className={styles['logo']}>網站Logo</div>
          <div className={styles['header']}>
            <h2>購物車範例</h2>
          </div>
          <div className={styles['badge']}>
            <div className={styles['button']}>
              <FaShoppingCart />
              <span className={styles['button__badge']}>4</span>
            </div>
          </div>
        </div>
        <h3>商品列表</h3>
        <div className={styles['product']}>
          <ProductList
            // 這裡是利用屬性將onAdd函式傳遞給ProductList元件
            onAdd={onAdd}
          />
        </div>
        <h3>購物車</h3>
        <div className={styles['cart']}>
          <CartList
            items={items}
            onDecrease={onDecrease}
            onIncrease={onIncrease}
            onRemove={onRemove}
          />
        </div>
        <hr />
        <div>總數量: 123 / 總金額: 123000</div>
      </div>
    </>
  )
}
