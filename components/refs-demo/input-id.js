export default function InputId() {
  return (
    <>
      <h2>input-text使用id</h2>
      <input type="text" id="my-name" />
      <button
        onClick={() => {
          document.querySelector('#my-name').focus()
        }}
      >
        聚焦(focus)
      </button>
      <button
        onClick={() => {
          document.querySelector('#my-name').blur()
        }}
      >
        模糊(blur)
      </button>
      <button
        onClick={() => {
          alert(document.querySelector('#my-name').value)
        }}
      >
        獲得值
      </button>
      <button
        onClick={() => {
          document.querySelector('#my-name').value = 'abc'
        }}
      >
        設定值(abc)
      </button>
    </>
  )
}
