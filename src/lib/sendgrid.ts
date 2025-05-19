import sgMail from '@sendgrid/mail'
import { assertValue } from '@/utils/variables'

type Body = {
  name: string,
  email: string,
  amount: string
  reference: string
}
export const sendResultEmail = async (body: Body) => {

  const sendgridKey = assertValue(process.env.SENDGRID_KEY, 'Missing SENDGRID_KEY ENV Variable')

  sgMail.setApiKey(sendgridKey)
  const msg = {
    to: ['enquire@crane-brothers.com', 'murray@crane-brothers.com', 'info@crane-brothers.com', 'accounts@crane-brothers.com'],
    from: 'payments@crane-brothers.com',
    subject: 'A new payment has been received',
    html: `
           <p>A new payment has been received</p>
          <div class="response">
          <p>${body.name}</p>
          <p>${body.email}</p>
          <p>$${body.amount}</p>
          <p>${body.reference}</p>        
          </div>`,
  };

  sgMail.send(msg);

  return true
}

