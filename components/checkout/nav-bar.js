import styles from './cart.module.css'
import { FaShoppingCart } from 'react-icons/fa'
import Link from 'next/link'
import { useCart } from '@/hooks/use-cart'

export default function Navbar() {
  const { totalQty } = useCart()

  return (
    <>
      <div className={styles['navbar']}>
        <div className={styles['logo']}>網站Logo</div>
        <div className={styles['header']}>
          <h2>購物車範例</h2>
        </div>
        <div>
          <Link href="/cs-1006/checkout/cart">購物車</Link>
          <br />
          <Link href="/cs-1006/checkout/product">商品列表</Link>
        </div>
        <div className={styles['badge']}>
          <div className={styles['button']}>
            <FaShoppingCart />
            <span className={styles['button__badge']}>{totalQty}</span>
          </div>
        </div>
      </div>
    </>
  )
}
