document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("searchForm");
    const input = document.getElementById("searchBox");
    const grid = document.getElementById("searchResult");
    

    const productos = Array.from(grid.querySelectorAll(".producto"));
    const muestras = document.querySelectorAll(".imagenMuestra");

    form.addEventListener("submit", (e) => {
        e.preventDefault(); // Evita que recargue la página
        filtrarImagenes(input.value.trim().toLowerCase());
    });

    input.addEventListener("input", () => {
        filtrarImagenes(input.value.trim().toLowerCase());
    });

    function filtrarImagenes(texto) {

        let huboCoincidencia = false;

        // Si no hay búsqueda, se muestran todos
        if (texto === "") {
            productos.forEach(p => p.style.display = "");
            muestras.forEach(m => m.style.display = "");
            return;
        }

        productos.forEach(p => {
            const nombre = p.querySelector(".name")?.textContent.toLowerCase() || "";
            const apellido = p.querySelector(".apellido")?.textContent.toLowerCase() || "";

            // Coincidencia en alt, nombre o apellido
            if (nombre.includes(texto) || apellido.includes(texto)) {
                p.style.display = "";
                huboCoincidencia = true;
            } else {
                p.style.display = "none";
                huboCoincidencia = true;
            }
        });

        muestras.forEach(m => {
            m.style.display = huboCoincidencia ? "none" : "";
        });
    }
});
