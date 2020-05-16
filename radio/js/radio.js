var count = 0; 
var num = 0;
var enrere = false;

window.onload = function() {
    // Canvia el numero de la diapo per la que vas
    cambiarNumero();

    document.getElementById('adelante').onclick = function () {
        // Següent diapositiva
        animacionDelante();
    }

    document.getElementById('atras').onclick = function () {
        // Anterior diapositiva
        anmacionAtras();
    }
}

function animacionDelante() {    
    var currentLeft = parseInt(document.getElementsByClassName("vl")[0].style.left) || 24;
    var valor = currentLeft;

    count ++;

    // Moure la linea verda per mostrar per quina diapo va l'usuari
    if (count == 1) {
        valor = currentLeft + 6.5 + "vh";
    }
    else if (count > 1 && count <= 6) {
        valor = currentLeft + 16 + "vh";
    }
    else if (count >= 7 && count <= 10) {
        valor = currentLeft + 15 + "vh";
    }
    else {
        valor = 24 + "vh";
        count = 0;
    }

    document.getElementsByClassName("vl")[0].style.left = valor;

    // Mostrar el pdf corresponent
    mostrarPDF();

    // Canvia el numero de la diapo per la que vas
    cambiarNumero();
}

function anmacionAtras() {
    if (count > 0 || num > 0) {
        var currentLeft = parseInt(document.getElementsByClassName("vl")[0].style.left) || 24;
        var valor = currentLeft;
    
        if (count >= 1 && count <= 10) {
            if (count == 2 || count == 3) {
                valor = currentLeft - 7.5 + "vh";
            }
            else if (count >= 4 && count <= 10) {
                valor = currentLeft - 15 + "vh";
            }
            else {
                valor = currentLeft - 7.5 + "vh";
            }

            if (count < 3) {
                valor = 24 + "vh";
                count = 0;
            }
        }
        else {
            valor = 24 + "vh";
            count = 0;
        }
    
        document.getElementsByClassName("vl")[0].style.left = valor;
    
        enrere = true;

        num --;
        count -= 2;
        
        if (num < 0 || count < 0) {
            num = 0;
            count = 0;
        }

        // Mostrar el pdf corresponent
        mostrarPDF();

        // Canvia el numero de la diapo per la que vas
        cambiarNumero();
    }
}

function mostrarPDF() {
    var imgURL = "";

    if (enrere) {
        count --;
        enrere = false;
    }
    else {
        num ++;
    }

    for (var i=1; i<=2; i++) {
        var divPresentacio = document.getElementById("presentacio"+i);
    
        if (count > 0) {
            imgURL = "./img/pdf/pp_" + count + ".jpg";       
            divPresentacio.className = "imgPresentacio";
            divPresentacio.style.backgroundImage = "url(" + imgURL + ")";
            divPresentacio.style.backgroundRepeat = "no-repeat";
            divPresentacio.style.backgroundSize = 100 + "%";

            if (i == 1) {
                count ++;
            }
        }
        else {
            divPresentacio.style.backgroundImage = imgURL;
        }
    }
}

function cambiarNumero() {
    var divBoxNumero = document.getElementById('box_numero');
    var existNumeroCount = document.getElementById('numeroCount');

    if (existNumeroCount) {
        existNumeroCount.parentNode.removeChild(existNumeroCount);
    }

    var divNumeroCount = document.createElement('div');

    divNumeroCount.setAttribute('id', 'numeroCount');
    divBoxNumero.appendChild(divNumeroCount);

    if (count == 0) {
        num = 0;
    }

    var afegirCount = document.createTextNode(num);
    divNumeroCount.appendChild(afegirCount);
}