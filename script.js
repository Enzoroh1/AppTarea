const fecha = document.querySelector("#fecha"); // me trae el codigo en HTML
//
const lista = document.querySelector("#lista");
const input = document.querySelector("#input");
const botonEnter = document.querySelector("#enter");
//
const check = "fa-check-circle";
const uncheck = "fa-circle";
const lineThrough = "line-through";
//
let id = 0 //no podes declararla como const por que va a incrementar su valor
//
const LIST = []//array para almacenar los datos en el navegador


//SessionStorage = almacenamiento solo en la sesion
//LocalStorage = almacenamiento incuso si se cierra


//creacion de fecha
const FECHA = new Date() //new Date() lo colocamos asi para llamar la funcion date que viene en el navegador
fecha.innerHTML = FECHA.toLocaleDateString("es-AR", {weekday:"long", month:"long",day:"numeric"}) //propiedad innerHTML en este caso el espacio de texto dentro de un elemento

// fuuncion agregar tarea
function agregarTarea(tarea, id, realizado, eliminado) {
  
  //Eliminar
  if (eliminado) {
    return //uso de return para terminar la ejecucion del programa su la condicion se cumple
  }

  //Realizado
  const REALIZADO = realizado ? check : uncheck;
  const LINE = realizado ? lineThrough : "";

  const elemento = ` <li id="elemento">
        <i class="far ${REALIZADO}" data="realizado" id="${id}"></i>
        <p class="text ${LINE}">${tarea}</p>
        <i class="fas fa-trash de" data="eliminado" id="${id}"></i>
    </li>`;
  lista.insertAdjacentHTML("beforeend", elemento); //antes del final inserta el codigo de la variable elemento
  //beforeend(acomoda despues del elemento 1 - 2 - 4 hacia abajo) - afterbegin(acomoda los elementos al reves 4 - 3 - 2 -1 hacia abajo)

}

botonEnter.addEventListener("click", () => {
  //Evento escuchando click
  //escucha un click
  const tarea = input.value;
  if (tarea) {
    agregarTarea(tarea,id,false,false);
    LIST.push({//agrega elementos dentro del Array
      nombre:tarea,
      id:id,
      realizado:false,
      eliminado:false
    }) 
  }
  input.value = "";//resetea el input
  id++
});

document.addEventListener("keyup", function (event) {
  //Evento escuchando enter - addEventListener escucha todo el elemento
  if (event.key == "Enter") {
    //event.key lee cualquier tecla del teclado(En este caso solo con Enter)
    const tarea = input.value;
    if (tarea) {
      agregarTarea(tarea,id,false,false);
      LIST.push({//agrega elementos dentro del Array
        nombre:tarea,
        id:id,
        realizado:false,
        eliminado:false
      })
    }
    input.value = ""; // resetea el input / valor = "" (string vacio) se bora cualquier letra o palabra que quede en el input
    id++
  }
}); //cuando suelto el teclado

//funcion tarea Realizada
function tareaRealizada(element) {
  element.classList.toggle(check) //tipo false o true, realizame un chechk o uncheck depende el que este activado
  element.classList.toggle(uncheck)
  element.parentNode.querySelector(".text").classList.toggle(lineThrough)
  //desde element, vete al codigo padre (li), dentro del elemento padre quiero que me detectes un querySelector de alguna clase que contenga
  // text, a eso ejecutale una classList de lineThrough.(Tachado)
  LIST[element.id].realizado = LIST[element.id].realizado ? false : true
}

//funcion tarea Eliminada
function tareaEliminada(element) {
  element.parentNode.parentNode.removeChild(element.parentNode) //dentro del elemento valla a li, y de li valla a ul, ejecuta remover hijo, dentro de elemeno padre(li)
  LIST[element.id].eliminado = true

}

lista.addEventListener("click", function(event) {
  const element = event.target
  const elementData = element.attributes.data.value //dentro del elemento traeme el atributo data, que me trae el valor, que seria realizado
  if(elementData === "realizado") {
    tareaRealizada(element)
  }
  else if (elementData === "eliminado") {
    tareaEliminada(element)
  }
})