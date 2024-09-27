import { useState } from 'react'

const initialProducts = [
  {
    id: 0,
    name: '小熊餅乾',
    count: 1,
  },
  {
    id: 1,
    name: '巧克力豆餅乾',
    count: 5,
  },
  {
    id: 2,
    name: '小老板海苔',
    count: 2,
  },
]

export default function ShoppingCart() {
  const [products, setProducts] = useState(initialProducts)
  // 處理遞增
  const handleIncrease = (id) => {
    const newProducts = products.map((v, i) => {
      // 這裡判斷id值是否等於傳入的id
      if (v.id === id) {
        // 這裡修改count屬性遞增
        return { ...v, count: v.count + 1 }
      } else {
        return v
      }
    })
    setProducts(newProducts)
  }

  // 處理遞減
  const handleDecrease = (id) => {
    const newProducts = products.map((v, i) => {
      if (v.id === id) {
        return { ...v, count: v.count - 1 }
      } else {
        return v
      }
    })
    setProducts(newProducts)
  }
  // react官網解答(遞減)
  // https://zh-hans.react.dev/learn/updating-arrays-in-state#challenges
  function handleDecreaseClick(productId) {
    // 這裡一定要用let宣告，因為下面有重覆指定
    let nextProducts = products.map((product) => {
      if (product.id === productId) {
        return {
          ...product,
          count: product.count - 1,
        }
      } else {
        return product
      }
    })
    // 在設定到狀態前，先作一次filter，只留下count(數量)大於0的
    nextProducts = nextProducts.filter((p) => p.count > 0)

    // 設定到狀態
    // 如果準備要設到狀態的nextProducts項目數比目前的products少，
    // 代表是準備作刪除的動作
    if (products.length > nextProducts.length) {
      if (confirm('你確定要移除此商品嗎？')) {
        setProducts(nextProducts)
      }
    } else {
      setProducts(nextProducts)
    }
  }

  // 處理刪除
  const handleRemove = (id) => {
    const newProducts = products.filter((v) => v.id !== id)
    setProducts(newProducts)
  }
  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>
          {product.name} (<b>{product.count}</b>)
          <button
            onClick={() => {
              handleIncrease(product.id)
            }}
          >
            +
          </button>
          <button
            onClick={() => {
              handleDecreaseClick(product.id)
            }}
          >官網版–</button>
          <button
            onClick={() => {
              // 預先計算，如果使用者按下減按鈕，數量如果減少會是多少
              const nextCount = product.count - 1
              // 如果按了後商品數量<=0，則進行刪除
              if (nextCount <= 0) {
                if (confirm('你確定要移除此商品嗎？')) {
                  handleRemove(product.id)
                }
              } else {
                handleDecrease(product.id)
              }
            }}
          >
            –
          </button>
        </li>
      ))}
    </ul>
  )
}
