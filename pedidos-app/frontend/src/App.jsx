import VentaForm from "./components/VentaForm";
import VentasTable from "./components/VentasTable";

function App() {
  return (
    <div className="container">
      <h1 className="title">Tienda de Videojuegos </h1>
      <VentaForm />
      <h1 className="title">Registro de Ventas</h1>
      <VentasTable />
    </div>
  );
}

export default App;
