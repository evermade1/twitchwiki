import { useState, useEffect } from "react"
import 'bootstrap/dist/css/bootstrap.min.css';

function SearchResult({ id, streamInfo, onSearch }) {
    const digitId = id.data[0].id
    const name = id.data[0].display_name
    const kst = new Date(streamInfo.data[0].started_at)
    const startTime = kst.getTime()
    const viewerCount = streamInfo.data[0].viewer_count
    const handleMakeButtonClick = () => {
        onSearch(digitId, name, startTime, viewerCount, streamInfo)
    }

    return <div>
        {/* <div>{JSON.stringify(id)}</div> */}
        <div>{JSON.stringify(streamInfo)}</div>
        <button onClick={handleMakeButtonClick}>
                    생성
        </button>
    </div>
}

export default SearchResult;