// ============================================================
// RECUENTO DE PIEZAS
// Archivo: app.js
// ============================================================


// ============================================================
// DATOS
// ============================================================

let articulos =
    JSON.parse(localStorage.getItem("articulos")) || [];


// ============================================================
// ELEMENTOS DEL HTML
// ============================================================

const btnArticulos =
    document.getElementById("btnArticulos");

const btnNuevoRecuento =
    document.getElementById("btnNuevoRecuento");

const contenido =
    document.getElementById("contenido");


// ============================================================
// EVENTOS PRINCIPALES
// ============================================================

if (btnArticulos) {
    btnArticulos.addEventListener(
        "click",
        mostrarArticulos
    );
}

if (btnNuevoRecuento) {
    btnNuevoRecuento.addEventListener(
        "click",
        mostrarNuevoRecuento
    );
}


// ============================================================
// FUNCIONES DE DATOS
// ============================================================

function guardarArticulosEnLocalStorage() {

    localStorage.setItem(
        "articulos",
        JSON.stringify(articulos)
    );
}


// ============================================================
// PANTALLA DE ARTÍCULOS
// ============================================================

function mostrarArticulos() {

    contenido.innerHTML = `
        <div class="pantalla">

            <div class="encabezado-pantalla">

                <div>
                    <h2>📦 Artículos</h2>

                    <p>
                        Gestioná los artículos y sus despieces.
                    </p>
                </div>

                <button
                    class="boton-principal"
                    onclick="mostrarFormularioArticulo()">

                    ➕ Nuevo artículo

                </button>

            </div>

            <div id="listaArticulos"></div>

        </div>
    `;

    mostrarListaArticulos();
}


// ============================================================
// LISTA DE ARTÍCULOS
// ============================================================

function mostrarListaArticulos() {

    const lista =
        document.getElementById("listaArticulos");

    if (!lista) {
        return;
    }

    if (articulos.length === 0) {

        lista.innerHTML = `
            <div class="mensaje-vacio">

                <h3>📦 No hay artículos cargados</h3>

                <p>
                    Todavía no tenés artículos registrados.
                </p>

            </div>
        `;

        return;
    }


    let html = "";


    articulos.forEach((articulo, indice) => {

        html += `
            <div class="tarjeta-articulo">

                <div>

                    <h3>
                        ${articulo.codigo}
                    </h3>

                    <p>
                        ${articulo.descripcion}
                    </p>

                    <p>
                        <strong>
                            ${articulo.piezas.length}
                        </strong>
                        pieza(s) en el despiece
                    </p>

                </div>


                <div class="acciones-formulario">

                    <button
                        class="boton-secundario"
                        onclick="verArticulo(${indice})">

                        👁️ Ver

                    </button>


                    <button
                        class="boton-secundario"
                        onclick="editarArticulo(${indice})">

                        ✏️ Editar

                    </button>


                    <button
                        class="boton-eliminar"
                        onclick="eliminarArticulo(${indice})">

                        🗑️ Eliminar

                    </button>

                </div>

            </div>
        `;
    });


    lista.innerHTML = html;
}


// ============================================================
// FORMULARIO NUEVO ARTÍCULO
// ============================================================

function mostrarFormularioArticulo() {

    contenido.innerHTML = `

        <div class="pantalla">

            <div class="encabezado-pantalla">

                <div>

                    <h2>➕ Nuevo artículo</h2>

                    <p>
                        Ingresá los datos del artículo y su despiece.
                    </p>

                </div>

                <button
                    class="boton-secundario"
                    onclick="mostrarArticulos()">

                    ← Volver

                </button>

            </div>


            <div class="formulario">

                <label for="codigoArticulo">
                    Código del artículo
                </label>

                <input
                    type="text"
                    id="codigoArticulo"
                    placeholder="Ejemplo: ASP 245"
                >


                <label for="descripcionArticulo">
                    Descripción
                </label>

                <input
                    type="text"
                    id="descripcionArticulo"
                    placeholder="Ejemplo: Porta matafuegos"
                >


                <div class="separador"></div>


                <h3 class="titulo-despiece">
                    🔧 Despiece
                </h3>


                <div id="listaPiezas"></div>


                <button
                    class="boton-secundario"
                    onclick="agregarFilaPieza()">

                    ➕ Agregar pieza

                </button>


                <div class="acciones-formulario">

                    <button
                        class="boton-principal"
                        onclick="guardarArticulo()">

                        💾 Guardar artículo

                    </button>


                    <button
                        class="boton-secundario"
                        onclick="mostrarArticulos()">

                        Cancelar

                    </button>

                </div>

            </div>

        </div>
    `;


    agregarFilaPieza();
}


