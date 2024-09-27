import React, { useState, useEffect } from 'react'

export default function JsxMap(props) {
  const a1 = [1, 2, 4, 16]

  const a2 = a1.map((v, i) => {
    return <li key={i}>{v * 2}</li>
  })
  return (
    <>
      <h1>jsx-map</h1>
      <ul>{a2}</ul>
      {/* 實作上不需要額外宣告a2 (上)，可以直接寫map函式呼叫在jsx中 (下) */}
      <ul>
        {a1.map((v, i) => {
          return <li key={i}>{v * 2}</li>
        })}
      </ul>
    </>
  )
}
