import React, {useState} from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

export default function AdminPage(){
  const [key, setKey] = useState('')
  const [pastes, setPastes] = useState([])
  const [stats, setStats] = useState([])
  const [error, setError] = useState(null)

  async function fetchPastes(){
    setError(null)
    const res = await fetch('/api/admin/pastes', { headers: { 'x-admin-key': key } })
    const data = await res.json()
    if (data.error) return setError(data.error)
    setPastes(data.pastes)
  }

  async function fetchStats(){
    setError(null)
    const res = await fetch('/api/admin/stats', { headers: { 'x-admin-key': key } })
    const data = await res.json()
    if (data.error) return setError(data.error)
    const counts = data.counts || {}
    const chart = Object.keys(counts).map(d => ({ date: d, value: counts[d] }))
    setStats(chart)
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Admin Panel</h2>
      <div className="bg-neutral-800 p-6 rounded-xl space-y-4">
        <div className="grid grid-cols-3 gap-4">
          <input className="col-span-2 p-2 bg-neutral-900 rounded" placeholder="Admin Key" value={key} onChange={e=>setKey(e.target.value)} />
          <div className="flex gap-2">
            <button className="px-3 py-2 bg-rose-600 rounded" onClick={()=>{ fetchPastes(); fetchStats(); }}>Carregar</button>
          </div>
        </div>

        {error && <div className="text-rose-400">{error}</div>}

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-neutral-900 p-4 rounded">
            <h3 className="font-medium mb-2">Pastes</h3>
            <ul className="text-sm space-y-2">
              {pastes.map(p=>(<li key={p.id} className="border-b pb-2">{p.id} • {p.accessesCount} acessos • {p.createdAt}</li>))}
            </ul>
          </div>

          <div className="bg-neutral-900 p-4 rounded">
            <h3 className="font-medium mb-2">Acessos últimos 7 dias</h3>
            <div style={{height:200}}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={stats}>
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="value" stroke="#F43F5E" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
