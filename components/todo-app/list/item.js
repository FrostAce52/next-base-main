import React, { useState, useEffect } from 'react'

export default function Item({
  todo = {},
  handleRemove = () => {},
  handleToggleCompleted = () => {},
  handleToggleEditing = () => {},
}) {
  return (
    <>
      <li>
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
          // 雙點按滑鼠指標進入編輯狀態
          onDoubleClick={() => {
            handleToggleEditing(todo.id)
          }}
          // 利用狀態改變來切換不同的樣式
          className={todo.completed ? 'completed' : 'active'}
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
        <button
          onClick={() => {
            handleToggleEditing(todo.id)
          }}
        >
          編輯
        </button>
      </li>
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
