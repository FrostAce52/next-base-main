import React, { useState, useEffect } from 'react'
import Star from '@/components/star'

export default function StarTest(props) {
  return (
    <>
      <h1>星星評分元件測試頁</h1>
      <hr />
      <h2>預設屬性(對照組)</h2>
      <Star />
      <hr />
      <h2>測試組</h2>
      <Star />
      <Star />
    </>
  )
}
