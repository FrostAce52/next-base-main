import { useEffect, useState } from 'react'
import { useAuth } from '@/hooks/use-auth'

export default function Profile() {
  // 從勾子的context得到註冊函式
  const { update, getMember } = useAuth()

  // 狀態為物件，屬性對應到表單的欄位名稱
  const [user, setUser] = useState({
    name: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  })

  // 錯誤訊息狀態
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  })

  // checkbox 呈現密碼用
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  // 多欄位共用事件函式
  const handleFieldChange = (e) => {
    // ES6特性: 計算得來的物件屬性名稱(computed property name)
    let nextUser = { ...user, [e.target.name]: e.target.value }

    setUser(nextUser)
  }

  const checkError = (user) => {
    // 表單檢查--START---
    // 1. 建立一個全新的錯誤訊息用物件
    const newErrors = {
      name: '',
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
    }

    // 2.開始作各欄位的表單檢查，如果有錯誤訊息就加到newErrors
    if (!user.name) {
      newErrors.name = '姓名為必填'
    }

    if (!user.email) {
      newErrors.email = 'Email為必填'
    }

    if (!user.username) {
      newErrors.username = '帳號為必填'
    }

    if (user.password !== user.confirmPassword) {
      newErrors.password = '密碼與確認密碼需要相同'
      newErrors.confirmPassword = '密碼與確認密碼需要相同'
    }

    if (user.password.length < 6) {
      newErrors.password = '密碼長度不能小於6'
    }

    if (!user.password) {
      newErrors.password = '密碼為必填'
    }

    if (!user.confirmPassword) {
      newErrors.confirmPassword = '確認密碼為必填'
    }

    // 如果newErrors中的物件值中其中有一個非空白字串，代表有錯誤發生
    const hasErrors = Object.values(newErrors).some((v) => v)

    // 表單檢查--END---
    return { newErrors, hasErrors }
  }

  const handleSubmit = async (e) => {
    // 固定的ajax/fetch的語法，會在表單submit觸發的第一行阻擋表單的預設行為
    e.preventDefault()

    // 檢查錯誤
    const { newErrors, hasErrors } = checkError(user)
    // 呈現錯誤訊息
    setErrors(newErrors)
    // 有錯誤，不送到伺服器，跳出此函式
    if (hasErrors) {
      return // 跳出此函式，在下面的程式碼不會再執行
    }

    // 送到伺服器
    // 刪除不必要的欄位(不一定需要)
    const { confirmPassword, ...newUser } = user
    // 呼叫register(useAuth勾子裡)
    await update(newUser)
  }

  // 初始化會員資料
  const initMemberData = async () => {
    const member = await getMember()
    setUser({ ...member, password: '', confirmPassword: '' })
  }

  // 本頁一開始render後就會設定到user狀態中
  useEffect(() => {
    initMemberData()
  }, [])

  return (
    <>
      <h1>註冊表單</h1>
      <form onSubmit={handleSubmit}>
        <label>
          姓名:{' '}
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleFieldChange}
          />
        </label>
        <br />
        <span className="error">{errors.name}</span>
        <br />
        <label>
          Email:{' '}
          <input
            type="text"
            name="email"
            value={user.email}
            onChange={handleFieldChange}
          />
        </label>
        <br />
        <span className="error">{errors.email}</span>
        <br />
        <label>
          帳號:{' '}
          <input
            type="text"
            name="username"
            value={user.username}
            onChange={handleFieldChange}
          />
        </label>
        <br />
        <span className="error">{errors.username}</span>
        <br />
        <label>
          密碼:{' '}
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={user.password}
            onChange={handleFieldChange}
          />
        </label>
        <input
          type="checkbox"
          checked={showPassword}
          onChange={(e) => {
            setShowPassword(!showPassword)
          }}
        />{' '}
        顯示密碼
        <br />
        <span className="error">{errors.password}</span>
        <br />
        <label>
          確認密碼:{' '}
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            name="confirmPassword"
            value={user.confirmPassword}
            onChange={handleFieldChange}
          />
        </label>
        <input
          type="checkbox"
          checked={showConfirmPassword}
          onChange={(e) => {
            setShowConfirmPassword(!showConfirmPassword)
          }}
        />{' '}
        顯示密碼
        <br />
        <span className="error">{errors.confirmPassword}</span>
        <br />
        <br />
        {/* 在表單(form)中加入button，記得寫type是哪一種，預設不寫是submit */}
        <button type="submit">儲存</button>
        <button
          type="button"
          onClick={() => {
            setUser({
              name: '',
              email: '',
              username: '',
              password: '',
              confirmPassword: '',
            })
          }}
        >
          重置
        </button>
      </form>
      <style jsx>
        {`
          .error {
            color: red;
            font-size: 12px;
            height: 16px;
          }
        `}
      </style>
    </>
  )
}
