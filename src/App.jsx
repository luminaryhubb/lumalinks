import React from "react";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white p-6">
      <h1 className="text-3xl font-bold mb-10">Luma Methods - Links</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-zinc-900 rounded-2xl p-6 shadow-lg flex flex-col items-center">
          <h2 className="text-xl mb-4">Site 1</h2>
          <a
            href="https://example.com"
            target="_blank"
            className="px-6 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition"
          >
            Acessar
          </a>
        </div>

        <div className="bg-zinc-900 rounded-2xl p-6 shadow-lg flex flex-col items-center">
          <h2 className="text-xl mb-4">Site 2</h2>
          <a
            href="https://example.org"
            target="_blank"
            className="px-6 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition"
          >
            Acessar
          </a>
        </div>

        <div className="bg-zinc-900 rounded-2xl p-6 shadow-lg flex flex-col items-center">
          <h2 className="text-xl mb-4">Site 3</h2>
          <a
            href="https://example.net"
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
