import React, { useState, useEffect } from 'react'

export default function Todo(props) {
  const [todos, setTodos] = useState([
    { id: 1, text: '買牛奶' },
    { id: 2, text: '學react' },
  ])

  // 專門為了讓文字輸入框ui綁定的狀態
  const [inputText, setInputText] = useState('abc')

  // 新增todo
  const handleAdd = (text) => {
    // 如果文字不是空白時再作新增
    if (text) {
      // 先寫出要新增的物件值
      const newTodo = { id: Number(new Date()), text }
      setTodos([newTodo, ...todos])
      // 清空文字輸入框
      setInputText('')
    }
  }
  // 刪除todo
  const handleRemove = (id) => {
    const nextTodos = todos.filter((v) => v.id !== id)
    setTodos(nextTodos)
  }

  // 切換todo項目的completed屬性
  const handleToggleCompleted = (id) => {
    const nextTodos = todos.map((v, i) => {
      // 這裡判斷id值是否等於傳入id
      if (v.id === id) {
        return { ...v, completed: !v.completed }
      } else {
        return v
      }
    })
    setTodos(nextTodos)
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
        placeholder="輸入文字"
        onKeyDown={(e) => {
          // 如果按下是Enter鍵時
          if (e.key === 'Enter') {
            handleAdd(inputText)
          }
        }}
      />
      <button
        onClick={() => {
          handleAdd(inputText)
        }}
      >
        加入
      </button>
      <hr />
      <ul>
        {todos.map((todo) => {
          return (
            <li key={todo.id}>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => {
                  handleToggleCompleted(todo.id)
                }}
              />
              <span
                className={todo.completed ? 'completed' : 'active'}
                // style={{
                //   color: todo.completed ? 'gray' : 'green',
                //   textDecoration: todo.completed ? 'line-through' : 'none',
                //   fontWeight: todo.completed ? 'normal' : 'bold',
                // }}
              >
                {todo.text}
              </span>

              <button
                onClick={() => {
                  handleRemove(todo.id)
                }}
              >
                刪除
              </button>
            </li>
          )
        })}
      </ul>
      <style jsx>
        {`
          .completed {
            color: gray;
            text-decoration: line-through;
            font-weight: normal;
          }

          .active {
            color: green;
            text-decoration: none;
            font-weight: bold;
          }
        `}
      </style>
    </>
  )
}
