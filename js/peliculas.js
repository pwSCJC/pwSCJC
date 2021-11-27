import {
    getFirestore
  } from "../lib/fabrica.js";
  import {
    subeStorage
  } from "../lib/storage.js";
  import {
    cod, getForánea, muestraError
  } from "../lib/util.js";
  import {
    muestraPeliculas
  } from "./navegacion.js";
  
  const SIN_PELICULAS = /* html */
    `<option value="">
      -- Sin Peliculas --
    </option>`;
  
  const firestore = getFirestore();
  const daoPelicula = firestore.
    collection("Pelicula");
  
  /**
   * @param {
      HTMLSelectElement} select
   * @param {string} valor */
  export function
    selectPeliculas(select,
      valor) {
    valor = valor || "";
    daoPelicula.
      orderBy("titulo").
      onSnapshot(
        snap => {
          let html = SIN_PELICULAS;
          snap.forEach(doc =>
            html += htmlPelicula(
              doc, valor));
          select.innerHTML = html;
        },
        e => {
          muestraError(e);
          selectPeliculas(
            select, valor);
        }
      );
  }
  
  /**
   * @param {
    import("../lib/tiposFire.js").
    DocumentSnapshot} doc
   * @param {string} valor */
  function
    htmlPelicula(doc, valor) {
    const selected =
      doc.id === valor ?
        "selected" : "";
    /**
     * @type {import("./tipos.js").
                    Alumno} */
    const data = doc.data();
    return (/* html */
      `<option
          value="${cod(doc.id)}"
          ${selected}>
        ${cod(data.titulo)}
      </option>`);
  }
  
  /**
   * @param {
      import("../lib/tiposFire.js").
      DocumentSnapshot} doc
   * @param {Set<string>} set */
  export function
    checkRol(doc, set) {
    /**
     * @type {
        import("./tipos.js").Rol} */
    const data = doc.data();
    const checked =
      set.has(doc.id) ?
        "checked" : "";
    return (/* html */
      `<li>
        <label class="fila">
          <input type="checkbox"
              name="rolIds"
              value="${cod(doc.id)}"
            ${checked}>
          <span class="texto">
            <strong
                class="primario">
              ${cod(doc.id)}
            </strong>
            <span
                class="secundario">
            ${cod(data.titulo)}
            </span>
          </span>
        </label>
      </li>`);
  }
  
  /**
   * @param {Event} evt
   * @param {FormData} formData
   * @param {string} id  */
  export async function
    guardaPelicula(evt, formData,
      id) {
    try {
      evt.preventDefault();
      const peliculaId =
        getForánea(formData,
          "peliculaId");
        getForánea(formData,
            "peliculaId");
      await daoPelicula.
        doc(id).
        set({
          peliculaId
        });
      const imagen =
        formData.get("imagen");
      await subeStorage(id, imagen);
      muestraPeliculas();
    } catch (e) {
      muestraError(e);
    }
  }
  