import React from 'react'
import styles from './cart.module.css'
import { useCart } from '@/hooks/use-cart'
// 訊息對話盒
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

export default function CartList() {
  const {
    items = [],
    onDecrease = () => {},
    onIncrease = () => {},
    onRemove = () => {},
    totalPrice,
    totalQty,
  } = useCart()

  // 使用MySwal取代Swal
  const MySwal = withReactContent(Swal)

  // 刪除用的對話盒函式
  const notifyAndRemove = (productName, productId) => {
    MySwal.fire({
      title: '你確定嗎?',
      text: '這個動作將無法回復!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '確定刪除!',
      cancelButtonText: '取消',
    }).then((result) => {
      if (result.isConfirmed) {
        MySwal.fire({
          title: '已刪除!',
          text: productName + ' 已從購物車刪除.',
          icon: 'success',
        })

        // 作刪除的動作
        onRemove(productId)
      }
    })
  }

  return (
    <>
      <div className={styles['container']}>
        <h1>購物車</h1>
        <div className={styles['cart']}>
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
                        // 預先計算，如果使用者按下減按鈕，數量如果減少會是多少
                        const nextQty = item.qty - 1
                        // 如果按了後商品數量<=0，則進行刪除
                        if (nextQty <= 0) {
                          notifyAndRemove(item.name, item.id)
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
                        notifyAndRemove(item.name, item.id)
                      }}
                    >
                      移除
                    </button>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
        <div>
          總數量: {totalQty} / 總金額: {totalPrice}
        </div>
      </div>
    </>
  )
}
