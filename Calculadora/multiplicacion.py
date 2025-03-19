def sumar(a, b):
    while a > 0:
        b += 1
        a -= 1
    while a < 0:
        b -= 1
        a += 1
    return b
	

def multiplicar(a, b):
    resultado = 0
    negativo = (a < 0) ^ (b < 0)  
    if a < 0:
        a = sumar(~a, 1)  
    if b < 0:
        b = sumar(~b, 1)  

    while b > 0:
        resultado = sumar(resultado, a)
        b = sumar(b, -1)

    return sumar(~resultado, 1) if negativo else resultado
