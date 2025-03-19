def sumar(a, b):
    c = b
    if a > 0:
        while a > 0:
            c += 1
            a -= 1
    elif a < 0:
        while a < 0:
            c -= 1
            a += 1
    return c