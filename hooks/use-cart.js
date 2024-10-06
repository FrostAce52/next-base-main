import { createContext, useContext } from 'react'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
// 1. 建立與導出它
// 傳入參數為defaultValue，是在套用context時錯誤或失敗才會得到的值。
// 可以使用有意義的預設值，或使用null(通常目的是為了除錯)
const CartContext = createContext(null)
// 設定displayName屬性，這是搭配React DevTools使用的
CartContext.displayName = 'CartContext'

export function CartProvider({ children }) {
  // 購物車中的購買項目
  const [items, setItems] = useState([])

  // 宣告一個是否此元件已完成初次渲染的狀態信號值
  const [didMount, setDidMount] = useState(false)

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

  // 處理遞增
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

  // 處理遞減
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

  // 處理刪除
  const onRemove = (productId) => {
    const nextItems = items.filter((v) => v.id !== productId)
    setItems(nextItems)
  }

  // 計算總數量與總金額
  const totalQty = items.reduce((acc, v) => acc + v.qty, 0)
  const totalPrice = items.reduce((acc, v) => acc + v.qty * v.price, 0)

  // 初次渲染的時間點，從local Storage讀出資料設定到狀態中
  useEffect(() => {
    // 設定已經初渲染完成了
    setDidMount(true)
    // 從local Storage讀出資料設定到狀態中
    setItems(JSON.parse(localStorage.getItem('cart')) || [])
  }, [])

  // 當items有變化時，要同步寫到local Storage
  useEffect(() => {
    if (didMount) {
      // 這裡不是初次渲染時(指的是在更新階段)，同步寫到local Storage
      localStorage.setItem('cart', JSON.stringify(items))
    }
    // 因為不需要加入didMount到監聽的狀態中，所以用下面這行略過檢查而已
    // eslint-disable-next-line
  }, [items])

  //3. 最外(上)元件階層包裹提供者元件，可以提供它的值給所有後代⼦孫元件使⽤，包含所有頁面元件，與頁面中的元件
  return (
    <CartContext.Provider
      value={{
        onAdd,
        onDecrease,
        onIncrease,
        onRemove,
        items,
        totalPrice,
        totalQty,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
