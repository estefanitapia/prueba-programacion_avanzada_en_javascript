// Importa las clases de los diferentes animales desde sus respectivos módulos.
import { Leon } from "./Leon.js";
import { Serpiente } from "./Serpiente.js";
import { Lobo } from "./Lobo.js";
import { Oso } from "./Oso.js";
import { Aguila } from "./Aguila.js";

// Variable vacía que irá almacenando los animales.
let animales = [];

// Función autoejecutable asincrónica para cargar los datos de los animales desde un archivo JSON.
(async () => {
  try {
    // Solicita los datos del archivo animales.json.
    const resp = await fetch("animales.json");
    // Convierte la respuesta a un objeto JavaScript.
    const data = await resp.json();
    // Itera sobre cada elemento en la lista de animales.
    data.animales.forEach((elem) => {
      // Según el nombre del animal, crea una nueva instancia de la clase correspondiente y la agrega a la lista de animales.
      switch (elem.name) {
        case "Leon":
          animales.push(new Leon(elem.name, elem.imagen, elem.sonido));
          break;
        case "Lobo":
          animales.push(new Lobo(elem.name, elem.imagen, elem.sonido));
          break;
        case "Oso":
          animales.push(new Oso(elem.name, elem.imagen, elem.sonido));
          break;
        case "Serpiente":
          animales.push(new Serpiente(elem.name, elem.imagen, elem.sonido));
          break;
        case "Aguila":
          animales.push(new Aguila(elem.name, elem.imagen, elem.sonido));
          break;
      }
    });
  } catch (error) {
    // Muestra un mensaje de error en la consola si ocurre un problema con la carga de los datos.
    console.log(error);
  }
})();

// Agrega un evento para detectar cambios en la selección del animal.
document.getElementById("animal").addEventListener("change", () => {
  // Obtiene el valor del animal seleccionado.
  let seleccion = document.getElementById("animal").value;
  // Encuentra el índice del animal seleccionado en la lista de animales.
  let seleccionIndex = animales.findIndex(
    (elem) => elem.getNombre() == seleccion
  );
  // Muestra una vista previa de la imagen del animal seleccionado.
  document.querySelector(
    "#preview"
  ).innerHTML = `<img src="assets/imgs/${animales[
    seleccionIndex
  ].getImg()}" style="height:200px; width:200px" class="mx-auto d-block" >`;
});

// Agrega un evento al botón de registrar para agregar el animal a la lista.
document.getElementById("btnRegistrar").addEventListener("click", () => {
  // Obtiene el valor del animal seleccionado.
  let animalito = document.getElementById("animal").value;
  // Encuentra el índice del animal seleccionado en la lista de animales.
  let animalitoIndex = animales.findIndex(
    (elem) => elem.getNombre() == animalito
  );
  // Verifica que todos los campos del formulario estén completos.
  if (
    document.getElementById("edad").value == "Seleccione un rango de años" ||
    document.getElementById("comentarios").value.trim() == "" ||
    document.getElementById("animal").value == "Seleccione un animal"
  ) {
    // Muestra una alerta si algún campo está vacío.
    alert("Es necesario completar todos los campos");
  } else if (animales[animalitoIndex]._comentarios == "") {
    // Si el animal no tiene comentarios previos, agrega la edad y los comentarios ingresados.
    animales[animalitoIndex]._edad = document.getElementById("edad").value;
    animales[animalitoIndex]._comentarios =
      document.getElementById("comentarios").value;
    // Agrega una tarjeta con la información del animal a la sección de Animales.
    document.querySelector(
      "#Animales"
    ).innerHTML += `<div class="card border-info mb-3">
    <img id="modalClick" src="assets/imgs/${animales[
      animalitoIndex
    ].getImg()}" style="height:200px; width:200px" class="${animalito} mx-auto d-block" data-toggle="modal" data-target="#exampleModal">
    <div class="text-white bg-secondary py-1">
      <i class="fas fa-volume-up fa-2x"></i>
    </div>
    </div>
    `;
  } else {
    // Muestra una alerta si el animal ya está registrado.
    alert("El animal ya se encuentra registrado");
  }

  // Función para resetear el formulario luego de guardar el animal.
  function resetFormulario() {
    document.getElementById("animal").value = "";
    document.getElementById("edad").value = "";
    document.getElementById("comentarios").value = "";
    document.querySelector("#preview").innerHTML = "";
  }
  resetFormulario();
});

// Agrega un evento para detectar clics en la sección de Animales.
document.getElementById("Animales").addEventListener("click", (event) => {
  const clickedElement = event.target;
  // Verifica si el elemento clicado es la imagen del animal.
  if (clickedElement.id === "modalClick") {
    cargarModal(event);
  }
});

// Función para cargar la información del animal en el modal.
const cargarModal = (event) => {
  const clickedImage = event.target;
  const animalClass = clickedImage.classList[0];
  // Encuentra el índice del animal en la lista de animales.
  const animalIndex = animales.findIndex(
    (elem) => elem.getNombre() === animalClass
  );
  // Muestra la información del animal en el modal.
  document.querySelector(
    ".modal-body"
  ).innerHTML = `<img src="assets/imgs/${animales[
    animalIndex
  ].getImg()}" style="height:200px; width:200px;" class="mx-auto d-block">
  <div class="card-body" style="height:200px; width:200px; color:white">
                    <h5 class="card-title">${animales[animalIndex]._nombre}</h5>
                    <p class="card-text">EDAD: ${animales[animalIndex].getEdad()}</p>
                    <p class="card-text">COMENTARIO: ${animales[animalIndex]._comentarios}</p>
                </div>`;
  // Reproduce el sonido del animal.
  document.querySelector("audio").src = `assets/sounds/${animales[
    animalIndex
  ].getSonido()}`;
  document.querySelector("audio").play();
};

