'use client'
import { useState } from 'react'
import { useParams } from 'next/navigation'

export default function FullyAutomatedTenantPanel() {
  const params = useParams()
  const slug = params?.slug || 'mi-tienda'

  // 1. Configuración de Identidad y Comportamiento del Bot
  const [storeName, setStoreName] = useState('Mi Tienda Automática')
  const [botWelcomeMessage, setBotWelcomeMessage] = useState('¡Hola! Bienvenido a nuestra tienda. Selecciona una opción para continuar:')
  const [useInteractiveButtons, setUseInteractiveButtons] = useState(true)
  const [platform, setPlatform] = useState('whatsapp')
  const [apiToken, setApiToken] = useState('')

  // 2. Pasarelas de Pago Globales Habilitadas
  const [payments, setPayments] = useState({
    card: true,
    cryptoBinance: true,
    bankTransfer: true,
    wiseRemitly: true,
    paypal: true
  })

  // 3. Inventario (Stock Vault con Cuentas y Referencias de Pago Automáticas)
  const [products, setProducts] = useState([
    { id: 1, name: 'Pack Premium 100 Diamantes Free Fire', price: '$2.00 USD', accounts: ['FF-CODE-998877', 'FF-CODE-554433'] }
  ])
  const [newProdName, setNewProdName] = useState('')
  const [newProdPrice, setNewProdPrice] = useState('')
  const [newProdAccounts, setNewProdAccounts] = useState('')

  const [savedStatus, setSavedStatus] = useState(false)

  // Simulación de compra con Referencia Única de Banco / Pago Manual
  const [simulatedRef, setSimulatedRef] = useState('')
  const [simulatedResult, setSimulatedResult] = useState(null)

  const handleSaveAll = (e) => {
    e.preventDefault()
    setSavedStatus(true)
    setTimeout(() => setSavedStatus(false), 3000)
  }

  const handleAddProduct = (e) => {
    e.preventDefault()
    if (!newProdName || !newProdPrice || !newProdAccounts) return alert('Completa todos los campos del producto y sus cuentas.')
    
    const accList = newProdAccounts.split('\n').map(a => a.trim()).filter(a => a.length > 0)
    const newP = {
      id: Date.now(),
      name: newProdName,
      price: newProdPrice,
      accounts: accList
    }
    setProducts([newP, ...products])
    setNewProdName('')
    setNewProdPrice('')
    setNewProdAccounts('')
    alert('¡Producto agregado al Stock Vault con éxito!')
  }

  // Generador de Referencia Única Antifraude para Transferencias Bancarias / Wise / Remitly
  const generateUniqueReference = (orderId) => {
    const randomCode = Math.floor(100000 + Math.random() * 900000)
    return `REF-${orderId}-${randomCode}`
  }

  const handleTestBotCheckout = (productId) => {
    const ref = generateUniqueReference(productId)
    setSimulatedRef(ref)
    setSimulatedResult(`Para confirmar tu pago, transfiere exacto con la referencia única: [ ${ref} ]. El bot validará el depósito y entregará tu cuenta automáticamente en segundos.`)
  }

  return (
    <div style={{ minHeight: "100vh", background: "#0a0a0c", color: "#fff", fontFamily: "sans-serif", padding: "40px 20px" }}>
      <div style={{ maxWidth: "1050px", margin: "0 auto" }}>
        
        {/* ENCABEZADO */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #222634", paddingBottom: "20px", marginBottom: "30px", flexWrap: "wrap", gap: "15px" }}>
          <div>
            <h1 style={{ margin: 0, fontSize: "26px", display: "flex", alignItems: "center", gap: "10px" }}>
              👑 Panel de Control: <span style={{ color: "#34d399" }}>{storeName}</span>
            </h1>
            <p style={{ color: "#8a8f98", margin: "5px 0 0 0", fontSize: "14px" }}>Ruta inquilino: <code style={{ color: "#34d399" }}>/panel/{slug}</code> • Bot 100% Automatizado</p>
          </div>
          <div style={{ background: "#065f46", color: "#34d399", padding: "10px 16px", borderRadius: "8px", fontSize: "13px", fontWeight: "bold" }}>
            🟢 Sistema Autónomo Activo
          </div>
        </div>

        <form onSubmit={handleSaveAll}>
          
          {/* SECCIÓN 1: IDENTIDAD Y CONFIGURACIÓN DEL BOT */}
          <div style={{ background: "#121318", border: "1px solid #222634", borderRadius: "12px", padding: "25px", marginBottom: "30px" }}>
            <h3 style={{ margin: "0 0 15px 0", fontSize: "18px", color: "#f3f4f6" }}>🤖 Personalización y Comportamiento del Bot</h3>
            
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px", marginBottom: "15px" }}>
              <div>
                <label style={{ display: "block", fontSize: "12px", color: "#8a8f98", marginBottom: "6px" }}>Nombre de la Tienda / Negocio</label>
                <input 
                  type="text" 
                  value={storeName} 
                  onChange={(e) => setStoreName(e.target.value)}
                  style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #2d3343", background: "#1a1d26", color: "#fff", outline: "none", boxSizing: "border-box" }}
                />
              </div>
              <div>
                <label style={{ display: "block", fontSize: "12px", color: "#8a8f98", marginBottom: "6px" }}>Plataforma del Bot</label>
                <select 
                  value={platform} 
                  onChange={(e) => setPlatform(e.target.value)}
                  style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #2d3343", background: "#1a1d26", color: "#fff", outline: "none", boxSizing: "border-box" }}
                >
                  <option value="whatsapp">🟢 WhatsApp Business API</option>
                  <option value="telegram">🔵 Telegram Bot</option>
                </select>
              </div>
            </div>

            <div style={{ marginBottom: "15px" }}>
              <label style={{ display: "block", fontSize: "12px", color: "#8a8f98", marginBottom: "6px" }}>Mensaje de Bienvenida del Bot</label>
              <textarea 
                rows={2}
                value={botWelcomeMessage} 
                onChange={(e) => setBotWelcomeMessage(e.target.value)}
                style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #2d3343", background: "#1a1d26", color: "#fff", outline: "none", boxSizing: "border-box" }}
              />
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "10px", background: "#1a1d26", padding: "12px 16px", borderRadius: "8px", border: "1px solid #2d3343" }}>
              <input 
                type="checkbox" 
                checked={useInteractiveButtons} 
                onChange={(e) => setUseInteractiveButtons(e.target.checked)}
                style={{ width: "18px", height: "18px", accentColor: "#10b981", cursor: "pointer" }}
              />
              <div>
                <span style={{ fontSize: "14px", fontWeight: "bold", display: "block" }}>Habilitar Bot con Botones Interactivos (Menús de Opción Rápida)</span>
                <small style={{ color: "#8a8f98" }}>El cliente no tendrá que escribir comandos complejos; el bot desplegará botones táctiles para comprar, ver saldo o elegir productos instantáneamente.</small>
              </div>
            </div>
          </div>

          {/* SECCIÓN 2: PASARELAS DE PAGO GLOBALES */}
          <div style={{ background: "#121318", border: "1px solid #222634", borderRadius: "12px", padding: "25px", marginBottom: "30px" }}>
            <h3 style={{ margin: "0 0 10px 0", fontSize: "18px", color: "#f3f4f6" }}>💳 Configuración de Pasarelas de Pago Globales</h3>
            <p style={{ color: "#8a8f98", fontSize: "13px", marginBottom: "20px" }}>Selecciona los métodos que ofreces para que tus compradores de cualquier parte del mundo paguen sin fricción:</p>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "12px" }}>
              
              <label style={{ background: "#1a1d26", border: "1px solid #2d3343", padding: "14px", borderRadius: "8px", display: "flex", alignItems: "center", gap: "12px", cursor: "pointer" }}>
                <input type="checkbox" checked={payments.card} onChange={(e) => setPayments({...payments, card: e.target.checked})} style={{ accentColor: "#10b981" }} />
                <div>
                  <strong style={{ display: "block", fontSize: "14px" }}>💳 Tarjeta Crédito/Débito</strong>
                  <small style={{ color: "#8a8f98" }}>Cobro directo mundial</small>
                </div>
              </label>

              <label style={{ background: "#1a1d26", border: "1px solid #2d3343", padding: "14px", borderRadius: "8px", display: "flex", alignItems: "center", gap: "12px", cursor: "pointer" }}>
                <input type="checkbox" checked={payments.cryptoBinance} onChange={(e) => setPayments({...payments, cryptoBinance: e.target.checked})} style={{ accentColor: "#10b981" }} />
                <div>
                  <strong style={{ display: "block", fontSize: "14px" }}>🟡 Binance Pay / Crypto</strong>
                  <small style={{ color: "#8a8f98" }}>USDT, BTC desde todo el mundo</small>
                </div>
              </label>

              <label style={{ background: "#1a1d26", border: "1px solid #2d3343", padding: "14px", borderRadius: "8px", display: "flex", alignItems: "center", gap: "12px", cursor: "pointer" }}>
                <input type="checkbox" checked={payments.bankTransfer} onChange={(e) => setPayments({...payments, bankTransfer: e.target.checked})} style={{ accentColor: "#10b981" }} />
                <div>
                  <strong style={{ display: "block", fontSize: "14px" }}>🏦 Transferencia Bancaria</strong>
                  <small style={{ color: "#8a8f98" }}>Con Ref. Única Automática</small>
                </div>
              </label>

              <label style={{ background: "#1a1d26", border: "1px solid #2d3343", padding: "14px", borderRadius: "8px", display: "flex", alignItems: "center", gap: "12px", cursor: "pointer" }}>
                <input type="checkbox" checked={payments.wiseRemitly} onChange={(e) => setPayments({...payments, wiseRemitly: e.target.checked})} style={{ accentColor: "#10b981" }} />
                <div>
                  <strong style={{ display: "block", fontSize: "14px" }}>🌍 Wise & Remitly</strong>
                  <small style={{ color: "#8a8f98" }}>Remesas e internacionales</small>
                </div>
              </label>

              <label style={{ background: "#1a1d26", border: "1px solid #2d3343", padding: "14px", borderRadius: "8px", display: "flex", alignItems: "center", gap: "12px", cursor: "pointer" }}>
                <input type="checkbox" checked={payments.paypal} onChange={(e) => setPayments({...payments, paypal: e.target.checked})} style={{ accentColor: "#10b981" }} />
                <div>
                  <strong style={{ display: "block", fontSize: "14px" }}>🅿️ PayPal</strong>
                  <small style={{ color: "#8a8f98" }}>Pago rápido protegido</small>
                </div>
              </label>

            </div>
          </div>

          {/* SECCIÓN 3: STOCK VAULT Y CUENTAS AUTOMÁTICAS */}
          <div style={{ background: "#121318", border: "1px solid #222634", borderRadius: "12px", padding: "25px", marginBottom: "30px" }}>
            <h3 style={{ margin: "0 0 15px 0", fontSize: "18px", color: "#f3f4f6" }}>📦 Stock Vault (Inventario y Cuentas para Entrega Autónoma)</h3>
            
            {/* Formulario nuevo producto */}
            <div style={{ background: "#1a1d26", padding: "20px", borderRadius: "10px", border: "1px solid #2d3343", marginBottom: "20px" }}>
              <h4 style={{ margin: "0 0 12px 0", fontSize: "15px", color: "#34d399" }}>➕ Agregar Producto y Cuentas al Stock</h4>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 160px", gap: "12px", marginBottom: "12px" }}>
                <input 
                  type="text" 
                  placeholder="Nombre del Producto (Ej: Cuenta Netflix 4K / Licencia Office)" 
                  value={newProdName}
                  onChange={(e) => setNewProdName(e.target.value)}
                  style={{ padding: "12px", borderRadius: "8px", border: "1px solid #2d3343", background: "#121318", color: "#fff", outline: "none" }}
                />
                <input 
                  type="text" 
                  placeholder="Precio (Ej: $5.00 USD)" 
                  value={newProdPrice}
                  onChange={(e) => setNewProdPrice(e.target.value)}
                  style={{ padding: "12px", borderRadius: "8px", border: "1px solid #2d3343", background: "#121318", color: "#fff", outline: "none" }}
                />
              </div>
              <div style={{ marginBottom: "12px" }}>
                <textarea 
                  placeholder="Pega las cuentas o códigos (Una por línea). El bot las entregará automáticamente una por cada pago verificado:&#10;correo1@gmail.com:pass1&#10;correo2@gmail.com:pass2" 
                  rows={3}
                  value={newProdAccounts}
                  onChange={(e) => setNewProdAccounts(e.target.value)}
                  style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #2d3343", background: "#121318", color: "#fff", fontFamily: "monospace", outline: "none", boxSizing: "border-box" }}
                />
              </div>
              <button 
                type="button"
                onClick={handleAddProduct}
                style={{ padding: "12px 24px", background: "linear-gradient(135deg, #10b981 0%, #059669 100%)", color: "#fff", border: "none", borderRadius: "8px", fontWeight: "bold", cursor: "pointer" }}
              >
                Guardar en Stock Vault
              </button>
            </div>

            {/* Lista actual de stock */}
            <div style={{ display: "grid", gap: "12px" }}>
              {products.map((p) => (
                <div key={p.id} style={{ background: "#1a1d26", border: "1px solid #2d3343", borderRadius: "8px", padding: "16px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "10px" }}>
                  <div>
                    <h4 style={{ margin: 0, fontSize: "16px", color: "#fff" }}>{p.name}</h4>
                    <span style={{ color: "#8a8f98", fontSize: "13px" }}>Precio: {p.price} • Cuentas disponibles: <strong style={{ color: "#34d399" }}>{p.accounts.length}</strong></span>
                  </div>
                  <button 
                    type="button"
                    onClick={() => handleTestBotCheckout(p.id)}
                    style={{ background: "#2563eb", color: "#fff", border: "none", padding: "8px 14px", borderRadius: "6px", fontSize: "12px", fontWeight: "bold", cursor: "pointer" }}
                  >
                    Simular Pago y Ref. Única ➔
                  </button>
                </div>
              ))}
            </div>

            {/* Simulador de Referencia Única */}
            {simulatedRef && (
              <div style={{ background: "#065f46", border: "1px solid #34d399", borderRadius: "8px", padding: "15px", marginTop: "15px" }}>
                <strong style={{ color: "#fff", display: "block", marginBottom: "5px" }}>Prueba de Referencia Única Generada por el Bot:</strong>
                <code style={{ fontSize: "15px", background: "#022c22", padding: "4px 8px", borderRadius: "4px", color: "#34d399" }}>{simulatedRef}</code>
                <p style={{ margin: "8px 0 0 0", fontSize: "13px", color: "#d1fae5" }}>{simulatedResult}</p>
              </div>
            )}
          </div>

          <button 
            type="submit"
            style={{ width: "100%", padding: "16px", background: "#25D366", color: "#fff", border: "none", borderRadius: "10px", fontSize: "16px", fontWeight: "bold", cursor: "pointer" }}
          >
            {savedStatus ? '¡Configuración Guardada y Aplicada al Bot!' : 'Guardar y Publicar Cambios en el Bot'}
          </button>

        </form>

      </div>
    </div>
  )
}
