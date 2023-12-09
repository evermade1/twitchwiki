import { Link, useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import './SearchResult.module.css'
import { FaCircle } from "react-icons/fa";
import { useEffect, useState } from 'react';
import Loading from './Loading';
import ProfileOnline from './ProfileOnline';
import ProfileOffline from './ProfileOffline';


const Headers = { "Client-Id": '6duqv66y6u4rsy9s1ktrmutyusw4p7', "Authorization": "Bearer " + 'qhnxjxau3jxtkx3dlt6gqnht9n4psm' }

function SearchResult({ onSearch }) {
    const storedStreamers = localStorage.getItem('streamers');
    const streamers = JSON.parse(storedStreamers)
    const { moveTo } = useParams()
    const [userInfo, setUserInfo] = useState(null) // 스트리머 정보
    const [streamInfo, setStreamInfo] = useState(null) // 생방송 정보  
    const id = moveTo
    const getId = async (input) => { // 스트리머 정보 가져오기
        const json = await (
            await fetch(`https://api.twitch.tv/helix/users?login=${input}`, { headers: Headers })
        ).json()
        setUserInfo(json)
        if (json && json.hasOwnProperty("data") && json.data[0]) { // 스트리머가 존재하는 경우 생방송 정보 가져오기
            const json2 = await (
                await fetch(`https://api.twitch.tv/helix/streams?user_id=${json.data[0].id}`, { headers: Headers })
            ).json()
            setStreamInfo(json2)
        }
        return json
    }
    useEffect(() => {
        setUserInfo()
        setStreamInfo()
        getId(id)
    }, [id])
    // const doesStreamerExist = streamers ? streamers.some(v => v.digitId === digitId) : false
    // const handleMakeButtonClick = () => {
    //     onSearch(0, digitId, id, name, startTime, viewerCount, profileImage, userInfo, streamInfo)
    // }
    // const handleMoveButtonClick = () => {
    //     onSearch(1, digitId)
    // }
    const SearchResultFunction = ({ makeOrMove, digitId, id, name, startTime, viewerCount, profileImage, userInfo, streamInfo }) => {
        console.log(makeOrMove, digitId, id, name, startTime, viewerCount, profileImage);
        onSearch(makeOrMove, digitId, id, name, startTime, viewerCount, profileImage, userInfo, streamInfo)
    }

    return <div style={{ width: "90%", marginLeft: "5%", marginTop: "2%" }}>
        {/* <div className='searchResult' style={{
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
                <div style={{ marginLeft: "20px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                    <div>
                        <div style={{ fontWeight: 600, fontSize: 24, margin: 5 }}>{userInfo.data[0].name} ({userInfo.data[0].login})</div>
                        <div style={{ fontSize: 15, marginLeft: 5, marginTop: 10 }}>{streamInfo.data[0].title}</div>
                        <div style={{ fontSize: 15, marginLeft: 5, marginTop: 5 }}>{streamInfo.data[0].game_name}</div>
                        
                    </div>
                    <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                        <FaCircle style={{ fontSize: "10px", color: "red", marginRight: 5, marginTop: 2 }} />
                        <div>{streamInfo.data[0].viewer_count.toLocaleString()}</div>
                        {doesStreamerExist ?
                            <Link to={`/page/${userInfo.data[0].id}`}>
                                <Button style={{ backgroundColor: "#9146FF", borderColor: "#9146FF", fontSize: 15, marginLeft: "20px" }} onClick={handleMoveButtonClick}>문서로 이동</Button>
                            </Link>
                            :
                            <Button style={{ backgroundColor: "#9146FF", borderColor: "#9146FF", fontSize: 15, marginLeft: "20px" }} onClick={handleMakeButtonClick}>
                                문서 생성하기
                            </Button>
                        }
                        <Link to={`https://www.twitch.tv/${userInfo.data[0].login}`} style={{ marginLeft: "20px" }}>
                            <Button style={{ backgroundColor: "#9146FF", borderColor: "#9146FF", fontSize: 15 }}>방송으로 이동</Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div> */}
        {userInfo && streamInfo ?
            (streamInfo.data[0] ?
                <ProfileOnline userInfo={userInfo.data[0]} streamInfo={streamInfo.data[0]} onSearch={onSearch} buttonFor={'searchResult'}/>
                : <ProfileOffline userInfo={userInfo.data[0]} />
            )
            : userInfo!=null ? (userInfo.error ?
                <div>잘못된 아이디입니다.</div>
                : <div>데이터가 없습니다.</div>)
                : <Loading />}
        <div>{JSON.stringify(userInfo)}</div>
        {/* <div>{JSON.stringify(streamInfo)}</div> */}
    </div>
}

export default SearchResult;