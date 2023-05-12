const { useState, useEffect } = React

import { showErrorMsg, showSuccessMsg } from "../../../services/event-bus.service.js"
import { mailService } from "../services/mail.service.js"

export function ComposeModal({onClose}){

    const [mail, setMail] = useState(mailService.getEmptyEmail())

    useEffect(() => {
    setMail(prevState => ({ ...prevState, folder: 'sent' }))
    }, [])
    
    const loggedinUser = mailService.getLoggedinUser()
    const from = loggedinUser.email

    function handleChange(ev) {
        const { name, value } = ev.target
        setMail(prevState => ({ ...prevState, [name]: value }))
    }
    
    function onSendMail(ev) {
        ev.preventDefault()
        mailService.saveEmail(mail).then(() => {
            showSuccessMsg('Email sent!')
            setTimeout(() => {
                onClose()
              }, 500) 
            })
              .catch(err => {
                showErrorMsg('Coudn`t send an email: ' + err)
            })
    }


    return (
        <section className="compose-modal">
                <form onSubmit={onSendMail} className="compose-form flex column">
                    <label htmlFor="from">From:</label>
                    <input name="from" id="from" type="text" value={from} onChange={handleChange} placeholder="" />

                    <label htmlFor="to">To:</label>
                    <input name="to" id="to" type="text" value={mail.to} onChange={handleChange} placeholder="" />

                    <label htmlFor="subject">Subject:</label>
                    <input name="subject" id="subject" value={mail.subject} onChange={handleChange} type="text" placeholder="Subject" />
                    <textarea name="body" id="body" cols="30" rows="10" value={mail.body} onChange={handleChange}></textarea>
                    <button>Send</button>
                </form>
                <button onClick={onClose}>Close</button>
            </section>
    )
}

// id: '',
// subject: '',
// body: '',
// isRead: false,
// isStarred: false,
// sentAt: Date.now(),
// removedAt: null,
// from: 'momo@momo.com',
// to: 'user@appsus.com',
// folder: 'inbox',
// labels: [],

{/* <section className="compose-modal">
<h1>Compose Modal</h1>
<button onClick={onClose}>Close</button>
</section> */}

// const loggedinUser = {
//     email: 'user@appsus.com',
//     fullname: 'Mahatma Appsus'
// }
