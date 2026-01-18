'use client';

import Link from 'next/link';

interface Product {
  id: string;
  title: string;
  description: string;
  price: string;
  link: string;
}

const products: Product[] = [
  {
    id: '1',
    title: '一人公司實戰課程',
    description: '從零開始建立你的數位事業，學習系統化思維與執行框架。',
    price: 'NT$ 4,980',
    link: '/products/solo-business-course',
  },
  {
    id: '2',
    title: '深度工作法訓練營',
    description: '21天專注力訓練計畫，掌握深度工作的核心技巧。',
    price: 'NT$ 2,980',
    link: '/products/deep-work-bootcamp',
  },
  {
    id: '3',
    title: '內容創作系統',
    description: '高效產出優質內容的完整系統與工具包。',
    price: 'NT$ 3,680',
    link: '/products/content-system',
  },
];

export default function ProductList() {
  return (
    <div className="max-w-6xl mx-auto px-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 lg:gap-12">
        {products.map((product) => (
          <Link
            key={product.id}
            href={product.link}
            className="group bg-white border border-black/10 transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]"
          >
            {/* Product Image Placeholder */}
            <div className="aspect-[4/3] bg-gray-100 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-200" />
            </div>

            {/* Product Info */}
            <div className="p-6 md:p-8">
              <h3
                className="font-bold text-black mb-3 group-hover:opacity-70 transition-opacity duration-300 leading-[1.3] tracking-[-0.01em]"
                style={{ fontSize: 'clamp(1.25rem, 2.5vw, 1.5rem)' }}
              >
                {product.title}
              </h3>

              <p
                className="text-black/70 mb-6 leading-[1.6]"
                style={{ fontSize: 'clamp(0.938rem, 1.8vw, 1.063rem)' }}
              >
                {product.description}
              </p>

              <div
                className="font-bold text-black"
                style={{ fontSize: 'clamp(1.125rem, 2.2vw, 1.375rem)' }}
              >
                {product.price}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
