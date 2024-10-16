import React, { useState, useEffect } from 'react'

export default function MyRadioButtonGroup(props) {
  const petOptions = ['狗', '貓', '倉鼠']
  //
  const [pet, setPet] = useState('貓')

  return (
    <>
      <h2>選項按鈕群組(radio-button-group)</h2>
      {petOptions.map((v, i) => {
        return (
          <label key={i}>
            <input
              type="radio"
              checked={v === pet}
              value={v}
              onChange={(e) => {
                setPet(e.target.value)
              }}
            />
            {v}
          </label>
        )
      })}
    </>
  )
}