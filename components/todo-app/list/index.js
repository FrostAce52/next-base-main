import React, { useState, useEffect } from 'react'
import Item from './item'

export default function List({
  todos = [],
  handleRemove = () => {},
  handleToggleCompleted = () => {},
}) {
  return (
    <>
      <ul>
        {/* 先經過目前的類型過濾呈現函式再map */}
        {todos.map((todo) => {
          return (
            <Item
              key={todo.id}
              todo={todo}
              handleRemove={handleRemove}
              handleToggleCompleted={handleToggleCompleted}
            />
          )
        })}
      </ul>
    </>
  )
}
