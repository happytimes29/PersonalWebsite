import { notFound } from 'next/navigation';
import NewsletterSignup from '@/app/components/NewsletterSignup';

// 測試用文章數據
const articles = {
  'build-one-person-business': {
    title: '如何用系統化思維建立你的一人公司',
    date: '2024-01-15',
    content: `
# 如何用系統化思維建立你的一人公司

多數人創業失敗的原因不是缺乏技能，而是缺乏系統。

## 為什麼系統比技能更重要

許多創業者陷入「忙碌陷阱」——每天工作 12 小時，卻沒有真正的進展。問題不在於努力不夠，而在於缺乏可重複、可擴展的系統。

## 建立系統的三個關鍵步驟

### 1. 定義你的核心流程

識別你業務中最重要的 3-5 個流程。這些流程應該是可重複的，並且直接影響你的收入。

### 2. 文檔化每個步驟

將每個流程分解成具體的步驟。不要假設任何事情是「顯而易見」的。

### 3. 持續優化與自動化

一旦你有了文檔化的流程，開始尋找可以自動化或委派的部分。

## 實踐建議

從小處著手。不要試圖一次性系統化整個業務。選擇一個你最常重複的任務，為它建立系統。

記住：系統不是限制創造力，而是釋放你的時間去做更有創意的工作。
    `,
  },
  'focus-deep-work': {
    title: '專注力是新時代的超能力：深度工作法實踐指南',
    date: '2024-01-08',
    content: `
# 專注力是新時代的超能力：深度工作法實踐指南

在注意力經濟時代，能夠持續專注的人將獲得巨大優勢。

## 什麼是深度工作

深度工作是在無干擾的狀態下進行專注的職業活動，將你的認知能力推向極限。這種努力能創造新價值，提升技能，且難以複製。

## 為什麼深度工作如此稀缺

現代工作環境充滿干擾：
- 無止境的電子郵件
- 社交媒體通知
- 開放式辦公室
- 「always-on」的工作文化

## 我的深度工作實踐

### 早晨的黃金時段

每天早上 6-10 點是我的深度工作時段。手機飛航模式，關閉所有通知。

### 單一任務模式

一次只專注一個項目。多工是效率殺手。

### 90 分鐘工作區塊

將工作分成 90 分鐘的區塊，中間休息 15-20 分鐘。

## 開始行動

本週挑戰：選擇一天，在早晨預留 2 小時不被打斷的時間。關閉所有通知，專注完成一個重要任務。

觀察你能完成多少工作，以及這種專注的感覺。
    `,
  },
  'digital-freedom': {
    title: '數位自由不是退休，而是選擇權',
    date: '2024-01-01',
    content: `
# 數位自由不是退休，而是選擇權

真正的自由來自於建立不被單一收入來源綁架的能力。

## 重新定義數位自由

數位自由不是：
- 躺在沙灘上不工作
- 完全不需要工作
- 逃避現實

數位自由是：
- 選擇何時工作
- 選擇與誰合作
- 選擇做什麼工作

## 建立數位自由的基礎

### 1. 建立技能資產

投資可遷移、高價值的技能。寫作、行銷、程式設計、設計——這些技能在數位經濟中永遠有需求。

### 2. 創造數位產品

從服務轉向產品。你的時間有限，但產品可以無限複製。

### 3. 建立受眾

在社交媒體上分享你的學習和見解。受眾是你最有價值的資產。

## 從今天開始

你不需要辭職去追求數位自由。從副業開始：

1. 每天寫作 30 分鐘
2. 在社交媒體上分享你的見解
3. 建立一個小型數位產品

一年後，你會驚訝於你的進步。
    `,
  },
};

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return Object.keys(articles).map((slug) => ({
    slug,
  }));
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = articles[slug as keyof typeof articles];

  if (!article) {
    notFound();
  }

  return (
    <div className="bg-white py-16 md:py-24 px-6">
      <article className="max-w-3xl mx-auto">
        <header className="mb-12">
          <time className="text-sm text-gray-600 mb-4 block">
            {article.date}
          </time>
          <h1 className="text-4xl md:text-6xl font-bold text-black leading-tight">
            {article.title}
          </h1>
        </header>

        <div className="prose prose-lg max-w-none">
          {article.content.split('\n').map((line, index) => {
            if (line.startsWith('# ')) {
              return (
                <h1 key={index} className="text-4xl font-bold text-black mt-12 mb-6">
                  {line.substring(2)}
                </h1>
              );
            }
            if (line.startsWith('## ')) {
              return (
                <h2 key={index} className="text-3xl font-bold text-black mt-10 mb-4">
                  {line.substring(3)}
                </h2>
              );
            }
            if (line.startsWith('### ')) {
              return (
                <h3 key={index} className="text-2xl font-bold text-black mt-8 mb-3">
                  {line.substring(4)}
                </h3>
              );
            }
            if (line.startsWith('- ')) {
              return (
                <li key={index} className="text-lg text-black leading-relaxed ml-6">
                  {line.substring(2)}
                </li>
              );
            }
            if (line.trim() === '') {
              return <br key={index} />;
            }
            return (
              <p key={index} className="text-lg text-black leading-relaxed mb-6">
                {line}
              </p>
            );
          })}
        </div>
      </article>

      <div className="mt-16">
        <NewsletterSignup />
      </div>
    </div>
  );
}
