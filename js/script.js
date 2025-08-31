//Busqueda de imagenes
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

//Moving MP3
function makeDraggable(object) {
  let offsetX = 0, offsetY = 0, dragging = false;

  object.addEventListener("mousedown", e => {
    dragging = true;
    offsetX = e.clientX - object.getBoundingClientRect().left;
    offsetY = e.clientY - object.getBoundingClientRect().top;
  });

  document.addEventListener("mousemove", e => {
    if (dragging) {
      object.style.left = e.clientX - offsetX + "px";
      object.style.top  = e.clientY - offsetY + "px";
    }
  });

  document.addEventListener("mouseup", () => dragging = false);
}

makeDraggable(document.querySelector(".player"));

//Music List
const songs = [
  { name: "La Distancia Para Un Duelo", file: "audio/track1.mp3" },
  { name: "Clavar La Espada", file: "audio/track2.mp3" },
  { name: "Canción 3", file: "musica3.mp3" }
];

let current = 0;
const audio = new Audio(songs[current].file);
const title = document.querySelector("#songTitle");

function playSong(index) {
  current = index;
  audio.src = songs[current].file;
  title.textContent = songs[current].name;
  audio.play();
  updatePlayButton(true);
}

function updatePlayButton(playing) {
  if (playing) {
    btnPlay.style.display = "none";
    btnPause.style.display = "inline-block";
  } else {
    btnPause.style.display = "none";
    btnPlay.style.display = "inline-block";
  }
}

function nextSong() {
  playSong((current + 1) % songs.length);
}

function prevSong() {
  playSong((current - 1 + songs.length) % songs.length);
}

const btnPlay = document.getElementById("play");
const btnPause = document.getElementById("pause");

btnPlay.addEventListener("click", () => { audio.play(); updatePlayButton(true); });
btnPause.addEventListener("click", () => { audio.pause(); updatePlayButton(false); });
document.getElementById("next").addEventListener("click", nextSong);
document.getElementById("prev").addEventListener("click", prevSong);
audio.addEventListener("ended", nextSong);
