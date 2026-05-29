// 1. Guardamos en variables los elementos que queremos controlar
const botonLogo = document.getElementById('btn-comenzar');
const portada = document.getElementById('portada');
const horaLocalSpan = document.getElementById('hora-local');

// 2. Escuchamos cuando el usuario hace clic (o tap) en el logo central
botonLogo.addEventListener('click', () => {
    // Le agregamos la clase CSS que desplaza la portada hacia arriba
    portada.classList.add('portada-abierta');
});

// 3. 🌍 PLUS INTERNACIONAL: Detectar el país del invitado y adaptar la hora
function adaptarHoraEvento() {
    // Hora base del evento: 22 de Octubre de 2026 a las 20:00 en hora de Chile (UTC-4)
    const fechaEventoChile = new Date('2026-10-22T20:00:00-04:00');

    // Usamos la API del navegador para obtener la zona horaria del celular del invitado
    const zonaHorariaInvitado = Intl.DateTimeFormat().resolvedOptions().timeZone;

    // Formateamos la hora para que se muestre al estilo local del invitado
    const opcionesFormat = {
        hour: '2-digit',
        minute: '2-digit',
        timeZoneName: 'short'
    };

    const horaLocalFormateada = new Intl.DateTimeFormat(navigator.language, opcionesFormat).format(fechaEventoChile);

    // Reemplazamos el texto en la invitación con su hora local adaptada
    if(horaLocalSpan) {
        horaLocalSpan.innerHTML = `${horaLocalFormateada} <sub>(Adaptado a tu hora local)</sub>`;
    }
}

// 4. ⏳ RELOJ DE CUENTA REGRESIVA DINÁMICA
function inicializarCuentaRegresiva() {
    // Fecha objetivo: 22 de Octubre de 2026, 00:00:00 UTC-4
    const fechaObjetivo = new Date('2026-10-22T00:00:00-04:00').getTime();

    const intervalo = setInterval(() => {
        const ahora = new Date().getTime();
        const distancia = fechaObjetivo - ahora;

        // Si la fecha ya llegó o pasó
        if (distancia < 0) {
            clearInterval(intervalo);
            const relojElemento = document.getElementById('cuenta-regresiva');
            if(relojElemento) {
                relojElemento.innerHTML = "<p style='color: #e5c158; font-size: 0.85rem; font-weight: bold;'>¡El encuentro ha comenzado!</p>";
            }
            return;
        }

        // Cálculos de tiempo
        const dias = Math.floor(distancia / (1000 * 60 * 60 * 24));
        const horas = Math.floor((distancia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutos = Math.floor((distancia % (1000 * 60 * 60)) / (1000 * 60));
        const segundos = Math.floor((distancia % (1000 * 60)) / 1000);

        // Renderizado seguro verificando que existan los IDs
        if(document.getElementById('dias')) {
            document.getElementById('dias').innerText = dias < 10 ? '0' + dias : dias;
            document.getElementById('horas').innerText = horas < 10 ? '0' + horas : horas;
            document.getElementById('minutos').innerText = minutos < 10 ? '0' + minutos : minutos;
            document.getElementById('segundos').innerText = segundos < 10 ? '0' + segundos : segundos;
        }

    }, 1000);
}

// Ejecutamos las funciones apenas cargue la página
adaptarHoraEvento();
inicializarCuentaRegresiva();