import { useState } from "react";
import Resultado from "./Resultado";
import '../styles/Calculadora.css'
import Resultado from "./Resultado";

function Calculadora(){
    const [number1, setNumber1] = useState('');
    const [number2, setNumber2] = useState('');
    const [resultado, setResultado] = useState('');
    const [orders, setOrders] = useState([]); // New state for orders
    const [orderInput, setOrderInput] = useState(''); // New state for order input

    function handleSubmit(e){
        e.preventDefault();
        const operacion = e.target.value;
        fetch(`http://localhost:3500/v1/calculadora/${operacion}`, {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({number1, number2})
        })
            .then(res =>res.json())
            .then(responseData => {
                setResultado(responseData.resultado)
                // setResultado(responseData)
                // console.log(resultado)
            })
    }

    return (
        <div className="container">
            <h1 id="txtCalculadora">CALCULADORA</h1>
            <form>
                <input type="text" className="number" onChange={(e)=>{setNumber1(e.target.value)}}/><br />
                <input type="text" className="number" onChange={(e)=>{setNumber2(e.target.value)}}/><br />
                <input type="submit" className="btnEnviar" value="sumar" onClick={handleSubmit}/>
                <input type="submit" className="btnEnviar" value="restar" onClick={handleSubmit}/>
                <input type="submit" className="btnEnviar" value="multiplicar" onClick={handleSubmit}/>
                <input type="submit" className="btnEnviar" value="dividir" onClick={handleSubmit}/>
            </form>
            <form onSubmit={handleOrderSubmit}>
                <input 
                    type="text" 
                    value={orderInput} 
                    onChange={(e) => setOrderInput(e.target.value)} 
                    placeholder="Captura un pedido"
                />
                <input type="submit" value="Agregar Pedido" />
            </form>
            <Resultado resultado={"El resultado es "+ resultado} orders={orders} /> {/* Pass orders to Resultado */}
        </div>
    )
}

export default Calculadora
