import type { Article } from "@/types";

export const ARTICLES: Article[] = [
  {
    slug: "ai-100-day01-n8n-webhook-bot",
    title: "Day 01 — 用 n8n 打造 Slack 通知自動轉發機器人",
    subtitle: "從最高頻痛點出發，90 分鐘完成第一個 AI 自動化工具",
    category: "ai-100",
    date: "2026-01-01",
    readingTime: 6,
    excerpt:
      "第一個應用從最高頻的痛點出發——每天有幾十封 Slack 訊息需要手動轉發到不同頻道。用 n8n Webhook + Slack API 花了 90 分鐘解決這個問題，記錄整個思維過程。",
    tags: ["n8n", "Slack API", "Webhook", "自動化"],
    content: `## 痛點定義

每天早上開會前，我需要把產線異常通知從 \`#manufacturing-alerts\` 頻道手動整理轉發到 \`#daily-standup\`。這個動作重複、無腦、但又不能省略——完美的自動化目標。

## 解決方案架構

整個 Flow 分三個節點：

\`\`\`
Slack Webhook Trigger
  ↓
Filter: 僅處理 ALERT_LEVEL >= 2 的訊息
  ↓
Slack API: 轉發至指定頻道 + 加上摘要標籤
\`\`\`

## 核心設定

n8n 的 Webhook 節點設定非常直觀。關鍵在 Slack 的 Event Subscriptions 需要驗證 URL，n8n 必須即時回應 \`challenge\` 參數：

\`\`\`javascript
// HTTP Response 節點設定（用於 Slack URL 驗證）
{
  "statusCode": 200,
  "body": "{{ $json.challenge }}"
}
\`\`\`

過濾邏輯使用 IF 節點的 Expression 模式：

\`\`\`javascript
// 過濾條件：訊息包含 CRITICAL 或 ERROR 關鍵字
{{ $json.event.text.includes('CRITICAL') || $json.event.text.includes('ERROR') }}
\`\`\`

## 踩坑紀錄

**坑 1：Slack Bot Token 範疇錯誤**

一開始用了 \`incoming-webhook\` scope，但接收事件需要 \`chat:write\` 和 \`channels:read\`。這個錯誤花了我 30 分鐘才發現。

**坑 2：n8n Cloud 免費版限制**

免費方案有執行次數上限。決定改用 Self-hosted n8n，部署在 Synology NAS 的 Docker 容器。

## 效益量化

- 每日節省：約 8–12 分鐘手動作業
- 錯誤率：從偶爾漏發降至 0
- 心理負擔：顯著降低（不用一直記著要轉發）

## Day 01 感想

第一天選擇小而精準的痛點是對的。90 分鐘完成一個有實際效益的工具，讓後續 99 天的動力起了一個好頭。完美是完成的敵人，先讓它跑起來。
`,
  },
  {
    slug: "rf-antenna-matching-network",
    title: "RF 天線匹配網路設計：從 Smith Chart 到 VNA 量測",
    subtitle: "15 年硬體開發的核心功課，一次系統性整理",
    category: "hardware",
    date: "2026-01-15",
    readingTime: 9,
    excerpt:
      "天線匹配是 RF 設計中讓許多人卡關的環節。這篇記錄我在 5G 模組開發過程中，從 Smith Chart 分析到實際用 VNA 調諧匹配網路的完整思路，包含幾個常見誤區。",
    tags: ["RF", "天線設計", "VNA", "Smith Chart", "5G"],
    content: `## 為什麼匹配如此關鍵

在 RF 系統中，阻抗匹配決定了有多少功率能從電路傳遞到天線。匹配不佳時，功率被反射回來，不只浪費能量，還可能損傷 PA（功率放大器）。

量化指標是 **Return Loss（回波損耗）**：

\`\`\`
Return Loss (dB) = -20 × log₁₀(|Γ|)

Γ = (ZL - Z0) / (ZL + Z0)

目標：Return Loss > 10 dB（VSWR < 2）
理想：Return Loss > 15 dB（VSWR < 1.43）
\`\`\`

## Smith Chart 的直觀用法

Smith Chart 是阻抗匹配的視覺化工具：

- **圓心** → 完美匹配（50 Ω）
- **右半圓** → 電感性，加電容補償
- **左半圓** → 電容性，加電感補償
- **串聯元件** → 沿等電阻圓弧移動
- **並聯元件** → 沿等電導圓弧移動

## 實際量測流程

### 工具準備

- Keysight E5063A VNA（100 kHz ~ 18 GHz）
- SMA 校準件組（Open / Short / Load / Thru）
- RF 探針或 SMA 轉接頭

### 校準步驟

每次量測前必須做 **SOLT 校準**，將參考面校準到待測件的連接點。跳過這步是初學者最常犯的錯誤。

### 匹配元件計算

\`\`\`python
import cmath

Z_ant = complex(35, -20)  # VNA 量測值（Ω）
Z0 = 50                    # 系統阻抗

# L-match 網路計算
Q = ((Z0 / Z_ant.real) - 1) ** 0.5
Xs = Q * Z_ant.real   # 串聯電抗
Xp = Z0 / Q           # 並聯電抗

print(f"串聯元件電抗: {Xs:.1f} Ω")
print(f"並聯元件電抗: {Xp:.1f} Ω")
# 串聯元件電抗: 21.2 Ω
# 並聯元件電抗: 35.4 Ω
\`\`\`

## 量產注意事項

- **元件容差**：0402 電感容差 ±5%，高頻設計中影響顯著
- **溫度特性**：基板 εr 隨溫度變化，需在 −40°C 到 +85°C 全範圍驗證
- **量測環境**：手持量測和固定夾具的結果差異可達 1–2 dB

## 核心心得

天線匹配沒有魔法，只有紮實的量測習慣。每一次 VNA 校準的嚴謹程度，直接決定了設計能否在量產時穩定重現。
`,
  },
  {
    slug: "ai-100-week1-reflection",
    title: "AI 100 挑戰週記：第一週的頓悟與挫折",
    subtitle: "當工程師試著每天「出貨」",
    category: "growth",
    date: "2026-01-07",
    readingTime: 5,
    excerpt:
      "第一週結束。6 個工具上線，14 個想法夭折，無數次在「這有什麼用」和「原來可以這樣」之間來回。這篇是我給自己的誠實覆盤。",
    tags: ["AI 100", "週記", "成長", "反思"],
    content: `## 完成了什麼

| Day | 工具 | 狀態 |
|-----|------|------|
| 01 | n8n Slack 轉發機器人 | ✅ 上線 |
| 02 | Dify 文件摘要 Agent | ✅ 上線 |
| 03 | BOM 元件比對系統 MVP | ✅ 上線 |
| 04 | RF 測試報告自動生成器 | ✅ 上線 |
| 05 | Claude Code 審查 Bot | ✅ 上線 |
| 06 | BMS 電量預測 Dashboard | ✅ 上線 |

6 天、6 個工具。比我預期的快，但也比我想要的粗糙。

## 最大的認知翻轉

**原本的想法**：「工程師做工具，要做就做完整的。」

這週被現實打臉——**完整的對手是「不完整但能用」**。

Day 03 的 BOM 比對系統，我花了一半時間設計「完美的資料結構」，結果讓它能用的核心邏輯只需要 30 行 Python。

現在的優先序：

1. 先讓它**能跑**
2. 再讓它**有用**
3. 才考慮讓它**好看**

## 最大的挫折

Day 04 差點放棄。

Keysight 測試儀的 API 文件是 PDF，沒有官方 SDK，要用 SCPI 指令集。花了 3 小時試圖讓 n8n 直接控制儀器，最後發現中間需要一個 Python proxy server 橋接。

沮喪的不是「花時間」，而是「花時間在錯誤方向上」。硬體與軟體的邊界摩擦，比想像中高太多。

## 第二週要改變的一件事

**更快確認「這個工具對誰有用」。**

這週 6 個工具裡，只有 Slack 機器人和 BOM 比對系統是我自己每天會用的。第二週起，每個工具的第一行說明文字要是：

> 「這個工具，讓 **[具體的人]** 省去 **[具體的事]**。」

## 寫在最後

100 天是一個荒唐的承諾。但每天強迫自己出貨一次，是我目前找到對抗「工程師完美主義」最有效的解藥。

繼續。
`,
  },
  {
    slug: "claude-code-workflow-review",
    title: "Claude Code 工作流實測：從懷疑到依賴",
    subtitle: "一個硬體工程師轉型 AI 工具重度使用者的心路歷程",
    category: "ai-100",
    date: "2026-01-20",
    readingTime: 7,
    excerpt:
      "我花了三週把 Claude Code 整合進日常開發流程。這篇記錄真實的使用情境、踩過的坑，以及那些讓我從懷疑者變成依賴者的關鍵時刻。",
    tags: ["Claude Code", "AI 工具", "開發流程", "效率"],
    content: `## 使用情境背景

硬體工程師，主力語言 Python（量測自動化）和 TypeScript（這個 portfolio 網站）。Coding 佔工作時間約 30–40%，對 AI 工具的態度：**skeptical but pragmatic**。

## 第一週：懷疑期

第一次真正震驚，是在修一個 Python 腳本的 bug。腳本約 300 行，處理 VNA 量測資料的格式轉換：

\`\`\`python
def calculate_s11_from_raw(re, im, z0=50):
    z = complex(re, im)
    gamma = (z - z0) / (z + z0)
    return 20 * math.log10(abs(gamma))  # 偶爾回傳 NaN
\`\`\`

我把整個檔案貼給 Claude Code，問「為什麼這個函式會出現 NaN」。

3 秒內得到答案：當 \`z == -z0\` 時，分母為零，\`abs(gamma)\` 變成無窮大，\`log10(inf) = NaN\`。並給出了加入防護邏輯的修正版：

\`\`\`python
def calculate_s11_from_raw(re, im, z0=50):
    z = complex(re, im)
    denom = z + z0
    if abs(denom) < 1e-10:
        return float('-inf')
    gamma = (z - z0) / denom
    magnitude = abs(gamma)
    if magnitude == 0:
        return float('-inf')
    return 20 * math.log10(magnitude)
\`\`\`

自己找這個 bug 大概要 20 分鐘。這是第一次覺得「還好用」。

## 第二週：磨合期

開始把 Claude Code 用在更複雜的任務——重構這個 portfolio 網站的路由架構。

遇到的最大問題：**context 管理**。

- 問題太大（「幫我重構整個 navbar」）→ 輸出品質下降
- 問題太小（「這行 TypeScript 報什麼錯」）→ 不如直接看 error message

摸索出來的黃金任務粒度：

\`\`\`
一個清楚的目標 + 相關的 2–3 個檔案 = 最佳輸出品質
\`\`\`

## 第三週：依賴期

現在的工作流：

1. **草稿用途** — 新功能第一版讓 Claude 打底，我來審查調整
2. **Debug 用途** — 把 error 和相關程式碼一起貼，通常一次解決
3. **文件用途** — 根據程式碼生成說明文字，我再潤飾

最顯著的效益是**心理摩擦降低**。以前面對不熟悉的 API，光研究文件就要 30 分鐘。現在把文件和問題一起給 Claude，10 分鐘內可以有可以跑的範例程式碼。

## 我不用它做什麼

- **不讓它決定架構** — 架構決策需要對 domain 的深度理解
- **不直接 commit 它的輸出** — 每一行都要過目
- **不用它解釋我完全不懂的領域** — hallucination 風險太高

## 最終評估

對一個非全職工程師來說，Claude Code 把有效 coding 時間大概提升了 30–40%。不是因為它比我更聰明，而是它把「搜尋、試錯、查文件」這些低效的認知循環壓縮了。值得投資時間去磨合。
`,
  },
  {
    slug: "bom-automation-architecture",
    title: "BOM 自動化比對系統：架構拆解與 Claude API 整合",
    subtitle: "從 Excel 地獄到 AI 輔助選料，讓 80% 流程自動化",
    category: "hardware",
    date: "2026-02-01",
    readingTime: 8,
    excerpt:
      "每次新產品 BOM 審查就是噩夢——幾百個元件，每個都要確認 AVL、替代料、庫存。這個系統用 Python + Supabase + Claude API 把這個流程自動化了 80%。",
    tags: ["BOM", "Python", "Supabase", "Claude API", "硬體自動化"],
    content: `## 問題的規模

一份消費性電子產品 BOM 通常有 200–500 個物料號。審查一份 BOM 需要：

1. 確認每個元件是否在 AVL（核可廠商清單）
2. 找出單一來源元件（Single Source）
3. 確認各廠商的庫存與交期
4. 估算總 BOM 成本

手動完成上述 4 步：**平均 3–4 小時 / 份 BOM**。

## 系統架構

\`\`\`
Excel BOM ──→ Parser 解析層
                   │
             Supabase DB
            （元件資料庫）
                   │
       ┌───────────┼───────────┐
       ▼           ▼           ▼
  AVL 精確比對  替代料查詢  Claude API
                              （模糊推薦）
       └───────────┼───────────┘
                   ▼
             審查報告輸出
           （Excel + JSON）
\`\`\`

## 核心程式：BOM 解析與標準化

不同廠商的 BOM 格式差異極大，標準化是最麻煩的部分：

\`\`\`python
import pandas as pd
import re

class BOMParser:
    COLUMN_ALIASES = {
        "part_number": ["料號", "P/N", "Part Number", "MPN", "型號"],
        "manufacturer": ["廠商", "製造商", "Manufacturer", "Mfr"],
        "quantity":     ["用量", "數量", "Qty", "Quantity"],
        "description":  ["描述", "規格", "Description", "Spec"],
    }

    def normalize_columns(self, df: pd.DataFrame) -> pd.DataFrame:
        col_map = {}
        for standard, aliases in self.COLUMN_ALIASES.items():
            for alias in aliases:
                for col in df.columns:
                    if alias.lower() in col.lower():
                        col_map[col] = standard
                        break
        return df.rename(columns=col_map)

    def clean_part_number(self, pn: str) -> str:
        if not isinstance(pn, str):
            return ""
        return re.sub(r'[^\\w\\-]', '', pn.upper().strip())
\`\`\`

## Claude API 整合：替代料推薦

當元件無法在 AVL 精確匹配時，呼叫 Claude API 進行推薦：

\`\`\`python
import anthropic

def suggest_alternatives(part: dict, avl_context: str) -> list[dict]:
    client = anthropic.Anthropic()

    message = client.messages.create(
        model="claude-opus-4-7",
        max_tokens=1024,
        messages=[{
            "role": "user",
            "content": f"""
為以下元件尋找替代料：

原始元件：
- 型號：{part['part_number']}
- 廠商：{part['manufacturer']}
- 規格：{part['description']}

可用 AVL 摘要：
{avl_context}

請推薦最多 3 個符合規格的替代料，說明技術相容性。
以 JSON 格式回覆。
"""
        }]
    )

    return parse_json_response(message.content[0].text)
\`\`\`

## 效益量化

部署後實際使用 3 個月的數據：

| 指標 | 改善前 | 改善後 |
|------|--------|--------|
| 平均審查時間 | 3.5 小時 | 40 分鐘 |
| 錯誤率（遺漏項目） | ~5% | < 0.5% |
| Single Source 識別率 | 依賴人工記憶 | 100% 自動標記 |

**時間節省：約 83%**

## 仍在迭代的部分

- 供應商即時庫存 API 整合（目前需人工更新）
- 歷史 BOM 版本比對（追蹤元件變更歷史）
- 成本最佳化建議（在符合規格的替代料中找最低成本選項）

這個系統是 AI 100 挑戰中我願意認真把它做完整的項目，也是目前效益最高的 AI 工具。
`,
  },
];

export function getArticleBySlug(slug: string): Article | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}

export function getAdjacentArticles(slug: string) {
  const idx = ARTICLES.findIndex((a) => a.slug === slug);
  return {
    prev: idx > 0 ? ARTICLES[idx - 1] : null,
    next: idx < ARTICLES.length - 1 ? ARTICLES[idx + 1] : null,
  };
}
