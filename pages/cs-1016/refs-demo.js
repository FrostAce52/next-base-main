import React, { useState, useEffect } from 'react'
import InputId from '@/components/refs-demo/input-id'
import InputRefs from '@/components/refs-demo/input-refs'

export default function RefsDemo(props) {
  return (
    <>
      <h1>refs使用範例</h1>
      <h4>
        使用 id 的元件無法重複使用，只會執行第一組。使用 useRef
        則可以透過current屬性，存取當前DOM元素狀態。
      </h4>
      {/* <InputId />
      <InputId /> */}
      <InputRefs />
      <InputRefs />
    </>
  )
}
