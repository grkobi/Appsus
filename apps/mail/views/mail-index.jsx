const { useEffect, useState } = React
const { Link } = ReactRouterDOM

import { MailList } from "../cmps/mail-list.jsx"
import { mailService } from "../services/mail.service.js"
import { SearchFilter } from "../cmps/mail-filter.jsx"
import { SideFilter } from "../cmps/mail-filter.jsx"
import { ComposeModal } from "../cmps/compose-modal.jsx"
import { showErrorMsg, showSuccessMsg } from "../../../services/event-bus.service.js"

export function MailIndex() {
    const [mails, setMails] = useState([])
    const [filterBy, setFilterBy] = useState(mailService.getDefaultFilter())
    const [searchBy, setSearchBy] = useState('')
    const [isComposeModalOpen, setComposeModalOpen] = useState(false)
    const [mailsCount, setMailsCount] = useState({})



    useEffect(() => {
        // showErrorMsg('Error message!')
        // showSuccessMsg('success message!')
        loadMails()

    }, [filterBy, searchBy])

    useEffect(() => {
        console.log('mailsCount', mailsCount)
      }, [mailsCount])

    function loadMails() {
        mailService.query(filterBy)
            .then(mails => {
                setMails(mails)
                mailService.getMailsCounts().then(mailsCount => {
                setMailsCount(mailsCount)})
                console.log('mailsCount', mailsCount)
            })
    }

    
    function receiveNewMail() {
        mailService.receiveNewEmail().then(newMail => {
            if (newMail) {
                showSuccessMsg('New email received!')
                setMails(prevMails => [...prevMails, newMail])
            }
        })
    }

    // setInterval(receiveNewMail, 120000)


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
    console.log('mails', mails)

    return <section className="mail-index">
        <button className="compose-btn" onClick={() => setComposeModalOpen(true)}>
            <img src="assets/img/mailIcons/asset24.png" />
            <span>Compose</span>
        </button>
        <SearchFilter onSetSearch={onSetSearch} searchBy={searchBy} />
        <SideFilter onSetFilter={onSetFilter} filterBy={filterBy} mailsCount={mailsCount} />
        <MailList mails={mails} onDeleteMail={onDeleteMail} onToggle={toggles} />

        {isComposeModalOpen && (
            <ComposeModal onClose={() => setComposeModalOpen(false)} />
        )}

    </section>
}


