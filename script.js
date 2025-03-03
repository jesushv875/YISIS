// Archivo principal de la PWA erótica

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').then(registration => {
        console.log('Service Worker registrado con éxito:', registration);
    }).catch(error => {
        console.log('Error al registrar el Service Worker:', error);
    });
}

// Lógica de la ruleta erótica
document.getElementById('spinRoulette').addEventListener('click', function() {
    const posiciones = [
        'Misionero 🔥 - El clásico frente a frente con máxima conexión visual.',
        'Perrito 🐶 - Desde atrás, permitiendo un ritmo más profundo.',
        'Vaquera 🤠 - Ella arriba, dominando el movimiento.',
        '69 😏 - Placer mutuo en una posición invertida.',
        'Loto 🪷 - Sentados entrelazados para una conexión íntima.',
        'Cucharita 🥄 - Acostados de lado, ideal para caricias.',
        'Amazonas 🏇 - Ella arriba inclinada hacia adelante.',
        'Andromaca 🏛️ - Similar a la vaquera, pero con más control.',
        'El tornillo 🔩 - Un giro inesperado con torsión.',
        'El columpio 🎡 - Con apoyo de muebles o resistencia.',
        'Mariposa 🦋 - Piernas elevadas para mayor profundidad.',
        'Tijera ✂️ - Intersección de piernas para un ángulo único.',
        'Arco divino 🎯 - Ella arquea la espalda para estimulación intensa.',
        'El puente 🌉 - Él sostiene su peso con manos y pies.',
        'Dragón alado 🐉 - Una variación intensa del perrito.',
        'Liana 🌿 - Él de pie, ella abrazada a su cintura.',
        'Silla erótica 🪑 - Él sentado, ella sobre él.',
        'El triángulo 🔺 - Piernas entrelazadas para sensaciones nuevas.',
        'Orquídea exótica 🌺 - Estimulación profunda con inclinación.',
        'El anillo de fuego 🔥 - Movimientos circulares y rítmicos.',
        'La estrella fugaz ✨ - Posición lateral para intensidad.',
        'V invertida ⬆️ - Ella apoya manos y pies con inclinación.',
        'Carretilla 🛒 - Él sostiene las piernas de ella en el aire.',
        'El delfín 🐬 - Una variación juguetona de la cucharita.',
        'Péndulo 🕰️ - Balanceo sensual para exploración.',
        'Cabalgata salvaje 🐎 - Movimiento rítmico e intenso.',
        'El ángel caído 👼 - Un giro de 180 grados en la penetración.',
        'Roca sólida 🏔️ - Apoyo en una superficie firme para control.',
        'Pose del loto doble 💞 - Ambos entrelazados en sincronía.',
        'La trenza 🧶 - Enredo sensual de piernas y cuerpos.',
        'Montaña rusa 🎢 - Ritmos cambiantes y emociones intensas.',
        'El cisne negro 🦢 - Elevación elegante para máximo placer.',
        'El anzuelo 🎣 - Una pierna elevada para un ángulo especial.',
        'Péndulo invertido 🔄 - Giros y cambios de dirección.',
        'El guerrero ⚔️ - Ambos en posición fuerte y dominante.',
        'El jaguar 🐆 - Una versión intensa del perrito.',
        'Laberinto 🔀 - Juego de piernas y penetraciones lentas.',
        'El pulpo 🐙 - Movimientos envolventes y múltiples caricias.',
        'El trono real 👑 - Él sentado con ella dominando.',
        'La ola 🌊 - Ritmo ondulante como el mar.',
        'Serpiente encantada 🐍 - Movimientos sinuosos y tentadores.',
        'Muelle 🔄 - Rebotes controlados y profundos.',
        'Cometa 🌠 - Una inclinación aérea estimulante.',
        'Mariposa dorada 🦋 - Elevación y control absoluto.',
        'Eco 🔁 - Ritmo repetitivo y armonioso.',
        'Pose del reloj ⏳ - Ambos en una curva sensual.',
        'La grulla blanca 🦢 - Equilibrio y resistencia.',
        'El candado 🔐 - Piernas entrelazadas en un abrazo.',
        'Marea alta 🌊 - Control absoluto del movimiento.',
        'Espejo 🔲 - Reflejo y juego visual.',
        'El ave fénix 🔥 - Renacer en el placer.',
        'Nube de placer ☁️ - Contacto y ritmo lento.',
        'El relámpago ⚡ - Ráfagas de intensidad.',
        'Cinturón de Venus 💫 - Giros y cambios sutiles.',
        'La perla negra ⚫ - Exploración profunda.',
        'El remolino 🌪️ - Cambios de dirección continuos.',
        'Río ardiente 🔥 - Corrientes de deseo.',
        'Pico de montaña 🏔️ - Elevación máxima.',
        'Caricia celestial ✨ - Contacto total.',
        'Cueva secreta 🏚️ - Movimientos sigilosos.',
        'La flecha de Cupido 🏹 - Intensidad apasionada.',
        'Cruz de fuego 🔥 - Fusión total.',
        'Explosión estelar 💥 - Final perfecto.',
    ];
    const resultado = posiciones[Math.floor(Math.random() * posiciones.length)];
    document.getElementById('rouletteResult').innerText = `¡Prueba esta posición: ${resultado}!`;
});

// Lógica de los dados sexuales
document.getElementById('rollDice').addEventListener('click', function() {
    const acciones = ['Besar 💋', 'Lamer 👅', 'Morder 😈', 'Acariciar 🤲'];
    const zonas = ['Cuello 🧣', 'Labios 💋', 'Oreja 👂', 'Pecho 🍑', 'Espalda 🖐️'];
    
    const accion = acciones[Math.floor(Math.random() * acciones.length)];
    const zona = zonas[Math.floor(Math.random() * zonas.length)];
    
    document.getElementById('diceResult').innerText = `¡${accion} en ${zona}!`;
});
