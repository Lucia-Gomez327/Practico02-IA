var aspiradora = document.createElement('img')
aspiradora.setAttribute("src", "aspiradora.png")
var movimiento
var ejeX
var ejeY
var orientacion = 0
var celda
var inicioAspiradora
var der = 0
var izq = 0
var td
var x, y
var izqder = -1
var pararvolver
var secuencia = new Array()
var inicioX
var inicioY
var vueltaAPosicionInicial = false
var salto = -2
var volviendo
var count = 0

var arrayPuntosRecorridos = new Array()

function crearTabla() {
   ejeX = Math.floor(Math.random() * 8) + 2
   ejeY = Math.floor(Math.random() * 8) + 2

    var tabla = document.getElementById('table')

    for (var y = 0; y < ejeY; y++) {
        var tr = document.createElement('tr')

        for (var x = 0; x < ejeX; x++) {

            var suciedad = document.createElement('td')
            suciedad.setAttribute('id', x + '' + y)

            if (Math.floor(Math.random() * 10 % 2) == 0) {

                suciedad.setAttribute("class", "mancha")

            }
            tr.appendChild(suciedad)
        }
        tabla.appendChild(tr)
    }
}

function setAspiradora() {
    x = Math.floor(Math.random() * (ejeX - 1))
    y = Math.floor(Math.random() * (ejeY - 1))

    inicioAspiradora = x + '' + y

    inicioX = x
    inicioY = y
    td = "#" + inicioAspiradora

    aspiradora.style.transform = 'rotate(360deg)'
    $(td).append(aspiradora)

    setTimeout(limpiar, 700)
    setTimeout(() => { $(td).css('background-color', 'red') }, 1000)

    setTimeout(mover, 2000)
}


function limpiar() {

    if ($(td).hasClass("mancha")) {
        $(td).removeClass("mancha")
    }

}

function setSecuencia() {
    var tablasec = document.getElementById('secuencia')
    var trsec = document.createElement('tr')
    var sectd = document.createElement('td')
    var p = document.createElement('p')
    var text = document.createTextNode(x + ';' + y + 'Orientacion =' + orientacion + 'der = ' + der + 'izq = ' + izq)
    p.appendChild(text)
    sectd.appendChild(p)
    trsec.appendChild(sectd)
    tablasec.appendChild(trsec)
}

function mover() {

    if (comprobarRecorridoCompleto()) {

        if ((x + '' + y) == inicioAspiradora) {
            ('termino en mover')
            vueltaAPosicionInicial = true
            return true
        }
    }
    if (!vueltaAPosicionInicial) {
        var mov = Math.floor(Math.random() * 2)

        if (mov == 1) {
            if (der < 2 && !derecha()) {
                izquierda()

            }
            if (der == 3) {
                der = 0
            }
        }
        else {
            if (izq < 2 && !izquierda()) {
                derecha()
            }
            if (izq == 3) {
                izq = 0
            }       
        }
    }
    if ((x + '' + y) != inicioAspiradora)
        setTimeout(() => { $(td).css('background-color', 'rgb(227, 255, 224)') }, 300)

    movimiento = setTimeout(mover, 500)

if (comprobarRecorridoCompleto()) {
    volver()
}

}

function contador(){

    var inputContaro = document.getElementById("contador")
    inputContaro.value = count++
    
}



