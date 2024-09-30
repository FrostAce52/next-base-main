import React, { useState, useEffect } from 'react'
import Child from './child'
export default function Parent(props) {
  return (
    <>
      <div>parent</div>
      <Child />
    </>
  )
}
