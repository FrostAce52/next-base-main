import { createContext, useContext, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
// 訊息對話盒，需要先安裝套件
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

// 1. 建立與導出它
// 傳入參數為defaultValue，是在套用context時錯誤或失敗才會得到的值。
// 可以使用有意義的預設值，或使用null(通常目的是為了除錯)
const AuthContext = createContext(null)
// 設定displayName屬性，這是搭配React DevTools使用的
AuthContext.displayName = 'AuthContext'

export function AuthProvider({ children }) {
  const router = useRouter()

  const [auth, setAuth] = useState({
    isAuth: false, // 代表會員是否已經登入的信號值
    userData: {
      id: 0,
      name: '',
      email: '',
      username: '',
    },
  })

  // 解析accessToken用的函式
  const parseJwt = (token) => {
    const base64Payload = token.split('.')[1]
    const payload = Buffer.from(base64Payload, 'base64')
    return JSON.parse(payload.toString())
  }

  // 使用MySwal取代Swal
  const MySwal = withReactContent(Swal)
  // 對話盒函式
  const notify = (
    icon = 'success', //圖示
    title, //標題
    msg, // 訊息
    btnTxt = 'OK', // 確認按鈕文字
    callback = () => {} // 按下確認後要作的事(函式)
  ) => {
    MySwal.fire({
      // position: 'top-end',  // 呈現位置
      icon: icon,
      title: title,
      text: msg,
      showConfirmButton: true,
      confirmButtonText: btnTxt,
      showCancelButton: true,
      cancelButtonText: '取消',
      // timer: 1500,   // 自動消失秒數
    }).then((result) => {
      if (result.isConfirmed) {
        callback()
      }
    })
  }

  // 註冊路由

  // 得到會員個人的資料(登入之後才可以用)
  const getMember = async () => {
    // 向伺服器作fetch
    const res = await fetch(`http://localhost:3005/api/member`, {
      credentials: 'include', // 設定cookie必要設定，如果有需要授權或認証一定要加
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'GET',
    })
    const resData = await res.json()

    if (resData.status === 'success') {
      return resData.data.member
    } else {
      console.warn(resData)
      return {}
    }
  }

  // 註冊
  const register = async (user) => {
    // 向伺服器作fetch
    const res = await fetch('http://localhost:3005/api/member', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(user),
    })

    const resData = await res.json()

    if (resData.status === 'success') {
      notify(
        'success',
        '歡迎',
        '你已註冊成功，現在要進行登入嗎？',
        '進行登入',
        () => {
          router.push('/cs-1018/member/login')
        }
      )
    } else {
      notify('error', '失敗', resData.message)
    }
  }

  // 更新資料
  const update = async (user) => {
    // 向伺服器作fetch
    const res = await fetch('http://localhost:3005/api/member', {
      credentials: 'include', // 設定cookie必要設定，如果有需要授權或認証一定要加
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'PUT', //更新時用PUT
      body: JSON.stringify(user),
    })

    const resData = await res.json()

    if (resData.status === 'success') {
      notify('success', '更新完成', '已更新完成')
    } else {
      notify('error', '失敗', resData.message)
    }
  }

  // 模擬會員登入
  const login = async (username, password) => {
    // 向伺服器作fetch
    const res = await fetch('http://localhost:3005/api/member/login', {
      credentials: 'include', // 設定cookie必要設定，如果有需要授權或認証一定要加
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({ username, password }),
    })

    const resData = await res.json()

    if (resData.status === 'success') {
      // 可以得到id和username
      const jwtData = parseJwt(resData.data.accessToken)

      console.log(jwtData)

      // 獲得會員其它個人資料(除了密碼之外)
      const member = await getMember()

      console.log(member)

      // 設定到狀態中
      setAuth({
        isAuth: true,
        userData: member,
      })

      // 歡迎訊息與詢問是否要到個人資料頁
      if (confirm('你好，是否要前往個人資料頁?')) {
        router.push('/cs-1018/member/profile')
      }
    } else {
      alert('帳號或密碼錯誤')
    }
  }

  // 模擬會員登出
  const logout = async () => {
    // 向伺服器作fetch
    const res = await fetch('http://localhost:3005/api/member/logout', {
      credentials: 'include', // 設定cookie必要設定，如果有需要授權或認証一定要加
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: '',
    })

    const resData = await res.json()

    if (resData.status === 'success') {
      alert('成功登出!')

      // 設定回原本的未登入的初始值
      setAuth({
        isAuth: false,
        userData: {
          id: 0,
          name: '',
          email: '',
          username: '',
        },
      })
    } else {
      alert('成功失敗!')
    }
  }

  // 登入路由 - 當要進入隱私路由但未登入時，會跳轉到登入路由
  const loginRoute = '/cs-1018/member/login-form'
  // 隱私(保護)路由
  const protectedRoutes = ['/cs-1018/member/profile', 'dashboard/order']
  // 檢查會員狀態
  const checkState = async () => {
    try {
      const url = 'http://localhost:3005/api/member'
      const res = await fetch(url, {
        credentials: 'include', // 設定cookie或是存取隱私資料時要加這個參數
        method: 'GET',
      })

      const resData = await res.json()
      console.log(resData)

      if (resData.status === 'success') {
        const member = resData.data.member
        // 設定全域的AuthContext(useAuth勾子)
        const nextAuth = {
          isAuth: true,
          userData: {
            id: member.id,
            username: member.username,
          },
        }
        setAuth(nextAuth)
      } else {
        // 作隱私路由跳轉
        if (protectedRoutes.includes(router.pathname)) {
          // 減緩跳轉時間
          setTimeout(() => {
            alert('無進入權限，請先登入!')
            router.push(loginRoute)
          }, 1500)
        }
      }
    } catch (e) {
      console.error(e)
    }
  }
  // didMount+didUpdate
  useEffect(() => {
    if (router.isReady && !auth.isAuth) {
      checkState()
    }
    // 加入router.pathname是為了要在伺服器檢查後
    // 如果是隱私路由+未登入，就要執行跳轉到登入頁路由的工作
    // eslint-disable-next-line
  }, [router.isReady, router.pathname])

  //3. 最外(上)元件階層包裹提供者元件，可以提供它的值給所有後代⼦孫元件使⽤，包含所有頁面元件，與頁面中的元件
  return (
    <AuthContext.Provider
      value={{ auth, getMember, login, logout, notify, register, update }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
