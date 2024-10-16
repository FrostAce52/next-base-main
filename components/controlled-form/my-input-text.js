import React, { useState, useEffect } from 'react'
import InputIME from './input-ime'

export default function MyInputText(props) {
  const [text, setText] = useState('')

  return (
    <>
      <h2>文字輸入框(input-text)</h2>
      <input
        type="text"
        // 文字輸入框上呈現的是目前text狀態的值
        value={text}
        // 文字輸入框使用者有輸入時，設定到狀態中
        onChange={(e) => {
          setText(e.target.value)
        }}
      />
      <h2>文字輸入框(input-text)-中文輸入法(CJK IME)問題修正</h2>
      <InputIME
        type="text"
        // 文字輸入框上呈現的是目前text狀態的值
        value={text}
        // 文字輸入框使用者有輸入時，設定到狀態中
        onChange={(e) => {
          setText(e.target.value)
        }}
      />
      <h2>數字輸入框(input-number)</h2>
      <h2>日期輸入框(input-date)</h2>
      <h2>密碼輸入框(input-password)</h2>
    </>
  )
}
