import React, { useState, useEffect } from 'react'

export default function FilterBar({
  filterType = '所有',
  setFilterType = () => {},
}) {
  // 呈現過濾的選項
  const filterOptions = ['所有', '進行中', '已完成']

  return (
    <>
      <div>
        {filterOptions.map((v, i) => {
          return (
            <button
              style={{ backgroundColor: filterType === v ? 'green' : '#ccc' }}
              key={i}
              onClick={() => {
                setFilterType(v)
              }}
            >
              {v}
            </button>
          )
        })}
      </div>
    </>
  )
}
