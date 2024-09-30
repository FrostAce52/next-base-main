import React, { useState, useEffect } from 'react'
import Item from './item'
import EditForm from './edit-form'

export default function List({
  todos = [],
  handleRemove = () => {},
  handleToggleCompleted = () => {},
  handleToggleEditing = () => {},
  handleUpdateText = () => {},
}) {
  return (
    <>
      <ul>
        {/* 先經過目前的類型過濾呈現函式再map */}
        {todos.map((todo) => {
          return todo.editing ? (
            <EditForm
              key={todo.id}
              todo={todo}
              handleUpdateText={handleUpdateText}
            />
          ) : (
            <Item
              key={todo.id}
              todo={todo}
              handleRemove={handleRemove}
              handleToggleCompleted={handleToggleCompleted}
              handleToggleEditing={handleToggleEditing}
            />
          )
        })}
      </ul>
    </>
  )
}