function derecha() {

    if (orientacion == 0 && x == (ejeX - 1)) {
        return false;
    }
    if (orientacion == 180 && x == 0) {
        return false;
    }
    if (orientacion == 270 && y == 0) {
        return false;
    }
    if (orientacion == 90 && y == (ejeY - 1)) {
        return false;
    }
    der++
    izq = 0
    if (orientacion == 0) {

        x++
        orientacion = 90
        aspiradora.style.transform = 'rotate(90deg)'
        td = "#" + x + '' + y
        $(document).remove(aspiradora)
        $(td).append(aspiradora)
        setTimeout(limpiar, 200)
        contador()
        return true;

    }
    if (orientacion == 90) {

        y++
        orientacion = 180
        aspiradora.style.transform = 'rotate(180deg)'
        td = "#" + x + '' + y
        $(document).remove(aspiradora)
        $(td).append(aspiradora)
        setTimeout(limpiar, 200)
        contador()
        return true
    }

    if (orientacion == 180) {

        x--
        orientacion = 270
        aspiradora.style.transform = 'rotate(270deg)'
        td = "#" + x + '' + y
        $(document).remove(aspiradora)
        $(td).append(aspiradora)
        setTimeout(limpiar, 200)
        contador()
        return true
    }
    if (orientacion == 270) {

        y--
        orientacion = 0
        aspiradora.style.transform = 'rotate(0deg)'
        td = "#" + x + '' + y
        $(document).remove(aspiradora)
        $(td).append(aspiradora)
        setTimeout(limpiar, 200)
        contador()
        return true
    }


}

function izquierda() {

    if (orientacion == 90 && y == 0) {
        return false;
    }
    if (orientacion == 270 && y == (ejeY - 1)) {
        return false;
    }
    if (orientacion == 180 && x == (ejeX - 1)) {
        return false;
    }
    if (orientacion == 0 && x == 0) {
        return false;
    }
    izq++
    der = 0
    if (orientacion == 0) {

        x--
        orientacion = 270
        aspiradora.style.transform = 'rotate(270deg)'
        td = "#" + x + '' + y
        $(document).remove(aspiradora)
        $(td).append(aspiradora)
        setTimeout(limpiar, 200)
        contador()
        return true;

    }
    if (orientacion == 90) {

        y--
        orientacion = 0
        aspiradora.style.transform = 'rotate(0deg)'
        td = "#" + x + '' + y
        $(document).remove(aspiradora)
        $(td).append(aspiradora)
        setTimeout(limpiar, 200)
        contador()
        return true
    }

    if (orientacion == 180) {

        x++
        orientacion = 90
        aspiradora.style.transform = 'rotate(90deg)'
        td = "#" + x + '' + y
        $(document).remove(aspiradora)
        $(td).append(aspiradora)
        setTimeout(limpiar, 200)
        contador()
        return true
    }
    if (orientacion == 270) {

        y++
        orientacion = 180
        aspiradora.style.transform = 'rotate(180deg)'
        td = "#" + x + '' + y
        $(document).remove(aspiradora)
        $(td).append(aspiradora)
        setTimeout(limpiar, 200)
        contador()
        return true
    }
}





function volver() {
    if (y == inicioY && x > (inicioX - 1) && getOrientacion() == 'izquierda') {
        clearTimeout(movimiento)
        yExMismaLinea()
        return true
    }

    if (y == inicioY && x < (inicioX - 1) && getOrientacion() == 'derecha') {
        clearTimeout(movimiento)
        yExMismaLinea()
        return true
    }

    //Desde aca vuelve cuando se encuentra abajo y a la izquierda mirando hacia arriba
    if (y > inicioY && x == (inicioX - 1) && getOrientacion() == 'arriba') {
        clearTimeout(movimiento)
        yAbajoIzquierdaArribaDerecha()
        return true
    }

    //Desde aca vuelve cuando se encuentra arriba del punto inicial, a la derecha de este mirando abajo
    if (y < inicioY && x == (inicioX + 1) && getOrientacion() == 'abajo') {
        clearTimeout(movimiento)
        yAbajoIzquierdaArribaDerecha()
        return true
    }

//Desde aca vuelve cuando se encuentra abajo y a la derecha mirando hacia arriba
    if (y > inicioY && x == (inicioX +1) && getOrientacion() == 'arriba') {
        clearTimeout(movimiento)
        yAbajoDerechaArribaIzquierda()
        return true
    }
    if (y < inicioY && x == (inicioX -1) && getOrientacion() == 'abajo') {
        clearTimeout(movimiento)
        yAbajoDerechaArribaIzquierda()
        return true
    }

    

    if (x == inicioX && x == y > inicioY && getOrientacion() == 'abajo') {
        clearTimeout(movimiento)
        yExMismaLinea()
        return true
    }   
    if (x == inicioX && y < inicioY && getOrientacion() == 'arriba') {
        clearTimeout(movimiento)
        yExMismaLinea()
        return true
    }


}

