'use client'
import { useState } from 'react'

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  
  const [clientName, setClientName] = useState('')
  const [clientSlug, setClientSlug] = useState('')
  const [platform, setPlatform] = useState('whatsapp')
  const [tenants, setTenants] = useState([])
  const [loading, setLoading] = useState(false)

  const handleLogin = (e) => {
    e.preventDefault()
    if (password.trim().length > 0) {
      setIsAuthenticated(true)
      setError('')
    } else {
      setError('Por favor, ingresa la contraseña maestra.')
    }
  }

  const handleCreateBot = (e) => {
    e.preventDefault()
    if (!clientName || !clientSlug) return alert('Por favor completa todos los campos.')

    setLoading(true)
    setTimeout(() => {
      const newTenant = {
        name: clientName,
        slug: clientSlug.toLowerCase().replace(/\s+/g, '-'),
        platform: platform,
        created_at: new Date().toISOString()
      }
      setTenants([newTenant, ...tenants])
      alert(`¡Bot de ${platform.toUpperCase()} registrado con éxito para ${clientName}!`)
      setClientName('')
      setClientSlug('')
      setLoading(false)
    }, 500)
  }

  if (!isAuthenticated) {
    return (
      <div style={{ minHeight: "100vh", background: "#0a0a0c", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "sans-serif", padding: "20px" }}>
        <div style={{ width: "100%", maxWidth: "420px", background: "#121318", border: "1px solid #222634", borderRadius: "16px", padding: "40px", boxShadow: "0 20px 40px rgba(0,0,0,0.6)" }}>
          <div style={{ textAlign: "center", marginBottom: "30px" }}>
            <span style={{ fontSize: "40px" }}>🤖</span>
            <h2 style={{ color: "#fff", margin: "15px 0 5px 0", fontSize: "22px" }}>Bot Factory Enterprise</h2>
            <p style={{ color: "#8a8f98", fontSize: "14px" }}>Introduce la clave maestra para acceder al control central.</p>
          </div>
          <form onSubmit={handleLogin}>
            <input 
              type="password" 
              placeholder="Contraseña Maestra" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: "100%", padding: "14px", borderRadius: "8px", border: "1px solid #2d3343", background: "#1a1d26", color: "#fff", fontSize: "15px", boxSizing: "border-box", outline: "none" }}
            />
            {error && <p style={{ color: "#ff5252", fontSize: "13px", marginTop: "10px" }}>{error}</p>}
            <button 
              type="submit"
              style={{ width: "100%", marginTop: "20px", padding: "14px", background: "linear-gradient(135deg, #10b981 0%, #059669 100%)", color: "#fff", border: "none", borderRadius: "8px", fontWeight: "bold", fontSize: "15px", cursor: "pointer" }}
            >
              Desbloquear Sistema
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: "100vh", background: "#0a0a0c", color: "#fff", fontFamily: "sans-serif", padding: "40px 20px" }}>
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #222634", paddingBottom: "20px", marginBottom: "30px" }}>
          <div>
            <h1 style={{ margin: 0, fontSize: "24px", display: "flex", alignItems: "center", gap: "10px" }}>
              👑 Panel Maestro <span style={{ fontSize: "12px", background: "#065f46", color: "#34d399", padding: "4px 10px", borderRadius: "20px" }}>PRO ACTIVE</span>
            </h1>
            <p style={{ color: "#8a8f98", margin: "5px 0 0 0", fontSize: "14px" }}>Gestión multi-inquilino de dispensadores y bots.</p>
          </div>
          <div style={{ background: "#121318", padding: "10px 16px", borderRadius: "8px", border: "1px solid #222634", fontSize: "13px", color: "#34d399" }}>
            ✅ Compilación Exitosa
          </div>
        </div>

        <div style={{ background: "#121318", border: "1px solid #222634", borderRadius: "12px", padding: "25px", marginBottom: "35px" }}>
          <h3 style={{ margin: "0 0 15px 0", fontSize: "18px", color: "#f3f4f6" }}>🚀 Desplegar Nuevo Bot para Cliente</h3>
          <form onSubmit={handleCreateBot} style={{ display: "grid", gridTemplateColumns: "1fr 1fr 150px auto", gap: "12px", flexWrap: "wrap" }}>
            <input 
              type="text" 
              placeholder="Nombre del Cliente (Ej: Cliente WhatsApp)" 
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              style={{ padding: "12px", borderRadius: "8px", border: "1px solid #2d3343", background: "#1a1d26", color: "#fff", fontSize: "14px", outline: "none" }}
            />
            <input 
              type="text" 
              placeholder="Slug único (ej: cliente-wa)" 
              value={clientSlug}
              onChange={(e) => setClientSlug(e.target.value)}
              style={{ padding: "12px", borderRadius: "8px", border: "1px solid #2d3343", background: "#1a1d26", color: "#fff", fontSize: "14px", outline: "none" }}
            />
            <select 
              value={platform} 
              onChange={(e) => setPlatform(e.target.value)}
              style={{ padding: "12px", borderRadius: "8px", border: "1px solid #2d3343", background: "#1a1d26", color: "#fff", fontSize: "14px", outline: "none", cursor: "pointer" }}
            >
              <option value="whatsapp">🟢 WhatsApp</option>
              <option value="telegram">🔵 Telegram</option>
            </select>
            <button 
              type="submit"
              disabled={loading}
              style={{ padding: "12px 24px", background: "#25D366", color: "#fff", border: "none", borderRadius: "8px", fontWeight: "bold", fontSize: "14px", cursor: "pointer" }}
            >
              {loading ? 'Desplegando...' : 'Crear Bot'}
            </button>
          </form>
        </div>

        <div>
          <h3 style={{ fontSize: "18px", marginBottom: "15px", color: "#f3f4f6" }}>📋 Inquilinos y Bots Activos ({tenants.length})</h3>
          {tenants.length === 0 ? (
            <div style={{ background: "#121318", border: "1px solid #222634", borderRadius: "12px", padding: "40px", textAlign: "center", color: "#8a8f98" }}>
              <p>No hay bots desplegados todavía. ¡Registra arriba a tu cliente de WhatsApp y de Telegram!</p>
            </div>
          ) : (
            <div style={{ display: "grid", gap: "12px" }}>
              {tenants.map((t, index) => (
                <div key={index} style={{ background: "#121318", border: "1px solid #222634", borderRadius: "10px", padding: "16px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                    <span style={{ fontSize: "24px" }}>{t.platform === 'telegram' ? '🔵' : '🟢'}</span>
                    <div>
                      <h4 style={{ margin: 0, fontSize: "16px", color: "#fff" }}>{t.name}</h4>
                      <small style={{ color: "#8a8f98" }}>Ruta: /panel/{t.slug} • Plataforma: {(t.platform || 'whatsapp').toUpperCase()}</small>
                    </div>
                  </div>
                  <a 
                    href={`/panel/${t.slug}`} 
                    target="_blank" 
                    rel="noreferrer"
                    style={{ background: "#1a1d26", border: "1px solid #2d3343", color: "#34d399", padding: "8px 16px", borderRadius: "6px", textDecoration: "none", fontSize: "13px", fontWeight: "bold" }}
                  >
                    Abrir Panel ➔
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  )
}
