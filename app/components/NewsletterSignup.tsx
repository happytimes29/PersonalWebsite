'use client';

import { useState } from 'react';

export default function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    // TODO: 整合實際的電子報服務 (如 ConvertKit, Mailchimp 等)
    setTimeout(() => {
      console.log('Subscribing email:', email);
      setStatus('success');
      setEmail('');
    }, 1000);
  };

  return (
    <div className="bg-gray-50 p-8 md:p-12">
      <div className="max-w-2xl mx-auto text-center">
        <h3 className="text-3xl md:text-4xl font-bold text-black mb-4">
          訂閱我的電子報
        </h3>
        <p className="text-lg text-black mb-8">
          每週收到關於生產力、系統思維與數位創業的深度內容。
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="輸入你的電子郵件"
            required
            disabled={status === 'loading' || status === 'success'}
            className="flex-1 px-6 py-4 text-lg border-2 border-black focus:outline-none focus:ring-2 focus:ring-black disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={status === 'loading' || status === 'success'}
            className="bg-black text-white px-8 py-4 text-lg font-medium hover:opacity-90 transition-opacity duration-200 disabled:opacity-50"
          >
            {status === 'loading' ? '訂閱中...' : status === 'success' ? '已訂閱!' : '訂閱'}
          </button>
        </form>

        {status === 'success' && (
          <p className="mt-4 text-black">感謝訂閱！請查收確認郵件。</p>
        )}
        {status === 'error' && (
          <p className="mt-4 text-black">訂閱失敗，請稍後再試。</p>
        )}
      </div>
    </div>
  );
}
