import React from 'react'
import styles from './cart.module.css'

export default function CartList({
  items = [],
  onDecrease = () => {},
  onIncrease = () => {},
  onRemove = () => {},
}) {
  return (
    <>
      <ul className={styles['list']}>
        {items.map((item) => {
          return (
            <li key={item.id} className={styles['item']}>
              <div className={styles['w-400']}>{item.name}</div>
              <div>{item.price}</div>
              <div>
                <button
                  onClick={() => {
                    onIncrease(item.id)
                  }}
                >
                  +
                </button>
                <span>{item.qty}</span>
                <button
                  onClick={() => {
                    onDecrease(item.id)
                    // 預先計算，如果使用者按下減按鈕，數量如果減少會是多少
                    const nextQty = item.qty - 1
                    // 如果按了後商品數量<=0，則進行刪除
                    if (nextQty <= 0) {
                      if (confirm('你確定要移除此商品嗎？')) {
                        onRemove(item.id)
                      }
                    } else {
                      onDecrease(item.id)
                    }
                  }}
                >
                  -
                </button>
              </div>
              <div>
                <button
                  onClick={() => {
                    if (confirm('你確定要移除此商品嗎？')) {
                      onRemove(item.id)
                    }
                  }}
                >
                  移除
                </button>
              </div>
            </li>
          )
        })}
      </ul>
    </>
  )
}