// ============================================================
// AGREGAR FILA DE PIEZA
// ============================================================

function agregarFilaPieza() {

    const lista =
        document.getElementById("listaPiezas");

    if (!lista) {
        return;
    }


    const fila =
        document.createElement("div");

    fila.className = "fila-pieza";


    fila.innerHTML = `

        <input
            type="text"
            class="codigo-pieza"
            placeholder="Código"
        >


        <input
            type="text"
            class="descripcion-pieza"
            placeholder="Descripción"
        >


        <input
            type="number"
            class="cantidad-pieza"
            placeholder="Cantidad"
            min="1"
            value="1"
        >


        <button
            type="button"
            class="boton-eliminar"
            onclick="this.parentElement.remove()">

            🗑️

        </button>

    `;


    lista.appendChild(fila);
}


// ============================================================
// GUARDAR ARTÍCULO
// ============================================================

function guardarArticulo() {

    const codigo =
        document
            .getElementById("codigoArticulo")
            .value
            .trim();


    const descripcion =
        document
            .getElementById("descripcionArticulo")
            .value
            .trim();


    if (codigo === "") {

        alert(
            "Ingresá el código del artículo."
        );

        return;
    }


    if (descripcion === "") {

        alert(
            "Ingresá la descripción del artículo."
        );

        return;
    }


    const filas =
        document.querySelectorAll(".fila-pieza");


    const piezas = [];


    filas.forEach(fila => {

        const codigoPieza =
            fila
                .querySelector(".codigo-pieza")
                .value
                .trim();


        const descripcionPieza =
            fila
                .querySelector(".descripcion-pieza")
                .value
                .trim();


        const cantidadPieza =
            Number(
                fila
                    .querySelector(".cantidad-pieza")
                    .value
            );


        if (
            codigoPieza !== "" &&
            descripcionPieza !== "" &&
            cantidadPieza > 0
        ) {

            piezas.push({

                codigo: codigoPieza,

                descripcion: descripcionPieza,

                cantidad: cantidadPieza

            });

        }

    });


    if (piezas.length === 0) {

        alert(
            "Ingresá al menos una pieza."
        );

        return;
    }


    const nuevoArticulo = {

        codigo: codigo,

        descripcion: descripcion,

        piezas: piezas

    };


    articulos.push(nuevoArticulo);


    guardarArticulosEnLocalStorage();


    alert(
        "Artículo guardado correctamente."
    );


    mostrarArticulos();
}


// ============================================================
// VER ARTÍCULO
// ============================================================

function verArticulo(indice) {

    const articulo =
        articulos[indice];


    let filas = "";


    articulo.piezas.forEach(pieza => {

        filas += `

            <tr>

                <td>
                    <strong>
                        ${pieza.codigo}
                    </strong>
                </td>

                <td>
                    ${pieza.descripcion}
                </td>

                <td>
                    ${pieza.cantidad}
                </td>

            </tr>

        `;
    });


    contenido.innerHTML = `

        <div class="pantalla">

            <div class="encabezado-pantalla">

                <div>

                    <h2>
                        📦 ${articulo.codigo}
                    </h2>

                    <p>
                        ${articulo.descripcion}
                    </p>

                </div>


                <button
                    class="boton-secundario"
                    onclick="mostrarArticulos()">

                    ← Volver

                </button>

            </div>


            <div class="informacion-articulo">

                <p>
                    <strong>Código:</strong>
                    ${articulo.codigo}
                </p>

                <p>
                    <strong>Descripción:</strong>
                    ${articulo.descripcion}
                </p>

            </div>


            <h3 class="titulo-despiece">
                🔧 Despiece
            </h3>


            <div class="tabla-contenedor">

                <table>

                    <thead>

                        <tr>

                            <th>Código</th>

                            <th>Descripción</th>

                            <th>Cantidad</th>

                        </tr>

                    </thead>


                    <tbody>

                        ${filas}

                    </tbody>

                </table>

            </div>

        </div>
    `;
}


