// 導入時就自動轉為JS資料格式
// `@`代表專案的根目錄路徑
import products from '@/data/Product.json'



export default function ProductTable() {
  console.log(products)

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>圖片</th>
            <th>名稱</th>
            <th>價格</th>
          </tr>
        </thead>
        <tbody>
          {/* map後展開為(v,i)，或是用複數名詞products展開為單數名詞product */}
          {products.map((product) => {
            return (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>
                  {/* 這裡的警告是建議使用next提供的Image元件，如果並沒要使用進階圖片自動最佳化功能，直接用img標記即可 */}
                  <img src={`/pics/${product.photos.split(',')[0]}`} alt="" />
                </td>
                <td>{product.name}</td>
                <td>{product.price}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <style jsx>
        {`
          table {
            font-family: Arial, Helvetica, sans-serif;
            border-collapse: collapse;
            width: 100%;
          }

          td,
          th {
            border: 1px solid #ddd;
            padding: 8px;
          }

          tr:nth-child(even) {
            background-color: #f2f2f2;
          }

          tr:hover {
            background-color: #ddd;
          }

          th {
            padding-top: 12px;
            padding-bottom: 12px;
            text-align: left;
            background-color: #04aa6d;
            color: white;
          }
        `}
      </style>
    </>
  )
}
