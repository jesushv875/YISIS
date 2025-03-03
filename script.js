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
        { nombre: 'El prisionero 👮🏽‍♂️', descripcion: 'La persona que está arrestada puede bajar o elevar la cabeza, según le parezca más cómodo.', imagen: 'img/prisionero.webp' },
        { nombre: 'La Libelula 🐞', descripcion: ' Mientras practica un oral, permanece recostado y puede masturbarse. ', imagen: 'img/libelula.webp' },
        { nombre: 'El sapo 🐸', descripcion: 'La idea inicial es que ambos estén de cuclillas, pero pueden simplificarlo al arrodillarse como en la imagen.', imagen: 'img/sapo.webp' },
        { nombre: 'El perezoso 🦥', descripcion: 'Debes bajar hasta la zona íntima de tu pareja y pedirle que abra sus piernas. Luego, solo tienes que recostarte boca abajo y hacer un buen sexo oral con la lengua y las manos.', imagen: 'img/perezoso.webp' },
        { nombre: 'La incansable 😎', descripcion: 'Estar ambos recostados, uno encima del otro.', imagen: 'img/incansable.webp' },
        { nombre: 'El capitán 🧑🏽‍✈️', descripcion: 'Ella debe recostarse y abrir sus piernas lo más que pueda, mientras la otra la toma de los pies y la penetra.', imagen: 'img/capitan.webp' },
        { nombre: 'La cascada 🌊', descripcion: 'Es fundamental que lo hagan en el borde de la cama. El estará arrodillado, mientra que ella le colocará sus piernas arriba de los hombros y dejará caer su cabeza hacia el suelo.', imagen: 'img/cascada.webp' },
        { nombre: 'El doblez 📄', descripcion: 'Se deben abrarzar las piernas e intentar juntar el pecho de ambos lo que más se pueda.', imagen: 'img/doblez.webp' },
        { nombre: 'Sobre la mesa 🍽️', descripcion: 'Basta con que ella se acueste boca arriba con las piernas abiertas, mientras que el otro procede con la penetración.', imagen: 'img/mesa.webp' },
        { nombre: 'Desde atrás 🛏️', descripcion: 'Para que funcione, quien penetra desde atrás debe estar parado, mientras la pareja se ubica arrodillada lo más cerca que pueda.', imagen: 'img/desde-atras.webp' },
        { nombre: 'Sentados de espalda 🪑', descripcion: 'En esta, ambos estarán sentados, pero uno lo hará sobre el regazo de su pareja, de espaldas. Por lo tanto, la penetración ocurre por detrás. ', imagen: 'img/sentados-espalda.webp' },
        { nombre: 'El mercenario 🥷🏽', descripcion: 'Ambos deben estar acostados uno sobre el otro, mirándose de frente. ', imagen: 'img/mercenario.webp' },
        { nombre: 'La cruz ✝️', descripcion: 'El estará de pie frente a ti y sostendrá las piernas para que no bajen o se abran. ', imagen: 'img/cruz.webp' },
        { nombre: 'Contra la pared 🚧', descripcion: 'Uno de la pareja debe rodear con sus brazos y piernas al otro.', imagen: 'img/contra-pared.webp' },
        { nombre: 'Lapdance 🧎🏽‍➡️', descripcion: 'Uno se sienta con las piernas recogidas y su pareja hace lo mismo sobre su regazo.', imagen: 'img/lapdance.webp' },
        { nombre: 'Nirvana 😊', descripcion: 'La pareja debe mantener sus piernas cerradas, lo que dificulta que el pene ingrese.', imagen: 'img/nirvana.webp' },
        { nombre: 'El escorpión 🦂', descripcion: 'La persona que se ubica debajo tiene que colocar un almohadón bajo su barriga.', imagen: 'img/escorpion.webp' },
        { nombre: 'La gran L 🎋', descripcion: 'Ella estará recostada de lado e intentará elevar su pierna superior lo más alto que pueda.', imagen: 'img/gran-l.webp' },
        { nombre: 'Oral en ella 👅', descripcion: 'Deja que tu lengua hable, escucha sus respiraciones o gemidos.', imagen: 'img/oral-mujer.webp' },
        { nombre: 'La escultura de hielo 🧊', descripcion: 'Permite tanto sexo vaginal como anal.', imagen: 'img/hielo.webp' },
        { nombre: 'Misionero invertido 🔄', descripcion: ' Esta persona debe acostarse boca arriba, mientras el se apoya sobre ella boca abajo en sentido opuesto.', imagen: 'img/misionero-invertido.webp' },
        { nombre: 'Asiento de atrás 💺', descripcion: ' Ella debe acostarse boca abajo con las piernas estiradas y el torso un poco elevado. Mientras tanto el, debe sentarse debajo de los glúteos.', imagen: 'img/asiento.webp' },
        { nombre: 'Al borde de la cama 🛏️', descripcion: ' Ubíquense en cuatro en el borde de la cama y dejen caer una pierna hacia el suelo.', imagen: 'img/al-borde.webp' },
        { nombre: 'El balancín ⚖️', descripcion: ' Quien está abajo debe sujetarse tan fuerte como para moverse junto con la pareja.', imagen: 'img/balancin.webp' },
        { nombre: 'Destornillador 🔩', descripcion: ' Se colocan como para tener relaciones por atrás, pero el cruza una pierna por delante., para sostener la cadera de ella.', imagen: 'img/destornillador.webp' },
        { nombre: 'Sobre regazo al borde 🛏️', descripcion: ' El debe sentarse al borde, mientras ella lo hace de cuclillas sobre su regazo.', imagen: 'img/regazo-cama.webp' },
        { nombre: 'De lado 🛏️', descripcion: '  Colóquense de lado y diviértanse con las caricias, besos y la penetración.', imagen: 'img/de-lado.webp' },
        { nombre: 'Cucharita con la pierna arriba 🥄', descripcion: '  La persona que da las espaldas debe elevar su pierna.', imagen: 'img/cucharita-pierna-arriba.webp' },
        { nombre: 'Nirvana elevado 🎢', descripcion: ' Si les resulta complejo lograr la cópula, la persona sumisa puede abrir un poco sus piernas.', imagen: 'img/nirvana-elevado.webp' },
        { nombre: 'El trineo 🛷', descripcion: ' El debe sentarse y sostener el peso de su amante en el regazo.', imagen: 'img/trineo.webp' },
        { nombre: 'Puertas nacaradas 🚪', descripcion: ' La diferencia con otras posturas eróticas es que sus caderas estarán un poco elevadas.', imagen: 'img/puertas.webp' },
        { nombre: 'Oral invertido 😋', descripcion: '  Ayúdalo colocando tus manos detrás de tu espalda para reducir el peso de tu cuerpo.', imagen: 'img/oral-invertido.webp' },
        { nombre: 'La puerta trasera 🚪', descripcion: 'Ella tiene que elevar uno de sus pies y sostenerlo con su mano.', imagen: 'img/entrada-trasera.webp' },
        { nombre: 'La plancha 🌙', descripcion: 'La clave está en que ambos estiren bien sus piernas.', imagen: 'img/plancha.webp' },
        { nombre: 'Entrelazado 💝', descripcion: 'El debe arrodillarse, mientras ella está recostada con los pies elevados frente a él.', imagen: 'img/entrelazados.webp' },
        { nombre: 'Acurrucados 💝', descripcion: 'Ella estará arriba, en cuatro apoyos. A su vez, el se colocará abajo y atraerá a su pareja hacia su pecho con ayuda de sus piernas.', imagen: 'img/acurrucados.webp' },
        { nombre: 'El toro furioso 🐂', descripcion: 'Este modo de practicar el oral requiere que ella se coloque boca arriba con las palmas de sus manos en el suelo.', imagen: 'img/toro.webp' },
        { nombre: 'El elefante 🐘', descripcion: 'El se coloca de rodillas. Ella se subirá a su regazo, abrazándolo con las piernas y los brazos.', imagen: 'img/elefante.webp' },
        { nombre: 'Arrodillado 🧎🏽', descripcion: 'Es posible apoyar una de las manos en el suelo para mantener el balance.', imagen: 'img/rodillas.webp' },
        { nombre: 'Control de traccion 🏎️', descripcion: 'Ella acostará sobre un lado para recibir a el desde atrás.', imagen: 'img/traccion.webp' },
        { nombre: 'Banana split 🍌', descripcion: 'Ella estará boca abajo con las piernas bien abiertas (lo más abiertas que pueda). El la penetrará desde atrás, ya sea de forma vaginal o anal.', imagen: 'img/banana.webp' },
        { nombre: 'Nelson completo 😈', descripcion: 'El debe permanecer boca arriba. Ahora bien, la parte fundamental es que sostenga las piernas con los brazos y las lleve hacia sí.', imagen: 'img/nelson.webp' },
        { nombre: 'Sagitario ♐️', descripcion: 'Tu pareja te ayudará a mantener la pierna en alto al mismo tiempo que te penetra desde atrás. Puedes sostenerte de algún mueble o de la pared para mantener el equilibrio.', imagen: 'img/sagitario.webp' },
        { nombre: 'La comoda reinventada', descripcion: 'Es muy semejante a «la cómoda», pero su diferencia radica en que la persona de abajo debe apoyar su cabeza en el suelo y elevar la pelvis.', imagen: 'img/comoda-reinventada.webp' },
        { nombre: 'Dominante 😎', descripcion: 'Debe acercar los glúteos de su pareja y permitirle que se doble en 90 grados.', imagen: 'img/dominante.webp' },
        { nombre: 'Perrito hacia abajo 🐩', descripcion: 'El debe tomar una de sus manos y sujetarla por detrás de su espalda.', imagen: 'img/perrito-abajo.webp' },
        { nombre: 'Vaquera Inclinada 🤠', descripcion: 'Para inclinarse hacia adelante, es recomendable colocar ambos brazos estirados a ambos lados de la cabeza del compañero.', imagen: 'img/vaquera-inclinada.webp' },
        { nombre: 'Tumbados en direcciones opuestas ↔️', descripcion: ' El tiene que recostarse boca arriba con las piernas abiertas y las manos bajo su nuca. Ella se agarrará de las piernas, por lo que quedará de espaldas.', imagen: 'img/opuestos.webp' },
        { nombre: 'Pose Aries 🐏', descripcion: 'Deberás apoyar la palma de una de tus manos sobre el suelo. Mientras tienen relaciones, puedes sujetarla con la otra mano y acompañarla a su ritmo.', imagen: 'img/aries.webp' },
        { nombre: 'El tigre 🐅', descripcion: ' En «el tigre», quien está abajo recibe a su amante sobre su pelvis de frente a él y coloca las palmas de sus manos sobre sus rodillas.', imagen: 'img/tigre.webp' },
        { nombre: 'El bambú partido 🎋', descripcion: ' En esta oportunidad la persona que está acostada no tiene que colocar la otra pierna estirada abajo de su pareja.', imagen: 'img/bambu.webp' },
        { nombre: 'La araña 🕷️', descripcion: '  Boca arriba, deben apoyar sus manos o codos en el suelo y pasar sus piernas flexionadas por afuera de las caderas.', imagen: 'img/arana.webp' }
    ];
    const resultado = posiciones[Math.floor(Math.random() * posiciones.length)];
    document.getElementById('rouletteResult').innerHTML = `<strong>${resultado.nombre}</strong><br>${resultado.descripcion}<br><img src="${resultado.imagen}" alt="${resultado.nombre}" width="200">`;
});

