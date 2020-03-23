import moment from 'moment'
import { getFilters } from './filters'
import { sortNotes, getNotes } from './notes'

// generate the DOM structure for a note
const generateNoteDOM = (note) => {
    const noteEl = document.createElement('a')
    const textEl = document.createElement('p')
    const button = document.createElement('button')
    const statusEl = document.createElement('p')

    // Set up the remove note button
    // button.textContent = 'x'
    // noteEl.appendChild(button)
    // button.addEventListener('click', () => {
    //     removeNote(note.id)
    //     saveNotes(notes)
    //     renderNotes(notes, filters)
    // })

    // Set up the note title text
    if (note.title.length > 0) {
        textEl.textContent = note.title
    } else {
        textEl.textContent = 'Unnamed note'
    }
    textEl.classList.add('list-item__title')
    noteEl.appendChild(textEl)
    noteEl.setAttribute('href', `/edit.html#${note.id}`)
    noteEl.classList.add('list-item')
    statusEl.textContent = updatedAtMessage(note.updatedAt)
    statusEl.classList.add('list-item__subtitle')
    noteEl.appendChild(statusEl)

    return noteEl
}

// Render application notes
const renderNotes = () => {
    const notesEl = document.querySelector('#notes')
    const filters = getFilters()
    const notes = sortNotes(filters.sortBy)
    const filteredNotes = notes.filter((note) =>
        note.title.toLowerCase().includes(filters.searchText.toLowerCase())
    )

    notesEl.innerHTML = ''

    if (filteredNotes.length > 0) {
        filteredNotes.forEach((note) => {
            const noteEl = generateNoteDOM(note)
            notesEl.appendChild(noteEl)
        })
    } else {
        const emptyMessage = document.createElement('p')
        emptyMessage.textContent = 'No notes to show'
        emptyMessage.classList.add('empty-message')
        notesEl.appendChild(emptyMessage)
    }
}

const initializeEditPage = (id) => {
    const titleElement = document.querySelector('#note-title')
    const updatedElement = document.querySelector('#note-updated')
    const bodyElement = document.querySelector('#note-body')
    const notes = getNotes()
    const note = notes.find((note) => note.id === id)

    // redirect user if no note was found
    if (!note) {
        location.assign('/index.html')
    }

    // Initial page load
    titleElement.value = note.title
    updatedElement.textContent = updatedAtMessage(note.updatedAt)
    bodyElement.value = note.body
}

// Generate UpdatedAt message
const updatedAtMessage = (timestamp) =>
    `Last edited: ${moment(timestamp).fromNow()}`

export { generateNoteDOM, renderNotes, updatedAtMessage, initializeEditPage }
