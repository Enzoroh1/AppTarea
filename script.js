const fecha = document.querySelector("#fecha"); // me trae el codigo en HTML
const lista = document.querySelector("#lista");
const input = document.querySelector("#input");
const botonEnter = document.querySelector("#enter");

// fuuncion agregar tarea
function agregarTarea(tarea) {
  const elemento = ` <li id="elemento">
        <i class="far fa-circle co" data="realizado" id="0"></i>
        <p class="text ">${tarea}</p>
        <i class="fas fa-trash de" data="eliminado" id="0"></i>
    </li>`;
  lista.insertAdjacentHTML("beforeend", elemento); //antes del final inserta el codigo de la variable elemento
  //beforeend(acomoda despues del elemento 1 - 2 - 4 hacia abajo) - afterbegin(acomoda los elementos al reves 4 - 3 - 2 -1 hacia abajo)
}

botonEnter.addEventListener("click", () => {
  //Evento escuchando click
  //escucha un click
  const tarea = input.value;
  if (tarea) {
    agregarTarea(tarea);
  }
  input.value = "";
});

document.addEventListener("keyup", function (event) {
  //Evento escuchando enter - addEventListener escucha todo el elemento
  if (event.key == "Enter") {
    //event.key lee cualquier tecla del teclado(En este caso solo con Enter)
    const tarea = input.value;
    if (tarea) {
      agregarTarea(tarea);
    }
    input.value = ""; //valor = "" (string vacio) se bora cualquier letra o palabra que quede en el input
  }
}); //cuando suelto el teclado
