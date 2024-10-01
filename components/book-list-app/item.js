import React, { useState, useEffect } from 'react'
import FavIcon from './fav-icon'

export default function Item({ book = {}, handleToggleFav = () => {} }) {
  return (
    <>
      <tr>
        <td>{book.isbn}</td>
        <td>{book.title}</td>
        <td>{book.author}</td>
        <td>
          <FavIcon
            isbn={book.isbn}
            fav={book.fav}
            handleToggleFav={handleToggleFav}
          />
        </td>
      </tr>
    </>
  )
}
