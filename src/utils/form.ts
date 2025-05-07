import { RawFormData, WindcaveBodyType } from "@/types/windcave"

export const formatForm = (form: HTMLFormElement): WindcaveBodyType => {
  const rawData = new FormData(form)
  const data = Object.fromEntries(rawData.entries()) as unknown as RawFormData

  const _data: WindcaveBodyType = {
    type: "purchase",
    amount: `${data.amount}`,
    currency: 'NZD',
    merchantReference: data?.reference,
    customer: {
      email: data.email,
    },
    metaData: [
      data.phone,
      data.comments ? data.comments : '',
      data.name
    ],
    callbackUrls: {
      approved: 'https://payments.crane-brothers.com/result',
      declined: 'https://payments.crane-brothers.com/result',
      cancelled: 'https://payments.crane-brothers.com/result'
    }
  }
  return _data

}