import React, { useState, useEffect } from 'react'

export default function MySelect(props) {
  const cityOptions = ['台北市', '新北市', '桃園市']
  const [city, setCity] = useState('')

  return (
    <>
      <h2>下選清單(select)</h2>
      <select
        value={city}
        onChange={(e) => {
          setCity(e.target.value)
        }}
      >
        <option value="">請選擇城市</option>
        {cityOptions.map((v, i) => {
          return (
            <option key={i} value={v}>
              {v}
            </option>
          )
        })}
      </select>
    </>
  )
}
