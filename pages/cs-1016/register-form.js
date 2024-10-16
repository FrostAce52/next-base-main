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
  const handleFieldChange = (e) => {}

  const handleSubmit = (e) => {
    e.preventDefault()

    alert('送到伺服器')
  }

  return (
    <>
      <h1>註冊表單</h1>
      <form onSubmit={handleSubmit}>
        <label>
          姓名: <input type="text" name="name" required />
        </label>
        <br />
        <span className="error">{errors.name}</span>
        <br />
        <label>
          Email: <input type="email" name="email" required />
        </label>
        <br />
        <span className="error">{errors.email}</span>
        <br />
        <label>
          帳號: <input type="text" name="username" />
        </label>
        <br />
        <span className="error">{errors.username}</span>
        <br />
        <label>
          密碼:{' '}
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            minLength={6}
            maxLength={12}
            required
          />
        </label>
        <input type="checkbox" checked={showPassword} onChange={(e) => {}} />{' '}
        顯示密碼
        <br />
        <span className="error">{errors.password}</span>
        <br />
        <label>
          確認密碼:{' '}
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            name="confirmPassword"
          />
        </label>
        <input
          type="checkbox"
          checked={showConfirmPassword}
          onChange={(e) => {}}
        />{' '}
        顯示密碼
        <br />
        <span className="error">{errors.confirmPassword}</span>
        <br />
        <label>
          <input type="checkbox" name="agree" /> 我同意網站會員註冊條款
        </label>
        <br />
        <span className="error">{errors.agree}</span>
        <br />
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