// ============================================================
// EDITAR ARTÍCULO
// ============================================================

function editarArticulo(indice) {

    const articulo =
        articulos[indice];


    contenido.innerHTML = `

        <div class="pantalla">

            <div class="encabezado-pantalla">

                <div>

                    <h2>✏️ Editar artículo</h2>

                    <p>
                        Modificá el artículo y su despiece.
                    </p>

                </div>


                <button
                    class="boton-secundario"
                    onclick="mostrarArticulos()">

                    ← Volver

                </button>

            </div>


            <div class="formulario">

                <label for="codigoArticulo">
                    Código del artículo
                </label>

                <input
                    type="text"
                    id="codigoArticulo"
                    value="${articulo.codigo}"
                >


                <label for="descripcionArticulo">
                    Descripción
                </label>

                <input
                    type="text"
                    id="descripcionArticulo"
                    value="${articulo.descripcion}"
                >


                <div class="separador"></div>


                <h3 class="titulo-despiece">
                    🔧 Despiece
                </h3>


                <div id="listaPiezas"></div>


                <button
                    class="boton-secundario"
                    onclick="agregarFilaPieza()">

                    ➕ Agregar pieza

                </button>


                <div class="acciones-formulario">

                    <button
                        class="boton-principal"
                        onclick="actualizarArticulo(${indice})">

                        💾 Guardar cambios

                    </button>


                    <button
                        class="boton-secundario"
                        onclick="mostrarArticulos()">

                        Cancelar

                    </button>

                </div>

            </div>

        </div>
    `;


    articulo.piezas.forEach(pieza => {

        const lista =
            document.getElementById("listaPiezas");


        const fila =
            document.createElement("div");


        fila.className =
            "fila-pieza";


        fila.innerHTML = `

            <input
                type="text"
                class="codigo-pieza"
                placeholder="Código"
                value="${pieza.codigo}"
            >


            <input
                type="text"
                class="descripcion-pieza"
                placeholder="Descripción"
                value="${pieza.descripcion}"
            >


            <input
                type="number"
                class="cantidad-pieza"
                placeholder="Cantidad"
                min="1"
                value="${pieza.cantidad}"
            >


            <button
                type="button"
                class="boton-eliminar"
                onclick="this.parentElement.remove()">

                🗑️

            </button>

        `;


        lista.appendChild(fila);
    });
}


// ============================================================
// ACTUALIZAR ARTÍCULO
// ============================================================

function actualizarArticulo(indice) {

    const codigo =
        document
            .getElementById("codigoArticulo")
            .value
            .trim();


    const descripcion =
        document
            .getElementById("descripcionArticulo")
            .value
            .trim();


    if (codigo === "") {

        alert(
            "Ingresá el código del artículo."
        );

        return;
    }


    if (descripcion === "") {

        alert(
            "Ingresá la descripción del artículo."
        );

        return;
    }


    const filas =
        document.querySelectorAll(".fila-pieza");


    const piezas = [];


    filas.forEach(fila => {

        const codigoPieza =
            fila
                .querySelector(".codigo-pieza")
                .value
                .trim();


        const descripcionPieza =
            fila
                .querySelector(".descripcion-pieza")
                .value
                .trim();


        const cantidadPieza =
            Number(
                fila
                    .querySelector(".cantidad-pieza")
                    .value
            );


        if (
            codigoPieza !== "" &&
            descripcionPieza !== "" &&
            cantidadPieza > 0
        ) {

            piezas.push({

                codigo: codigoPieza,

                descripcion: descripcionPieza,

                cantidad: cantidadPieza

            });

        }

    });


    if (piezas.length === 0) {

        alert(
            "Ingresá al menos una pieza."
        );

        return;
    }


    articulos[indice] = {

        codigo: codigo,

        descripcion: descripcion,

        piezas: piezas

    };


    guardarArticulosEnLocalStorage();


    alert(
        "Artículo actualizado correctamente."
    );


    mostrarArticulos();
}


