def restar(a, b):
    c = 0  # 'c' es la variable de estado que captura el número de pasos
    if a > b:  # Si 'a' es mayor que 'b', restamos hasta que 'a' sea igual a 'b'
        while a > b:
            a -= 1
            c += 1  # Contamos los pasos de decremento y los almacenamos en 'c'
    elif a < b:  # Si 'a' es menor que 'b', sumamos hasta que 'a' sea igual a 'b'
        while a < b:
            a += 1
            c -= 1  # Contamos los pasos de incremento y los almacenamos en 'c' con signo negativo
    return c