import React, { useState, useEffect } from 'react'
import Child from './child'
export default function Parent(props) {
  return (
    <>
      <h2>parent</h2>
      {/* 誰render誰 (父母render子女) */}
      {/* 父母元件利用類似HTML給定屬性值的方式，傳遞各種類型的值給子女元件 */}
      <Child
        title="今天學react"
        price={123}
        isConnected={true}
        aa={[1, 2, 3]}
        oa={{ a: 1, b: 2 }}
        // sum={(x, y) => x + y}
      />
    </>
  )
}