// ============================================================
// ELIMINAR ARTÍCULO
// ============================================================

function eliminarArticulo(indice) {

    const articulo =
        articulos[indice];


    const confirmar =
        confirm(
            `¿Querés eliminar el artículo ${articulo.codigo}?`
        );


    if (!confirmar) {
        return;
    }


    articulos.splice(indice, 1);


    guardarArticulosEnLocalStorage();


    mostrarArticulos();
}


// ============================================================
// NUEVO RECUENTO
// ============================================================

function mostrarNuevoRecuento() {

    contenido.innerHTML = `

        <div class="pantalla">

            <div class="encabezado-pantalla">

                <div>

                    <h2>🔢 Nuevo recuento</h2>

                    <p>
                        Calculá las piezas necesarias para producir
                        una determinada cantidad de artículos.
                    </p>

                </div>


                <button
                    class="boton-secundario"
                    onclick="volverAlInicio()">

                    ← Volver

                </button>

            </div>


            <div class="formulario">

                <label for="articuloRecuento">
                    Artículo
                </label>


                <select id="articuloRecuento">

                    <option value="">
                        Seleccioná un artículo
                    </option>

                    ${articulos.map((articulo, indice) => `

                        <option value="${indice}">

                            ${articulo.codigo}
                            -
                            ${articulo.descripcion}

                        </option>

                    `).join("")}

                </select>


                <label for="cantidadProduccion">

                    Cantidad de artículos a producir

                </label>


                <input
                    type="number"
                    id="cantidadProduccion"
                    min="1"
                    value="1"
                >


                <div class="acciones-formulario">

                    <button
                        class="boton-principal"
                        onclick="calcularRecuento()">

                        🔢 Calcular necesidades

                    </button>

                </div>


                <div id="resultadoRecuento"></div>

            </div>

        </div>
    `;
}


// ============================================================
// CALCULAR RECUENTO
// ============================================================

function calcularRecuento() {

    const elementoArticulo =
        document.getElementById(
            "articuloRecuento"
        );


    const elementoCantidad =
        document.getElementById(
            "cantidadProduccion"
        );


    if (!elementoArticulo || !elementoCantidad) {

        alert(
            "No se pudo cargar el formulario de recuento."
        );

        return;
    }


    const indice =
        elementoArticulo.value;


    const cantidad =
        Number(elementoCantidad.value);


    if (indice === "") {

        alert(
            "Seleccioná un artículo."
        );

        return;
    }


    if (cantidad <= 0) {

        alert(
            "Ingresá una cantidad válida."
        );

        return;
    }


    const articulo =
        articulos[Number(indice)];


    if (!articulo) {

        alert(
            "No se encontró el artículo seleccionado."
        );

        return;
    }


    let filas = "";


    articulo.piezas.forEach(
        (pieza, piezaIndice) => {

            const necesarias =
                pieza.cantidad * cantidad;


            filas += `

                <tr>

                    <td>
                        <strong>
                            ${pieza.codigo}
                        </strong>
                    </td>


                    <td>
                        ${pieza.descripcion}
                    </td>


                    <td>
                        ${pieza.cantidad}
                    </td>


                    <td>
                        <strong>
                            ${necesarias}
                        </strong>
                    </td>


                    <td>

                        <input
                            type="number"
                            min="0"
                            value="0"
                            class="cantidad-encontrada"
                            data-necesarias="${necesarias}"
                            data-pieza="${piezaIndice}"
                            oninput="actualizarFaltante(this)"
                        >

                    </td>


                    <td>

                        <span
                            class="faltante"
                            id="faltante-${piezaIndice}">

                            ${necesarias}

                        </span>

                    </td>

                </tr>

            `;
        }
    );


    const resultado =
        document.getElementById(
            "resultadoRecuento"
        );


    resultado.innerHTML = `

        <div class="separador"></div>


        <h3>
            📋 Resultado del recuento
        </h3>


        <p>

            <strong>Artículo:</strong>

            ${articulo.codigo}
            -
            ${articulo.descripcion}

        </p>


        <p>

            <strong>
                Cantidad a producir:
            </strong>

            ${cantidad}

        </p>


        <div class="tabla-contenedor">

            <table>

                <thead>

                    <tr>

                        <th>Código</th>

                        <th>Descripción</th>

                        <th>Por artículo</th>

                        <th>Necesarias</th>

                        <th>Encontradas</th>

                        <th>Faltantes</th>

                    </tr>

                </thead>


                <tbody>

                    ${filas}

                </tbody>

            </table>

        </div>


        <div class="acciones-formulario">

            <button
                class="boton-principal"
                onclick="guardarRecuento(${Number(indice)}, ${cantidad})">

                💾 Guardar recuento

            </button>

        </div>

    `;
}


