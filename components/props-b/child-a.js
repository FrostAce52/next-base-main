import React, { useState, useEffect } from 'react'

// 使用props接收從Parent傳來的資料
export default function ChildA({ dataFromChild = '' }) {
  return (
    <>
      <h3>ChildA(子女)</h3>
      <p>來自ChildB的資料:{dataFromChild}</p>
    </>
  )
}
