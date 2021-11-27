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

const daoPelicula =
  getFirestore().
    collection("Pelicula");
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
    const imagen = formData.getFile("imagen").trim();
    /**
     * @type {
        import("./tipos.js").
                Pelicula} */
    const modelo = {
      titulo,
      descripcion,
      imagen
    };
    await daoPelicula.
      add(modelo);
      muestraPeliculas();
  } catch (e) {
    muestraError(e);
  }
}

