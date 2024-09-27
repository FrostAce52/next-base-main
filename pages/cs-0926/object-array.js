import { useState } from 'react'

const sample = [
  {
    id: 1,
    text: 'a',
  },
  {
    id: 2,
    text: 'b',
  },
  {
    id: 3,
    text: 'c',
  },
  {
    id: 4,
    text: 'aa',
  },
]

export default function ObjectArray() {
  // 呈現(渲染)時會與使用者互動時進行改動，必需是state
  const [data, setData] = useState(sample)

  return (
    <>
      <h1>物件陣列(object array)狀態的各種操作</h1>
      <hr />
      <h2>資料表格</h2>
      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Text</th>
          </tr>
        </thead>
        <tbody>
          {data.map((v, i) => {
            return (
              <tr key={v.id}>
                <td>{v.id}</td>
                <td>{v.text}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <hr />
      <h2>操作</h2>
      <p>
        <strong>
          注意: 請在任一操作前先重新整理網頁 ，或是對重覆id值進行加入時的限制。
        </strong>
        有些操作是key值會對應id的關係，會產生key值重覆問題，造成不預期的結果。實務上務必要考慮key不可以重覆問題。
      </p>

      <button
        onClick={() => {
          // 先寫出要新增的物件值
          const newObj = { id: 99, text: 'xxx' }

          // 1. 從目前的狀態拷貝出一個新的變數值(陣列/物件)
          // 2. 在新的變數值(陣列/物件)上作處理
          // 3. 設定回原本的狀態中

          //1 //2
          const nextData = [newObj, ...data]

          //3
          setData(nextData)
        }}
      >
        1. 列表最前面，新增一個物件值id為99與文字為xxx的物件
      </button>
      <br />
      <button
        onClick={() => {
          const newObj = { id: 88, text: 'yyy' }

          //1 //2
          const nextData = [...data, newObj]

          //3
          setData(nextData)
        }}
      >
        2. 列表最後面，新增一個物件值id為88與文字為yyy的物件
      </button>
      <br />
      <button
        onClick={() => {
          // 1. uuid 或 nanoid 函式庫
          //const newId = self.crypto.randomUUID()
          // 2. 時間日期轉整數 `+new Date()` `Date.now()`
          //const newId = Number(new Date())
          // 3. 仿照資料庫自動遞增主鍵的方式(只有數字id才可以)
          // [1,2,3,4]
          const ids = data.map((v) => v.id)
          const newId = data.length > 0 ? Math.max(...ids) + 1 : 1

          // 先寫出要新增的物件值
          const newObj = { id: newId, text: 'xxx' }

          //1 //2
          const nextData = [newObj, ...data]

          //3
          setData(nextData)
        }}
      >
        3. 列表最前面，新增一個文字為xxx的物件(id不能與其它資料重覆)
      </button>
      <br />
      <button
        onClick={() => {
          const ids = data.map((v) => v.id)
          const newId = data.length > 0 ? Math.max(...ids) + 1 : 1
          const newObj = { id: newId, text: 'yyy' }
          //1 //2
          const nextData = [...data, newObj]

          //3
          setData(nextData)
        }}
      >
        4. 列表最後面，新增一個文字為yyy的物件(id不能與其它資料重覆)
      </button>
      <br />

      <button
        onClick={() => {
          const nextData = data.filter((v, i) => {
            return v.text.includes('a')
          })
          setData(nextData)
        }}
      >
        5. 尋找(過濾)只呈現所有文字中有包含a英文字母的資料
      </button>
      <br />

      <button
        onClick={() => {
          //1 2
          // 意思上與 "尋找(過濾)文字為b的物件資料" 剛好巔倒
          // 所以過濾的測試條件原本是 `v.text === 'b'`
          // 改為布林值倒過來的判斷為 `v.text !== 'b'`
          const nextData = data.filter((v, i) => {
            return v.text !== 'b'
          })
          setData(nextData)
        }}
      >
        6. 刪除文字為b的物件資料
      </button>
      <br />
      <button
        onClick={() => {
          // 第1種: 使用filter(推薦)
          // const newData = data.filter((v) => {
          //   return v.id !== 4
          // })
          // setData(newData)
          //
          // 第2種: splice(粘接)方法
          // 注意有副作用，會更動到呼叫它的陣列，不可以用react的狀態直接呼叫
          // 必需要先用索引值，作為傳入參數用，建議要使用時套用公式語法
          // 刪除公式: array.splice(deleteIndex, 1)
          //
          // 1. 先找到要刪除的成員的索引值
          const foundIndex = data.findIndex((v) => v.id === 4)

          // 2. 判斷是否有找到索引
          if (foundIndex !== -1) {
            // 有找到
            // 2-1 拷貝(如果深度不足，要作深拷貝)
            // const nextData = JSON.parse(JSON.stringify(data))
            const newData = [...data]
            // 2-2 在複本上處理(代入公式語法)
            newData.splice(foundIndex, 1)
            // 2-3 設定回狀態
            setData(newData)
          }
        }}
      >
        7. 刪除id為4的物件資料
      </button>
      <br />

      <button
        onClick={() => {
          //12
          // 展開陣列(map)
          const newData = data.map((v, i) => {
            // 這裡判斷id值是否等於3
            if (v.id === 3) {
              // 這裡修改text屬性(展開物件拷貝({...v})與覆蓋已有的text屬性)
              return { ...v, text: 'cccc' }
            } else {
              // 不等於3的話，直接回傳原本的物件
              return v
            }
          })
          //3
          setData(newData)
        }}
      >
        8. 取代id為3的文字為cccc
      </button>
      <br />

      <button
        onClick={() => {
          setData([])
        }}
      >
        9. 清空表格
      </button>
      <br />

      <button onClick={() => {
        
      }}>
        10. 在id為2後面插入id為5與文字為bbb的物件
      </button>
    </>
  )
}
