export const metadata = {
  title: 'Bot Factory',
  description: 'Multi-tenant bot deployment platform',
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body style={{ margin: 0, padding: 0, background: "#0a0a0a", color: "#fff" }}>
        {children}
      </body>
    </html>
  )
}
