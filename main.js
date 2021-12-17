let ul_artiste = document.querySelector(".artiste_liste");
let image_gauche = document.querySelector(".img_gauche img");
let film = document.querySelector("video");
let ul_titre = document.querySelector(".titre_chanson");
//bouton interaction musique
let bouton_stop = document.querySelector(".btn_stop");
let bouton_pause = document.querySelector(".btn_pause");
let bouton_recul = document.querySelector(".prev");
let bouton_avance = document.querySelector(".next");
let bouton_volume = document.querySelector("#volume");
let audio = document.querySelector("#audio");
let video = document.querySelector("video");
let bouton_stop_video = document.querySelector(".bouton_stop_video")
let bouton_relancer = document.querySelector(".btn_relancer");

let json = {};

const SRC_IMAGE = "./src/images/";
const SRC_CLIP = "./src/video/";
const SRC_TITRE = "./src/titre/";
const SRC_MUSIQUE = "./src/musique/";

fetch("src/json/musique.json")
  .then((response) => {
    return response.json();
  })
  .then((toto) => {
    json = toto;
    json.forEach((element) => {
      createList(element);
      changeSrcClip(element);
    });
  });

function createList(jsonObj) {
  let li = document.createElement("li");
  let h2 = document.createElement("h2");
  let h3 = document.createElement("h3");

  h2.textContent = jsonObj.artiste;
  h3.textContent = jsonObj.titre;
  li.addEventListener("click", (e) => {
    changeSrcImg(jsonObj.image);
    changeSrcClip(jsonObj.clip);
    playSrcMusique(jsonObj.src_musique);
    audio.play();
    video.play();
    h3.classList.add("js_visible");
  });
  li.appendChild(h2);
  li.appendChild(h3);
  ul_artiste.appendChild(li);
}

function changeSrcImg(src) {
  image_gauche.src = SRC_IMAGE + src;
}

function changeSrcClip(src) {
  film.src = SRC_CLIP + src;
}

function playSrcMusique(src) {
  audio.src = SRC_MUSIQUE + src;
}

bouton_pause.addEventListener("click", (e) => {
  if (audio.paused) {
    audio.play();
    video.play();
  } else {
    audio.pause();
    video.pause()
  }
});

bouton_stop.addEventListener("click", (e) => {
  audio.currentime = 0;
  audio.pause();
  video.currentime = 0;
  video.pause()
});

bouton_volume.addEventListener("input", (e) => {
  hausse_volume(audio, volume.value);
  console.log("loliloll");
});

function hausse_volume(audio, value) {
  let boutonSon = value / 100;
  audio.volume = boutonSon;
  video.volume = boutonSon;
 }

// je déclare un index à zéro
let index = 0;
bouton_recul.addEventListener("click", (e) => {  
  if (index == -1) {
    index = json.length -1;
  }
   // je déclare les chansons de mon tableau json
  let son = json[index];
  // je reprends les changement de toutes les fonctions au click
  playSrcMusique(son.src_musique);
  changeSrcImg(son.image);
  changeSrcClip(son.clip);
   // je désincrémente mon tableau 
  index --;
  // je lance la chanson
  audio.play();
  video.play();

});

bouton_avance.addEventListener("click", (e) => {
   // j'incrémente mon tableau
  index++;
  if (index == json.length) {
    index = 0;
  }
  // je déclare les chansons de mon tableau json
  let song = json[index];
  // console.log(index);
  // je reprends les changement de toutes les fonctions au click
  playSrcMusique(song.src_musique);
  changeSrcImg(song.image);
  changeSrcClip(song.clip);
  // je lance la chanson
  audio.play();
  video.play();
  //si j'arrive à la dernière chanson je repards au début

});

bouton_relancer.addEventListener('click', (e)=> {
  audio.play();
  video.play();
});

bouton_stop_video.addEventListener("click", (e) => {
    video.pause()
  
});
