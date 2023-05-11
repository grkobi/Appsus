import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'

const NOTE_KEY = 'notesDB'


const gNotes = [{
    id: 'n101',
    createdAt: 1112222,
    type: 'NoteTxt',
    isPinned: true,
    style: {
        backgroundColor: '#00d'
    },
    info: {
        txt: 'Fullstack Me Baby!'
    }
}]

_createNotes()

export const noteService = {
    query,
    get,
    remove,
    save,
    getDefaultFilter,
    createNote
}

function query(filterBy = {}) {
    return storageService.query(NOTE_KEY).then(notes => {
            return notes
        })
}

function _createNotes() {
    let notes = utilService.loadFromStorage(NOTE_KEY)
    if (!notes || !notes.length) {
        utilService.saveToStorage(NOTE_KEY, gNotes)
    }
}

function get(noteId) {
    return storageService.get(NOTE_KEY, noteId)
    // return axios.get(CAR_KEY, carId)
}

function remove(noteId) {
    return storageService.remove(NOTE_KEY, noteId)
}

function save(note) {
    if (note.id) {
        return storageService.put(NOTE_KEY, note)
    } else {
        return storageService.post(NOTE_KEY, note)
    }
}

function getDefaultFilter() {
    return { title: '', maxPageCount: '', language: '', maxPrice: '' }
}

// function _createNotes() {
//     let notes = utilService.loadFromStorage(NOTE_KEY)
//     if (!notes || !notes.length) {
//         notes = [
//             {
//                 id: 'n101',
//                 createdAt: 1112222,
//                 type: 'NoteTxt',
//                 isPinned: true,
//                 style: {
//                     backgroundColor: '#00d'
//                 },
//                 info: {
//                     txt: 'Fullstack Me Baby!'
//                 }
//             }
//         ]
//         utilService.saveToStorage(NOTE_KEY, notes)
//     }
// }

function createNote(noteType) {
    return {
        id: utilService.makeId(),
        type,
        isPinned,
        info,
        style
    }
}