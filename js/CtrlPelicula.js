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
const params =
  new URL(location.href).
    searchParams;
const id = params.get("id");
/** @type {HTMLFormElement} */
const forma = document["forma"];
const img = document.
  querySelector("img");
  
getAuth().onAuthStateChanged(
  protege, muestraError);
  
/** @param {import(
    "../lib/tiposFire.js").User}
    usuario */
async function protege(usuario) {
  if (tieneRol(usuario,
    ["Administrador"])) {
    busca();
  }
}
  
/** Busca y muestra los datos que
 * corresponden al id recibido. */
async function busca() {
  try {
    const doc =
      await daoPelicula.
        doc(id).
        get();
    if (doc.exists) {
        /**
       * @type {
          import("./tipos.js").
                  Alumno} */
      const data = doc.data();
      forma.titulo.value = data.titulo || "";
      forma.descripcion.value = data.descripcion || "";
      forma.addEventListener(
        "submit", guarda);
      forma.eliminar.
        addEventListener(
          "click", elimina);
    } else {
      throw new Error(
        "No se encontró.");
    }
  } catch (e) {
    muestraError(e);
    muestraPeliculas();
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
                Alumno} */
    const modelo = {
      titulo, 
      descripcion
    };
    await daoAlumno.
      doc(id).
      set(modelo);
    muestraPeliculas();
  } catch (e) {
    muestraError(e);
  }
}
  
async function elimina() {
  try {
    if (confirm("Confirmar la " +
      "eliminación")) {
      await daoPelicula.
        doc(id).
        delete();
      muestraPeliculas();
    }
  } catch (e) {
    muestraError(e);
  }
}
  
  
