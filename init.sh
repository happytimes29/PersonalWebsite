#!/bin/bash

# 科技新資訊搜集系統 - 初始化腳本
# 此腳本用於啟動開發環境和執行基準測試

set -e  # 遇到錯誤立即停止

# 顏色定義
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}  科技新資訊搜集系統 - 初始化程序${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""

# 檢查 Node.js 版本
echo -e "${YELLOW}[1/6] 檢查 Node.js 環境...${NC}"
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ 錯誤: 未安裝 Node.js${NC}"
    exit 1
fi
NODE_VERSION=$(node -v)
echo -e "${GREEN}✓ Node.js 版本: ${NODE_VERSION}${NC}"
echo ""

# 檢查 npm 版本
echo -e "${YELLOW}[2/6] 檢查 npm 環境...${NC}"
if ! command -v npm &> /dev/null; then
    echo -e "${RED}❌ 錯誤: 未安裝 npm${NC}"
    exit 1
fi
NPM_VERSION=$(npm -v)
echo -e "${GREEN}✓ npm 版本: ${NPM_VERSION}${NC}"
echo ""

# 安裝依賴套件
echo -e "${YELLOW}[3/6] 安裝專案依賴...${NC}"
if [ ! -d "node_modules" ]; then
    echo "正在安裝依賴套件..."
    npm install
    echo -e "${GREEN}✓ 依賴套件安裝完成${NC}"
else
    echo -e "${GREEN}✓ 依賴套件已存在${NC}"
fi
echo ""

# 執行基準測試
echo -e "${YELLOW}[4/6] 執行基準測試...${NC}"

# 測試 1: ESLint 程式碼檢查
echo "執行 ESLint 程式碼檢查..."
if npm run lint; then
    echo -e "${GREEN}✓ ESLint 檢查通過${NC}"
else
    echo -e "${RED}⚠ ESLint 檢查發現問題（可繼續開發）${NC}"
fi
echo ""

# 測試 2: TypeScript 型別檢查
echo "執行 TypeScript 型別檢查..."
if npx tsc --noEmit; then
    echo -e "${GREEN}✓ TypeScript 型別檢查通過${NC}"
else
    echo -e "${RED}⚠ TypeScript 型別檢查發現問題（可繼續開發）${NC}"
fi
echo ""

# 測試 3: 建置測試
echo "執行建置測試..."
if npm run build; then
    echo -e "${GREEN}✓ 建置測試通過${NC}"
else
    echo -e "${RED}❌ 建置失敗${NC}"
    exit 1
fi
echo ""

# 顯示專案資訊
echo -e "${YELLOW}[5/6] 專案資訊${NC}"
echo "專案名稱: 科技新資訊搜集系統"
echo "專案路徑: $(pwd)"
echo "功能清單: feature_list.json (25 個功能)"
echo "進度記錄: claude-progress.txt"
echo ""

# 提供操作選項
echo -e "${YELLOW}[6/6] 準備啟動開發伺服器${NC}"
echo ""
echo -e "${BLUE}可用指令:${NC}"
echo -e "  ${GREEN}npm run dev${NC}     - 啟動開發伺服器（Turbopack 模式）"
echo -e "  ${GREEN}npm run build${NC}   - 建置生產版本"
echo -e "  ${GREEN}npm run start${NC}   - 啟動生產伺服器"
echo -e "  ${GREEN}npm run lint${NC}    - 執行程式碼檢查"
echo ""

# 詢問是否啟動開發伺服器
read -p "是否現在啟動開發伺服器? (y/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo -e "${GREEN}正在啟動開發伺服器...${NC}"
    echo -e "${BLUE}開發伺服器將在 http://localhost:3000 運行${NC}"
    echo ""
    npm run dev
else
    echo -e "${BLUE}初始化完成！使用 'npm run dev' 啟動開發伺服器${NC}"
fi
