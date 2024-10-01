import React, { useState, useEffect } from 'react'
import Star from '@/components/star'
import { FaStar, FaHeart } from 'react-icons/fa'

export default function StarTest(props) {
  const [r1, setR1] = useState(1)
  const [r2, setR2] = useState(6)

  return (
    <>
      <h1>星星評分元件測試頁</h1>
      <hr />
      <h2>預設屬性(對照組)</h2>
      <Star />
      <hr />
      <h2>測試組</h2>
      <Star
        value={r1}
        maxCount={6}
        onRatingChange={setR1}
        fillColor="red"
        emptyColor="green"
        icon={<FaHeart />}
      />
      <p>目前評了{r1}分</p>
      <button
        onClick={() => {
          setR1(5)
        }}
      >
        設為5星
      </button>
      <hr />
      <Star
        value={r2}
        maxCount={8}
        onRatingChange={setR2}
        fillColor="#ff6600"
        emptyColor="#ccc"
        icon={<FaStar />}
      />
      <p>目前評了{r2}分</p>
    </>
  )
}
