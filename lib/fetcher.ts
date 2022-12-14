import axios from 'axios'

function makeUrl(path: string) {
    return process.env.NEXT_PUBLIC_API_ENDPOINT + path
}

export async function get(path: string) {
    const response = await axios.get(makeUrl(path))
    return response.data
}