import {
  getAuth,
  getFirestore
} from "../lib/fabrica.js";
import {
  getString,
  muestraError
} from "../lib/util.js";
import {
  muestraPeliculas
} from "./navegacion.js";
import {
  tieneRol
} from "./seguridad.js";
import {
  subeStorage
} from "../lib/storage.js";

const daoPelicula =
  getFirestore().
    collection("Pelicula");
  const id = params.get("id");
/** @type {HTMLFormElement} */
const forma = document["forma"];
getAuth().onAuthStateChanged(
  protege, muestraError);

/** @param {import(
    "../lib/tiposFire.js").User}
    usuario */
async function protege(usuario) {
  if (tieneRol(usuario,
    ["Administrador"])) {
    forma.addEventListener(
      "submit", guarda);
  }
}

/** @param {Event} evt */
async function guarda(evt) {
  try {
    evt.preventDefault();
    const formData =
      new FormData(forma);
    const titulo = getString(
        formData, "titulo").trim();  
    const descripcion = getString(formData, "descripcion").trim();
    /**
     * @type {
        import("./tipos.js").
                Pelicula} */
    const modelo = {
      titulo,
      descripcion
    };
    await daoPelicula.
      add(modelo);
      const imagen =
      formData.get("imagen");
    await subeStorage(titulo, imagen);
      muestraPeliculas();
  } catch (e) {
    muestraError(e);
  }
}

