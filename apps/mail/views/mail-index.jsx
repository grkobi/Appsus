const { useEffect, useState } = React
const { Link } = ReactRouterDOM

import { MailList } from "../cmps/mail-list.jsx"
import { mailService } from "../services/mail.service.js"
import { SearchFilter } from "../cmps/mail-filter.jsx"
import { SideFilter } from "../cmps/mail-filter.jsx"
import { ComposeModal } from "../cmps/compose-modal.jsx"
import { UserMsg } from "../../../cmps/user-msg.jsx"
import { showErrorMsg, showSuccessMsg } from "../../../services/event-bus.service.js"

export function MailIndex() {
    const [mails, setMails] = useState([])
    const [filterBy, setFilterBy] = useState(mailService.getDefaultFilter())
    const [searchBy, setSearchBy] = useState('')
    const [isComposeModalOpen, setComposeModalOpen] = useState(false)
    console.log('mails', mails)
    console.log('filterBy', filterBy)

    useEffect(() => {
        // showErrorMsg('Error message!')
        // showSuccessMsg('success message!')
        loadMails()
    }, [filterBy, searchBy])

    function loadMails() {
        mailService.query(filterBy)
            .then(mails => {
                setMails(mails)
            })
    }

    function onDeleteMail(mailId, folder) {
        if (folder === 'trash') {
            mailService.deleteEmail(mailId).then(() => {
                const updatedMails = mails.filter(mail => mail.id !== mailId)
                setMails(updatedMails)
            })
        }
        else {
            mailService.moveToTrash(mailId).then(() => {
                const updatedMails = mails.filter(mail => mail.id !== mailId)
                setMails(updatedMails)
            })
        }
    }


    const toggles = {
        onToggleIsStarred: function (mailId) {
            mailService.toggleIsStarred(mailId).then(() => {
                const updatedMails = mails.map(mail => {
                    if (mail.id === mailId) mail.isStarred = !mail.isStarred
                    return mail
                })
                setMails(updatedMails)
            }
            )
        },

        onToggleIsImportant: function (mailId) {
            mailService.toggleIsImportant(mailId).then(() => {
                const updatedMails = mails.map(mail => {
                    if (mail.id === mailId) {
                        if (mail.labels.includes('important')) mail.labels.splice(mail.labels.indexOf('important'), 1)
                        else mail.labels.push('important')
                    }
                    return mail
                })
                setMails(updatedMails)
            })
        },

        onToggleIsRead: function (mailId) {
            mailService.toggleIsRead(mailId).then(() => {
                const updatedMails = mails.map(mail => {
                    if (mail.id === mailId) mail.isRead = !mail.isRead
                    return mail
                })
                setMails(updatedMails)
            })
        }

    }


    function onSetFilter(filterBy) {
        setFilterBy(prevFilterBy => ({ ...prevFilterBy, ...filterBy }))
    }

    function onSetSearch(searchBy) {
        setSearchBy(searchBy)
        setFilterBy(prevFilterBy => ({ ...prevFilterBy, txt: searchBy }))
    }

    if (!mails) return <div>Loading...</div>

    return <section className="mail-index">
        <button className="compose-btn" onClick={() => setComposeModalOpen(true)}>
            <img src="assets/img/mailIcons/asset24.png" />
            <span>Compose</span>
        </button>
        <SearchFilter onSetSearch={onSetSearch} searchBy={searchBy} />
        <SideFilter onSetFilter={onSetFilter} filterBy={filterBy} />
        <MailList mails={mails} onDeleteMail={onDeleteMail} onToggle={toggles} />

        {isComposeModalOpen && (
            <ComposeModal onClose={() => setComposeModalOpen(false)} />
        )}

    </section>
}


