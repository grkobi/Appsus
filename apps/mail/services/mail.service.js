// mail service
import { storageService } from '../../../services/async-storage.service.js'
import { utilService } from '../../../services/util.service.js'

const EMAIL_KEY = 'emailDB'


const gEmails = [{
    id: 'e101',
    subject: 'Hey there!',
    body: 'Would like to see you soon',
    isRead: false,
    isStarred: false,
    sentAt: 1551133930594,
    removedAt: null,
    from: 'momo@momo.com',
    to: 'user@appsus.com',
    folder: 'inbox',
    labels: ['important', 'romantic']
},
{
    id: 'e102',
    subject: 'Hello!',
    body: 'It rains outside',
    isRead: false,
    isStarred: false,
    sentAt: 1551133930594,
    removedAt: null,
    from: 'user@appsus.com',
    to: 'yoyo@momo.com',
    folder: 'sent',
    labels: ['romantic']
},
{
    id: 'e103',
    subject: 'Miss you!',
    body: 'Would love to catch up sometimes',
    isRead: false,
    isStarred: true,
    sentAt: 1551133930594,
    removedAt: null,
    from: 'momo@momo.com',
    to: 'user@appsus.com',
    folder: 'inbox',
    labels: ['important']
},
{
    id: 'e104',
    subject: 'Interesting thinhgs',
    body: 'Got some new info for you',
    isRead: false,
    isStarred: false,
    sentAt: 1551133930594,
    removedAt: null,
    from: 'zoho@momo.com',
    to: 'user@appsus.com',
    folder: 'inbox',
    labels: []
},
{
    id: 'e105',
    subject: 'Miss you very much!',
    body: 'Would love to catch up sometimes soon',
    isRead: false,
    isStarred: true,
    sentAt: 1551133930594,
    removedAt: null,
    from: 'bobik@cmail.com',
    to: 'user@appsus.com',
    folder: 'inbox',
    labels: []
},
{
    id: 'e106',
    subject: 'Miss you!',
    body: 'Let me know whne you are free',
    isRead: false,
    isStarred: false,
    sentAt: 1551133930594,
    removedAt: null,
    from: 'user@appsus.com',
    to: '',
    folder: 'drafts',
    labels: []
},
{
    id: 'e107',
    subject: 'Very important!',
    body: 'Rainy whether today',
    isRead: false,
    isStarred: true,
    sentAt: 1551133930594,
    removedAt: null,
    from: 'user@appsus.com',
    to: '',
    folder: 'drafts',
    labels: []
}]
const loggedinUser = {
    email: 'user@appsus.com',
    fullname: 'Mahatma Appsus'
}


_createEmails()

let gEmailsCount = _countEmails()

export const mailService = {
    query,
    getEmptyEmail,
    getDefaultFilter,
    deleteEmail,
    toggleIsRead,
    toggleIsStarred,
    toggleIsImportant,
    getLoggedinUser,
    saveEmail,
    moveToTrash,
    getEmail,
    receiveNewEmail,
    getMailsCounts,
    getMailCount

}



function getDefaultFilter() {
    return {
        folder: 'inbox',
        txt: '',
        isRead: '', // (optional property, if missing: show all)
        isStarred: '', // (optional property, if missing: show all)
        lables: [] // has any of the labels
    }
}

function getEmptyEmail() {
    return {
        id: '',
        subject: '',
        body: '',
        isRead: false,
        isStarred: false,
        sentAt: Date.now(),
        removedAt: null,
        from: 'user@appsus.com',
        to: '',
        folder: 'inbox',
        labels: []
    }
}

// TODO: fix the logic. Folder has to be an array- folders. Since an email can be in several folders

function getLoggedinUser() {
    return loggedinUser
}

