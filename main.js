document.addEventListener("DOMContentLoaded", function() {
    showNotes();
});
let btnAdd = document.querySelector(".body2_btnAdd");
let btnPinnedAdd = document.querySelector(".body2_btnPinned");
let title = document.querySelector(".body2_title_input");
let author = document.querySelector(".body2_author_input");
let desc = document.querySelector(".body2_textarea");
let pinnedNote = document.querySelector(".archive_pined");
let archiveNote = document.querySelector(".archive_notes");
let cards = document.querySelector(".archive_card");
let body = document.querySelector(".body");
let noteInfo;
const months = ["January", "February", ' March', ' April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const notes = JSON.parse(localStorage.getItem("notes" )|| "[]");
function openNav() {
  document.getElementById("mySidenav").style.width = "180px";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}
function addnote() {
  let archive = document.getElementById("archive"); 
  archive.style.display = "none";
  let body = document.getElementById("body");
  body.style.display = "none";
  let body2 = document.getElementById("body2");
  body2.style.display = "flex";
  document.getElementById("header_menu_notes").classList.remove("clicked");
  document.getElementById("header_menu_add_note").classList.add("clicked");
  document.getElementById("liNote").classList.remove("clicked");
  document.getElementById("liAddNote").classList.add("clicked");
  document.getElementById("mySidenav").style.width = "0";
}
function note() {
  let archive = document.getElementById("archive"); // Corrected method name
  archive.style.display = "flex";
  let body = document.getElementById("body"); // Corrected method name
  body.style.display = "flex";
  let body2 = document.getElementById("body2");
  body2.style.display = "none";
  document.getElementById("header_menu_add_note").classList.remove("clicked");
  document.getElementById("header_menu_notes").classList.add("clicked");
  document.getElementById("liAddNote").classList.remove("clicked");
  document.getElementById("liNote").classList.add("clicked");
  document.getElementById("mySidenav").style.width = "0";
}
function pinNote(index) {
    let notes = JSON.parse(localStorage.getItem("notes")) || [];
    notes[index].pinned = !notes[index].pinned;
    localStorage.setItem("notes", JSON.stringify(notes));
}
function showNotes() {
  notes.forEach((note,index) => {
    let liNote = `<div class="archive_card" onclick = "show(${index})">
            <h4 class="archive_h4">${note.noteInfo.tittle}</h4>
            <p class="archive_p">${note.noteInfo.descc}</p>
            <div class="archive_date_del">
              <p class="archive_date">${note.noteInfo.date}</p>
              <p onclick="deleteNote(${index})" class="archive_delbtn">Delete</p>
              <button class="btnPinned" onclick="pinNote(${index})">${note.pinned ? "Unpin" : "Pin"}</button>
            </div>
            </div>`;
    if (note.pinned) {
      pinnedNote.insertAdjacentHTML("afterend", liNote);
    } else {
          archiveNote.insertAdjacentHTML("afterend", liNote);
    }
  });
}
function deleteNote (noteId){
  notes.splice(noteId, 1);
  localStorage.setItem("notes" , JSON.stringify(notes));
}

btnAdd.addEventListener("click", function (e) {
  e.preventDefault();
  let noteTitle = title.value;
  let noteAuthor = author.value;
  let noteDesc = desc.value;
  if (noteTitle || noteAuthor || noteDesc) {
    let dateObj = new Date(),
      month = months[dateObj.getMonth()],
      day = dateObj.getDate(),
      year = dateObj.getFullYear();
    let noteInfo = {
      tittle: noteTitle,
      authoor: noteAuthor,
      descc: noteDesc,
      date: `${month} ${day} ${year}`
    }

    notes.push({noteInfo : noteInfo,pinned: false});
    localStorage.setItem("notes", JSON.stringify(notes));
  }
});
function show(e) {
  console.log(notes[e].noteInfo);
  let card = `<div class="body_card">
          <h1 class="body_title">${notes[e].noteInfo.tittle}</h1>
          <p class="body_date"><span>${notes[e].noteInfo.date}</span> / by ${notes[e].noteInfo.authoor}</p>
          <p class="body_description">${notes[e].noteInfo.descc}</p>
        </div>`
  let oldcard =  document.querySelector('.body_card')
    if(oldcard) oldcard.parentNode.removeChild(oldcard)
  body.insertAdjacentHTML("afterbegin", card);
  let archive = document.getElementById("archive"); 
  archive.style.display = "none";
}
let search = document.querySelector(".header_input");
search.addEventListener("keyup", e => {
  let currVal = e.target.value.toLowerCase();
  console.log(currVal);
  let cardtitle = document.querySelectorAll(".archive_h4");
  cardtitle.forEach(card => {
    if (card.textContent.toLocaleLowerCase().includes(currVal)) {
      card.parentNode.style.display = "block";
    } else {
            card.parentNode.style.display = "none";
    }
  })
})
