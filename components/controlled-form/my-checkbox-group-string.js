import { useState } from 'react'

export default function MyCheckboxGroupString() {
  // 選項陣列
  const petOptions = ['狗', '貓', '倉鼠']
  // 核取方塊群組狀態 - 字串陣列
  const [myPets, setMyPets] = useState(['貓'])

  // 核取方塊事件函式
  const handleCheckboxGroup = (e) => {
    // 宣告方便接下來使用的變數名稱，對應事件觸發目標對象值
    const etv = e.target.value
    // 判斷目前是否有在myPets陣列中
    if (myPets.includes(etv)) {
      // 如果有 ==> 移出陣列
      const nextMyPets = myPets.filter((v) => v !== etv)
      setMyPets(nextMyPets)
    } else {
      // 否則 ==> 加入陣列
      const nextMyPets = [...myPets, etv]
      setMyPets(nextMyPets)
    }
  }

  // 處理全選
  const handleCheckboxGroupAll = (e) => {
    if (e.target.checked) {
      setMyPets(petOptions)
    } else {
      setMyPets([])
    }
  }

  return (
    <>
      <div title="checkbox-group-string-array">
        <h2>核取方塊群組(checkbox-group)-字串陣列</h2>
        <div>
          <input
            type="checkbox"
            // 全選是否有勾選，是依照所有myPets狀態裡記錄與所有選項的比對，當myPets中包含所有petOptions選項，就是true
            // every會測試陣列中所有成員，當每個成員都能通過測試的回調函式，才會回傳true
            checked={petOptions.every((v) => myPets.includes(v))}
            onChange={handleCheckboxGroupAll}
          />{' '}
          全選
        </div>
        {petOptions.map((v, i) => {
          return (
            <label key={i}>
              <input
                // 要設定value屬性對映v，在事件觸發時目標對象的值是這個
                value={v}
                type="checkbox"
                checked={myPets.includes(v)}
                onChange={handleCheckboxGroup}
              />
              {v}
            </label>
          )
        })}
      </div>
    </>
  )
}
