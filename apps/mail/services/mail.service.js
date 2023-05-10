// mail service
import { storageService } from '../../../services/async-storage.service.js'
import { utilService } from '../../../services/util.service.js'

const EMAIL_KEY = 'emailDB'

const gEmails = [{
    id: 'e101',
    subject: 'Miss you!',
    body: 'Would love to catch up sometimes',
    isRead: false,
    sentAt: 1551133930594,
    removedAt: null,
    from: 'momo@momo.com',
    to: 'user@appsus.com'
},
{
    id: 'e102',
    subject: 'Hello!',
    body: 'It rains outside',
    isRead: false,
    sentAt: 1551133930594,
    removedAt: null,
    from: 'yoyo@momo.com',
    to: 'user@appsus.com'
},
{
    id: 'e103',
    subject: 'Miss you!',
    body: 'Would love to catch up sometimes',
    isRead: false,
    sentAt: 1551133930594,
    removedAt: null,
    from: 'momo@momo.com',
    to: 'user@appsus.com'
},
{
    id: 'e104',
    subject: 'Miss you!',
    body: 'Would love to catch up sometimes',
    isRead: false,
    sentAt: 1551133930594,
    removedAt: null,
    from: 'momo@momo.com',
    to: 'user@appsus.com'
},
{
    id: 'e105',
    subject: 'Miss you!',
    body: 'Would love to catch up sometimes',
    isRead: false,
    sentAt: 1551133930594,
    removedAt: null,
    from: 'momo@momo.com',
    to: 'user@appsus.com'
}]
_createEmails()

export const mailService = {
    query,
    getEmptyEmail
}

const loggedinUser = {
    email: 'user@appsus.com',
    fullname: 'Mahatma Appsus'
}

const criteria = {
    status: 'inbox/sent/trash/draft',
    txt: 'puki', // no need to support complex text search
    isRead: true, // (optional property, if missing: show all)
    isStared: true, // (optional property, if missing: show all)
    lables: ['important', 'romantic'] // has any of the labels
}

function query() {
    return storageService.query(EMAIL_KEY).then(emails => { return emails })

}
 

function _createEmails() {
    let emails = utilService.loadFromStorage(EMAIL_KEY)
    if (!emails || !emails.length) {

      utilService.saveToStorage(EMAIL_KEY, gEmails)
    }
  }
function getEmptyEmail() {
    return {
        id: utilService.makeId(),
        subject: '',
        body: '',
        isRead: false,
        sentAt: Date.now(),
        removedAt: null,
        from: 'momo@momo.com',
        to: 'user@appsus.com'
    }
}

function _createEmail(){

}
