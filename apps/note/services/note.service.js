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
        backgroundColor: '#F28C28'
    },
    info: {
        url: 'https://player.vimeo.com/video/255688717?h=4b15bf92a9',
        title: "The beautiful Myanmar"
    }
},
{
    id: 'n103',
    createdAt: 1125434512229,
    type: 'note-img',
    isPinned: true,
    style: {
        backgroundColor: '#DAA06D'
    },
    info: {
        url: 'https://img.jamieoliver.com/home/wp-content/uploads/features-import/2016/04/How_to_make_coffee_22548_preview.jpg',
        title: "Remember what's important"
    }
},
{
    id: 'n104',
    createdAt: 1125434512239,
    type: 'note-img',
    isPinned: true,
    style: {
        backgroundColor: '#DAA06D'
    },
    info: {
        url: 'https://static01.nyt.com/images/2023/05/07/multimedia/07nba-playoffs-curry-james-02-tqvm/07nba-playoffs-curry-james-02-tqvm-superJumbo-v3.jpg',
        title: "Steph"
    }
}

]

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
        return notes.filter((note) => {
            let passed = true
            let completeText = note.info.title + ' ' + note.info.txt
            if (filterBy.text && (note.info.txt || note.info.title) && !completeText.toLowerCase().includes(filterBy.text)) {
                passed = false
            }
            if (filterBy.type && note.type && filterBy.type !== note.type) {
                passed = false
            }
            return passed
        })
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
    return { title: '', text: '' }
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
    return {
        id: '',
        type,
        isPinned: true,
        info: { txt: info },
        style
    }
}