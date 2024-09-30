import { useState } from 'react'
// 導入.module.css檔案
import styles from '@/styles/star.module.css'

export default function Star() {
  // 點按時的評分，一開始是0分代表沒有評分
  const [rating, setRating] = useState(0)

  return (
    <>
      <h1>星星評分範例</h1>
      <div>
        {/* 
          這裡使用簡易建立5個陣列1...N的語法，可以參考:
          https://github.com/orgs/mfee-react/discussions/50 
        */}
        {Array(5)
          .fill(1)
          .map((v, i) => {
            // 每個星星按鈕的分數，相當於索引值+1
            const score = i + 1

            return (
              <button
                key={i}
                onClick={() => {
                  // 點按後設定分數
                  setRating(score)
                }}
                className={styles.starBtn}
              >
                <span
                  // 判斷星星是否要點亮。如果這個星星的分數(score)小於等於目前的評分(rating)，則套用亮起樣式
                  className={score <= rating ? styles.on : styles.off}
                >
                  &#9733;
                </span>
              </button>
            )
          })}
      </div>
      <p>你選了{rating}分</p>
    </>
  )
}
