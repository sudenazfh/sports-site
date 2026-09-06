// Tüm backend çağrıları buradan geçer.
export async function api(path, options = {}) {
  const res = await fetch(`/api${path}`, {
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    ...options,
    body: options.body ? JSON.stringify(options.body) : undefined,
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(data.error || 'Request failed')
  return data
}

export const roleHome = (role) =>
  role === 'admin' ? '/admin/dashboard' : role === 'agent' ? '/agent/dashboard' : '/dashboard'
