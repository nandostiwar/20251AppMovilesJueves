def sumar(a, b):
    while a > 0:
        b += 1
        a -= 1
    return b

def restar(a, b):
    while b > 0:
        a -= 1
        b -= 1
    return a

def dividir(a, b):
    if b == 0:
        return "Error: División por cero"
    
    c = 0
    while a >= b:
        a = restar(a, b)
        c = sumar(c, 1)
    
    # Calcular la parte decimal con precisión
    decimal = 0
    factor = 10
    while a > 0 and factor > 0:
        a = sumar(a * 10, 0)
        temp = 0
        while a >= b:
            a = restar(a, b)
            temp = sumar(temp, 1)
        decimal = sumar(decimal, temp * (factor // 10))
        factor //= 10
    
    return f"{c}.{decimal}"