// Lógica de los dados sexuales
document.getElementById('rollDice').addEventListener('click', function() {
    const accionesGenerales = ['Besar 💋', 'Lamer 👅', 'Morder 😈', 'Acariciar 🤲', 'Chupar 👄', 'Estimular con la mano ✋'];
    const accionesPenetracion = ['Penetrar 🍆💦', 'Frotar intensamente 🔥'];
    const zonasGenerales = ['Cuello 🧣', 'Labios 💋', 'Oreja 👂', 'Pecho 🍑', 'Espalda 🖐️', 'Muslos 🔥'];
    const zonasPenetrables = ['Boca 👄', 'Vagina 💦', 'Clítoris 🌸', 'Ano 🍑'];
    
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


document.getElementById('truthButton').addEventListener('click', function() {
    const verdades = [
        { pregunta: '¿Cuál es tu fantasía más secreta?' },
        { pregunta: '¿Cuál es tu posisión sexual favorita?' },
        { pregunta: 'Si pudieras probar algo nuevo en la cama, ¿qué sería?' },
        { pregunta: '¿Cuál ha sido el lugar más atrevido donde te gustaría tener sexo?' },
        { pregunta: '¿Qué parte de tu cuerpo te gusta más que te estimulen?' },
        { pregunta: '¿Cuál es tu juguete sexual favorito?' },
        { pregunta: '¿Te gusta el sexo en lugares públicos? ¿Dónde te atreverías?' },
        { pregunta: '¿Qué parte de mi cuerpo te gusta más?' },
        { pregunta: '¿Te gustaría probar el BDSM (Juego de amarres con cuardas)? ¿Hasta qué nivel?' },
        { pregunta: '¿De que tegustaría que se disfrasara tu pareja?' },
        { pregunta: '¿Prefieres el sexo romántico o rudo? ¿Por qué?' },
        { pregunta: '¿Alguna vez te han pillado en el acto? ¿Qué hiciste?' },
        { pregunta: '¿Qué te excita más: dominar o ser dominado/a?' },
        { pregunta: '¿Qué tipo de contenido erótico te excita más? (Películas, relatos, hentai, BDSM, etc.)' }
    ];
    
    const resultado = verdades[Math.floor(Math.random() * verdades.length)];
    document.getElementById('gameResult').innerHTML = `<strong>Verdad:</strong> ${resultado.pregunta}`;
});

document.getElementById('dareButton').addEventListener('click', function() {
    const retos = [
        { desafio: 'Besa a tu pareja durante 30 segundos sin tocarla.' },
        { desafio: 'Hazle un striptease sensual.' },
        { desafio: 'Realiza un masaje erótico durante 2 minutos.' },
        { desafio: 'Lame una parte del cuerpo de tu pareja elegida por ella/él.'},
        { desafio: 'Susurra algo muy caliente al oído de tu pareja.'},
        { desafio: 'Tira los dados y cumple lo que salga.' },
        { desafio: 'Gira la ruleta y prueba la posición que salga.' },
        { desafio: 'Elijan un video XXX y traten de hacer lo mismo.' },
        { desafio: 'Tócate frente a tu pareja sin que te toque' },
        { desafio: 'Quítate una prenda lentamente mientras tu pareja observa.' },
        { desafio: 'Chupa o muerde suavemente el lóbulo de la oreja de tu pareja.' },
        { desafio: 'Ata las manos de tu pareja, lame su oreja, respira, besala y lame.' },
        { desafio: 'Esposa las manos de tu pareja y empieza a besar del cuello hasta la zona pelvica.' },
        { desafio: 'Quita la prenda de abajo y empieza a besarme por encima.' },
        { desafio: 'Intenta adivinar cuando fue la última vaz que el/ella se  masturbó.' },
        { desafio: 'Desliza un dildo o juguete sexual sobre la piel de ella sin penetración.' },
        { desafio: 'Usa lubricante y estimula a tu pareja durante 2 minutos sin penetración.' },
        { desafio: 'Ata suavemente las muñecas de tu pareja y dale placer sin que pueda moverse.' },
        { desafio: 'Chupa y lame los pezones de ella hasta que gima de placer.' },
        { desafio: 'Dale sexo oral a tu pareja durante 1 minuto sin detenerte.' },
        { desafio: 'Prueba una nueva posición del Kamasutra que nunca hayan intentado.' },
        { desafio: 'Ingresa plug anal a ella por 5 minutos y describe la sensación.' },
        { desafio: 'Besos intensos por 2 minutos sin que ninguna otra parte del cuerpo se toque.' },
        { desafio: 'Recibe una nalgada con la intensidad que tu pareja elija.' },
        { desafio: 'Estimula el clítoris o el pene de tu pareja sin que llegue al orgasmo durante 3 minutos.' },
        { desafio: 'Usa una pluma o un trozo de tela para recorrer todo el cuerpo de ella.' }



    ];
    
    const resultado = retos[Math.floor(Math.random() * retos.length)];
    document.getElementById('gameResult').innerHTML = `<strong>Reto:</strong> ${resultado.desafio}`;
});


