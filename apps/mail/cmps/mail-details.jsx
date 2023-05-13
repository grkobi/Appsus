

export function MailDetails({ onClose, mailDetails }) {

    const formattedDate = new Date(mailDetails.sentAt).toLocaleDateString()
    const formattedTime = new Date(mailDetails.sentAt).toLocaleTimeString()

    return (
        <section className="mail-details compose-modal">
            <div className="mail-details-header flex">
            <p className="subject">{mailDetails.subject}</p>
            <p className="date">{`${formattedDate}, ${formattedTime}`}</p>
            <button onClick={onClose}>x</button>
            </div>
            <p className="from">From: {mailDetails.from}</p>
            <p className="to">To: {mailDetails.to}</p>
            <p className="body">{mailDetails.body}</p>
            
        </section>
    )
}