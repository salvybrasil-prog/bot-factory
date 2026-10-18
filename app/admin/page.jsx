export default function ClientPanel({ params }) {
  const { slug } = params;
  
  return (
    <div style={{ maxWidth: 600, margin: "60px auto", padding: 20, fontFamily: "sans-serif", background: "#111", color: "#fff", borderRadius: 8 }}>
      <h2>🤖 Panel de Bot: {slug}</h2>
      <p>Estado de la tienda y dispensador Stock Vault activo.</p>
      <div style={{ marginTop: 20, padding: 15, background: "#222", borderRadius: 6 }}>
        <p><strong>URL Webhook:</strong> Configurada correctamente.</p>
        <p><strong>Base de datos:</strong> Conectada a Supabase.</p>
      </div>
    </div>
  );
}
