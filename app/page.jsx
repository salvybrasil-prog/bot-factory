export default function Home() {
  return (
    <div style={{ maxWidth: 600, margin: "80px auto", padding: 30, fontFamily: "sans-serif", background: "#111", color: "#fff", borderRadius: 12, textAlign: "center" }}>
      <h1>🤖 Bot Factory & Stock Vault</h1>
      <p>Plataforma de despliegue multi-inquilino activa y funcionando.</p>
      <a href="/admin" style={{ display: "inline-block", marginTop: 20, padding: "12px 24px", background: "#25D366", color: "#fff", textDecoration: "none", borderRadius: 6, fontWeight: "bold" }}>
        Ir al Panel de Administración ➔
      </a>
    </div>
  );
}
