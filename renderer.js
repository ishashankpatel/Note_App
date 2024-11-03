const fs = require('fs');
const path = require('path');
const notesPath = path.join(__dirname, 'notes.json');

// Helper function to load notes
function loadNotes() {
    if (fs.existsSync(notesPath)) {
        const data = fs.readFileSync(notesPath);
        return JSON.parse(data);
    }
    return [];
}

// Helper function to save notes
function saveNotes(notes) {
    fs.writeFileSync(notesPath, JSON.stringify(notes));
}

document.addEventListener('DOMContentLoaded', () => {
    const notesList = document.getElementById('notesList');
    const noteContent = document.getElementById('noteContent');
    const saveButton = document.getElementById('saveButton');
    let notes = loadNotes();
    let selectedNoteIndex = -1;

    // Populate the notes list
    function updateNotesList() {
        notesList.innerHTML = '';
        notes.forEach((note, index) => {
            const listItem = document.createElement('li');
            listItem.textContent = note.title || `Note ${index + 1}`;
            listItem.addEventListener('click', () => {
                selectedNoteIndex = index;
                noteContent.value = note.content;
            });
            notesList.appendChild(listItem);
        });
    }

    // Save current note
    saveButton.addEventListener('click', () => {
        const content = noteContent.value.trim();
        if (content) {
            if (selectedNoteIndex >= 0) {
                notes[selectedNoteIndex].content = content;
            } else {
                notes.push({ title: `Note ${notes.length + 1}`, content });
            }
            saveNotes(notes);
            updateNotesList();
            noteContent.value = '';
            selectedNoteIndex = -1;
        }
    });

    // Load notes on startup
    updateNotesList();
});
