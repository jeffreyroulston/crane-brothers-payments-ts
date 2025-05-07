export type WindcaveBodyType = {
  type: 'purchase'
  amount: string
  currency: 'NZD'
  merchantReference: string
  customer: {
    email: string
  }
  metaData: Array<string | null>,
  callbackUrls: {
    approved: string
    declined: string
    cancelled: string
  },
  notificationUrl: string

}

export type RawFormData = {
  name: string
  email: string
  phone: string | null
  amount: number
  reference: string
  comments: string | null
}