export function MailPreview({ mail }) {
    const MAX_BODY_LENGTH = 50 
    const shortBody = mail.body.length > MAX_BODY_LENGTH
      ? `${mail.body.substring(0, MAX_BODY_LENGTH)}...`
      : mail.body

    return (
        <article className="mail-preview flex ">
            <p>{mail.from}</p>
            <p>{mail.subject}</p>
            <p>{shortBody}</p>
        </article>
    )
}