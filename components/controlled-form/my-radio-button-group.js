import React, { useState, useEffect } from 'react'

export default function MyRadioButtonGroup(props) {
  // 選項按鈕群組 選項陣列
  const petOptions = ['狗', '貓', '倉鼠']
  // 狀態值，從中選出一個
  const [pet, setPet] = useState('貓')

  return (
    <>
      <h2>選項按鈕群組(radio-button-group)</h2>
      {petOptions.map((v, i) => {
        // 注意要包在label標籤(或div或Fragment元件)裡面，以免造成jsx只能有一個根元素的錯誤
        return (
          <label key={i}>
            <input
              type="radio"
              // 每個radio選項用自己本身的值v和狀態相比，相符會是true，反之是false
              checked={v === pet}
              // 這裡統一使用像之前可控表單元件的寫法(value+onChange)
              value={v}
              onChange={(e) => {
                setPet(e.target.value)
              }}
            />
            {v}
          </label>
        )
      })}
    </>
  )
}
