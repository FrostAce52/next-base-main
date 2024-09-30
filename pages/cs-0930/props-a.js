import React, { useState, useEffect } from 'react'

import Parent from '@/components/props-a/parent'

export default function PropsA(props) {
  return (
    <>
      <h1>props屬性範例-a</h1>
      {/* 誰render誰 (父母render子女) */}
      {/* 父母元件利用類似HTML給定屬性值的方式，傳遞各種類型的值給子女元件 */}
      <Parent />
    </>
  )
}
