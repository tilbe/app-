const addBox = document.querySelector(".add-box")
const popBox = document.querySelector(".pop-box")
const popTitle = document.querySelector("header p")
const closeIcon = document.querySelector("header i")
const addButton = document.querySelector("button")
const titleTag = document.querySelector("input")
const descTag = document.querySelector("textarea")


const mount = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const notes = JSON.parse(localStorage.getItem("notes") || "[]");
let isUpdate = false, updateId;


addBox.addEventListener("click", () => {
    titleTag.focus();
    popBox.classList.add("show")
});

closeIcon.addEventListener("click", () => {
    isUpdate =false
    titleTag.value = " ";
    descTag.value = " ";
    addButton.innerHTML=" Add Note"
    popTitle.innerHTML=" Add a New Note"
    popBox.classList.remove("show")
})

function showNotes() {
    document.querySelectorAll(".note").forEach(note => note.remove());

    notes.forEach((note, index) => {

        let liTag = `<li class="note">
                      <div class="details">
                          <p>${note.title}</p>
                            <span>${note.description}</span>
                        </div>
              <div class="bottom-content">
                       <span>${note.date}</span>
             <div class="setting">
                       <i onclick="showMenu(this)" class="fa-solid fa-ellipsis"></i>
                     <ul class="menu">
               <li onclick = "editNote(${index}, '${note.title}', '${note.description}' )" class="edit"><i class="fa-regular fa-pen-to-square"></i> Edit</li>
               <li onclick = "deletNote(${index})" class="delet"><i class="fa-solid fa-trash"></i>Delete</li>
           </ul>
       </div>
   </div>
</li>
   `;

        addBox.insertAdjacentHTML("afterend", liTag);
    });
}
showNotes()

function showMenu(elem) {
    elem.parentElement.classList.add("show")
    document.addEventListener("click", e => {
        if (e.target.tagName != "I" || e.target != elem) {
            elem.parentElement.classList.remove("show")
        }
    })
}

function deletNote(noteId) {
    
    notes.splice(noteId, 1);
    localStorage.setItem("notes", JSON.stringify(notes));
    showNotes();
}

function editNote(noteId, title, desc) {
    isUpdate = true
    updateId = noteId;
    addBox.click();
    titleTag.value = title;
    descTag.value = desc
    addButton.innerHTML=" Update Note"
    popTitle.innerHTML=" Update Note"
    console.log(noteId, title, desc)
}

addButton.addEventListener("click", (e) => {
    e.preventDefault()
    let noteTile = titleTag.value;
    let noteDes = descTag.value;

    if (noteTile || noteDes) {
        let dateObj = new Date(),
            monuth = mount[dateObj.getMonth()],
            days = dateObj.getDate(),
            year = dateObj.getFullYear();


        let noteInfo = {
            title: noteTile, description: noteDes,
            date: `${monuth} ,${days}, ${year}`
        }
        if(!isUpdate){
            notes.push(noteInfo)
        }else{
            isUpdate =false;
            notes[updateId] = noteInfo;
        }

  
        localStorage.setItem("notes", JSON.stringify(notes));
        closeIcon.click();
        showNotes()
    }

})