"use client"

import { useState, useEffect } from "react"
import axios from "axios"

const PanelAdministrador = () => {
  const [ventas, setVentas] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    obtenerVentas()
  }, [])

  const obtenerVentas = async () => {
    try {
      setCargando(true)
      const token = localStorage.getItem("authToken") || localStorage.getItem("token")

      if (!token) {
        setError("No se encontró un token de autenticación. Redirigiendo al inicio de sesión...")
        setTimeout(() => {
          window.location.href = "/login"
        }, 2000)
        return
      }

      const respuesta = await axios.get("http://localhost:5000/api/venta/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      setVentas(respuesta.data)
      setError(null)
    } catch (error) {
      console.error("Error al obtener ventas:", error)

      if (error.response) {
        if (error.response.status === 401) {
          setError("La sesión ha expirado. Redirigiendo al inicio de sesión...")
          setTimeout(() => {
            localStorage.removeItem("authToken")
            window.location.href = "/login"
          }, 2000)
        } else {
          setError(`Error del servidor: ${error.response.data.message || "Ocurrió un problema"}`)
        }
      } else if (error.request) {
        setError("No hay respuesta del servidor. Verifica tu conexión.")
      } else {
        setError(error.message)
      }
    } finally {
      setCargando(false)
    }
  }

  const cerrarSesion = () => {
    localStorage.removeItem("authToken")
    window.location.href = "/login"
  }

  const formatearFecha = (fechaISO) => {
    const fecha = new Date(fechaISO)
    return fecha.toLocaleDateString("es-CO", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  if (cargando) {
    return <div>Cargando datos de ventas...</div>
  }

  if (error) {
    return (
      <div className="contenedor-error">
        <h3>Error</h3>
        <p>{error}</p>
        {error.includes("sesión") && (
          <button onClick={cerrarSesion}>Volver al inicio de sesión</button>
        )}
      </div>
    )
  }

  return (
    <div className="panel-administrador">
      <h2>Panel de Ventas</h2>

      <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
        <button onClick={obtenerVentas}>Actualizar Datos de Ventas</button>
        <button onClick={cerrarSesion}>Salir al inicio</button>
      </div>

      {ventas.length === 0 ? (
        <p>No hay datos de ventas disponibles.</p>
      ) : (
        <div className="lista-ventas">
          <table border="1" cellPadding="8" cellSpacing="0">
            <thead>
              <tr>
                <th>ID Venta</th>
                <th>Producto</th>
                <th>Monto</th>
                <th>Estado</th>
                <th>Usuario</th>
                <th>Fecha</th>
              </tr>
            </thead>
            <tbody>
              {ventas.map((venta) => (
                <tr key={venta.id || venta._id}>
                  <td>{venta.id || venta._id}</td>
                  <td>{venta.producto || "N/A"}</td>
                  <td>${venta.valor || venta.monto || "0.00"}</td>
                  <td>{venta.estado || "pendiente"}</td>
                  <td>
                    {venta.usuario
                      ? `${venta.usuario.nombre || "Usuario"} (${venta.usuario.email})`
                      : "Desconocido"}
                  </td>
                  <td>{formatearFecha(venta.fecha || venta.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default PanelAdministrador
