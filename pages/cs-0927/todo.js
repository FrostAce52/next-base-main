import React, { useState, useEffect } from 'react'

export default function Todo(props) {
  // 宣告待辨事項使用的物件陣列狀態
  // 擴充completed屬性(布林值)，代表是否已完成(已完成=true)
  const [todos, setTodos] = useState([
    { id: 1, text: '買牛奶', completed: true },
    { id: 2, text: '學react', completed: false },
  ])

  // 用於呈現的todos(後續CRUD處理繁雜)
  // const [todosDisplay, setTodosDisplay] = useState([
  //   { id: 1, text: '買牛奶', completed: true },
  //   { id: 2, text: '學react', completed: false },
  // ])

  // 宣告專門讓文字輸入框ui綁定的狀態
  const [inputText, setInputText] = useState('')

  // 過濾類型('所有', '進行中', '已完成')
  const [filterType, setFilterType] = useState('所有')

  // 呈現過濾的選項
  const filterOptions = ['所有', '進行中', '已完成']

  // 新增todo
  const handleAdd = (text) => {
    // 如果文字不是空白時再作新增
    if (text) {
      // 寫出要新增的物件值(這裡記得在新增時，也要加上預設的`completed: false`屬性)
      const newTodo = { id: Date.now(), text, completed: false }
      // 設定到狀態
      setTodos([newTodo, ...todos])
      // 清空文字輸入框
      setInputText('')
    }
  }

  // 刪除todo
  const handleRemove = (id) => {
    const nextTodos = todos.filter((v) => v.id !== id)
    // 設定到狀態
    setTodos(nextTodos)
  }

  // 切換todo項目的completed屬性
  const handleToggleCompleted = (id) => {
    const nextTodos = todos.map((v, i) => {
      // 這裡判斷id值是否等於傳入id
      if (v.id === id) {
        // 這裡切換todo項目的completed屬性
        return { ...v, completed: !v.completed }
      } else {
        return v
      }
    })

    // 設定到狀態
    setTodos(nextTodos)
  }

  // 處理不同類型的呈現
  const getTodosByFilterType = () => {
    if (filterType === '已完成') {
      return todos.filter((v) => v.completed)
    }
    if (filterType === '進行中') {
      return todos.filter((v) => !v.completed)
    }
    return todos
  }

  return (
    <>
      <h1>待辨事項</h1>
      <hr />
      {/* 完全(雙向)綁定到狀態的表單元件，稱為controlled(可控的/受控的) */}
      <input
        type="text"
        // value屬性要對應到某個狀態
        value={inputText}
        // onChange事件要對應到value對應狀態的更動情況
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
          // 加入todo
          handleAdd(inputText)
        }}
      >
        加入
      </button>
      <hr />
      <ul>
        {getTodosByFilterType().map((todo) => {
          return (
            <li key={todo.id}>
              <input
                type="checkbox"
                // 核取方塊的呈現是對應checked屬性(布林值)
                checked={todo.completed}
                // onChange事件要對應到value對應狀態的更動情況
                onChange={() => {
                  handleToggleCompleted(todo.id)
                }}
              />
              <span
                // 利用狀態改變來切換不同的樣式
                className={todo.completed ? 'completed' : 'active'}
                // 也可以使用style屬性來切換樣式，適合只有一點點樣式使用
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
      <div>
        {filterOptions.map((v, i) => {
          return (
            <button
              key={i}
              onClick={() => {
                setFilterType(v)
              }}
            >
              {v}
            </button>
          )
        })}
      </div>
      {/* 這裡示範使用styled-jsx來套用本頁的樣式 */}
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
