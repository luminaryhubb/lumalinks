import React from "react";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white p-6">
      <h1 className="text-3xl font-bold mb-10">Luma Methods - Links</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-zinc-900 rounded-2xl p-6 shadow-lg flex flex-col items-center">
          <h2 className="text-xl mb-4">Splunk - Luma Methods</h2>
          <a
            href="https://app.splunk.gg/"
            target="_blank"
            className="px-6 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition"
          >
            Acessar
          </a>
        </div>

        <div className="bg-zinc-900 rounded-2xl p-6 shadow-lg flex flex-col items-center">
          <h2 className="text-xl mb-4">Shockfy - Luma Methods</h2>
          <a
            href="https://shockify.st/dashboard"
            target="_blank"
            className="px-6 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition"
          >
            Acessar
          </a>
        </div>

        <div className="bg-zinc-900 rounded-2xl p-6 shadow-lg flex flex-col items-center">
          <h2 className="text-xl mb-4">Immortal - Luma Methods</h2>
          <a
            href="https://immortal.st/"
            target="_blank"
            className="px-6 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition"
          >
            Acessar
          </a>
        </div>
      </div>
    </div>
  );
}
