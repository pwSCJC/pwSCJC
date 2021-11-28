import {
    getAuth,
    getFirestore
  } from "../lib/fabrica.js";
  import {
    urlStorage
  } from "../lib/storage.js";
  import {
    muestraError
  } from "../lib/util.js";
  import {
    muestraPeliculas
  } from "./navegacion.js";
  import {
    tieneRol
  } from "./seguridad.js";
  import {
    guardaPelicula,
    selectPeliculas
  } from "./peliculas.js";

  const params =
  new URL(location.href).
    searchParams;
  const id = params.get("id");
  console.log(id);
  const daoPelicula =
    getFirestore().
      collection("Pelicula");
  /** @type {HTMLFormElement} */
  const forma = document["forma"];
  const img = document.
  getElementById("figure");
  
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

        const data = doc.data();
        forma.titulo.value = id || "";
        img.src =
        await urlStorage(id);
        selectPeliculas(
          forma.peliculaId,
          data.peliculaId);
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
  await guardaPelicula(evt,
    new FormData(forma), id);
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
  
  
