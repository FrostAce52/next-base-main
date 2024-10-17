import { useState } from 'react'

export default function RegisterForm() {
  // 狀態為物件，屬性對應到表單的欄位名稱
  const [user, setUser] = useState({
    name: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    agree: false, // checkbox 同意會員註冊條款
  })

  // 錯誤訊息狀態
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    agree: '', // 錯誤訊息用字串
  })

  // checkbox 呈現密碼用
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  // 多欄位共用事件函式
  const handleFieldChange = (e) => {
    // ES6特性: 計算得來的物件屬性名稱(computed property name)
    let nextUser = { ...user, [e.target.name]: e.target.value }

    if (e.target.name === 'agree') {
      nextUser = { ...user, agree: e.target.checked }
    }

    setUser(nextUser)
  }

  const handleSubmit = (e) => {
    // 固定的ajax/fetch的語法，會在表單submit觸發的第一行阻擋表單的預設行為
    e.preventDefault()

    // 表單檢查--START---
    // 1. 建立一個全新的錯誤訊息用物件
    const newErrors = {
      name: '',
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
      agree: '',
    }

    // 2.開始作各欄位的表單檢查，如果有錯誤訊息就加到newErrors
    if (!user.name) {
      newErrors.name = '姓名為必填'
    }

    if (!user.email) {
      newErrors.email = 'Email為必填'
    }

    if (!user.agree) {
      newErrors.agree = '請先同意會員註冊條款'
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

    // 3. 呈現錯誤訊息
    setErrors(newErrors)
    // 如果newErrors中的物件值中有非空白字串，代表有錯誤發生
    const hasErrors = Object.values(newErrors).some((v) => v)
    // 有錯誤，不送到伺服器，跳出此函式
    if (hasErrors) {
      return // 跳出此函式，在下面的程式碼不會再執行
    }
    // 表單檢查--END---

    // 送到伺服器，緩衝一些，讓錯誤訊息完全更新後再送到伺服器
    setTimeout(() => {
      alert('送到伺服器')
    }, 0)
  }

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
        <label>
          <input
            type="checkbox"
            name="agree"
            checked={user.agree}
            onChange={handleFieldChange}
          />{' '}
          我同意網站會員註冊條款
        </label>
        <br />
        <span className="error">{errors.agree}</span>
        <br />
        {/* 在表單(form)中加入button，記得寫type是哪一種，預設不寫是submit */}
        <button type="submit">註冊</button>
        <button type="button" onClick={() => {}}>
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
