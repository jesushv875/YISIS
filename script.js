// Archivo principal de la PWA erótica

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').then(registration => {
        console.log('Service Worker registrado con éxito:', registration);
    }).catch(error => {
        console.log('Error al registrar el Service Worker:', error);
    });
}

document.getElementById('spinRoulette').addEventListener('click', function() {
    const posiciones = [
        { nombre: 'Misionero 🔥', descripcion: 'El clásico frente a frente con máxima conexión visual.', imagen: 'img/misionero.webp' },
        { nombre: 'Perrito 🐶', descripcion: 'Desde atrás, permitiendo un ritmo más profundo.', imagen: 'img/perrito.webp' },
        { nombre: 'Vaquera 🤠', descripcion: 'Ella arriba, dominando el movimiento.', imagen: 'img/vaquera.webp' },
        { nombre: '69 😏', descripcion: 'Placer mutuo en una posición invertida.', imagen: 'img/69.webp' },
        { nombre: 'Loto 🪷', descripcion: 'Sentados entrelazados para una conexión íntima.', imagen: 'img/loto.webp' },
        { nombre: 'Cucharita 🥄', descripcion: 'Acostados de lado, ideal para caricias.', imagen: 'img/cucharita.webp' },
        { nombre: 'Amazonas 🏇', descripcion: 'Ella arriba inclinada hacia adelante.', imagen: 'img/amazona.webp' },
        { nombre: 'De pie🏇', descripcion: 'El la carga mientras la penetra.', imagen: 'img/pie.webp' },
        { nombre: 'Andromaca 🏛️', descripcion: 'Similar a la vaquera, pero con más control.', imagen: 'img/andromaca.webp' },
        { nombre: 'El trono 🪑 ', descripcion: 'Ella se sienta encima de el.', imagen: 'img/trono.webp' },
        { nombre: 'Tijera ✂️ ', descripcion: 'Intersección de piernas para un ángulo único.', imagen: 'img/tijera.webp' },
        { nombre: 'El puente 🌉', descripcion: 'Él sostiene su peso con manos y pies.', imagen: 'img/puente.webp' },
        { nombre: 'Unión de la abeja 🐝', descripcion: 'El permanece recostado, ella se sienta encima de costado.', imagen: 'img/abeja.webp' },
        { nombre: 'Vaquera Invertido 🤠', descripcion: 'Ella arriba de espaldas a la pareja con las piernas a los lados.', imagen: 'img/vaquera-invertido.webp' },
        { nombre: 'El arquero 🏹', descripcion: 'Ella arriba de el cruzando la pierna.', imagen: 'img/arquero.webp' },
        { nombre: 'Parados pierna arriba 🧍🏼🧍🏽‍♀️', descripcion: 'Ella debe elevar su pierna por el costado del cuerpo de el.', imagen: 'img/parado-pierna-arriba.webp' },
        { nombre: 'Perrito tumbado', descripcion: 'Ella se acuesta boca abajo y el la penetra.', imagen: 'img/perrito-tumbado.webp' },
        { nombre: 'De espaldas 🧍🏼🧍🏽‍♀️', descripcion: 'Ambos de pie y ella de espalda.', imagen: 'img/espaldas.webp' },
        { nombre: 'Oral Parado  🧎🏼‍♀️‍➡️ 🧍🏼', descripcion: 'Ella debe estar incada dando oral', imagen: 'img/oral-parado.webp' },
        { nombre: 'Eros ❤️‍🔥', descripcion: 'Las piernas elevadas mejoran el ángulo', imagen: 'img/eros.webp' },
        { nombre: 'Regalo de  navidad  🎁', descripcion: 'Cárgala de forma suave hacia tu pecho', imagen: 'img/regalo.webp' },
        { nombre: 'Launch Pad 🫨', descripcion: ' Como las manos de quien está debajo quedan libres, es perfecta para masturbarse y, así, alcanzar el orgasmo', imagen: 'img/launch.webp' },
        { nombre: 'La princesa 👸🏻', descripcion: ' Uno de los dos debe sentarse sobre sus piernas y apoyar las palmas de sus manos detrás. Mientras tanto, el otro está acostado y penetra por detrás.', imagen: 'img/princesa.webp' },
        { nombre: 'Oral Piramide 🛕', descripcion: 'Ella debe acostarse y, con ayuda de la pareja, elevar sus piernas hasta que queden sobre los hombros de la pareja.', imagen: 'img/oral-piramide.webp' },
        { nombre: 'Mantequilla 🧈', descripcion: 'Ella uno de los dos debe acostarse y llevar sus piernas hacia la cabeza.', imagen: 'img/mantequilla.webp' }, 

    ];
    const resultado = posiciones[Math.floor(Math.random() * posiciones.length)];
    document.getElementById('rouletteResult').innerHTML = `<strong>${resultado.nombre}</strong><br>${resultado.descripcion}<br><img src="${resultado.imagen}" alt="${resultado.nombre}" width="200">`;
});

// Lógica de los dados sexuales
document.getElementById('rollDice').addEventListener('click', function() {
    const accionesGenerales = ['Besar 💋', 'Lamer 👅', 'Morder 😈', 'Acariciar 🤲', 'Chupar 👄', 'Estimular con la mano ✋'];
    const accionesPenetracion = ['Penetrar 🍆💦', 'Frotar intensamente 🔥'];
    const zonasGenerales = ['Cuello 🧣', 'Labios 💋', 'Oreja 👂', 'Pecho 🍑', 'Espalda 🖐️', 'Muslos 🔥'];
    const zonasPenetrables = ['Pene 🍆', 'Vagina 💦', 'Clítoris 🌸', 'Ano 🍑'];
    
    let accion, zona;
    if (Math.random() < 0.3) { // 30% de probabilidad de obtener una acción de penetración
        accion = accionesPenetracion[Math.floor(Math.random() * accionesPenetracion.length)];
        zona = zonasPenetrables[Math.floor(Math.random() * zonasPenetrables.length)];
    } else { // 70% para acciones generales
        accion = accionesGenerales[Math.floor(Math.random() * accionesGenerales.length)];
        zona = zonasGenerales[Math.floor(Math.random() * zonasGenerales.length)];
    }
    
    document.getElementById('diceResult').innerText = `¡${accion} en ${zona}!`;
});
