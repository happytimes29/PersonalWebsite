'use client';

import { useState } from 'react';
import { subscribeToNewsletter } from '@/app/actions/subscribe';

export default function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const result = await subscribeToNewsletter(email);

      if (result.success) {
        setStatus('success');
        setEmail('');
      } else {
        setStatus('error');
        setErrorMessage(result.error || '訂閱失敗，請稍後再試');
      }
    } catch (error) {
      console.error('訂閱錯誤:', error);
      setStatus('error');
      setErrorMessage('訂閱失敗，請稍後再試');
    }
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
            {status === 'loading' ? '發送中...' : status === 'success' ? '已訂閱!' : '訂閱'}
          </button>
        </form>

        {status === 'success' && (
          <p className="mt-4 text-black">感謝訂閱！請檢查您的信箱。</p>
        )}
        {status === 'error' && (
          <p className="mt-4 text-red-600">{errorMessage}</p>
        )}
      </div>
    </div>
  );
}
