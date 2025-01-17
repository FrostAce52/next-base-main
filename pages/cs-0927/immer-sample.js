import React, { useState, useEffect } from 'react'
import { produce } from 'immer'
import { useImmer } from 'use-immer'

export default function ImmerSample(props) {
  const [user, setUser] = useState({
    id: 1,
    name: 'Nike',
    address: {
      country: {
        city: 'Taipei City',
      },
    },
  })
  const [user2, setUser2] = useImmer({
    //此處 useState 改為 useImmer
    id: 1,
    name: 'Nike',
    address: {
      country: {
        city: 'Taipei City',
      },
    },
  })

  return (
    <>
      <h1>Immer應用範例</h1>
      <hr />
      <p>姓名: {user.name}</p>
      <p>城市: {user.address.country.city}</p>
      <button
        onClick={() => {
          const nextUser = {
            ...user,
            name: 'Iris',
          }

          setUser(nextUser)
        }}
      >
        修改姓名為Iris
      </button>
      <br />
      <button
        onClick={() => {
          const nextUser = produce(user, (draft) => {
            draft.name = 'Iris'
          })
          setUser(nextUser)
        }}
      >
        [immer]修改姓名為Iris
      </button>
      <br />
      <button
        onClick={() => {
          const nextUser = {
            ...user,
            address: {
              ...user.address,
              country: {
                ...user.address.country,
                city: 'New Taipei City',
              },
            },
          }

          setUser(nextUser)
        }}
      >
        修改城市為New Taipei City
      </button>
      <br />
      <button
        onClick={() => {
          const nextUser = JSON.parse(JSON.stringify(user))
          nextUser.address.country.city = 'New Taipei City'
          setUser(nextUser)
        }}
      >
        [深拷貝]修改城市為New Taipei City
      </button>
      <br />
      <button
        onClick={() => {
          const nextUser = produce(user, (draft) => {
            // 直接修改物件屬性(是在draft草稿狀態上)
            draft.address.country.city = 'New Taipei City'
          })
          setUser(nextUser)
        }}
      >
        [immer]修改城市為New Taipei City
      </button>
      <hr />
      <h1>use-immer版本</h1>
      <hr />
      <p>姓名: {user2.name}</p>
      <p>城市: {user2.address.country.city}</p>
      <button
        onClick={() => {
          setUser2((draft) => {
            draft.name = 'Iris'
          })
        }}
      >
        [use-immer]修改姓名為Iris
      </button>
      <br />
      <button
        onClick={() => {
          setUser2((draft) => {
            draft.address.country.city = 'New Taipei City'
          })
        }}
      >
        [immer]修改城市為New Taipei City
      </button>
    </>
  )
}
