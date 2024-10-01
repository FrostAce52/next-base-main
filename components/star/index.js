import { useState, useEffect } from 'react'
// 導入.module.css檔案
import styles from './star.module.css'

export default function Star({
  value = 0, // value的意義和initRating不同，是要作完全綁定父母元件的某個狀態(受控元件)
  initRating = 0, // 初始評分(一開始點亮幾個星星)
  maxCount = 5, // 最多可評分數(幾個星星)
  onRatingChange = () => {},
  fillColor = 'gold',
  emptyColor = 'gray',
}) {
  // 點按時的評分，一開始是0分代表沒有評分
  const [rating, setRating] = useState(initRating)

  // 滑鼠游標懸停(hover)點按時的評分，一開始是0分代表沒有評分
  const [hoverRating, setHoverRating] = useState(0)

  // 如果單純只是初始化值，原本的使用是沒問題的。但要綁定到父母元件變動時，就會有不同步的問題
  // 參考: https://vhudyma-blog.eu/react-antipatterns-props-in-initial-state/
  // https://medium.com/@joabi/react-anti-patterns-props-in-initial-state-ad8e1060cd87
  // 使用useEffect作完全綁定父母元件傳入狀態
  // 監聽傳入的value屬性值的更動，一旦有更動就設定本元件的rating狀態的評分，達成完全綁定同步
  // 這種元件在官網文件中稱為controlled component(可控的/受控的 元件)
  useEffect(() => {
    setRating(value)
  }, [value])

  return (
    <>
      <div>
        {/* 
          這裡使用簡易建立5個陣列1...N的語法，可以參考:
          https://github.com/orgs/mfee-react/discussions/50 
        */}
        {Array(maxCount)
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
                  // 送分數回使用此元件的父母元件
                  onRatingChange(score)
                }}
                onMouseEnter={() => {
                  setHoverRating(score)
                }}
                onMouseLeave={() => {
                  setHoverRating(0)
                }}
                className={styles.starBtn}
              >
                <span
                  // 判斷星星是否要點亮。如果這個星星的分數(score)小於等於目前的評分(rating)，則套用亮起樣式
                  style={{
                    color:
                      score <= rating || score <= hoverRating
                        ? fillColor
                        : emptyColor,
                  }}
                  // className={
                  // score <= rating || score <= hoverRating
                  //   ? styles.on
                  //   : styles.off
                  // }
                >
                  &#9733;
                </span>
              </button>
            )
          })}
      </div>
    </>
  )
}