function yExMismaLinea() {

    if (!vueltaAPosicionInicial) {
        if (salto == 0) {
            if (secuencia.length == 0 && izqder == 0) {
                secuencia = [1, 1, 0, 0]
            }
            if (secuencia.length == 0 && izqder == 1) {
                secuencia = [0, 0, 1, 1]
            }
            if (secuencia[0] == 1) {
                derecha()
            }
            if (secuencia[0] == 0) {
                izquierda()
            }
            secuencia.shift()
        }

        if (salto != -2 && salto != 0) {
            if (izqder == -1) {

                if (izquierda())
                    izqder = 0

                else if (izqder == -1) {
                    derecha()
                    izqder = 1
                }
            }
            salto = 0
        }

        if (salto == -2)
            salto = -1

        if ((x + '' + y) == inicioAspiradora) {
            clearTimeout(volviendo)
            vueltaAPosicionInicial = true
            return true
        }
        else {
            clearTimeout(movimiento)
            volviendo = setTimeout(yExMismaLinea, 1000)
        }
    }
}

function yAbajoIzquierdaArribaDerecha(){
    if (!vueltaAPosicionInicial) {
        if (salto == 0) {

            if (secuencia.length == 0 && izqder == 1) {
                secuencia = [0, 0, 1, 1]
            }
            if (secuencia[0] == 1) {
                derecha()
            }
            if (secuencia[0] == 0) {
                izquierda()
            }
            secuencia.shift()
        }

        if (salto != -2 && salto != 0) {
            if (izqder == -1) {      
                    derecha()
                    izqder = 1           
            }
            salto = 0
        }

        if (salto == -2)
            salto = -1

        if ((x + '' + y) == inicioAspiradora) {
            clearTimeout(volviendo)
            vueltaAPosicionInicial = true
            ('Proceso terminado')
            return true
        }
        else {
            clearTimeout(movimiento)
            volviendo = setTimeout( yAbajoIzquierdaArribaDerecha, 1000)
        }
    }

}

function yAbajoDerechaArribaIzquierda(){
    if (!vueltaAPosicionInicial) {
        if (salto == 0) {
            if (secuencia.length == 0 && izqder == 0) {
                secuencia = [1, 1, 0, 0]
            }
            if (secuencia[0] == 1) {
                derecha()
            }
            if (secuencia[0] == 0) {
                izquierda()
            }
            secuencia.shift()
        }

        if (salto != -2 && salto != 0) {
            if (izqder == -1) {

                if (izquierda())
                    izqder = 0
            }
            salto = 0
        }

        if (salto == -2)
            salto = -1
        if ((x + '' + y) == inicioAspiradora) {
            clearTimeout(volviendo)
            vueltaAPosicionInicial = true
            ('Proceso terminado')
            return true
        }
        else {
            clearTimeout(movimiento)
            volviendo = setTimeout(yExMismaLinea, 1000)
        }
    }
}

function getOrientacion() {
    if (orientacion == 90) {
        return 'derecha';
    }
    if (orientacion == 270) {
        return 'izquierda';
    }
    if (orientacion == 180) {
        return 'abajo';
    }
    if (orientacion == 0) {
        return 'arriba';
    }
}

function comprobarRecorridoCompleto() {
    if (!arrayPuntosRecorridos.find(tda => tda == td)) {
        arrayPuntosRecorridos.push(td)
    }
    if (arrayPuntosRecorridos.length == ejeX * ejeY) {
        return true
    }
    else
        return false
}

function parar() {
    clearTimeout(movimiento)
}

function continuar() {
    mover()
}
