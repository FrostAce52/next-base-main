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
          // 2. 時間日期物件轉整數。`+new Date()`或`Date.now()`也可以得到同樣結果
          //const newId = Number(new Date())
          // 3. 仿照資料庫資料表自動遞增id數字值(注意，只能id是數字類型才能使用)
          // 提取目前的陣列中的id值為一個陣列，ids = [1,2,3,4]
          const ids = data.map((v) => v.id)
          // 新id為最大值+1，如果陣列中沒有資料，則從1開始計算
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
      <button onClick={() => {}}>
        4. 列表最後面，新增一個文字為yyy的物件(id不能與其它資料重覆)
      </button>
      <br />
      <button
        onClick={() => {
          //1 2
          const newData = data.filter((v, i) => {
            return v.text.includes('a')
          })
          //3
          setData(newData)
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
          const newData = data.filter((v, i) => {
            return v.text !== 'b'
          })
          //3
          setData(newData)
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
          // 第1種方式: 展開陣列(map)
          // const newData = data.map((v, i) => {
          //   // 這裡判斷id值是否等於3
          //   if (v.id === 3) {
          //     // 這裡修改text屬性(展開物件拷貝({...v})與覆蓋已有的text屬性)
          //     return { ...v, text: 'cccc' }
          //   } else {
          //     // 不等於3的話，直接回傳原本的物件
          //     return v
          //   }
          // })
          // //3
          // setData(newData)

          // 第2種方式: 深拷貝+直接更動
          // 1. 先找到要更動成員的索引值
          const foundIndex = data.findIndex((v) => v.id === 3)

          // 2. 判斷是否有找到索引
          if (foundIndex !== -1) {
            // 有找到
            // 2-1 拷貝(如果深度不足，要作深拷貝)
            const nextData = JSON.parse(JSON.stringify(data))
            // 2-2 在複本上處理
            nextData[foundIndex].text = 'cccc'
            // 2-3 設定回狀態
            setData(nextData)
          }
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
      <button
        onClick={() => {
          // 第1種: for迴圈
          // const nextData = []
          // for (let i = 0; i < data.length; i++) {
          //   // 固定把data的成員值一一加入到nextData中
          //   nextData.push(data[i])
          //   // 如果id為2，在它後面多加一個新成員
          //   if (data[i].id === 2) {
          //     nextData.push({ id: 5, text: 'bbb' })
          //   }
          // }
          // setData(nextData)
          // 第2種: splice
          // 插入公式: array.splice(insertIndex+1, 0, value)
          // 1. 先找到要插入的成員的索引值
          // const foundIndex = data.findIndex((v) => v.id === 2)
          // // 2. 判斷是否有找到索引
          // if (foundIndex !== -1) {
          //   // 有找到
          //   // 2-1 拷貝(如果深度不足，要作深拷貝)
          //   // const nextData = JSON.parse(JSON.stringify(data))
          //   const nextData = [...data]
          //   // 2-2 在複本上處理(代入公式語法)
          //   nextData.splice(foundIndex + 1, 0, { id: 5, text: 'bbb' })
          //   // 2-3 設定回狀態
          //   setData(nextData)
          // }
          //
          //第3種: slice(切割)
          // 語法(不包含結束索引): array.slice(startIndex, endIndex)
          const foundIndex = data.findIndex((v) => v.id === 2)
          // 2. 判斷是否有找到索引
          if (foundIndex !== -1) {
            // 有找到
            // 2-1 拷貝(如果深度不足，要作深拷貝)
            // 2-2 在複本上處理(代入公式語法)
            // 產生兩個新的子陣列
            const aa = data.slice(0, foundIndex + 1)
            const ab = data.slice(foundIndex + 1)
            // 合併出新陣列
            const nextData = [...aa, { id: 5, text: 'bbb' }, ...ab]
            // 2-3 設定回狀態
            setData(nextData)
          }
        }}
      >
        10. 在id為2後面插入id為5與文字為bbb的物件
      </button>
    </>
  )
}
