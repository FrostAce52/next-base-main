import React, { useState, useEffect } from 'react'
import InputIME from './input-ime'

export default function MyInputText(props) {
  // input-text
  const [text, setText] = useState('')
  // input-number
  const [price, setPrice] = useState(0)
  // input-date  (yyyy-mm-dd) ISO 8601
  const [birth, setBirth] = useState('2024-10-16')
  // 轉換函式
  // 時間日期物件 ==> yyyy-mm-dd 字串
  // sv (Swedish/svenska/,瑞典語)，此語言使用的本地日期格式是ISO 8601
  const dateToString = (date = null) =>
    date instanceof Date ? date.toLocaleDateString('sv') : ''
  // yyyy-mm-dd 字串 ==> 時間日期物件
  const stringToDate = (str = '') => new Date(str)
  // 時間日期物件(特殊物件，初始值可以用null或使用今天、某天)
  const [inputDateObj, setInputDateObj] = useState(null)
  // input-password
  const [pass, setPass] = useState('')
  // checkbox呈現密碼用
  const [show, setShow] = useState(false)

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
        value={text}
        onChange={(e) => {
          setText(e.target.value)
        }}
      />
      <h2>數字輸入框(input-number)</h2>
      <input
        min={0}
        max={100}
        step={2}
        type="number"
        value={price}
        onChange={(e) => {
          // 需要轉為數字資料類型再設定到狀態中
          //setPrice(+e.target.value)
          setPrice(Number(e.target.value))
        }}
      />
      <h2>日期輸入框(input-date)</h2>
      <input
        type="date"
        value={birth}
        onChange={(e) => {
          setBirth(e.target.value)
        }}
      />
      <h2>日期輸入框(input-date)-時間日期物件值</h2>
      <input
        type="date"
        // 呈現時要轉換為yyyy-mm-dd字串
        value={dateToString(inputDateObj)}
        onChange={(e) => {
          // 設定到狀態前要先轉換為時間日期物件
          setInputDateObj(stringToDate(e.target.value))
        }}
      />
      <h2>密碼輸入框(input-password)</h2>
      <input
        type={show ? 'text' : 'password'}
        value={pass}
        onChange={(e) => {
          setPass(e.target.value)
        }}
      />
      <input
        type="checkbox"
        checked={show}
        onChange={(e) => {
          setShow(e.target.checked)
        }}
      />{' '}
      呈現密碼
      <button
        onClick={() => {
          setShow(!show)
        }}
      >
        {show ? '隱藏' : '呈現'}
      </button>
    </>
  )
}
