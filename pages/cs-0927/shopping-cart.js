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
