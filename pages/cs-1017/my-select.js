import React, { useState, useEffect } from 'react'
import TWZipCode from '@/components/tw-zipcode'

export default function MySelect(props) {

  // 郵遞區號元件使用
  const [data, setData] = useState({
    country: '高雄市',
    township: '鳳山區',
    postcode: '830',
  })

  return (
    <>
      <h2>郵遞區號元件</h2>
       {/* 與本元件state相接與初始化 */}
       <TWZipCode
        initPostcode={data.postcode}
        onPostcodeChange={(country, township, postcode) => {
          setData({
            country,
            township,
            postcode,
          })
        }}
      />
    </>
  )
}
