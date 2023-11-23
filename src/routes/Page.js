import { useState, useEffect } from "react"
import { useParams } from 'react-router-dom';

const Headers = { "Client-Id": '6duqv66y6u4rsy9s1ktrmutyusw4p7', "Authorization": "Bearer " + 'qhnxjxau3jxtkx3dlt6gqnht9n4psm' }

function Page({digitId, streamers}) {
    const [myStreamer, setMyStreamer] = useState()
    const getInfo = () => {
        const myStreamer = streamers.filter((i, index) => {
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