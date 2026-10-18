'use client'
import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'

export default function TenantPanel() {
  const params = useParams()
  const slug = params?.slug || 'cliente'
  
  const [stockItems, setStockItems] = useState([
    { id: 1, name: 'Recarga Free Fire 100 Diamantes', price: '$1.00 USD', stock: 45 },
    { id: 2, name: 'Pase de Batalla Mensual', price: '$8.50 USD', stock: 12 }
  ])
  const [newItemName, setNewItemName] = useState('')
  const [newItemPrice, setNewItemPrice] = useState('')
  const [botStatus, setBotStatus] = useState('Conectado y Operativo (24/7)')

  const handleAddStock = (e) => {
    e.preventDefault()
    if (!newItemName || !newItemPrice) return alert('Completa los campos del producto.')
    
    const item = {
      id: Date.now(),
      name: newItemName,
      price: newItemPrice,
      stock: 50
    }
    setStockItems([item, ...stockItems])
    setNewItemName('')
    setNewItemPrice('')
    alert('¡Producto agregado al Stock Vault con éxito!')
  }

  return (
    <div style={{ minHeight: "100vh", background: "#0a0a0c", color: "#fff", fontFamily: "sans-serif", padding: "40px 20px" }}>
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        
        {/* Cabecera del Panel del Inquilino */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #222634", paddingBottom: "20px", marginBottom: "30px" }}>
          <div>
            <h1 style={{ margin: 0, fontSize: "24px", display: "flex", alignItems: "center", gap: "10px" }}>
              🤖 Panel de Bot: <span style={{ color: "#34d399" }}>{slug}</span>
            </h1>
            <p style={{ color: "#8a8f98", margin: "5px 0 0 0", fontSize: "14px" }}>Estado de la tienda y dispensador Stock Vault activo.</p>
          </div>
          <div style={{ background: "#121318", padding: "10px 16px", borderRadius: "8px", border: "1px solid #222634", fontSize: "13px", color: "#34d399" }}>
            🟢 {botStatus}
          </div>
        </div>

        {/* Sección de Gestión de Inventario / Stock Vault */}
        <div style={{ background: "#121318", border: "1px solid #222634", borderRadius: "12px", padding: "25px", marginBottom: "35px" }}>
          <h3 style={{ margin: "0 0 15px 0", fontSize: "18px", color: "#f3f4f6" }}>📦 Stock Vault (Inventario y Productos)</h3>
          
          <form onSubmit={handleAddStock} style={{ display: "grid", gridTemplateColumns: "1fr 150px auto", gap: "12px", marginBottom: "25px", flexWrap: "wrap" }}>
            <input 
              type="text" 
              placeholder="Nombre del Producto (Ej: Cuenta Netflix / Pack de Diamantes)" 
              value={newItemName}
              onChange={(e) => setNewItemName(e.target.value)}
              style={{ padding: "12px", borderRadius: "8px", border: "1px solid #2d3343", background: "#1a1d26", color: "#fff", fontSize: "14px", outline: "none" }}
            />
            <input 
              type="text" 
              placeholder="Precio ($)" 
              value={newItemPrice}
              onChange={(e) => setNewItemPrice(e.target.value)}
              style={{ padding: "12px", borderRadius: "8px", border: "1px solid #2d3343", background: "#1a1d26", color: "#fff", fontSize: "14px", outline: "none" }}
            />
            <button 
              type="submit"
              style={{ padding: "12px 24px", background: "linear-gradient(135deg, #10b981 0%, #059669 100%)", color: "#fff", border: "none", borderRadius: "8px", fontWeight: "bold", fontSize: "14px", cursor: "pointer" }}
            >
              Añadir al Stock
            </button>
          </form>

          {/* Listado de Stock */}
          <div style={{ display: "grid", gap: "10px" }}>
            {stockItems.map((item) => (
              <div key={item.id} style={{ background: "#1a1d26", border: "1px solid #2d3343", borderRadius: "8px", padding: "14px 18px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <h4 style={{ margin: 0, fontSize: "15px", color: "#fff" }}>{item.name}</h4>
                  <small style={{ color: "#8a8f98" }}>Precio: {item.price}</small>
                </div>
                <div style={{ background: "#065f46", color: "#34d399", padding: "6px 12px", borderRadius: "20px", fontSize: "12px", fontWeight: "bold" }}>
                  Stock disponible: {item.stock}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sección de Webhook y Automatización */}
        <div style={{ background: "#121318", border: "1px solid #222634", borderRadius: "12px", padding: "25px" }}>
          <h3 style={{ margin: "0 0 10px 0", fontSize: "18px", color: "#f3f4f6" }}>🔗 Enlace de Webhook para el Bot</h3>
          <p style={{ color: "#8a8f98", fontSize: "14px", marginBottom: "15px" }}>Usa esta URL para conectar las respuestas automáticas de WhatsApp o Telegram de este cliente:</p>
          <div style={{ background: "#1a1d26", border: "1px solid #2d3343", padding: "12px 16px", borderRadius: "8px", fontFamily: "monospace", fontSize: "13px", color: "#34d399" }}>
            https://kingsalvy.shop/api/webhook/{slug}
          </div>
        </div>

      </div>
    </div>
  )
}
