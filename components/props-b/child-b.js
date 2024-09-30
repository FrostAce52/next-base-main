import React, { useState, useEffect } from 'react'

export default function ChildB({ setDataFromChild = () => {} }) {
  // 元件自己的內部狀態
  const [cData, setCData] = useState('child-b data')

  // 錯誤用法: 設定狀態的函式有副作用(不能直接在元件主體裡呼叫)
  // setDataFromChild(cData)

  //正確的第2種方式
  useEffect(() => {
    // 元件首次渲染之後執行其中程式碼
    setDataFromChild(cData)
  }, [])

  return (
    <>
      <h3>ChildB(子女)</h3>
      <button
        onClick={() => {
          // 正確的第1種呼叫方式。在事件處理函式呼叫
          // setDataFromChild(cData)
        }}
      >
        傳資料給childA
      </button>
    </>
  )
}
