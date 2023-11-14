import { useState, useEffect } from "react"

function Stream(channelInfo) {
    const startTime = channelInfo.data[0].started_at
    return <div>
        <div>
            {id ? (id.error ? "잘못된 아이디입니다." : (id.data[0] ? id.data[0].display_name : "데이터가 없습니다.")) : "데이터가 없습니다."}
        </div>
        <div>
        스트리머 {id && id.data[0] ? id.data[0].display_name : null}
        </div>
        <div>
        {channelInfo && JSON.stringify(channelInfo)}
        </div>
        <div>
        시청자수 : {channelInfo && channelInfo.data[0] && channelInfo.data[0].viewer_count}
        {channelInfo && channelInfo.data[0] && channelInfo.data[0].started_at}
        </div>
    </div>
}

export default Stream;