// ============================================================
// ACTUALIZAR FALTANTE
// ============================================================

function actualizarFaltante(input) {

    const necesarias =
        Number(
            input.dataset.necesarias
        );


    let encontradas =
        Number(input.value);


    if (encontradas < 0) {

        encontradas = 0;

        input.value = 0;
    }


    let faltantes =
        necesarias - encontradas;


    if (faltantes < 0) {

        faltantes = 0;
    }


    const indice =
        input.dataset.pieza;


    const elementoFaltante =
        document.getElementById(
            `faltante-${indice}`
        );


    if (elementoFaltante) {

        elementoFaltante.textContent =
            faltantes;

    }
}


// ============================================================
// GUARDAR RECUENTO
// ============================================================

function guardarRecuento(
    indiceArticulo,
    cantidadProduccion
) {

    const articulo =
        articulos[indiceArticulo];


    if (!articulo) {

        alert(
            "No se encontró el artículo."
        );

        return;
    }


    let recuentos =
        JSON.parse(
            localStorage.getItem("recuentos")
        ) || [];


    const inputs =
        document.querySelectorAll(
            ".cantidad-encontrada"
        );


    const piezasRecuento = [];


    inputs.forEach(input => {

        const piezaIndice =
            Number(
                input.dataset.pieza
            );


        const necesarias =
            Number(
                input.dataset.necesarias
            );


        const encontradas =
            Number(input.value) || 0;


        let faltantes =
            necesarias - encontradas;


        if (faltantes < 0) {

            faltantes = 0;
        }


        const pieza =
            articulo.piezas[piezaIndice];


        piezasRecuento.push({

            codigo: pieza.codigo,

            descripcion: pieza.descripcion,

            porArticulo: pieza.cantidad,

            necesarias: necesarias,

            encontradas: encontradas,

            faltantes: faltantes

        });

    });


    const nuevoRecuento = {

        numero:
            recuentos.length + 1,

        fecha:
            new Date().toLocaleString(
                "es-AR"
            ),

        articuloCodigo:
            articulo.codigo,

        articuloDescripcion:
            articulo.descripcion,

        cantidadProduccion:
            cantidadProduccion,

        piezas:
            piezasRecuento

    };


    recuentos.push(
        nuevoRecuento
    );


    localStorage.setItem(
        "recuentos",
        JSON.stringify(recuentos)
    );


    alert(
        `Recuento #${nuevoRecuento.numero} guardado correctamente.`
    );
}


// ============================================================
// VOLVER AL INICIO
// ============================================================

function volverAlInicio() {

    contenido.innerHTML = "";
}

// ============================================================
// HISTORIAL DE RECUENTOS
// ============================================================

