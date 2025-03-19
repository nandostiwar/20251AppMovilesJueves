from suma import sumar
from resta import restar
from multiplicacion import multiplicar
from division import dividir

def test_sumar():
    assert sumar(2, 3) == 5
    assert sumar(0, 0) == 0
    assert sumar(-2, 3) == 1

def test_restar():
    assert restar(5, 3) == 2
    assert restar(3, 5) == -2
    assert restar(0, 0) == 0

def test_multiplicar():
    assert multiplicar(2, 3) == 6
    assert multiplicar(0, 5) == 0
    assert multiplicar(-2, 3) == -6

def test_dividir():
    assert dividir(6, 3) == "2.0"  
    assert dividir(7, 2) == "3.5"
    assert dividir(5, 0) == "Error: División por cero"


if __name__ == "__main__":
    test_sumar()
    test_restar()
    test_multiplicar()
    test_dividir()
    print("Todas las pruebas pasaron correctamente.")