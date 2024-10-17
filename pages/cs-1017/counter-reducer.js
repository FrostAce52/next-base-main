import React, { useReducer } from 'react'

// 1. 決定state初始值(會是一個物件或陣列)(這部份最好是用TypeScript來定義它的類型)
const initState = { total: 0 }

// 額外補充1-1: 規劃動作類型: 使用變數值的actionTypes，通常會放在外面，
// 目的是為了搭配開發工具動態除錯用，與集中管理所有動作類型
const actionTypes = {
  increase: 'increase',
  increaseByValue: 'increaseByValue',
  decrease: 'decrease',
}

// 額外補充1-2 規劃範例: action物件樣貌(shape)(這部份最好是用TypeScript來定義類型)
// { type: actionTypes.increase }
// { type: actionTypes.decrease }
// { type: 'increaseByValue', payload: { value: 10 } }

// 2. 撰寫reducer(純函式)
const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.increase:
      return { ...state, total: state.total + 1 }
    case actionTypes.increaseByValue:
      return { ...state, total: state.total + action.payload.value }
    case actionTypes.decrease:
      return { ...state, total: state.total - 1 }
    default:
      throw new Error() // 除錯用
  }
}

export default function CounterReducer() {
  // 3.呼叫useReducer，解構得到目前的state與要用於發送動作(action物件)的dispatch函式
  const [state, dispatch] = useReducer(reducer, initState)

  return (
    <>
      <h1>useReducer版本的計數器</h1>
      <h1>{state.total}</h1>
      <button
        onClick={() => {
          // 4.使用dispatch發送動作(action物件)來更動狀態
          dispatch({ type: actionTypes.increase })
        }}
      >
        +
      </button>
      <button
        onClick={() => {
          // 4.使用dispatch發送動作(action物件)來更動狀態
          dispatch({ type: actionTypes.increaseByValue, payload: { value: 5 } })
        }}
      >
        +5
      </button>
      <button
        onClick={() => {
          // 4.使用dispatch發送動作(action物件)來更動狀態
          dispatch({ type: actionTypes.decrease })
        }}
      >
        -
      </button>
    </>
  )
}