function mostrarHistorial() {

    let recuentos =
        JSON.parse(
            localStorage.getItem("recuentos")
        ) || [];


    contenido.innerHTML = `

        <div class="pantalla">

            <div class="encabezado-pantalla">

                <div>

                    <h2>📋 Historial de recuentos</h2>

                    <p>
                        Consultá los recuentos realizados anteriormente.
                    </p>

                </div>


                <button
                    class="boton-secundario"
                    onclick="volverAlInicio()">

                    ← Volver

                </button>

            </div>


            <div id="listaHistorial"></div>

        </div>
    `;


    const lista =
        document.getElementById(
            "listaHistorial"
        );


    if (recuentos.length === 0) {

        lista.innerHTML = `

            <div class="mensaje-vacio">

                <h3>
                    📋 No hay recuentos guardados
                </h3>

                <p>
                    Todavía no se ha guardado ningún recuento.
                </p>

            </div>

        `;

        return;
    }


    let html = "";


    recuentos.forEach(recuento => {

        html += `

            <div class="tarjeta-articulo">

                <div>

                    <h3>
                        Recuento #${recuento.numero}
                    </h3>

                    <p>
                        <strong>Fecha:</strong>
                        ${recuento.fecha}
                    </p>

                    <p>
                        <strong>Artículo:</strong>
                        ${recuento.articuloCodigo}
                        -
                        ${recuento.articuloDescripcion}
                    </p>

                    <p>
                        <strong>
                            Cantidad a producir:
                        </strong>
                        ${recuento.cantidadProduccion}
                    </p>

                </div>


                <div class="acciones-formulario">

                    <button
                        class="boton-secundario"
                        onclick="verRecuento(${recuento.numero - 1})">

                        👁️ Ver recuento

                    </button>

                </div>

            </div>

        `;
    });


    lista.innerHTML = html;
}

// ============================================================
// VER DETALLE DE RECUENTO
// ============================================================

function verRecuento(indice) {

    const recuentos =
        JSON.parse(
            localStorage.getItem("recuentos")
        ) || [];


    const recuento =
        recuentos[indice];


    if (!recuento) {

        alert(
            "No se encontró el recuento."
        );

        return;
    }


    let filas = "";


    recuento.piezas.forEach(pieza => {

        filas += `

            <tr>

                <td>
                    <strong>
                        ${pieza.codigo}
                    </strong>
                </td>

                <td>
                    ${pieza.descripcion}
                </td>

                <td>
                    ${pieza.porArticulo}
                </td>

                <td>
                    ${pieza.necesarias}
                </td>

                <td>
                    ${pieza.encontradas}
                </td>

                <td>
                    <strong>
                        ${pieza.faltantes}
                    </strong>
                </td>

            </tr>

        `;
    });


    contenido.innerHTML = `

        <div class="pantalla">

            <div class="encabezado-pantalla">

                <div>

                    <h2>
                        📋 Recuento #${recuento.numero}
                    </h2>

                    <p>
                        Detalle del recuento realizado.
                    </p>

                </div>


                <button
                    class="boton-secundario"
                    onclick="mostrarHistorial()">

                    ← Volver al historial

                </button>

            </div>


            <div class="informacion-articulo">

                <p>

                    <strong>Fecha:</strong>
                    ${recuento.fecha}

                </p>


                <p>

                    <strong>Artículo:</strong>
                    ${recuento.articuloCodigo}
                    -
                    ${recuento.articuloDescripcion}

                </p>


                <p>

                    <strong>
                        Cantidad a producir:
                    </strong>

                    ${recuento.cantidadProduccion}

                </p>

            </div>


            <div class="tabla-contenedor">

                <table>

                    <thead>

                        <tr>

                            <th>Código</th>

                            <th>Descripción</th>

                            <th>Por artículo</th>

                            <th>Necesarias</th>

                            <th>Encontradas</th>

                            <th>Faltantes</th>

                        </tr>

                    </thead>


                    <tbody>

                        ${filas}

                    </tbody>

                </table>

            </div>

        </div>

    `;
}