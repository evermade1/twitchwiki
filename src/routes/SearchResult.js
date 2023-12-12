import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './SearchResult.module.css'
import { useEffect, useState } from 'react';
import Loading from './Loading';
import ProfileOnline from './ProfileOnline';
import ProfileOffline from './ProfileOffline';


const Headers = { "Client-Id": '6duqv66y6u4rsy9s1ktrmutyusw4p7', "Authorization": "Bearer " + 'qhnxjxau3jxtkx3dlt6gqnht9n4psm' }

function SearchResult({ onSearch }) {
    const { moveTo } = useParams() //url에서 가져온 아이디
    const [userInfo, setUserInfo] = useState(null)
    const [streamInfo, setStreamInfo] = useState(null) 
    const id = moveTo
    /**
     * 아이디에 해당하는 스트리머의 기본 정보 + 방송 중이라면 방송 정보를 받아오는 함수
     * json : userInfo, json2 : streamInfo
     * @param {*} input 로그인 아이디
     */
    const getId = async (input) => {
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

    return <div style={{ width: "90%", marginLeft: "5%", marginTop: "2%" }}>
        {userInfo && streamInfo ?
            (streamInfo.data[0] ?
                <ProfileOnline userInfo={userInfo.data[0]} streamInfo={streamInfo.data[0]} onSearch={onSearch} buttonFor={'searchResult'}/>
                : <ProfileOffline userInfo={userInfo.data[0]} onSearch={onSearch}/>
            )
            : userInfo!=null ? (userInfo.error ?
                <div>잘못된 아이디입니다.</div>
                : <div>데이터가 없습니다.</div>)
                : <Loading />}
        {/* <div>{JSON.stringify(userInfo)}</div> */}
    </div>
}

export default SearchResult;