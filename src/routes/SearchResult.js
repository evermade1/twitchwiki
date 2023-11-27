import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import './SearchResult.module.css'

function SearchResult({ userInfo, streamInfo, onSearch }) {
    const storedStreamers = localStorage.getItem('streamers');
    const streamers = JSON.parse(storedStreamers)
    const digitId = streamInfo.data[0].user_id
    const name = streamInfo.data[0].user_name
    const kst = new Date(streamInfo.data[0].started_at)
    const startTime = kst.getTime()
    const viewerCount = streamInfo.data[0].viewer_count
    const profileImage = userInfo.data[0].profile_image_url
    const doesStreamerExist = streamers && streamers.some(v => v.digitId === digitId);
    const handleMakeButtonClick = () => {
        onSearch(0, digitId, name, startTime, viewerCount, profileImage, userInfo, streamInfo)
    }
    const handleMoveButtonClick = () => {
        onSearch(1, digitId, name, startTime, viewerCount, profileImage, userInfo, streamInfo)
    }

    return <div  style={{ width: "90%", marginLeft: "5%", marginTop: "2%" }}>
        <div className='searchResult' style={{
            backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url(${userInfo.data[0].profile_image_url})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center left",
            borderRadius: "15px",
            width: '100%',  // 부모 요소에 따라 조절할 수 있습니다.
            height: '50%',
            overflow: "hidden"
        }}>
            <div style={{padding: "1%", display: "flex", flexDirection: "row"}}>
                <img src={userInfo.data[0].profile_image_url} style={{ width: '150px', borderRadius: "15px"}}></img>
                <div style={{marginLeft: "20px"}}>
                    <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                        <div style={{ fontWeight: 600, fontSize: 24, margin: 5 }}>{name} ({userInfo.data[0].login})</div>
                        <div style={{ fontWeight: 500, fontSize: 13, margin: 5, marginTop: 17, fontStyle: "italic" }}>- {userInfo.data[0].description}</div>
                    </div>
                    <div style={{ fontSize: 15, margin: 5 }}>{streamInfo.data[0].title} [{streamInfo.data[0].game_name}]</div>
                    <div style={{ fontSize: 15, margin: 5 }}>실시간 시청자 {viewerCount}</div>
                    {doesStreamerExist ? 
                    <Link to={`/page/${digitId}`}>
                        <Button style={{ backgroundColor: "#9146FF", borderColor: "#9146FF", fontSize: 15, margin: 5 }} onClick={handleMoveButtonClick}>이동</Button>
                    </Link>
                    :
                    <Button style={{ backgroundColor: "#9146FF", borderColor: "#9146FF", fontSize: 15, margin: 5 }} onClick={handleMakeButtonClick}>
                        생성
                    </Button>
                    }
                    
                </div>
            </div>
        </div>

    </div>
}

export default SearchResult;