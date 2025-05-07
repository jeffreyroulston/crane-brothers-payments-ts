import { RawFormData, WindcaveBodyType } from "@/types/windcave"
import { assertValue } from "./variables"

export const formatForm = (form: HTMLFormElement): WindcaveBodyType => {

  const baseUrl = assertValue(process.env.BASE_URL, 'Missing BASE_URL Env Varialbe')
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
      approved: `${baseUrl}/result`,
      declined: `${baseUrl}/result`,
      cancelled: `${baseUrl}/result`
    },
    notificationUrl: `${baseUrl}/api/result`,

  }
  return _data

}