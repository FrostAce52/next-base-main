import React, { Fragment, useState } from 'react'
//3-1.state觀察re-render與re-paint的差異範例
export default function Counter(props) {
  const [total, setTotal] = useState(0)
  const [force, setForce] = useState(false)

  return (
    <>
      <h1>計數器</h1>

      <h1>{total}</h1>
      <button
        onClick={() => {
          setTotal(total + 1)
        }}
      >
        +1
      </button>
      <button
        onClick={() => {
          setForce(!force)
        }}
      >
        force
      </button>
    </>
  )
}
