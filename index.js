//CRUD lógico COMPLETO
let tareas = [];
let nuevaTarea = "";
let id = 1;

//Variables HTML
const inputTarea = document.getElementById("tarea");
const btn = document.getElementById("btn");
const btnlimpiar = document.getElementById("btn-limpiar");
const ulist = document.getElementById("ulist");

//Local Storage
const LOCAL_STORAGE_NOMBRE = "tareas";

//#region  Eventos
inputTarea.addEventListener("change", (e) => {
  nuevaTarea = e.target.value;
});

btn.addEventListener("click", () => {
  const nueva_tarea = { tarea: nuevaTarea, id };
  tareas.push(nueva_tarea);
  id++;
  Agregar(tareas);
  RefrescarHTML();
});

btnlimpiar.addEventListener("click", () => {
  if (Leer() !== null) {
    localStorage.removeItem(LOCAL_STORAGE_NOMBRE);
  }
  tareas = [];
  RefrescarHTML();
});

//#endregion

//#region  Check Local Storage
window.onload = function () {
  const ls = localStorage.getItem(LOCAL_STORAGE_NOMBRE);
  if (ls !== null) {
    const array_ls = JSON.parse(ls);
    tareas = array_ls;
    //acá deberíamos pisar el valor del siguiente id
    const lastIndex = array_ls.length - 1;
    id = array_ls[lastIndex].id;
    RefrescarHTML();
  }
};

//#endregion

function Agregar(tareas) {
  localStorage.setItem(LOCAL_STORAGE_NOMBRE, JSON.stringify(tareas));
}

function Leer() {
  const storage = localStorage.getItem(LOCAL_STORAGE_NOMBRE);
  const convertido = JSON.parse(storage);
  return convertido;
}

//MODIFICAR O LEER NECESITO UN FILTRO  id -> identificador único
function Modificar({ id, textoNuevo }) {
  //array
  let carrito_local_storage = Leer();
  //obtener el elemento
  const elemento = carrito_local_storage.filter((x) => x.id === id);
  //modificarlo
  elemento.tarea = textoNuevo;
  //guardarlo nuevamente en el carrito
  const indiceElemento = carrito_local_storage.findIndex((x) => x.id === id);
  carrito_local_storage[indiceElemento] = elemento[0];
  Agregar(carrito_local_storage);
}

function Eliminar(id) {
  //leer array del local storage
  let carrito_local_storage = Leer();
  //eliminar elemento
  const nuevo_array_sin_elemento = carrito_local_storage.filter(
    (x) => x.id !== id
  );
  //guardamos en el local storage
  Agregar(carrito_local_storage);
}

function RefrescarHTML() {
  let htmlString = "";
  tareas.forEach((tarea) => {
    const { tarea: elemento } = tarea;
    htmlString += `<li>${elemento} </li>`;
  });
  ulist.innerHTML = htmlString;
}
