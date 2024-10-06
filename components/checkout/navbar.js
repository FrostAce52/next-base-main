import styles from './cart.module.css'
import { FaShoppingCart } from 'react-icons/fa'
import Link from 'next/link'
import { useCart } from '@/hooks/use-cart'
import { useRouter } from 'next/router'

export default function Navbar() {
  const { totalQty } = useCart()
  // 宣告路由器
  const router = useRouter()

  // 先建立一個選單用的物件陣列，為避免重覆套用，先寫出集中選單的陣列再map
  const menuItems = [
    { id: 1, title: '商品列表', href: '/cs-1006/checkout/product' },
    { id: 2, title: '購物車', href: '/cs-1006/checkout/cart' },
  ]

  return (
    <>
      <div className={styles['navbar']}>
        <div className={styles['logo']}>網站Logo</div>
        <div className={styles['header']}>
          <h2>購物車範例</h2>
          <div className={styles['menu']}>
            <ul>
              {menuItems.map((v, i) => {
                return (
                  <li key={v.id}>
                    <Link
                      // 驗証選單項目的網址路徑是否和路由器目前的路徑一致(套用active樣式用)
                      className={
                        router.pathname === v.href ? styles['active'] : ''
                      }
                      href={v.href}
                    >
                      {v.title}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
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
