import React from 'react';

function Loading() {
  return (
    <div className="w-40 h-40 relative">
      <style>{`
        @keyframes l1 {
          12.5% { border-radius: 37% 63% 70% 30% / 30% 62% 38% 70%; }
          25% { border-radius: 84% 16% 15% 85% / 55% 79% 21% 45%; }
          37.5% { border-radius: 73% 27% 74% 26% / 64% 32% 68% 36%; }
          50% { border-radius: 73% 27% 18% 82% / 52% 32% 68% 48%; }
          62.5% { border-radius: 33% 67% 18% 82% / 52% 75% 25% 48%; }
          75% { border-radius: 12% 88% 69% 31% / 10% 66% 34% 90%; }
          87.5% { border-radius: 50% 50% 70% 30% / 52% 62% 38% 48%; }
        }
      `}</style>
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="min-h-12 min-w-12 rounded-full  bg-orange-700 dark:bg-orange-400 animate-spin-slow"
          style={{
            clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
            animation: 'l1 2s infinite cubic-bezier(0.3, 1, 0, 1)',
          }}
        ></div>
      </div>
    </div>
  );
}

export default Loading;
