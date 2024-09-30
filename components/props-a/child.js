import React, { useState, useEffect } from 'react'

// 子女元件可以從函式的傳入參數值，得到父母元件傳來的值
// props必定是一個物件，裡面包含了父母元件傳來的所有資料
export default function Child(props) {
  return (
    <>
      <h3>child</h3>
      <p>title={props.title}</p>
      <p>price={props.price}</p>
      <p>isConnected={JSON.stringify(props.isConnected)}</p>
      <p>aa={JSON.stringify(props.aa)}</p>
      <p>oa={JSON.stringify(props.oa)}</p>
      <p>sum(1, 2)={props.sum(1, 2)}</p>
    </>
  )
}
