import { useState, useEffect } from "react"

function Page({ digitId, streamers }) {
    const [myStreamer, setMyStreamer] = useState()
    const getInfo = () => {
        const myStreamer = streamers.filter((i) => {
            return i.digitId == digitId
        })
        setMyStreamer(myStreamer[0])
    }
    useEffect(() => {
        getInfo()
    }, [])
    return <div>
        <div>
            {myStreamer && JSON.stringify(myStreamer)}
        </div>
    </div>
}

export default Page;