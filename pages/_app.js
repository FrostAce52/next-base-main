import { useState } from 'react'
import { AuthContext } from '@/context/auth'

export default function MyApp({ Component, pageProps }) {
  // 使用自訂在頁面層級的版面(layout)
  const getLayout = Component.getLayout || ((page) => page)

  const [auth, setAuth] = useState({
    isAuth: false, // 代表會員是否已經登入的信號值
    userData: {
      id: 0,
      name: '',
      email: '',
      username: '',
    },
  })

  // 模擬會員登入
  const login = (username, password) => {
    if (username === 'herry' && password === '12345') {
      setAuth({
        isAuth: true,
        userData: {
          id: 1,
          name: '哈利',
          email: 'herry@test.com',
          username: 'herry',
        },
      })
    } else {
      alert('帳號或密碼錯誤')
    }
  }

  // 模擬會員登出
  const logout = () => {
    setAuth({
      isAuth: false,
      userData: {
        id: 0,
        name: '',
        email: '',
        username: '',
      },
    })
  }

  //3. 最外(上)元件階層包裹提供者元件，可以提供它的值給所有後代⼦孫元件使⽤，包含所有頁面元件，與頁面中的元件
  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {getLayout(<Component {...pageProps} />)}
    </AuthContext.Provider>
  )
}
