import React, { useState, useEffect } from 'react'

export default function MyCheckboxGroup(props) {
  // 選項按鈕群組 選項陣列
  const petOptions = ['狗', '貓', '倉鼠']
  // 擴充成物件陣列，有一個可以代表是否有被勾選布林值屬性，預設是false
  const initState = petOptions.map((v, i) => {
    return { id: i + 1, label: v, checked: false }
  })
  // 狀態值
  const [pets, setPets] = useState(initState)

  const handleToggleChecked = (petId) => {
    const nextPets = pets.map((v, i) => {
      // 這裡判斷id值是否等於傳入petId
      if (v.id === petId) {
        // 這裡切換項目的checked屬性
        return { ...v, checked: !v.checked }
      } else {
        return v
      }
    })

    // 設定到狀態
    setPets(nextPets)
  }

  // 處理全選
  const handleCheckboxGroupAll = (e) => {
    // 強制讓所有的選項的checked屬性，和e.target.checked一致
    const nextPets = pets.map((v, i) => {
      return { ...v, checked: e.target.checked }
    })

    setPets(nextPets)
  }

  return (
    <>
      <h2>核取元件(checkbox-group)</h2>
      <input
        type="checkbox"
        // 全選是否有勾選，是依照所有pets狀態裡記錄與所有選項的比對，當pets成員中的checked屬性都是true，就是true
        // every會測試陣列中所有成員，當每個成員都能通過測試的回調函式，才會回傳true(類似AND/&&)
        checked={pets.every((v) => v.checked)}
        onChange={handleCheckboxGroupAll}
      />{' '}
      全選
      <hr />
      {pets.map((v, i) => {
        return (
          <label key={v.id}>
            <input
              type="checkbox"
              checked={v.checked}
              value={v.label}
              onChange={(e) => {
                handleToggleChecked(v.id)
              }}
            />
            {v.label}
          </label>
        )
      })}
    </>
  )
}
