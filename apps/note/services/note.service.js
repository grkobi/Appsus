import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'

const NOTE_KEY = 'notesDB'


const gNotes = [{
    id: 'n101',
    createdAt: 1112222,
    type: 'note-txt',
    isPinned: true,
    style: {
        backgroundColor: 'lightblue'
    },
    info: {
        txt: 'To clean my apartment'
    }
},
{
    id: 'n102',
    createdAt: 1125434512222,
    type: 'note-video',
    isPinned: true,
    style: {
        backgroundColor: '#EB5406'
    },
    info: {
        url: 'https://player.vimeo.com/video/255688717?h=4b15bf92a9',
        title: "The beautiful Myanmar"
    },


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
    console.log('note note ID', note)
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

function createNote(type, info, style) {
    console.log('createnote', info)
    return {
        id: '',
        type,
        isPinned: true,
        info: { txt: info },
        style
    }
}