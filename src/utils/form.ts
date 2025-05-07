import { RawFormData, WindcaveBodyType } from "@/types/windcave"
// import { assertValue } from "./variables"

export const formatForm = (form: HTMLFormElement): WindcaveBodyType => {

  // const baseUrl = assertValue(process.env.NEXT_PUBLIC_BASE_URL, 'Missing BASE_URL Env Varialbe')
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
      approved: `https://crane-brothers-payments.vercel.app/result`,
      declined: `https://crane-brothers-payments.vercel.app/result`,
      cancelled: `https://crane-brothers-payments.vercel.app/result`
    },
    notificationUrl: `https://crane-brothers-payments.vercel.app/api/result`,

  }
  return _data

}