import { useState } from 'react'

export default function RegisterForm() {
  // 狀態為物件，屬性對應到表單的欄位名稱(目的是為了要使用"多欄位共用事件函式")
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
    // 可以用e.target來觀察或是判斷是哪個欄位觸發事件
    console.log(e.target.type, e.target.name, e.target.value)

    // ES6特性: 計算得來的物件屬性名稱(computed property name)
    // [e.target.name]: e.target.value
    // ^^^^^^^^^^^^^^^ 這裡可以代入值或表達式，計算出物件的屬性名稱(字串值)
    let nextUser = { ...user, [e.target.name]: e.target.value }

    // agree欄位要特別處理，因為它是要使用checked屬性(布林值)
    if (e.target.name === 'agree') {
      nextUser = { ...user, agree: e.target.checked }
    }

    setUser(nextUser)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    alert('送到伺服器')
  }

  return (
    <>
      <h1>註冊表單</h1>
      {/* 使用form標記時，每個欄位都要給name屬性 */}
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
            setShowPassword(e.target.checked)
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
            setShowConfirmPassword(e.target.checked)
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
            value={user.agree}
            onChange={handleFieldChange}
          />{' '}
          我同意網站會員註冊條款
        </label>
        <br />
        <span className="error">{errors.agree}</span>
        <br />
        {/* 建議在form標記中寫button要加type，類型預設是submit */}
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
