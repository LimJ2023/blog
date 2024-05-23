const noteContainer = document.querySelector(".note-container");
const createBtn = document.querySelector(".createBtn");
const delBtn = document.querySelector(".del-icon");
let notes = document.querySelectorAll(".input-box");

createBtn.addEventListener('click', () => {
    let inputbox = document.createElement('div');
    inputbox.className = 'input-box';
    inputbox.innerHTML = `<textarea placeholder="여기에 메모를 입력하세요..."></textarea>
    <img src="img/delete_sweep.png" class="del-icon">`;

    noteContainer.appendChild(inputbox);
})

delBtn.addEventListener('click', () => {
    const note = delBtn.closest('.input-box');
        if (note) {
            note.remove();
        }
})