import PedidoForm from './PedidoForm';
import PedidoTabla from './PedidoTabla';

function App() {
    return (
        <div>
            <h1>Gestión de Pedidos</h1>
            <PedidoForm onPedidoAgregado={() => window.location.reload()} />
            <PedidoTabla />
        </div>
    );
}

export default App;
