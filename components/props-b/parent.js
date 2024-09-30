import React, { useState, useEffect } from 'react'
import ChildA from './child-a'
import ChildB from './child-b'

export default function Parent(props) {
  // 宣告一組給Child B回傳資料用的狀態
  const [dataFromChild, setDataFromChild] = useState('')

  return (
    <>
      <h2>Parent(父母)</h2>
      {/* P->C: 將 pData 傳給 ChildA，建議使用屬性名稱和狀態名稱一樣 */}
      <ChildA dataFromChild={dataFromChild} />
      {/* C->P 用設定狀態的函式傳給子女元件，子女元件如果需要回傳內部資料，可以呼叫它 */}
      <ChildB setDataFromChild={setDataFromChild} />
    </>
  )
}
