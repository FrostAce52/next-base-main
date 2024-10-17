import React, { useReducer } from 'react'

// 1. 決定state初始值(會是一個物件或陣列)
const initState = { total: 0 }

// 額外補充1-1: 規劃有哪些動作類型
const actionTypes = {
  increase: 'increase',
}

// 2. 撰寫reducer(純函式)
const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.increase:
      return { ...state, total: state.total + 1 }
    default:
      throw new Error() // 除錯用
  }
}

export default function CounterReducer() {
  return (
    <>
      <h1>useReducer版本的計數器</h1>
    </>
  )
}
