import { AuthProvider } from '@/hooks/use-auth'
import { CartProvider } from '@/hooks/use-cart'

export default function MyApp({ Component, pageProps }) {
  // 使用自訂在頁面層級的版面(layout)
  const getLayout = Component.getLayout || ((page) => page)

  return (
    <AuthProvider>
      <CartProvider>{getLayout(<Component {...pageProps} />)}</CartProvider>
    </AuthProvider>
  )
}
