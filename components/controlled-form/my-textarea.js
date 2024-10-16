import React, { useState, useEffect } from 'react'

export default function MyTextarea(props) {
  // textarea
  const [text, setText] = useState('')

  return (
    <>
      <h2>文字輸入區域(textarea)</h2>
      <textarea
        // 文字輸入框上呈現的是目前text狀態的值
        value={text}
        // 文字輸入框使用者有輸入時，設定到狀態中
        onChange={(e) => {
          setText(e.target.value)
        }}
      />
    </>
  )
}
