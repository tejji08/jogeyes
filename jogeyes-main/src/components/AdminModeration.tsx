"use client"

import * as React from 'react';

export default function AdminModeration() {
  const [token, setToken] = React.useState<string | null>(typeof window !== 'undefined' ? localStorage.getItem('admin_token') : null);
  const [validated, setValidated] = React.useState<boolean | null>(null);
  const [stats, setStats] = React.useState<{ total: number; top: Array<[string, number]> } | null>(null);
  const [comments, setComments] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (token) fetchAll();
    // fetch analytics for dashboard regardless (non-authenticated)
    fetchStats();
  }, [token]);

  async function fetchAll() {
    setLoading(true);
    try {
      const res = await fetch('/api/comments/all');
      const data = await res.json();
      setComments(Array.isArray(data) ? data : []);
    } catch (e) {
      setError('Failed to load');
    } finally {
      setLoading(false);
    }
  }

  async function fetchStats() {
    try {
      const res = await fetch('/api/analytics/stats');
      if (!res.ok) return;
      const j = await res.json();
      setStats({ total: j.total || 0, top: j.top || [], perDay: j.perDay || [] });
    } catch (e) {
      // ignore
    }
  }

  function saveToken(t: string) {
    localStorage.setItem('admin_token', t);
    setToken(t);
    setValidated(null);
  }

  async function validateToken() {
    if (!token) return alert('Enter token first');
    try {
      const res = await fetch('/api/admin/validate', { headers: { 'x-admin-token': token } });
      if (res.ok) {
        setValidated(true);
        fetchAll();
      } else {
        setValidated(false);
        alert('Token invalid');
      }
    } catch (e) {
      setValidated(false);
      alert('Validation failed');
    }
  }

  async function del(id: string) {
    if (!token) return alert('Provide token first');
    if (!confirm('Delete comment?')) return;
    try {
      const res = await fetch(`/api/comments/moderate?id=${encodeURIComponent(id)}`, { method: 'DELETE', headers: { 'x-admin-token': token } });
      if (!res.ok) throw new Error('failed');
      setComments((s) => s.filter((c) => c.id !== id));
    } catch (e) {
      alert('Delete failed');
    }
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Admin Moderation</h2>
      <div className="mb-4 flex gap-2 items-center">
        <input placeholder="admin token" className="border px-2 py-1 rounded" defaultValue={token ?? ''} onBlur={(e) => saveToken(e.target.value)} />
        <button onClick={() => validateToken()} className="px-3 py-1 rounded bg-wood-accent text-wood-dark">Validate</button>
        <button onClick={() => fetchAll()} className="px-3 py-1 rounded bg-wood-accent text-wood-dark">Load comments</button>
        <div className="ml-2">
          {validated === true ? <span className="text-sm text-green-500">Validated</span> : validated === false ? <span className="text-sm text-red-500">Invalid</span> : <span className="text-sm text-muted-foreground">Not checked</span>}
        </div>
      </div>

      {loading ? <div>Loading…</div> : (
        <div className="space-y-3">
          {comments.map((c) => (
            <div key={c.id} className="p-3 border rounded bg-card/60 flex justify-between">
              <div>
                <div className="font-medium">{c.name} <span className="text-sm text-muted-foreground">{new Date(c.createdAt).toLocaleString?.()}</span></div>
                <div className="mt-1">{c.text}</div>
              </div>
              <div className="flex flex-col gap-2">
                <button onClick={() => del(c.id)} className="px-2 py-1 rounded bg-red-500 text-white">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Analytics quick view */}
      <div className="mt-6 p-4 border rounded bg-card/60">
        <h3 className="text-lg font-semibold mb-2">Site analytics (simple)</h3>
        {stats ? (
          <div>
            <div className="mb-2">Total visits recorded: <strong>{stats.total}</strong></div>
            <div className="mb-4">
              {/* Small sparkline for last 14 days */}
              {stats.perDay && stats.perDay.length > 0 ? (
                <svg viewBox="0 0 140 30" className="w-full h-8">
                  {(() => {
                    const vals = stats.perDay.map((d: any) => d.count);
                    const max = Math.max(1, ...vals);
                    const stepX = 140 / Math.max(1, vals.length - 1);
                    const points = vals.map((v: number, i: number) => `${i * stepX},${30 - Math.round((v / max) * 28)}`).join(' ');
                    return <polyline key="spark" fill="none" stroke="#8b5cf6" strokeWidth={2} points={points} />;
                  })()}
                </svg>
              ) : (
                <div className="text-sm text-muted-foreground">No per-day data</div>
              )}
            </div>

            <div className="space-y-2">
              {stats.top.map(([p, n], i) => (
                <div key={p} className="flex items-center gap-3">
                  <div className="w-40 text-sm truncate">{p}</div>
                  <div className="flex-1 bg-gray-200 h-3 rounded overflow-hidden">
                    <div style={{ width: Math.max(6, Math.round((n / Math.max(1, stats.top[0]?.[1] || 1)) * 100)) + '%' }} className="h-3 bg-wood-accent" />
                  </div>
                  <div className="w-12 text-right text-sm">{n}</div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div>Loading analytics…</div>
        )}
      </div>

      {error && <div className="text-red-500 mt-3">{error}</div>}
    </div>
  );
}
