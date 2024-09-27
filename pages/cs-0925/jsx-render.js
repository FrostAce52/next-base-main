import React, { useState, useEffect } from 'react'

export default function JsxRender(props) {
  return (
    <>
      <h1>JSX中各種值render(渲染)範例</h1>
      <hr />
      <h2>number(數字)</h2>
      {123}
      {1 - 1}
      {NaN}
      <h2>string(字串)</h2>
      test a b{'hello'}
      {`price=${100 - 1}`}
      <h2>boolean(布林)</h2>
      {/* 不會渲染呈現 */}
      {true}
      {false}
      <h2>null/undefined</h2>
      {/* 不會渲染呈現 */}
      {null}
      {undefined}
      <h2>array(陣列)</h2>
      {/* 類似 array.join('') */}
      {[1, 2, 3]}
      {['hello', 'a', 'b']}
      {[<p key="1">1</p>, <p key="2">1</p>]}
      <h2>object(物件)</h2>
      {/* 不能直接渲染，會造成執行錯誤，不是合法的React Child */}
      {/* 參考: https://github.com/orgs/mfee-react/discussions/91 */}
      {/* {{ a: 1, b: 2 }} */}
      <h2>function(函式)</h2>
      {/* 不會渲染呈現，會有警告，不是合法的React Child */}
      {/* 參考: https://github.com/orgs/mfee-react/discussions/91 */}
      {/* {() => {}} */}
    </>
  )
}
