import { useState } from 'react'
import Link from 'next/link'
import { useAuth } from '@/hooks/use-auth'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const { auth, login, logout } = useAuth()

  const loginForm = (
    <>
      <input
        type="text"
        value={username}
        onChange={(e) => {
          setUsername(e.target.value)
        }}
        placeholder="帳號"
      />
      <br />
      <input
        type="text"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value)
        }}
        placeholder="密碼"
      />
      <br />
      <button
        onClick={() => {
          login(username, password)
        }}
      >
        登入
      </button>
      <button
        onClick={() => {
          setUsername('herry')
          setPassword('222222')
        }}
      >
        一鍵輸入
      </button>
    </>
  )

  const logoutForm = (
    <>
      <button
        onClick={() => {
          logout()
        }}
      >
        登出
      </button>
    </>
  )

  return (
    <>
      <h1>會員登入頁</h1>
      <hr />
      <p>目前會員登入狀態: {auth?.isAuth ? '已登入' : '未登入'}</p>
      {/* Link元件一樣會渲染為a連結，但頁面不會重新刷新，讓狀態在不同頁面切換時可以繼續保持 */}
      <Link href="/cs-1018/member/profile">連至 個人資料頁(Link元件)</Link>
      <hr />
      {auth?.isAuth ? logoutForm : loginForm}
    </>
  )
}
