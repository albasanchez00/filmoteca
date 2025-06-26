const catalogo = [
    {
        image: "/media/The-Shawshank-Redemption.jpg",
        nombre: "The Shawshank Redemption",
        descripcion: "Un banquero es condenado injustamente por el asesinato de su esposa y encuentra la esperanza y la redención dentro de los muros de la prisión de Shawshank.",
        genero: ["Drama" , "Crimen"],
        anioEstreno: 1994
    },
    {
        image: "/media/Inception.jpg",
        nombre: "Inception",
        descripcion: "Un ladrón especializado en robar secretos a través de los sueños debe realizar la tarea inversa: implantar una idea en la mente de su objetivo.",
        genero: ["Ciencia ficción" , "Thriller"],
        anioEstreno: 2010
    },
    {
        image: "/media/Parasite.jpg",
        nombre: "Parasite (Gisaengchung)",
        descripcion: "Una familia pobre se infiltra progresivamente en la vida de una adinerada, desatando una oscura serie de eventos.",
        genero: ["Drama" , "Thriller" , "Sátira social"],
        anioEstreno: 2019
    },
    {
        image: "/media/The-Grand-Budapest-Hotel.jpg",
        nombre: "The Grand Budapest Hotel",
        descripcion: "Un excéntrico conserje y su joven protegido se ven envueltos en un robo de arte, una batalla por una herencia y el caos de la Europa de entreguerras.",
        genero: ["Comedia" , "Aventura" , "Crimen"],
        anioEstreno: 2014
    },
    {
        image: "/media/Coco.jpg",
        nombre: "Coco",
        descripcion: "Un niño mexicano llamado Miguel viaja al mundo de los muertos para descubrir la historia de su familia y cumplir su sueño de ser músico.",
        genero: ["Animación", "Aventura" , "Familiar"],
        anioEstreno: 2017
    },
    {
        image: "/media/Whiplash.jpg",
        nombre: "Whiplash",
        descripcion: "Un joven baterista ambicioso se enfrenta al despiadado y exigente maestro de su conservatorio, llevando su talento y resistencia al límite en busca de la perfección.",
        genero: ["Drama", "Musica"],
        anioEstreno: 2017
    },
]

//Variables globales
let peliculasContainer = document.getElementById("peliculas-container");
let generosContainer = document.getElementById("generos-container");
let miListaButton = document.getElementById("mi-lista");


//Añadir al objeto anterior un metodo que reciba los parametros que componen al objeto y añada un elemento al array
catalogo.push = function(nombre, descripcion, genero, anioEstreno) {
    this.push({
        nombre: nombre,
        descripcion: descripcion,
        genero: genero,
        anioEstreno: anioEstreno
    });
};


// Evento para el botón de inicio de sesión
document.getElementById("btn-login").addEventListener("click", function() { 
    // Aquí puedes implementar la lógica de inicio de sesión
    // Por ejemplo, mostrar un formulario de inicio de sesión o validar credenciales.
    // Por simplicidad, solo mostraremos un mensaje de éxito.
    alert("Inicio de sesión exitoso.");
});

//Iinicializamos la aplicación
document.addEventListener("DOMContentLoaded", () => {
    mostrarPeliculas(catalogo);
    mostrarGeneros(catalogo);
});


//Función para mostrar las películas en el contenedor
function mostrarPeliculas(peliculas) {
    const peliculasContainer = document.getElementById('peliculas-container');
    peliculasContainer.innerHTML = '';

    peliculas.forEach(pelicula => {
        let tarjeta = document.createElement("div");
        tarjeta.className = "pelicula-card";
        tarjeta.innerHTML = `
            <img src="${pelicula.image}" alt="${pelicula.nombre}">
            <h2>${pelicula.nombre}</h2>
            <p>${pelicula.descripcion}</p>
            <p><strong>Géneros:</strong> ${pelicula.genero.join(", ")}</p>
            <p><strong>Año de estreno:</strong> ${pelicula.anioEstreno}</p>
            <button class="btn-reproducir"><img src="/media/icon-play-circle.svg">Reproducir</button>
            <button class="btn-agregar"><img src="/media/icon-add.svg">Agregar a mi lista</button>
        `;
        peliculasContainer.appendChild(tarjeta);
        // Evento del botón "Reproducir"
        tarjeta.querySelector('.btn-reproducir').addEventListener('click', () => {
            alert(`Reproduciendo: ${pelicula.nombre}`);
            // Aquí es donde se implementaría la lógica para reproducir la película
        });
        // Evento del botón "Agregar a mi lista"
        tarjeta.querySelector('.btn-agregar').addEventListener('click', () => {
            agregarAMiLista(pelicula);
        });
    });

    // Comprobar y Mostrar Mi lista si hay películas
    if (peliculas.length > 0) { 
        miListaButton.style.display = 'block';
    }else {
        miListaButton.style.display = 'none';
}}


