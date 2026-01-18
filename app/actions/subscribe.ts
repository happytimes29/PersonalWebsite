'use server';

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function subscribeToNewsletter(email: string) {
  try {
    // 驗證 email 格式
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return { success: false, error: '請輸入有效的電子郵件地址' };
    }

    // 檢查是否配置了必要的環境變數
    if (!process.env.RESEND_API_KEY) {
      console.error('缺少 RESEND_API_KEY 環境變數');
      return { success: false, error: '系統配置錯誤，請稍後再試' };
    }

    if (!process.env.OWNER_EMAIL) {
      console.error('缺少 OWNER_EMAIL 環境變數');
      return { success: false, error: '系統配置錯誤，請稍後再試' };
    }

    if (!process.env.FROM_EMAIL) {
      console.error('缺少 FROM_EMAIL 環境變數');
      return { success: false, error: '系統配置錯誤，請稍後再試' };
    }

    // 發送感謝訂閱郵件給用戶
    const subscriberEmail = await resend.emails.send({
      from: process.env.FROM_EMAIL,
      to: email,
      subject: '感謝訂閱！',
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #000; font-size: 28px; margin-bottom: 20px;">感謝您的訂閱！</h1>
          <p style="color: #333; font-size: 16px; line-height: 1.6; margin-bottom: 15px;">
            您好，
          </p>
          <p style="color: #333; font-size: 16px; line-height: 1.6; margin-bottom: 15px;">
            非常感謝您訂閱我的電子報！每週我會分享關於生產力、系統思維與數位創業的深度內容。
          </p>
          <p style="color: #333; font-size: 16px; line-height: 1.6; margin-bottom: 15px;">
            期待與您在信箱中見面！
          </p>
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
            <p style="color: #666; font-size: 14px;">
              如有任何問題，歡迎隨時回信聯繫。
            </p>
          </div>
        </div>
      `,
    });

    // 發送通知郵件給網站擁有者
    const ownerNotification = await resend.emails.send({
      from: process.env.FROM_EMAIL,
      to: process.env.OWNER_EMAIL,
      subject: '🎉 新訂閱通知',
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #000; font-size: 24px; margin-bottom: 20px;">新訂閱通知</h1>
          <p style="color: #333; font-size: 16px; line-height: 1.6; margin-bottom: 15px;">
            有新用戶訂閱了您的電子報！
          </p>
          <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <p style="color: #333; font-size: 16px; margin: 0;">
              <strong>訂閱者郵箱：</strong> ${email}
            </p>
          </div>
          <p style="color: #666; font-size: 14px; margin-top: 20px;">
            訂閱時間：${new Date().toLocaleString('zh-TW', { timeZone: 'Asia/Taipei' })}
          </p>
        </div>
      `,
    });

    // 檢查是否有郵件發送失敗
    if (subscriberEmail.error) {
      console.error('發送用戶郵件失敗:', subscriberEmail.error);
      return { success: false, error: '發送確認郵件失敗，請稍後再試' };
    }

    if (ownerNotification.error) {
      console.error('發送通知郵件失敗:', ownerNotification.error);
      // 即使通知郵件失敗，用戶訂閱仍然成功
    }

    return { success: true };
  } catch (error) {
    console.error('訂閱處理錯誤:', error);
    return {
      success: false,
      error: '訂閱失敗，請稍後再試'
    };
  }
}
