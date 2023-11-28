import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import './SearchResult.module.css'
import { FaCircle } from "react-icons/fa";

function SearchResult({ userInfo, streamInfo, onSearch }) {
    const storedStreamers = localStorage.getItem('streamers');
    const streamers = JSON.parse(storedStreamers)
    const digitId = streamInfo.data[0].user_id
    const id = streamInfo.data[0].user_login
    const name = streamInfo.data[0].user_name
    const kst = new Date(streamInfo.data[0].started_at)
    const startTime = kst.getTime()
    const viewerCount = streamInfo.data[0].viewer_count
    const profileImage = userInfo ? userInfo.data[0].profile_image_url : null
    const doesStreamerExist = streamers && streamers.some(v => v.digitId === digitId);
    const handleMakeButtonClick = () => {
        onSearch(0, digitId, id, name, startTime, viewerCount, profileImage, userInfo, streamInfo)
    }
    const handleMoveButtonClick = () => {
        onSearch(1, digitId, id, name, startTime, viewerCount, profileImage, userInfo, streamInfo)
    }

    return <div style={{ width: "90%", marginLeft: "5%", marginTop: "2%" }}>
        <div className='searchResult' style={{
            backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url(${userInfo.data[0].profile_image_url})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center left",
            borderRadius: "15px",
            width: '100%',
            height: '100%',
            overflow: "hidden"
        }}>
            <div style={{ padding: "1%", display: "flex", flexDirection: "row" }}>
                <img src={userInfo.data[0].profile_image_url} style={{ width: '150px', height: '150px', borderRadius: "15px" }}></img>
                <div style={{ marginLeft: "20px", display: "flex", flexDirection: "column", justifyContent: "space-between"  }}>
                    <div>
                    <div style={{ fontWeight: 600, fontSize: 24, margin: 5 }}>{name} ({userInfo.data[0].login})</div>
                    <div style={{ fontSize: 15, marginLeft: 5, marginTop : 10 }}>{streamInfo.data[0].title}</div>
                    <div style={{ fontSize: 15, marginLeft: 5, marginTop : 5 }}>{streamInfo.data[0].game_name}</div>
                    </div>
                    <div style={{ display: "flex", flexDirection: "row", alignItems: "center"}}>
                    <FaCircle style={{fontSize: "10px", color: "red", marginRight: 5, marginTop: 2}} />
                    <div>{viewerCount.toLocaleString()}</div>
                        {doesStreamerExist ?
                            <Link to={`/page/${digitId}`}>
                                <Button style={{ backgroundColor: "#9146FF", borderColor: "#9146FF", fontSize: 15, marginLeft: "20px" }} onClick={handleMoveButtonClick}>문서로 이동</Button>
                            </Link>
                            :
                            <Button style={{ backgroundColor: "#9146FF", borderColor: "#9146FF", fontSize: 15, marginLeft: "20px" }} onClick={handleMakeButtonClick}>
                                문서 생성하기
                            </Button>
                        }
                        <Link to={`https://www.twitch.tv/${id}`} style={{marginLeft: "20px"}}>
                            <Button style={{ backgroundColor: "#9146FF", borderColor: "#9146FF", fontSize: 15 }}>방송으로 이동</Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>

    </div>
}

export default SearchResult;