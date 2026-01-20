'use client';

interface App {
  id: number;
  title?: string;
  completed: boolean;
}

export default function AI100Challenge() {
  // 目前進度（可以之後從資料庫或狀態管理獲取）
  const currentProgress = 1;
  const totalApps = 100;

  // 生成 100 個應用的佔位符
  const apps: App[] = Array.from({ length: totalApps }, (_, i) => ({
    id: i + 1,
    completed: i < currentProgress,
  }));

  return (
    <section className="bg-white py-24 md:py-36 lg:py-48 px-6">
      <div className="max-w-7xl mx-auto">
        {/* 標題與進度 */}
        <div className="text-center mb-16 md:mb-24 lg:mb-32">
          <h2
            className="font-bold text-black mb-8 md:mb-12 leading-[1.2] tracking-[-0.01em]"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}
          >
            AI 100 Apps Challenge
          </h2>

          {/* 極簡進度條 */}
          <div className="max-w-md mx-auto space-y-6">
            {/* 進度數字 */}
            <div className="flex items-center justify-center gap-4">
              <span
                className="font-bold text-black tracking-[-0.02em]"
                style={{ fontSize: 'clamp(3rem, 6vw, 5rem)' }}
              >
                {String(currentProgress).padStart(3, '0')}
              </span>
              <span
                className="text-black/30 font-light"
                style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
              >
                /
              </span>
              <span
                className="font-light text-black/50 tracking-[-0.02em]"
                style={{ fontSize: 'clamp(3rem, 6vw, 5rem)' }}
              >
                100
              </span>
            </div>

            {/* 進度條 */}
            <div className="w-full h-1 bg-black/5 relative overflow-hidden">
              <div
                className="absolute top-0 left-0 h-full bg-black transition-all duration-1000 ease-out"
                style={{ width: `${(currentProgress / totalApps) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Grid 網格展示 */}
        <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-10 gap-3 md:gap-4">
          {apps.map((app) => (
            <div
              key={app.id}
              className={`
                aspect-square border transition-all duration-500
                ${
                  app.completed
                    ? 'bg-black border-black hover:opacity-80'
                    : 'bg-white border-black/10 hover:border-black/30 hover:bg-black/[0.02]'
                }
              `}
            >
              {/* 應用編號 */}
              <div className="w-full h-full flex items-center justify-center">
                <span
                  className={`
                    font-medium tracking-tight
                    ${app.completed ? 'text-white' : 'text-black/20'}
                  `}
                  style={{ fontSize: 'clamp(0.625rem, 1vw, 0.75rem)' }}
                >
                  {String(app.id).padStart(3, '0')}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* 說明文字 */}
        <div className="mt-16 md:mt-24 text-center">
          <p
            className="text-black/50 font-light leading-relaxed max-w-2xl mx-auto"
            style={{ fontSize: 'clamp(1rem, 1.8vw, 1.125rem)' }}
          >
            挑戰自己在 100 天內建立 100 個 AI 應用，探索人工智慧的無限可能。
          </p>
        </div>
      </div>
    </section>
  );
}
