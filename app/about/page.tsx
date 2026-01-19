export default function AboutPage() {
  return (
    <div className="bg-white py-16 md:py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold text-black mb-6 text-center">
          About
        </h1>
        <p className="text-xl text-black text-center mb-16 font-light">
          關於 JK space 與這個數位實驗室。
        </p>

        <div className="space-y-8">
          <div className="prose prose-lg mx-auto">
            <p className="text-lg text-black leading-relaxed">
              歡迎來到 JK space，一個專注於系統化思維、深度工作與數位創作的實驗室。
            </p>
            <p className="text-lg text-black leading-relaxed">
              透過寫作、課程與專案，我致力於探索如何在數位時代建立有意義的工作與生活方式。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
