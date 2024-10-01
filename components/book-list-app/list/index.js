import { useState } from 'react'
import Image from 'next/image'
import Item from './item'
// 範例資料
import data from '@/data/books.json'

import styles from '@/components/book-list-app/book-list.module.css'

export default function BookList() {
  // 擴充一個可以代表是否有加入收藏的(我的最愛)布林值屬性，預設是false
  const initState = data.map((v) => {
    return { ...v, fav: false }
  })

  // 宣告狀態
  const [books, setBooks] = useState(initState)

  // 切換book項目的fav屬性
  const handleToggleFav = (isbn) => {
    const nextBooks = books.map((v) => {
      // 這裡判斷isbn值是否等於傳入isbn
      if (v.isbn === isbn) {
        // 這裡切換項目的fav屬性
        return { ...v, fav: !v.fav }
      } else {
        return v
      }
    })

    // 設定到狀態
    setBooks(nextBooks)
  }

  return (
    <>
      <h1>書籍清單</h1>
      <table className={styles['my-table']}>
        <thead>
          <tr>
            <th>ISBN</th>
            <th>title</th>
            <th>author</th>
            <th>加入收藏</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => {
            return (
              <Item
                key={book.isbn}
                book={book}
                handleToggleFav={handleToggleFav}
              />
            )
          })}
        </tbody>
      </table>
    </>
  )
}