// Agregar peliculas al contenedor Mi Lista
function agregarAMiLista(pelicula) {
    let miLista = JSON.parse(localStorage.getItem('miLista')) || [];
    // Comprobamos si la película ya está en la lista
    if (miLista.some(p => p.nombre === pelicula.nombre)) {
        alert("Esta película ya está en tu lista.");
        return;
    }
    miLista.push(pelicula);
    localStorage.setItem('miLista', JSON.stringify(miLista));
    alert("Película agregada a tu lista.");
}

//Boton para mostrar Mi Lista
miListaButton.addEventListener('click', () => {
    mostrarMiLista();
});


//Mostramos el contenido de Mi Lista
function mostrarMiLista() {
    const miLista = JSON.parse(localStorage.getItem('miLista')) || [];
    if (miLista.length === 0) {
        alert("Tu lista está vacía.");
        return;
    }
    peliculasContainer.innerHTML = '';
    miLista.forEach(pelicula => {
        let tarjeta = document.createElement("div");
        tarjeta.className = "tarjeta";
        tarjeta.innerHTML = `
            <img src="${pelicula.image}" alt="${pelicula.nombre}">
            <h2>${pelicula.nombre}</h2>
            <p>${pelicula.descripcion}</p>
            <p><strong>Géneros:</strong> ${pelicula.genero.join(", ")}</p>
            <p><strong>Año de estreno:</strong> ${pelicula.anioEstreno}</p>
            <button class="btn-reproducir"><img src="/media/icon-play-circle.svg">Reproducir</button>
            <button class="btn-eliminar"><img src="/media/icon-cancel.svg">Eliminar de mi lista</button>
            <button class="btn-visto"><img src="/media/icon-visibility.svg">Marcar como visto</button>
        `;
        peliculasContainer.appendChild(tarjeta);
        
        // Agregar evento al botón "Reproducir"
        tarjeta.querySelector('.btn-reproducir').addEventListener('click', () => {
            alert(`Reproduciendo: ${pelicula.nombre}`);
            // Aquí es donde se implementaría la lógica para reproducir la película
        });
        // Agregar evento al botón "Eliminar de mi lista"
        tarjeta.querySelector('.btn-eliminar').addEventListener('click', () => {
            eliminarDeMiLista(pelicula);
        });
        // Agregar evento al botón "Marcar como visto"
        tarjeta.querySelector('.btn-visto').addEventListener('click', () => {
            marcarComoVisto(pelicula);
        });
        //Añadir un evento que actualice el estado como visto cambiando el color del texto
        const btnVistos = document.querySelectorAll('.btn-visto');
        btnVistos.forEach(btn => {
            btn.addEventListener('click', function() {
                const tarjeta = this.parentElement;
                tarjeta.style.color = '#2481bf'; // Cambia el color del texto a verde
                this.textContent = 'Visto'; // Cambia el texto del botón
                this.disabled = true; // Deshabilita el botón
            });
        });
    });
}

// Eliminar película de mi lista
function eliminarDeMiLista(pelicula) {
    let miLista = JSON.parse(localStorage.getItem('miLista')) || [];
    miLista = miLista.filter(p => p.nombre !== pelicula.nombre);
    localStorage.setItem('miLista', JSON.stringify(miLista));
    alert("Película eliminada de tu lista.");
    mostrarMiLista(); // Actualizar la vista
}

// Marcar película como vista
function marcarComoVisto(pelicula) {
    let miLista = JSON.parse(localStorage.getItem('miLista')) || [];
    const index = miLista.findIndex(p => p.nombre === pelicula.nombre);
    if (index !== -1) {
        miLista[index].visto = true; // Agregar propiedad visto
        localStorage.setItem('miLista', JSON.stringify(miLista));
        alert("Película marcada como vista.");
    } else {
        alert("Esta película no está en tu lista.");
    }
}


//Funcion para buscar peliculas por nombre
function buscarPeliculas() {
    const query = document.getElementById('search-input').value.toLowerCase();
    const peliculas = JSON.parse(localStorage.getItem('catalogo')) || [];
    const resultados = peliculas.filter(pelicula => 
        pelicula.nombre.toLowerCase().includes(query) ||
        pelicula.descripcion.toLowerCase().includes(query)
    );
    mostrarPeliculas(resultados);
}
//Evento para el botón de búsqueda
document.getElementById('search-button').addEventListener('click', buscarPeliculas);

//Almacenar el catálogo en localStorage
localStorage.setItem('catalogo', JSON.stringify(catalogo));
// Recuperar el catálogo del localStorage al cargar la página
document.addEventListener("DOMContentLoaded", () => {
    const catalogoGuardado = JSON.parse(localStorage.getItem('catalogo'));
    if (catalogoGuardado) {
        mostrarPeliculas(catalogoGuardado);
        mostrarGeneros(catalogoGuardado);
    }
});