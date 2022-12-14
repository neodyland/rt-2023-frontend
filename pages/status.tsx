import useSWR from 'swr'
import fetcher from '@/lib/fetcher'

export default function Status() {
    const { data, error } = useSWR('/api/v1/status', fetcher)
    return (
    )
}