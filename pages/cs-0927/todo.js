import React, { useState, useEffect } from 'react'

export default function Todo(props) {
  const [todos, setTodos] = useState([
    { id: 1, text: '買牛奶' },
    { id: 2, text: '學react' },
  ])

  // 專門為了讓文字輸入框ui綁定的狀態
  const [inputText, setInputText] = useState('abc')

  const handleAdd = (text) => {
    // 先寫出要新增的物件值
    const newTodo = { id: Number(new Date()), text }
    setTodos([newTodo, ...todos])
    // 清空文字輸入框
    setInputText('')
  }
  return (
    <>
      <h1>待辦事項</h1>
      <hr />
      {/* 完全(雙向)綁定到狀態的表單元件，稱為controlled(可控的/受控的) */}
      <input
        type="text"
        value={inputText}
        onChange={(e) => {
          setInputText(e.target.value)
        }}
      />
      <button
        onClick={() => {
          handleAdd(inputText)
        }}
      >
        加入
      </button>
      <ul>
        {todos.map((todo) => {
          return <li key={todo.id}>{todo.text}</li>
        })}
      </ul>
    </>
  )
}
