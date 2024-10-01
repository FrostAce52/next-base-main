import React, { useState, useContext } from 'react'
import { AuthContext } from '@/context/auth'
import Link from 'next/link'

export default function Profile() {
  const { auth } = useContext(AuthContext)
  return (
    <>
      <h1>會員個人資料頁</h1>
      <hr />
      <Link href="/cs-1001/user/login">連至 登入頁(Link元件)</Link>
      <hr />
      <p>帳號:{auth.userData.username}</p>
      <p>姓名:{auth.userData.name}</p>
      <p>Email:{auth.userData.email}</p>
    </>
  )
}
