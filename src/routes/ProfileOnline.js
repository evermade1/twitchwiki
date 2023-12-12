import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import './SearchResult.module.css'
import { FaCircle } from "react-icons/fa";

function ProfileOnline({ userInfo, streamInfo, onSearch, buttonFor }) {
    const storedStreamers = localStorage.getItem('streamers');
    const streamers = JSON.parse(storedStreamers)
    const doesStreamerExist = streamers ? streamers.some(v => v.digitId === userInfo.id) : false
    /**
     * 새 문서를 생성하는 함수
     */
    const handleMakeButtonClick = () => {
        const startTime = new Date(streamInfo.started_at).getTime();
        onSearch(0, userInfo.id, userInfo.login, userInfo.display_name, startTime, streamInfo.viewer_count, userInfo.profile_image_url, userInfo, streamInfo)
    }
    /**
     * 기존 문서로 이동하는 함수
     */
    const handleMoveButtonClick = () => {
        onSearch(1, userInfo.id, userInfo.login)
    }

    return <div style={{ marginTop: "2%" }}>
        {<div className='searchResult' style={{
            backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url(${userInfo.profile_image_url})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center left",
            borderRadius: "15px",
            width: '100%',
            height: '100%',
            overflow: "hidden"
        }}>
            <div style={{ padding: "1%", display: "flex", flexDirection: "row" }}>
                <img src={userInfo.profile_image_url} style={{ width: '150px', height: '150px', borderRadius: "15px" }}></img>
                <div style={{ marginLeft: "20px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                    <div>
                        <div style={{ fontWeight: 600, fontSize: 24, margin: 5 }}>{userInfo.display_name} ({userInfo.login})</div>
                        <div style={{ fontSize: 15, marginLeft: 5, marginTop: 10 }}>{streamInfo.title}</div>
                        <div style={{ fontSize: 15, marginLeft: 5, marginTop: 5 }}>{streamInfo.game_name}</div>

                    </div>
                    <div style={{ display: "flex", flexDirection: "row", alignItems: "center", marginLeft: 5, marginBottom: 10 }}>
                        <FaCircle style={{ fontSize: "10px", color: "red", marginRight: 5, marginTop: 2 }} />
                        <div style={{ fontSize: 15 }}>{streamInfo.viewer_count.toLocaleString()}</div>
                        {doesStreamerExist ?
                        buttonFor == 'searchResult' &&
                            <Link to={`/page/${userInfo.login}`}>
                                <Button style={{ backgroundColor: "#9146FF", borderColor: "#9146FF", fontSize: 15, marginLeft: "20px" }} onClick={handleMoveButtonClick}>문서로 이동</Button>
                            </Link>
                            :
                            <Button style={{ backgroundColor: "#9146FF", borderColor: "#9146FF", fontSize: 15, marginLeft: "20px" }} onClick={handleMakeButtonClick}>
                                문서 생성하기
                            </Button>
                        }
                        <Link to={`https://www.twitch.tv/${userInfo.login}`} style={{ marginLeft: "20px" }}>
                            <Button style={{ backgroundColor: "#9146FF", borderColor: "#9146FF", fontSize: 15 }}>방송으로 이동</Button>
                        </Link>
                    </div>
                </div>

            </div>
        </div>}

    </div>
}

export default ProfileOnline;