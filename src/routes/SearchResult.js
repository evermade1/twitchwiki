import 'bootstrap/dist/css/bootstrap.min.css';

function SearchResult({ userInfo, streamInfo, onSearch }) {
    const digitId = streamInfo.data[0].user_id
    const name = streamInfo.data[0].user_name
    const kst = new Date(streamInfo.data[0].started_at)
    const startTime = kst.getTime()
    const viewerCount = streamInfo.data[0].viewer_count
    const handleMakeButtonClick = () => {
        onSearch(digitId, name, startTime, viewerCount, streamInfo)
    }

    return <div>
        <div style={{ display: 'flex', flexDirection: "row", alignItems: "center", justifyContent: "flex-start"}}>
            <div style={{margin: 20}}>
                <img src={userInfo.data[0].profile_image_url} style={{ width: '150px' }}></img>
            </div>
            <div>
                <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                <div style={{ fontWeight: 600, fontSize: 24, margin: 5 }}>{name} ({userInfo.data[0].login})</div>
                <div style={{ fontSize: 15, margin: 5, marginTop: 10 }}>{userInfo.data[0].description}</div>
                </div>
                <div style={{ fontSize: 15, margin: 5 }}>{streamInfo.data[0].title} {streamInfo.data[0].game_name}</div>
                <div style={{ fontSize: 15, margin: 5 }}>실시간 시청자 {viewerCount}</div>
            </div>
        </div>
        <div>{JSON.stringify(userInfo)}</div>
        <div>{JSON.stringify(streamInfo)}</div>
        <button onClick={handleMakeButtonClick}>
            생성
        </button>
    </div>
}

export default SearchResult;