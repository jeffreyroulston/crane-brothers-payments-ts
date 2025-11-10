'use client'
import Image from "next/image";
import { useState } from 'react'
import { formatForm } from "@/utils/form";
import { useRouter } from "next/navigation";


export default function Home() {
  const [submitting, setSubmitting] = useState(false)
  const [amount, setAmount] = useState('')

  const router = useRouter()

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    const numericValue = value.replace(/[^0-9.]/g, '')
    const parts = numericValue.split('.')
    const sanitizedValue = parts.length > 2
      ? parts[0] + '.' + parts.slice(1).join('')
      : numericValue

    setAmount(sanitizedValue)
  }

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    setSubmitting(true)
    e.preventDefault()

    const data = formatForm(e.currentTarget)

    const response = await fetch('/api/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .catch((err) => {
        setSubmitting(false)
        console.error('There has been an error', err)
      })


    if (response) {
      router.push(response.body)
    }

  }


  return (
    <div className="body-wrapper">
      <Image className="logo" src='/crane-logo.png' alt="Crane Brothers Logo" width={800} height={84} />
      {/* <img className="logo" src="./app/crane-logo.png" /> */}
      <a className="back-button" href="https://crane-brothers.com">Back to crane-brothers.com</a>
      <h1>Payment</h1>
      <div className="payment-wrapper">
        <div className="left-side">
          <div className="bank-transfer">
            <h2>Direct bank transfers</h2>
            <div className="bank-transfers">
              <p>New Zealand</p>
              <p>Crane Brothers</p>
              <p>ASB Bank</p>
              <p>A/C 12-3109-0055367-00</p>
              <p>We accept Wepay and Alipay instore.</p>
              <p>Please provide a reference number when paying online</p>
            </div>
          </div>
        </div>
        <div className="right-side">
          <h2>Make a Credit Card payment</h2>

          <form onSubmit={handleSubmit} className="payment-form">
            <input
              type="text"
              id="full-name"
              name="name"
              placeholder="Full Name"
              required
            />
            <input type="email" id="email" placeholder="Email" name="email" required />
            <input type="text" id="phone" placeholder="Phone" name="phone" />
            <div className="amount-wrapper">
              <p className={`dollar-sign ${amount ? 'visible' : ''}`}>$</p>
              <input
                type="text"
                id="amount"
                placeholder="Amount"
                name="amount"
                value={amount}
                onChange={handleAmountChange}
                className={amount ? 'has-value' : ''}
                inputMode="decimal"
                required
              />
            </div>
            <p className="currency-label">NZD</p>
            <input
              type="text"
              id="reference"
              placeholder="Reference"
              name="reference"
              required
            />
            <input
              type="text-field"
              id="comments"
              placeholder="Comments"
              name="comments"
            />
            <input
              name="Submit"
              type="submit"
              value={submitting ? "Submitting" : "Submit"}
              className="form-submit"
            />
          </form>
        </div>
      </div>
    </div>
  );
}