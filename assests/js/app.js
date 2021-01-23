let noteID = 0;
let columnID = 1;
let dragNote = null;


document
    .querySelectorAll('.column')
    .forEach(addNote);

document
    .querySelector('[data-add-column]')
    .addEventListener('click', function() {
        const columnElement = document.createElement('div');

        columnElement.classList.add('column');
        columnElement.setAttribute('draggable', true);
        columnElement.setAttribute('data-column-id', columnID);

        columnID++;

        columnElement.innerHTML = 
            `
            <div class="column-header">Column Title</div>
            <div data-notes></div>
            <div data-add-note class="column-footer">Add Note</div>
            `;

        document.querySelector('.columns').append(columnElement);

        edtiColumHeader(columnElement);

        addNote(columnElement);
    })

function editNote(note) {
    if(note) {
        const noteHeader = note.querySelector('.note-header');
        const noteBody = note.querySelector('.note-body');

        noteHeader.addEventListener('dblclick', function() {
            noteHeader.setAttribute('contenteditable', true);
            noteHeader.focus();
            noteHeader.style.cursor = 'text';
        });

        noteHeader.addEventListener('blur', function() {
            noteHeader.removeAttribute('contenteditable');
            noteHeader.style.cursor = 'pointer';
        });

        noteBody.addEventListener('dblclick', function() {
            noteBody.setAttribute('contenteditable', true);
            noteBody.focus();
            noteBody.style.cursor = 'text';
        });

        noteBody.addEventListener('blur', function() {
            noteBody.removeAttribute('contenteditable');
            noteBody.style.cursor = 'pointer';
        });
    }
}

function edtiColumHeader(column) {
    if(column) {
        const columnHeader = column.querySelector('.column-header');
    
        columnHeader.addEventListener('dblclick', function() {
            columnHeader.setAttribute('contenteditable', true);
            columnHeader.focus();
            columnHeader.style.cursor = 'text';
        })
    
        columnHeader.addEventListener('blur', function() {
            columnHeader.removeAttribute('contenteditable');
            columnHeader.style.cursor = 'pointer';
        });
    }
}
edtiColumHeader(document.querySelector('.column'));


function addNote (column) {
    const addNote = column.querySelector('[data-add-note]');

    addNote.addEventListener('click', function() {
        const noteElement = document.createElement('div');

        noteElement.classList.add('note');
        noteElement.setAttribute('draggable', true);
        noteElement.setAttribute('data-note-id', noteID);

        noteID++;

        noteElement.innerHTML = 
            `
            <div class="note-header">Note ${noteID}</div>
            <div class="note-body">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus mollitia repellendus, assumenda aliquid eos dolore repellat eligendi impedit minima recusandae. Repellat pariatur laborum at deleniti quidem veritatis eaque modi magnam!</div>
            `;

        column.querySelector('[data-notes]').append(noteElement);

        editNote(noteElement);

        noteElement.addEventListener('dragstart', dragStart);
        noteElement.addEventListener('dragend', dragEnd);
        noteElement.addEventListener('dragenter', dragEnter);
        noteElement.addEventListener('dragover', dragOver);
        noteElement.addEventListener('dragleave', dragLeave);
        noteElement.addEventListener('drop', dragDrop);
    });
}

function dragStart(e) {
    dragNote = this;
    this.classList.add('dragged');
}

function dragEnd(e) {
    dragNote = null;
    this.classList.remove('dragged');

    document.querySelectorAll('.note').forEach(note => {
        note.classList.remove('under');
    })
}

function dragEnter(e) {
    if(this === dragNote) {
        return
    }
    this.classList.add('under');
}

function dragOver(e) {
    if(this === dragNote) {
        return
    }
    e.preventDefault();
}

function dragLeave(e) {
    if(this === dragNote) {
        return
    }
    this.classList.remove('under');
}

function dragDrop(e) {
    if(this === dragNote) {
        return
    }

    console.log('this', this)
    console.log('dragNote', dragNote)
    
    if(this.parentElement === dragNote.parentElement) {
        //
    } else {
        this.parentElement.insertBefore(dragNote, this);
    }
}