import React, { useState, useEffect } from 'react'
import AddForm from '@/components/todo-app/add-form'
import List from '@/components/todo-app/list'
import FilterBar from '@/components/todo-app/filter-bar'

export default function TodoApp() {
  // 宣告待辨事項使用的物件陣列狀態
  // 擴充completed屬性(布林值)，代表是否已完成(已完成=true)
  const [todos, setTodos] = useState([
    { id: 1, text: '買牛奶', completed: true },
    { id: 2, text: '學react', completed: false },
  ])

  // 宣告過濾類型狀態('所有', '進行中', '已完成')
  const [filterType, setFilterType] = useState('所有')

  // 新增todo
  const handleAdd = (text) => {
    // 如果文字不是空白時再作新增
    if (text) {
      // 寫出要新增的物件值(這裡記得在新增時，也要加上預設的`completed: false`屬性)
      const newTodo = { id: Date.now(), text, completed: false }
      // 設定到狀態
      setTodos([newTodo, ...todos])
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
      {/* 新增todo的文字輸入框子元件 */}
      <AddForm handleAdd={handleAdd} />
      <hr />
      {/* 待辨事項列表 */}
      <List
        todos={getTodosByFilterType()}
        handleRemove={handleRemove}
        handleToggleCompleted={handleToggleCompleted}
      />
      {/* 過濾已完成、進行中的按鈕群組列 */}
      <FilterBar filterType={filterType} setFilterType={setFilterType} />
    </>
  )
}
