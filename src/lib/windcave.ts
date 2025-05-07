import { WindcaveBodyType } from "@/types/windcave"
import { assertValue } from "@/utils/variables"

const url = assertValue(
  process.env.WINDCAVE_URL,
  'Missing Windcave URL env variable'
)
const key = assertValue(
  process.env.WINDCAVE_KEY,
  'Missing Windcave API Key env variable'
)
const userName = assertValue(
  process.env.WINDCAVE_USER,
  'Missing Windcave Username env variable'
)

//type windcave body
export const createWindcaveSession = async (body: WindcaveBodyType) => {
  const auth = 'Basic ' + btoa(userName + ':' + key)

  const headers = new Headers()

  headers.append('Authorization', auth)
  headers.append('Content-Type', 'application/json')

  const requestOptions = {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  }

  const res = await fetch(url + '/v1/sessions', requestOptions)
    .then((response) => response.json())
    .catch((error) => console.error(error))

  return res
}


export const fetchWindcaveSession = async (id: string) => {
	const auth = 'Basic ' + btoa(userName + ':' + key)

	const headers = new Headers()

	headers.append('Authorization', auth)
	headers.append('Content-Type', 'application/json')

	const requestOptions = {
		method: 'GET',
		headers,
	}

	const res = await fetch(url + '/v1/sessions/' + id, requestOptions)
		.then((response) => response.json())
		.catch((error) => console.error(error))

	return res
}



