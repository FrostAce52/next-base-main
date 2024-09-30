import React, { useState, useEffect } from 'react'

export default function EditForm({ todo = {}, handleUpdateText = () => {} }) {
  // 本地端狀態，只有這個元件在使用的狀態
  // 所以移到這元件裡，而不是在父母元件中宣告
  const [inputText, setInputText] = useState(todo.text)

  return (
    <>
      <li>
        <input
          type="text"
          // value屬性要對應到某個狀態
          value={inputText}
          // onChange事件要對應到value對應狀態的更動情況
          onChange={(e) => {
            setInputText(e.target.value)
          }}
          // 如果按下Enter鍵儲存
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleUpdateText(todo.id, inputText)
            }
          }}
        />
        <button
          onClick={() => {
            handleUpdateText(todo.id, inputText)
          }}
        >
          儲存
        </button>
      </li>
    </>
  )
}
