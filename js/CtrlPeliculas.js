// @ts-nocheck
import {
    getAuth,
    getFirestore
  } from "../lib/fabrica.js";
  import {
    cod,
    muestraError
  } from "../lib/util.js";
  import {
    urlStorage
  } from "../lib/storage.js";
  import {
    tieneRol
  } from "./seguridad.js";
  
  /** @type {HTMLUListElement} */
  const lista = document.
    querySelector("#lista");
  const daoPelicula =
    getFirestore().
      collection("Pelicula");
  
  getAuth().
    onAuthStateChanged(
      protege, muestraError);
  
  /** @param {import(
      "../lib/tiposFire.js").User}
      usuario */
  async function protege(usuario) {
    if (tieneRol(usuario,
      ["Administrador"])) {
      consulta();
    }
  }
  
  function consulta() {
    daoPelicula.
      orderBy("titulo")
      .onSnapshot(
        htmlLista, errConsulta);
  }
  
  /**
   * @param {import(
      "../lib/tiposFire.js").
      QuerySnapshot} snap */
  function htmlLista(snap) {
    let html = "";
    if (snap.size > 0) {
      snap.forEach(doc =>
        html += htmlFila(doc));
    } else {
      html += /* html */
        `<li class="vacio">
          -- No hay peliculas
          registrados. --
        </li>`;
    }
    lista.innerHTML = html;
  }
  
  /**
   * @param {import(
      "../lib/tiposFire.js").
      DocumentSnapshot} doc */
  function htmlFila(doc) {
    /**
     * @type {import("./tipos.js").
                    Pelicula} */
    const data = doc.data();
    const titulo = cod(data.titulo);
    const img = cod(
      await urlStorage(doc.id));
    const descripcion = cod(data.descripcion);
    const parámetros =
      new URLSearchParams();
    parámetros.append("id", doc.id);
    return ( /* html */
      `<li>
      <a class="fila conImagen"
      href=
    "usuario.html?${parámetros}">
        <span class="marco">
          <img src="${img}"
        alt="Falta el Avatar">
    </span>
          <strong class="primario">
            ${titulo} ${descripcion}
          </strong>
        </a>
       
      </li>`);
  }
  
  /** @param {Error} e */
  function errConsulta(e) {
    muestraError(e);
    consulta();
  }
  
  
