import { useState, useEffect } from "react"
import { useParams } from 'react-router-dom';

const Headers = { "Client-Id": '6duqv66y6u4rsy9s1ktrmutyusw4p7', "Authorization": "Bearer " + 'qhnxjxau3jxtkx3dlt6gqnht9n4psm' }

function Page({digitId}) {
    const [streamInfo, setStreamInfo] = useState() // 생방송 정보
    const [startTime, setStartTime] = useState() // 생방송 시작 시간
    const [viewerCount, setViewerCount] = useState() // 시청자 수
    const [name, setName] = useState() // 스트리머 이름
    const getInfo = async (digitId) => {
        const json2 = await(
            await fetch(`https://api.twitch.tv/helix/streams?user_id=${digitId}`, { headers: Headers })
        ).json()
        setStreamInfo(json2)
        if (json2 && json2.data[0]) { // 스트리머가 존재하고 방송중인 경우 - 시작시간, 시청자수
            const kst = new Date(json2.data[0].started_at)
            // const kst = json2.data[0].started_at
            setName(json2.data[0].user_name)
            setStartTime(kst.getTime())
            setViewerCount(json2.data[0].viewer_count)
        }
        else { // 스트리머가 존재하지만 방송중이 아닌 경우
            setStartTime()
            setViewerCount()
        }
    }
    getInfo(digitId)
    return <div>
        <div>
        {streamInfo &&  JSON.stringify(streamInfo)}
        </div>
        <div>
            {name} {viewerCount} {startTime}
        </div>
    </div>
}

export default Page;