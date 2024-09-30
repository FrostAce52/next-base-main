import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { isCurrency } from 'validator'

// 子女元件可以從函式的傳入參數值，得到父母元件傳來的值
// props必定是一個物件，裡面包含了父母元件傳來的所有資料
// 在傳入參數值直接解構，提取每個屬性名稱成為變數名稱
// !!注意，一定要加花括號({})，才是物件的解構語法
//
// 目的1: 免除`props.xxxx`的物件取值程式碼
// 目的2: 使用函式傳入參數預設值語法，定義屬性預設值
export default function Child({
  title = '', // 這裡可以使用用預設值的語法，作為預設屬性值之用
  price = 0,
  isConnected = false,
  aa = [],
  oa = {},
  sum = () => {},
}) {
  console.log(title)
  return (
    <>
      <h3>Child(子女)</h3>
      <p>title={title}</p>
      <p>price={price}</p>
      <p>isConnected={JSON.stringify(isConnected)}</p>
      <p>aa={JSON.stringify(aa)}</p>
      <p>oa={JSON.stringify(oa)}</p>
      <p>sum(1,2)={sum(1, 2)}</p>
    </>
  )
}

// 定義屬性類型檢查(只會有主控台警告，不會阻擋執行跳錯誤)
// 寫在元件的函式外面
Child.propTypes = {
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  isConnected: PropTypes.bool.isRequired,
}
