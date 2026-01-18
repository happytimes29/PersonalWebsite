import Link from 'next/link';

// 測試用產品數據
const products = [
  {
    id: 1,
    title: '一人公司系統化指南',
    type: '電子書',
    description: '從 0 到 1 建立可持續的一人公司。涵蓋系統設計、時間管理、內容創作與變現策略。',
    price: 'NT$ 990',
    link: '#',
  },
  {
    id: 2,
    title: '深度工作實踐課程',
    type: '線上課程',
    description: '21 天培養深度專注能力。包含每日練習、工作模板與社群支持。',
    price: 'NT$ 2,990',
    link: '#',
  },
  {
    id: 3,
    title: '數位產品創造工作坊',
    type: '線上課程',
    description: '6 週從構思到發布你的第一個數位產品。真實案例、實戰指導、社群回饋。',
    price: 'NT$ 4,990',
    link: '#',
  },
];

export default function ProductsPage() {
  return (
    <div className="bg-white py-16 md:py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-bold text-black mb-6">
            Products
          </h1>
          <p className="text-xl text-black font-light max-w-2xl mx-auto">
            精心打造的數位產品，幫助你建立系統、提升專注、創造價值。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="border-2 border-black p-8 hover:bg-gray-50 transition-colors duration-200"
            >
              {/* Product Mockup Placeholder */}
              <div className="bg-gray-200 aspect-square mb-6 flex items-center justify-center">
                <div className="text-gray-400 text-sm">產品圖片</div>
              </div>

              <div className="space-y-4">
                <div className="text-sm text-gray-600">{product.type}</div>

                <h2 className="text-2xl font-bold text-black">
                  {product.title}
                </h2>

                <p className="text-base text-black leading-relaxed">
                  {product.description}
                </p>

                <div className="pt-4 border-t border-gray-200">
                  <div className="text-3xl font-bold text-black mb-4">
                    {product.price}
                  </div>

                  <Link
                    href={product.link}
                    className="block w-full bg-black text-white text-center px-6 py-3 font-medium hover:opacity-90 transition-opacity duration-200"
                  >
                    立即購買
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-lg text-black mb-6">
            想要第一時間收到新產品與優惠資訊？
          </p>
          <Link
            href="/"
            className="inline-block bg-black text-white px-8 py-4 text-lg font-medium hover:opacity-90 transition-opacity duration-200"
          >
            訂閱電子報
          </Link>
        </div>
      </div>
    </div>
  );
}
