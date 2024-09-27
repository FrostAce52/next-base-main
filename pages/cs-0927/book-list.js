import { useState } from 'react'
import Image from 'next/image'

// 範例資料
import data from '@/data/books.json'

// 實心圖
import bookmarkIconFill from '@/assets/bookmark-fill.svg'
// 空心圖
import bookmarkIcon from '@/assets/bookmark.svg'

export default function BookList() {
  // 擴充一個可以代表是否有加入收藏的(我的最愛)布林值屬性，預設是false
  const initState = data.map((v) => {
    return { ...v, fav: false }
  })
  // 宣告狀態
  const [books, setBooks] = useState(initState)
  return (
    <>
      <h1>書籍清單</h1>
      <table>
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
              <tr key={book.isbn}>
                <td>{book.isbn}</td>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>
                  <Image src={bookmarkIcon} alt="" />
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </>
  )
}
