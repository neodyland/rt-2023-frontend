import useSWR from 'swr'
import { get } from '../lib/fetcher'
import Seo from '../components/seo'
import MainPage from '../components/base'

interface StatusPerformance {
    cpu: number,
    memory: Array<number>,
}

interface StatusDiscord {
    guild: number,
    user: number,
}

interface StatusMain {
    performance: StatusPerformance,
    discord: StatusDiscord,
    shard_ids: Array<number>,
}

export default function Status() {
    const { data, error } = useSWR('/status', get)
    return (
        <MainPage>
            <Seo title="Status" description="RT discord bot status" />
            <h2 className="text-center text-[30px]">Status</h2>
            <div className="flex m-10">
                {error && <p>Failed to load</p>}
                { data && (
                    <>
                        {data["main"].map((status: StatusMain, index: number) => {
                            return (
                                <div className="bg-green-400 m-2 px-6 py-3 rounded-lg" key={index}>
                                    <p>Node {index}</p>
                                </div>
                            )
                        })}
                    </>
                )}
            </div>
        </MainPage>
    )
}