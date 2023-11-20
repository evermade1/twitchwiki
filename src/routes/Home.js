import { useState, useEffect } from "react"
import Stream from "./Stream";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Headers = { "Client-Id": '6duqv66y6u4rsy9s1ktrmutyusw4p7', "Authorization": "Bearer " + 'qhnxjxau3jxtkx3dlt6gqnht9n4psm' }

function Home() {
    
    const [inputValue, setInputValue] = useState('');
    const [id, setId] = useState() // 스트리머 정보
    const [digitId, setDigitId] = useState() // 숫자로 이루어진 아이디
    const [streamInfo, setStreamInfo] = useState() // 생방송 정보
    const [startTime, setStartTime] = useState() // 생방송 시작 시간
    const [viewerCount, setViewerCount] = useState() // 시청자 수
    const [name, setName] = useState() // 스트리머 이름
    const [streamers, setStreamers] = useState([]) // 페이지가 존재하는 스트리머 정보 담는 배열
    const [makePage, setMakePage] = useState(false)
    const navigate = useNavigate();

    const handlePageNavigation = (digitId) => {
        // 특정 페이지로 이동
        navigate(`/page/${digitId}`);}
    useEffect(() => {
        // 로컬 스토리지에서 정보 꺼내오기
        const storedStreamers = localStorage.getItem('streamers');
        if (storedStreamers) {
            const tmpStreamers = JSON.parse(storedStreamers)
            const filteredTmpStreamers = tmpStreamers.filter(item => item.startTime + 86400000 > Date.now())
            setStreamers(filteredTmpStreamers)
            localStorage.setItem('streamers', JSON.stringify(filteredTmpStreamers));
        }
        console.log(streamers);
      }, []);

    const getId = async (inputvalue) => { //api 사용하여 id에 대응하는 스트리머 정보 + 방송 정보 가져오기
        const json = await (
            await fetch(`https://api.twitch.tv/helix/users?login=${inputvalue}`, { headers: Headers })
        ).json()
        setId(json)

        if (json && json.hasOwnProperty("data") && json.data[0]) { // 스트리머가 존재하는 경우
            setDigitId(json.data[0].id)
            setName(json.data[0].display_name)
            const json2 = await (
                await fetch(`https://api.twitch.tv/helix/streams?user_id=${json.data[0].id}`, { headers: Headers })
            ).json()
            setStreamInfo(json2)
            if (json2 && json2.data[0]) { // 스트리머가 존재하고 방송중인 경우 - 시작시간, 시청자수
                const kst = new Date(json2.data[0].started_at)
                // const kst = json2.data[0].started_at
                setStartTime(kst.getTime())
                setViewerCount(json2.data[0].viewer_count)
            }
            else { // 스트리머가 존재하지만 방송중이 아닌 경우
                setStartTime()
                setViewerCount()
            }
        }
        else { // 스트리머가 존재하지 않는 경우 - 값 전부 비우고 메시지 출력
            setStreamInfo(null)
            setName()
            setDigitId('')
            setStartTime()
            setViewerCount()
        }
        return json
    }
    
    const handleInputChange = (event) => { // input창에서 값 보여주기 위해 사용
        setInputValue(event.target.value);
    };

    const handleEnterPress = (event) => { // 엔터 클릭 시 검색 버튼 클릭 시와 동일하게 작동
        if (event.key === 'Enter') {
            handleSearchButtonClick()
        }
    }
    const handleSearchButtonClick = async () => { // '검색' 버튼 클릭 시 문서 존재 여부 확인하고 있으면 이동
        const result = await getId(inputValue)
        setInputValue('')
        if (result && !result.error && result.data[0] && streamers && streamers.some(item => item.digitId == result.data[0].id)) {handlePageNavigation(result.data[0].id)}
    }
    const handleRemoveButtonClick = (digitId) => {
        const filteredStreamers = streamers.filter(i => i.digitId!=digitId)
        setStreamers(filteredStreamers)
        localStorage.setItem('streamers', JSON.stringify(filteredStreamers))
    }
    const handleMakeButtonClick = () => { // '생성' 버튼 클릭 시 스트리머 정보 저장
        // 숫자 아이디 - 스트리머 이름 - 시작시간 - 시청자수 순서로 저장
        const isDuplicate = streamers.some((streamer) => streamer.digitId === digitId)
        // 중복확인
        if (isDuplicate) { // 중복
            return
        }
        const newStreamer = { digitId, name, startTime, viewerCount }
        // 이전 배열에 새 오브젝트 추가
        const updatedStreamers = [...streamers, newStreamer]
        // 시청자수 기준으로 정렬
        const sortedUpdatedStreamers = [...updatedStreamers].sort((a, b) => b.viewerCount - a.viewerCount)

        // 상태 업데이트
        setStreamers(sortedUpdatedStreamers);
        localStorage.setItem('streamers', JSON.stringify(sortedUpdatedStreamers));
      };
    const handleClearButtonClick = () => { // '초기화' 버튼 클릭 시 로컬 스토리지 및 배열 초기화
        localStorage.clear()
        setStreamers([])
    };
    return <div>
        <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyPress={handleEnterPress}
        />
        <button onClick={handleSearchButtonClick}>
            검색
        </button>
        <button onClick={handleClearButtonClick}>
            초기화
        </button>
        <div>
            {id ? (id.error ? "잘못된 아이디입니다." :  // 가능한 아이디인지 여부 확인
            (id.data[0] ? // 아이디가 존재하는 경우
             // 문서가 존재하는지 확인 -> 존재하는 경우 바로 이동
            (streamInfo && streamInfo.data[0] ? null : "해당 스트리머는 방송중이 아닙니다.") // 문서가 없는 경우
             : "해당 아이디를 가진 스트리머가 없습니다.")) : null}
        </div>
        <div>{JSON.stringify(streamers)}</div>
        {id && !id.error && id.data[0] && streamInfo && streamInfo.data[0] ?
            <div>
                <div>
                    스트리머 {name}
                </div>
                <div>
                    {streamInfo && JSON.stringify(id)}
                </div>
                <div>
                    시청자수 : {viewerCount}
                </div>
                <div>
                    시작시간 : {startTime}
                </div>
                <button onClick={handleMakeButtonClick}>
                    생성
                </button>
            </div>
            : null}
        
        <div>
        {streamers.map((i, index) => (
            <div key={index}>
                <div>
                    {i.name}
                </div>
                <Link key={i.digitId} to={`/page/${i.digitId}`}>
                    <button>이동</button>
                </Link>
                <button onClick={() => handleRemoveButtonClick(i.digitId)}>
                    삭제
                </button>
            </div>
        ))}
    </div>
    </div>
}

export default Home;