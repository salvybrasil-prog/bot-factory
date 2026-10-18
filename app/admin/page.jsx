'use client'
import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  
  const [tenantName, setTenantName] = useState('')
  const [tenantSlug, setTenantSlug] = useState('')
  const [tenants, setTenants] = useState([])
  const [loading, setLoading] = useState(false)
  const [dbStatus, setDbStatus] = useState('Verificando...')

  useEffect(() => {
    async function checkSupabase() {
      try {
        const { data, error } = await supabase.from('tenants').select('*').limit(1)
        if (error) {
          setDbStatus('⚠️ Conectado (Falta tabla tenants)')
        } else {
          setDbStatus('✅ Conectado a Supabase')
          setTenants(data || [])
        }
      } catch (err) {
        setDbStatus('❌ Error de conexión')
      }
    }
    checkSupabase()
  }, [])

  const handleLogin = (e) => {
    e.preventDefault()
    if (password.trim() !== '') {
      setIsAuthenticated(true)
      setError('')
    } else {
      setError('Ingresa la contraseña maestra.')
    }
  }

  const handleCreateTenant = async (e) => {
    e.preventDefault()
    if (!tenantName || !tenantSlug) return alert('Completa los campos')
    
    setLoading(true)
    const { data, error } = await supabase
      .from('tenants')
      .insert([{ name: tenantName, slug: tenantSlug }])
      .select()

    if (error) {
      alert('Error: ' + error.message)
    } else {
      alert('¡Inquilino creado con éxito!')
      setTenants([...tenants, ...(data || [])])
      setTenantName('')
      setTenantSlug('')
    }
    setLoading(false)
  }

  if (!isAuthenticated) {
    return (
      <div style={{ maxWidth: 450, margin: "80px auto", padding: 30, fontFamily: "sans-serif", background: "#111", color: "#fff", borderRadius: 12, border: "1px solid #333" }}>
        <h2>👑 Acceso Maestro - Bot Factory</h2>
        <p style={{ color: "#aaa", fontSize: "14px" }}>Introduce tu contraseña maestra para administrar el sistema.</p>
        <form onSubmit={handleLogin}>
          <input 
            type="password" 
            placeholder="Contraseña Maestra" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: "100%", padding: 12, marginTop: 15, borderRadius: 6, border: "1px solid #444", background: "#222", color: "#fff", boxSizing: "border-box" }}
          />
          {error && <p style={{ color: "#ff5252", fontSize: "13px", marginTop: "8px" }}>{error}</p>}
          <button 
            type="submit"
            style={{ width: "100%", marginTop: 20, padding: 12, background: "#25D366", color: "#fff", border: "none", borderRadius: 6, fontWeight: "bold", cursor: "pointer" }}
          >
            Entrar al Sistema
          </button>
        </form>
      </div>
    )
  }

  return (
    <div style={{ maxWidth: 800, margin: "40px auto", padding: 30, fontFamily: "sans-serif", background: "#111", color: "#fff", borderRadius: 12 }}>
      <h2>👑 Panel de Administración Maestro</h2>
      <p style={{ color: "#25D366", fontWeight: "bold" }}>{dbStatus}</p>
      
      <div style={{ background: "#1a1a1a", padding: 20, borderRadius: 8, marginTop: 20, border: "1px solid #333" }}>
        <h3>🤖 Registrar Nuevo Bot / Inquilino</h3>
        <form onSubmit={handleCreateTenant} style={{ display: "flex", gap: "10px", marginTop: "15px", flexWrap: "wrap" }}>
          <input 
            type="text" 
            placeholder="Nombre de la Tienda" 
            value={tenantName}
            onChange={(e) => setTenantName(e.target.value)}
            style={{ flex: 1, padding: 10, borderRadius: 6, border: "1px solid #444", background: "#222", color: "#fff", minWidth: "200px" }}
          />
          <input 
            type="text" 
            placeholder="Slug (ej: kingsstore)" 
            value={tenantSlug}
            onChange={(e) => setTenantSlug(e.target.value.toLowerCase().replace(/\s+/g, '-'))}
            style={{ flex: 1, padding: 10, borderRadius: 6, border: "1px solid #444", background: "#222", color: "#fff", minWidth: "150px" }}
          />
          <button 
            type="submit"
            disabled={loading}
            style={{ padding: "10px 20px", background: "#25D366", color: "#fff", border: "none", borderRadius: 6, fontWeight: "bold", cursor: "pointer" }}
          >
            {loading ? 'Creando...' : 'Crear Bot'}
          </button>
        </form>
      </div>

      <div style={{ marginTop: 30 }}>
        <h3>📋 Inquilinos Registrados</h3>
        {tenants.length === 0 ? (
          <p style={{ color: "#888" }}>No hay bots registrados aún.</p>
        ) : (
          <ul style={{ listStyle: "none", padding: 0, marginTop: 10 }}>
            {tenants.map((t, index) => (
              <li key={index} style={{ background: "#1e1e1e", padding: "12px 15px", marginBottom: 8, borderRadius: 6, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span><b>{t.name}</b> <small style={{ color: "#888" }}>(/panel/{t.slug})</small></span>
                <a href={`/panel/${t.slug}`} target="_blank" style={{ color: "#25D366", textDecoration: "none", fontSize: "14px" }}>Ver Panel ➔</a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