function query(filterBy = {}) {
    return storageService.query(EMAIL_KEY).then(emails => {

        if (filterBy.folder) {
            if (filterBy.folder === 'starred') {
                emails = emails.filter(email => {
                    return email.isStarred && (email.subject.toLowerCase().includes(filterBy.txt.toLowerCase()) ||
                        email.body.toLowerCase().includes(filterBy.txt.toLowerCase()) ||
                        email.to.toLowerCase().includes(filterBy.txt.toLowerCase()) ||
                        email.from.toLowerCase().includes(filterBy.txt.toLowerCase()))
                })
            } else
                if (filterBy.folder === 'inbox') {
                    emails = emails.filter(email => {
                        return email.to === loggedinUser.email && (email.folder !== 'trash') &&
                            (email.subject.toLowerCase().includes(filterBy.txt.toLowerCase()) ||
                                email.body.toLowerCase().includes(filterBy.txt.toLowerCase()) ||
                                email.to.toLowerCase().includes(filterBy.txt.toLowerCase()) ||
                                email.from.toLowerCase().includes(filterBy.txt.toLowerCase()))
                    })
                }
                else {
                    emails = emails.filter(email => {
                        return email.folder === filterBy.folder && (email.subject.toLowerCase().includes(filterBy.txt.toLowerCase()) ||
                            email.body.toLowerCase().includes(filterBy.txt.toLowerCase()) ||
                            email.to.toLowerCase().includes(filterBy.txt.toLowerCase()) ||
                            email.from.toLowerCase().includes(filterBy.txt.toLowerCase()))
                    })
                }
        }


        return emails
    })


}

function getMailsCounts() {
    const counts = {
        inbox: 0,
        sent: 0,
        trash: 0,
        starred: 0,
        draft: 0,
    }

    return storageService.query(EMAIL_KEY).then(emails => {

        emails.forEach((mail) => {
            if (mail.folder === 'inbox' || (mail.to === mailService.getLoggedinUser().email && mail.folder !== 'drafts' && mail.folder !== 'trash')) counts.inbox++
            else if (mail.folder === 'sent') counts.sent++
            else if (mail.folder === 'trash') counts.trash++

            if (mail.isStarred) counts.starred++
            if (mail.folder === 'draft') counts.draft++
        })

        return counts
    })
}

function getMailCount() {
    return gEmailsCount
}


function _createEmails() {
    let emails = utilService.loadFromStorage(EMAIL_KEY)
    if (!emails || !emails.length) {

        utilService.saveToStorage(EMAIL_KEY, gEmails)
    }

}

function _countEmails() {
    return storageService.query(EMAIL_KEY)
        .then(emails => {
            return emails.length
        })
}


function receiveNewEmail() {
    let email = getEmptyEmail()
    email.from = 'spam@spam.com'
    email.subject = 'You won 1,000,000$'
    email.body = 'Please send us your credit card number'
    email.sentAt = Date.now()
    email.folder = 'inbox'
    email.to = 'user@appsus.com'

    return storageService.post(EMAIL_KEY, email)
}


function getEmail(emailId) {
    return storageService.get(EMAIL_KEY, emailId)
}

function moveToTrash(emailId) {
    return storageService.get(EMAIL_KEY, emailId)
        .then(email => {
            email.folder = 'trash'
            return storageService.put(EMAIL_KEY, email)
        })
}

function deleteEmail(emailId) {

    return storageService.remove(EMAIL_KEY, emailId)
}

function saveEmail(email) {
    if (!email.to) return Promise.reject('Recepient is missing')
    if (email.id) {
        return storageService.put(EMAIL_KEY, email)
    } else {
        return storageService.post(EMAIL_KEY, email)
    }
}

function toggleIsRead(emailId) {
    return storageService.get(EMAIL_KEY, emailId)
        .then(email => {
            email.isRead = !email.isRead
            return storageService.put(EMAIL_KEY, email)
        })
}

function toggleIsStarred(emailId) {
    return storageService.get(EMAIL_KEY, emailId)
        .then(email => {
            email.isStarred = !email.isStarred
            return storageService.put(EMAIL_KEY, email)
        })
}

function toggleIsImportant(emailId) {
    return storageService.get(EMAIL_KEY, emailId)
        .then(email => {
            email.isImportant = !email.isImportant
            return storageService.put(EMAIL_KEY, email)
        })
}


function _createEmail() {

}


