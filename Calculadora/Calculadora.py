import importlib

# Intentar importar módulos dinámicamente y manejar errores si no existen
def importar_modulo(nombre):
    try:
        return importlib.import_module(nombre)
    except ModuleNotFoundError:
        print(f"Advertencia: El módulo '{nombre}' no se encontró. La operación no estará disponible.")
        return None

# Cargar módulos
modulos = {
    "sumar": importar_modulo("suma"),
    "restar": importar_modulo("resta"),
    "multiplicar": importar_modulo("multiplicacion"),
    "dividir": importar_modulo("division"),
}

def mostrar_menu():
    print("\nOperaciones disponibles:")
    print("1. Sumar" if modulos["sumar"] else "1. Sumar (No disponible)")
    print("2. Restar" if modulos["restar"] else "2. Restar (No disponible)")
    print("3. Multiplicar" if modulos["multiplicar"] else "3. Multiplicar (No disponible)")
    print("4. Dividir" if modulos["dividir"] else "4. Dividir (No disponible)")
    print("5. Salir")

def calculadora():
    operaciones = {
        "1": modulos["sumar"].sumar if modulos["sumar"] else None,
        "2": modulos["restar"].restar if modulos["restar"] else None,
        "3": modulos["multiplicar"].multiplicar if modulos["multiplicar"] else None,
        "4": modulos["dividir"].dividir if modulos["dividir"] else None,
    }

    while True:
        mostrar_menu()
        opcion = input("Selecciona la operación (1-5): ")
        
        if opcion == "5":
            print("Gracias por usar la calculadora. ¡Hasta luego!")
            break
        
        if opcion in operaciones and operaciones[opcion]:
            try:
                a = int(input("Ingresa el primer operando: "))
                b = int(input("Ingresa el segundo operando: "))
                resultado = operaciones[opcion](a, b)
                print(f"Resultado: {resultado}")
            except ValueError as e:
                print(f"Error: {e}")
        else:
            print("Operación no válida o módulo no disponible. Inténtalo de nuevo.")

if __name__ == "__main__":
    calculadora()
