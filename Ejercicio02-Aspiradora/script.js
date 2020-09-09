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

var pararvolver

var inicioX
var inicioY

var arrayPuntosRecorridos = new Array()

function crearTabla() {
    ejeX = Math.floor(Math.random() * 8) + 2
    ejeY = Math.floor(Math.random() * 8) + 2

    var tabla = document.getElementById('table')

    for (y = 0; y < ejeY; y++) {
        var tr = document.createElement('tr')

        for (x = 0; x < ejeX; x++) {

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
    //alert(inicioAspiradora)

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
        var vol = volver()
        if (vol != false) {
            alert(vol)

            switch (vol) {

                case 'der': yIzquierda()
                    break;

                case 'izq': yDerecha()
                    break;
                case 'abajo': yAbajo()
                    break;
                case 'abajoIzq': yAbajoIzq()
                    break;
                case 'abajoDer': yAbajoDer()
                    break;

            }



            return true
        }
    }

    var mov = Math.floor(Math.random() * 2)

    if (mov == 1) {
        if (der < 2 && !derecha()) {
            izquierda()

        }

    }

    else {
        if (izq < 2 && !izquierda()) {
            derecha()

        }


    }
    setSecuencia()
    if (x + '' + y != inicioAspiradora)
        setTimeout(() => { $(td).css('background-color', 'rgb(227, 255, 224)') }, 300)



    movimiento = setTimeout(mover, 500)



}

function comprobarRecorridoCompleto() {
    if (!arrayPuntosRecorridos.find(tda => tda == td)) {
        // alert(arrayPuntosRecorridos)
        arrayPuntosRecorridos.push(td)
    }
    if (arrayPuntosRecorridos.length == ejeX * ejeY) {
        //alert(arrayPuntosRecorridos.length + ' :' + arrayPuntosRecorridos)
        return true
    }
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
        return true
    }
}





function volver() {

    if (y == inicioY && getOrientacion() == 'izquierda') {
        clearTimeout(movimiento)
        return 'izq'
    }
    if (y == inicioY && x == inicioX - 1 && getOrientacion() == 'derecha') {
        clearTimeout(movimiento)
        return 'der'
    }
    if (y < inicioY && x == inicioX && getOrientacion() == 'abajo') {
        clearTimeout(movimiento)
        return 'abajo'
    }

    if (y < inicioY &&  x == inicioX - 1 && getOrientacion() == 'abajo') {
        clearTimeout(movimiento)
        return 'abajoIzq'
    }
    if (y < inicioY &&  x == inicioX + 1 && getOrientacion() == 'abajo') {
        clearTimeout(movimiento)
        return 'abajoDer'
    }

    if (y > inicioY && x == inicioX  && getOrientacion() == 'arriba') {
        clearTimeout(movimiento)
        return 'arriba'
    }
    if (y > inicioY && x == inicioX -1  && getOrientacion() == 'arriba') {
        clearTimeout(movimiento)
        return 'arribaIzq'
    }
    if (y > inicioY && x == inicioX +1  && getOrientacion() == 'arriba') {
        clearTimeout(movimiento)
        return 'arribaDer'
    }

    return false
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

function yIzquierda() {
alert('yIzquierda')
    if (izquierda()) {
        while (x + '' + y != inicioAspiradora) {
            derecha()
            derecha()
            if (x + '' + y != inicioAspiradora)
                break;

            izquierda()
            if (x + '' + y != inicioAspiradora)
                break;
            izquierda()
        }
    }
    else {
        derecha()
        while (x + '' + y != inicioAspiradora) {



            izquierda()
            izquierda()
            if (x + '' + y != inicioAspiradora)
                break;
            derecha()
            if (x + '' + y != inicioAspiradora)
                break;
            derecha()
        }
    }

}

function yDerecha() {
    alert('yDerecha')
    if (izquierda()) {
        while (x + '' + y != inicioAspiradora) {
            derecha()
            derecha()
            if (x + '' + y != inicioAspiradora)
                break;

            izquierda()
            if (x + '' + y != inicioAspiradora)
                break;
            izquierda()
        }
    }
    else {
        derecha()
        while (x + '' + y != inicioAspiradora) {



            izquierda()
            izquierda()
            if (x + '' + y != inicioAspiradora)
                break;
            derecha()
            if (x + '' + y != inicioAspiradora)
                break;
            derecha()
        }
    }


}

function yAbajo() {
    alert('yAbajo')
    if (izquierda()) {
        while (x + '' + y != inicioAspiradora) {
            derecha()
            derecha()
            if (x + '' + y != inicioAspiradora)
                break;

            izquierda()
            if (x + '' + y != inicioAspiradora)
                break;
            izquierda()
        }
    }
    else {
        derecha()
        while (x + '' + y != inicioAspiradora) {



            izquierda()
            izquierda()
            if (x + '' + y != inicioAspiradora)
                break;
            derecha()
            if (x + '' + y != inicioAspiradora)
                break;
            derecha()
        }
    }


}

function yAbajoIzq() {

    alert('yAbajoIzq')
    derecha()
    while (x + '' + y != inicioAspiradora) {



        izquierda()
        izquierda()
        if (x + '' + y != inicioAspiradora)
            break;
        derecha()
        if (x + '' + y != inicioAspiradora)
            break;
        derecha()
    }




}

function yAbajoDer(){
    alert('yAbajoDer')
    izquierda()
        while (x + '' + y != inicioAspiradora) {
            derecha()
            derecha()
            if (x + '' + y != inicioAspiradora)
                break;

            izquierda()
            if (x + '' + y != inicioAspiradora)
                break;
            izquierda()
        }
    


}

function yArriba(){

    alert('yArriba')
    if (izquierda()) {
        while (x + '' + y != inicioAspiradora) {
            derecha()
            derecha()
            if (x + '' + y != inicioAspiradora)
                break;

            izquierda()
            if (x + '' + y != inicioAspiradora)
                break;
            izquierda()
        }
    }
    else {
        derecha()
        while (x + '' + y != inicioAspiradora) {



            izquierda()
            izquierda()
            if (x + '' + y != inicioAspiradora)
                break;
            derecha()
            if (x + '' + y != inicioAspiradora)
                break;
            derecha()
        }
    }
}

function yArribaIzq(){
    alert('yArriba')


    izquierda()) 
        while (x + '' + y != inicioAspiradora) {
            derecha()
            derecha()
            if (x + '' + y != inicioAspiradora)
                break;

            izquierda()
            if (x + '' + y != inicioAspiradora)
                break;
            izquierda()
        
    }
    
    
}

function yArribaDerecha(){

    derecha()
    while (x + '' + y != inicioAspiradora) {



        izquierda()
        izquierda()
        if (x + '' + y != inicioAspiradora)
            break;
        derecha()
        if (x + '' + y != inicioAspiradora)
            break;
        derecha()
    }
}

function parar() {
    clearTimeout(movimiento)

}

function continuar() {
    mover()
}
