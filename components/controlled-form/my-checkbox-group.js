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

  return (
    <>
      <h2>核取元件(checkbox-group)</h2>
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
