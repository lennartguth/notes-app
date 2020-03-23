import { removeNote, updateNote } from './notes'
import { initializeEditPage, updatedAtMessage } from './views'

const titleElement = document.querySelector('#note-title')
const updatedElement = document.querySelector('#note-updated')
const bodyElement = document.querySelector('#note-body')
const removeElement = document.querySelector('#remove-note')
const noteId = location.hash.substring(1)

initializeEditPage(noteId)

// Update note
titleElement.addEventListener('input', (e) => {
    const note = updateNote(noteId, {
        title: e.target.value
    })
    updatedElement.textContent = updatedAtMessage(note.updatedAt)
})
bodyElement.addEventListener('input', (e) => {
    const note = updateNote(noteId, {
        body: e.target.value
    })
    updatedElement.textContent = updatedAtMessage(note.updatedAt)
})

removeElement.addEventListener('click', () => {
    removeNote(noteId)
    location.assign('/index.html')
})

window.addEventListener('storage', (e) => {
    if (e.key === 'notes') {
        initializeEditPage(noteId)
    }
})
