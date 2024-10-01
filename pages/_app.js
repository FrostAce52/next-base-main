// import '@/styles/globals.css'
// import '@/styles/product-table.css'

import { AuthContext } from '@/context/auth'

export default function MyApp({ Component, pageProps }) {
  // 使用自訂在頁面層級的版面(layout)
  const getLayout = Component.getLayout || ((page) => page)

  //3. 最外(上)元件階層包裹提供者元件，可以提供它的值給所有後代⼦孫元件使⽤
  // 包含所有頁面元件，與頁面中的元件
  return (
    <AuthContext.Provider>
      {getLayout(<Component {...pageProps} />)}
    </AuthContext.Provider>
  )
}
