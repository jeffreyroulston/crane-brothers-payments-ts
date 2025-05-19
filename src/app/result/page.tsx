
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { assertValue } from "@/utils/variables";


export default async function Result({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {

  const id = (await searchParams).sessionId

  const baseUrl = assertValue(process.env.BASE_URL, 'Missing BASE_URL Env Variable')

  const { body } = await fetch(`${baseUrl}/api/session?sessionId=${id}`).then((res) => res.json())
    .catch((err) => console.error(err))

  let status = ''

  if (!body.transactions) {
    return notFound()
  }

  if (body.transactions[0].responseText == 'APPROVED') {
    status = 'The transaction was approved.'
  } else {
    status = "The transaction was declined"
  }

  const name = body.metaData.slice(-1)

  return (
    <div className="body-wrapper">
      <Image className="logo" src='/crane-logo.png' alt="Crane Brothers Logo" width={800} height={84} />
      <a className="back-button" href="https://crane-brothers.com">Back to crane-brothers.com</a>
      <h1>Payment</h1>
      <h2>{status}</h2>
      <div className="response-wrapper">
        <div className="response">
          <p>{name}</p>
          <p>{body.customer.email}</p>
          <p>${body.amount}</p>
          <p>{body.merchantReference}</p>
        </div>
        <Link href="/" className="payment-button">Make Another Payment</Link>
      </div>
    </div>
  )
}
