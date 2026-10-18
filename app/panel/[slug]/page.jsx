'use client'
import { useState } from 'react'
import { useParams } from 'next/navigation'

export default function TenantPanel() {
  const params = useParams()
  const slug = params?.slug || 'cliente'
  
  // Configuración del bot (Credenciales del cliente)
  const [botToken, setBotToken] = useState('')
  const [botPhone, setBotPhone] = useState('')
  const [configSaved, setConfigSaved] = useState(false)

  // Inventario real y cuentas a dispensar
  const [stockItems, setStockItems] = useState([
    { id: 1, name: '3M Coupon Duolingo Individual', price: '$25', accounts: ['DUO-1111-AAAA', 'DUO-2222-BBBB'] },
    { id: 2, name: 'Recarga Free Fire 100 Diamantes', price: '$1.00 USD', accounts: ['FF-CODE-9988', 'FF-CODE-7766'] }
  ])

  const [newItemName, setNewItemName] = useState('')
  const [newItemPrice, setNewItemPrice] = useState('')
  const [newAccountsText, setNewAccountsText] = useState('')

  const handleSaveConfig = (e) => {
    e.preventDefault()
    setConfigSaved(true)
    setTimeout(() => setConfigSaved(false), 3000)
  }

  const handleAddItem = (e) => {
    e.preventDefault()
    if (!newItemName || !newItemPrice || !newAccountsText) {
      return alert('Por favor llena todos los campos, incluyendo las cuentas o códigos a dispensar.')
    }

    // Separa las cuentas por saltos de línea para que el bot las dispense una por una
    const accountsArray = newAccountsText.split('\n').map(acc => acc.trim()).filter(acc => acc.length > 0)

    const newItem = {
      id: Date.now(),
      name: newItemName,
      price: newItemPrice,
      accounts: accountsArray
    }

    setStockItems([newItem, ...stockItems])
    setNewItemName('')
    setNewItemPrice('')
    setNewAccountsText('')
    alert('¡Producto y Stock Vault actualizados con éxito!')
  }

  const handleDeleteAccount = (itemId, indexToRemove) => {
    setStockItems(stockItems.map(item => {
      if (item.id === itemId) {
        const updatedAccounts = item.accounts.filter((_, idx) => idx !== indexToRemove)
        return { ...item, accounts: updatedAccounts }
      }
      return item
    }))
  }

  return (
    <div style={{ minHeight: "100vh", background: "#0a0a0c", color: "#fff", fontFamily: "sans-serif", padding: "40px 20px" }}>
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        
        {/* Cabecera */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #222634", paddingBottom: "20px", marginBottom: "30px", flexWrap: "wrap", gap: "15px" }}>
          <div>
            <h1 style={{ margin: 0, fontSize: "24px", display: "flex", alignItems: "center", gap: "10px" }}>
              🤖 Panel de Bot: <span style={{ color: "#34d399" }}>{slug}</span>
            </h1>
            <p style={{ color: "#8a8f98", margin: "5px 0 0 0", fontSize: "14px" }}>Configuración del bot, credenciales y dispensador Stock Vault.</p>
          </div>
          <div style={{ background: "#121318", padding: "10px 16px", borderRadius: "8px", border: "1px solid #222634", fontSize: "13px", color: "#34d399" }}>
            🟢 Conectado y Operativo (24/7)
          </div>
        </div>

        {/* 1. SECCIÓN DE CREDENCIALES Y CONFIGURACIÓN DEL CLIENTE */}
        <div style={{ background: "#121318", border: "1px solid #222634", borderRadius: "12px", padding: "25px", marginBottom: "35px" }}>
          <h3 style={{ margin: "0 0 15px 0", fontSize: "18px", color: "#f3f4f6" }}>⚙️ Credenciales de Conexión del Bot</h3>
          <form onSubmit={handleSaveConfig} style={{ display: "grid", gridTemplateColumns: "1fr 1fr auto", gap: "15px", alignItems: "end", flexWrap: "wrap" }}>
            <div>
              <label style={{ display: "block", fontSize: "12px", color: "#8a8f98", marginBottom: "6px" }}>Token de API (Telegram BotFather / WhatsApp Cloud)</label>
              <input 
                type="text" 
                placeholder="Ej: 123456789:ABCdefGhIJKlmNoPQRsTUVwxyZ" 
                value={botToken}
                onChange={(e) => setBotToken(e.target.value)}
                style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #2d3343", background: "#1a1d26", color: "#fff", fontSize: "14px", outline: "none", boxSizing: "border-box" }}
              />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "12px", color: "#8a8f98", marginBottom: "6px" }}>Número o ID del Canal</label>
              <input 
                type="text" 
                placeholder="Ej: +1234567890 o @CanalTienda" 
                value={botPhone}
                onChange={(e) => setBotPhone(e.target.value)}
                style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #2d3343", background: "#1a1d26", color: "#fff", fontSize: "14px", outline: "none", boxSizing: "border-box" }}
              />
            </div>
            <button 
              type="submit"
              style={{ padding: "12px 20px", background: "#25D366", color: "#fff", border: "none", borderRadius: "8px", fontWeight: "bold", fontSize: "14px", cursor: "pointer", height: "43px" }}
            >
              {configSaved ? '¡Guardado!' : 'Guardar Credenciales'}
            </button>
          </form>
        </div>

        {/* 2. SECCIÓN DE STOCK VAULT (AÑADIR PRODUCTOS Y CUENTAS REALES) */}
        <div style={{ background: "#121318", border: "1px solid #222634", borderRadius: "12px", padding: "25px", marginBottom: "35px" }}>
          <h3 style={{ margin: "0 0 15px 0", fontSize: "18px", color: "#f3f4f6" }}>📦 Stock Vault (Inventario y Cuentas para Dispensar Automáticamente)</h3>
          
          <form onSubmit={handleAddItem} style={{ background: "#1a1d26", padding: "20px", borderRadius: "10px", border: "1px solid #2d3343", marginBottom: "25px" }}>
            <h4 style={{ margin: "0 0 12px 0", fontSize: "15px", color: "#34d399" }}>➕ Agregar Nuevo Producto y sus Cuentas/Códigos</h4>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 150px", gap: "12px", marginBottom: "12px" }}>
              <input 
                type="text" 
                placeholder="Nombre del Producto (Ej: Cuenta Netflix 4K)" 
                value={newItemName}
                onChange={(e) => setNewItemName(e.target.value)}
                style={{ padding: "12px", borderRadius: "8px", border: "1px solid #2d3343", background: "#121318", color: "#fff", fontSize: "14px", outline: "none" }}
              />
              <input 
                type="text" 
                placeholder="Precio (Ej: $5.00)" 
                value={newItemPrice}
                onChange={(e) => setNewItemPrice(e.target.value)}
                style={{ padding: "12px", borderRadius: "8px", border: "1px solid #2d3343", background: "#121318", color: "#fff", fontSize: "14px", outline: "none" }}
              />
            </div>
            <div style={{ marginBottom: "12px" }}>
              <textarea 
                placeholder="Pega aquí las cuentas o códigos (Una por línea). El bot entregará una por cada cliente que compre:&#10;correo1@gmail.com:pass1&#10;correo2@gmail.com:pass2" 
                rows={4}
                value={newAccountsText}
                onChange={(e) => setNewAccountsText(e.target.value)}
                style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #2d3343", background: "#121318", color: "#fff", fontSize: "13px", outline: "none", boxSizing: "border-box", fontFamily: "monospace" }}
              />
            </div>
            <button 
              type="submit"
              style={{ padding: "12px 24px", background: "linear-gradient(135deg, #10b981 0%, #059669 100%)", color: "#fff", border: "none", borderRadius: "8px", fontWeight: "bold", fontSize: "14px", cursor: "pointer" }}
            >
              Guardar en Stock Vault
            </button>
          </form>

          {/* LISTADO DE PRODUCTOS Y SUS CUENTAS DISPONIBLES */}
          <div style={{ display: "grid", gap: "15px" }}>
            {stockItems.map((item) => (
              <div key={item.id} style={{ background: "#1a1d26", border: "1px solid #2d3343", borderRadius: "10px", padding: "18px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                  <div>
                    <h4 style={{ margin: 0, fontSize: "16px", color: "#fff" }}>{item.name}</h4>
                    <span style={{ color: "#8a8f98", fontSize: "13px" }}>Precio: {item.price}</span>
                  </div>
                  <div style={{ background: item.accounts.length > 0 ? "#065f46" : "#7f1d1d", color: item.accounts.length > 0 ? "#34d399" : "#fca5a5", padding: "6px 14px", borderRadius: "20px", fontSize: "12px", fontWeight: "bold" }}>
                    Stock disponible: {item.accounts.length}
                  </div>
                </div>

                {/* Cuentas cargadas dentro de este producto */}
                <div style={{ background: "#121318", borderRadius: "6px", padding: "10px", border: "1px solid #222634" }}>
                  <small style={{ color: "#8a8f98", display: "block", marginBottom: "6px" }}>Cuentas / Códigos listos para dispensar automáticamente:</small>
                  {item.accounts.length === 0 ? (
                    <p style={{ color: "#f87171", fontSize: "13px", margin: 0 }}>⚠️ Sin stock. El bot avisará que no hay inventario.</p>
                  ) : (
                    <div style={{ display: "grid", gap: "6px" }}>
                      {item.accounts.map((acc, idx) => (
                        <div key={idx} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "#1a1d26", padding: "6px 10px", borderRadius: "4px", fontFamily: "monospace", fontSize: "13px" }}>
                          <span style={{ color: "#34d399" }}>{acc}</span>
                          <button 
                            onClick={() => handleDeleteAccount(item.id, idx)}
                            style={{ background: "transparent", border: "none", color: "#ef4444", cursor: "pointer", fontSize: "12px", fontWeight: "bold" }}
                          >
                            Eliminar
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3. SECCIÓN DE WEBHOOK */}
        <div style={{ background: "#121318", border: "1px solid #222634", borderRadius: "12px", padding: "25px" }}>
          <h3 style={{ margin: "0 0 10px 0", fontSize: "18px", color: "#f3f4f6" }}>🔗 Enlace de Webhook para el Bot</h3>
          <p style={{ color: "#8a8f98", fontSize: "14px", marginBottom: "15px" }}>Configura esta URL en las opciones de WhatsApp o Telegram de tu cliente para automatizar las entregas:</p>
          <div style={{ background: "#1a1d26", border: "1px solid #2d3343", padding: "12px 16px", borderRadius: "8px", fontFamily: "monospace", fontSize: "13px", color: "#34d399" }}>
            https://kingsalvy.shop/api/webhook/{slug}
          </div>
        </div>

      </div>
    </div>
  )
}
