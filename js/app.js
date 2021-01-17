//Variables
const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');

let tweets = [];

//Event Listeners
eventListeners();

function eventListeners(){
    //Cuando el usuario agrega un tweet
    formulario.addEventListener('submit', agregarTweet);

    //Cuando el documento está listo
    document.addEventListener('DOMContentLoaded', () =>{
        tweets = JSON.parse(localStorage.getItem('tweets')) || [];
        console.log(tweets);

        crearHTML();
    });
}

//Funciones
function agregarTweet(e) {
    e.preventDefault();
    
    //Text área
    const tweet = document.querySelector('#tweet').value;
    
    if(tweet === ''){
        mostrarError('El mensaje no puede estar vacío')
        return; //Evita que se eecuten más líneas de código
    }

    const tweetObj = {
        id: Date.now(),
        tweet: tweet
    }

    //Añadir tweet al arreglo
    tweets = [...tweets, tweetObj];
    
    //Agregado el tweet creamos el html
    crearHTML();

    //Reiniciar el formulario
    formulario.reset();
}

//Función mostrar Error
function mostrarError(error) {
    const mensajeError = document.createElement('p');
    mensajeError.textContent = error;
    mensajeError.classList.add('error');

    //Insertar el error en el contenido
    const contenido = document.querySelector('#contenido');
    contenido.appendChild(mensajeError);

    //Elimina el error después de 3 seg.
    setTimeout(() => {
        mensajeError.remove();
    }, 3000);
}

//función que muestra listado de tweets
function crearHTML() {
    limpiarHTML();

    if(tweets.length > 0 ){
        tweets.forEach( tweet => {

            //Agregar botón para eliminar tweet
            const btnEliminar = document.createElement('a');
            btnEliminar.classList.add('borrar-tweet');
            btnEliminar.textContent ='X';

            //Añadir la función de eliminar tweet
            btnEliminar.onclick = () => { borrarTweet(tweet.id); }

            //Crear el HTML
            const li = document.createElement('li')
            
            //Añadir el texto
            li.innerText = tweet.tweet;

            //Insertar el botónde aliminar
            li.appendChild(btnEliminar);;
            
            //Insertar en el html
            listaTweets.appendChild(li);
        });
    }

    //Sincronizando el storage
    sincronizarStorage();
}

//Agrega los tweets al localStorage
function sincronizarStorage() {
    localStorage.setItem('tweets', JSON.stringify(tweets));
}

//Función para Eliminar tweet
function borrarTweet(id) {
    tweets = tweets.filter(tweet => tweet.id !== id) 
    crearHTML();
}

//Limpiar el html
function limpiarHTML() {
    while(listaTweets.firstChild){
        listaTweets.removeChild(listaTweets.firstChild);
    }
}