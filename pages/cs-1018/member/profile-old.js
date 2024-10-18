import Link from 'next/link'
import { useAuth } from '@/hooks/use-auth'

export default function Profile() {
  const { auth } = useAuth()

  return (
    <>
      <h1>會員個人資料頁</h1>
      <hr />
      <Link href="/cs-1018/member/login">連至 個人登入頁(Link元件)</Link>
      <hr />
      <p>帳號:{auth.userData.username}</p>
      <p>姓名:{auth.userData.name}</p>
      <p>Email:{auth.userData.email}</p>
    </>
  )
}
