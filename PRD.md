# 一人公司個人網站：產品需求文件 (PRD)

## 1. 專案願景 (Project Vision)
建立一個以「內容」為核心的數位資產總部。風格效法 Dan Koe，強調極簡主義、高生產力與數位創業精神。網站應作為個人品牌的信譽中心，轉化訪客成為電子報訂閱者或數位產品客戶。

## 2. 目標受眾 (Target Audience)
* 想提升自我價值的上班族。
* 尋求數位創業、個人成長路徑的學生。

## 3. 視覺與設計規範 (Design System)
* 視覺風格：極簡主義 (Minimalism)、高對比度。
* 配色：背景 #FFFFFF (純白)、文字 #000000 (純黑)、細節輔助色 #F3F4F6 (極淺灰)。
* 字體：強調 Typography 排版。標題需有份量感，內文需極度易讀，適當的留白 (Whitespace)。
* 互動感：減少不必要的動畫，僅在按鈕或連結 Hover 時加入微小的透明度變化。

## 4. 頁面結構與功能 (Functional Requirements)

### A. 首頁 (Home Page)
- **Hero Section**：震撼的大標題（價值主張）+ 簡短副標 + 電子報訂閱入口。
- **文章預覽**：展示最近 3 篇深度文章的標題、日期與簡介。

### B. 文章系統 (Writing / Blog)
- **列表頁 (/writing)**：按日期排序的所有文章標題列表。
- **內頁 (/writing/[slug])**：
    - 純淨閱讀模式，無側邊欄干擾。
    - 每篇文章末尾必須包含一個「電子報訂閱組件」。
    - 內容需支援 Markdown 格式渲染。

### C. 產品展示 (Products)
- **列表頁 (/products)**：清單式展示電子書與線上課程。
- **產品組件**：包含產品 Mockup 佔位圖、標題、一語中的的描述、價格、以及外連購買按鈕。

### D. 全域組件 (Global Components)
- **導覽列 (Navbar)**：Home, Writing, Products。
- **頁尾 (Footer)**：簡約版權宣告、社群媒體連結 (X, Instagram)。
- **電子報訂閱組件**：Email 輸入框與提交按鈕。

## 5. 技術架構 (Tech Stack)
- 框架：Next.js (App Router)
- 樣式：Tailwind CSS
- 內容：本地 Markdown 檔案管理
- 部署目標：Vercel
