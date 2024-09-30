import React, { useState, useEffect } from 'react'

export default function AddForm({ handleAdd = () => {} }) {
  // 本地端狀態，只有這個元件在使用的狀態
  // 所以移到這元件裡，而不是在父母元件中宣告
  const [inputText, setInputText] = useState('')

  return (
    <>
      <input
        type="text"
        // value屬性要對應到某個狀態
        value={inputText}
        // onChange事件要對應到value對應狀態的更動情況
        onChange={(e) => {
          setInputText(e.target.value)
        }}
        placeholder="輸入文字"
        onKeyDown={(e) => {
          // 如果按下是Enter鍵時
          if (e.key === 'Enter') {
            handleAdd(inputText)
            // 清空文字輸入框(改到這裡)
            setInputText('')
          }
        }}
      />
      <button
        onClick={() => {
          // 加入todo
          handleAdd(inputText)
          // 清空文字輸入框(改到這裡)
          setInputText('')
        }}
      >
        加入
      </button>
    </>
  )
}
