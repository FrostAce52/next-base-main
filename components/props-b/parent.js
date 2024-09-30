import React, { useState, useEffect } from 'react'
import ChildA from './child-a'
import ChildB from './child-b'

export default function Parent(props) {
  return (
    <>
      <h2>Parent(父母)</h2>
      <ChildA />
      <ChildB />
    </>
  )
}
