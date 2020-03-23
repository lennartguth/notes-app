import moment from 'moment'
import { v4 as uuidv4 } from 'uuid'

let notes = []

// read existing notes from localStorage
const loadNotes = () => {
    const notesJSON = localStorage.getItem('notes')

    try {
        return notesJSON ? JSON.parse(notesJSON) : []
    } catch (e) {
        return []
    }
}

// save notes to localStorage
const saveNotes = () => {
    localStorage.setItem('notes', JSON.stringify(notes))
}

// Expose notes from module
const getNotes = () => {
    return notes
}

const createNote = () => {
    const id = uuidv4()
    const timestamp = moment().valueOf()
    notes.push({
        id: id,
        title: '',
        body: '',
        createdAt: timestamp,
        updatedAt: timestamp
    })
    saveNotes()
    return id
}

// remove a note from the list
const removeNote = (id) => {
    const noteIndex = notes.findIndex((note) => note.id === id)
    if (noteIndex > -1) {
        notes.splice(noteIndex, 1)
        saveNotes()
    }
}

// Sort notes by one of the three ways
const sortNotes = (sortBy) => {
    if (sortBy === 'byEdited') {
        notes.sort((a, b) => b.updatedAt - a.updatedAt)
        return notes
    } else if (sortBy === 'byCreated') {
        notes.sort((a, b) => b.createdAt - a.createdAt)
        return notes
    } else if (sortBy === 'byAlphabet') {
        notes.sort((a, b) => {
            const aTitle = a.title.toLowerCase()
            const bTitle = b.title.toLowerCase()
            if (aTitle < bTitle) {
                return -1
            }
            if (aTitle > bTitle) {
                return 1
            }
            return 0
        })
        return notes
    }
}

const updateNote = (id, updates) => {
    const note = notes.find((note) => note.id === id)
    if (!note) {
        return
    }
    if (typeof updates.title === 'string') {
        note.title = updates.title
        note.updatedAt = moment().valueOf()
    }

    if (typeof updates.body === 'string') {
        note.body = updates.body
        note.updatedAt = moment().valueOf()
    }
    saveNotes()
    return note
}

notes = loadNotes()

export { getNotes, createNote, saveNotes, removeNote, sortNotes, updateNote }
