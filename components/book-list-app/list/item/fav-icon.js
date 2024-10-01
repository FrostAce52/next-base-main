import React, { useState, useEffect } from 'react'

import Image from 'next/image'

// 實心圖
import bookmarkIconFill from '@/assets/bookmark-fill.svg'
// 空心圖
import bookmarkIcon from '@/assets/bookmark.svg'

export default function FavIcon({
  isbn = '',
  fav = false,
  handleToggleFav = () => {},
}) {
  return (
    <>
      <Image
        onClick={() => {
          handleToggleFav(isbn)
        }}
        src={fav ? bookmarkIconFill : bookmarkIcon}
        alt=""
      />
    </>
  )
}
