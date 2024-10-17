import { useState, useEffect } from 'react'

export default function ImageUpload() {
  // 記錄選擇的圖檔(File物件)，初始值用null
  const [selectedImg, setSelectedImg] = useState(null)
  // 預覽圖片網址(呼叫URL.createObjectURL(file)產生的暫時網址)
  const [previewURL, setPreviewURL] = useState('')
  // 伺服器回傳訊息
  const [message, setMessage] = useState('')

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    console.log(file)

    // file有可能會是undefined，當使用者在跳出選擇圖片時按取消
    if (file) {
      setSelectedImg(file)
      // 產生預覽網址
      //setPreviewURL(URL.createObjectURL(file))
    } else {
      setSelectedImg(null)
      //setPreviewURL('')
    }
  }

  const handleImageUpload = async () => {
    const fd = new FormData()

    // 對照伺服器要接收的檔案欄位名稱
    fd.append('avatar', selectedImg)

    // 傳送到伺服器
    const res = await fetch('http://localhost:5555/upload-avatar', {
      method: 'POST',
      body: fd,
    })
    // 獲得伺服器訊息
    const data = await res.json()

    setMessage(JSON.stringify(data))
  }

  // 當選擇圖片檔案更動時，建立預覽圖(樣式三)
  useEffect(() => {
    // 沒有選擇圖片(或取消時，回復預設值)
    if (!selectedImg) {
      setPreviewURL('')
      return
    }

    // 宣告一個objectURL是為了要讓反函式呼叫時代入
    const objectURL = URL.createObjectURL(selectedImg)
    setPreviewURL(objectURL)

    // 當元件unmount時要呼叫反函式
    return () => {
      URL.revokeObjectURL(objectURL)
    }
  }, [selectedImg])

  return (
    <>
      <h1>圖片預覽與上傳</h1>
      <hr />
      <div>
        <input type="file" onChange={handleImageChange} />
      </div>
      <div>
        <button onClick={handleImageUpload}>上傳到伺服器</button>
      </div>
      <div>伺服器回傳訊息: {message}</div>
      <div>
        預覽:
        <img src={previewURL} alt="" />
      </div>
    </>
  )
}
