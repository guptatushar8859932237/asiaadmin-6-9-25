import React, { Suspense } from "react";

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-[#0f172a]">
      <div className="relative flex items-center justify-center">
        
        {/* Outer Ring */}
        <div className="w-24 h-24 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>

        {/* Inner Ring */}
        <div className="absolute w-16 h-16 border-4 border-pink-500 border-b-transparent rounded-full animate-spin [animation-direction:reverse]"></div>

        {/* Center Glow */}
        <div className="absolute w-6 h-6 bg-cyan-400 rounded-full shadow-[0_0_20px_#22d3ee]"></div>
      </div>
    </div>
  );
};

export default Loader;