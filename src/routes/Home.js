import { useState, useEffect } from "react"
import Stream from "./Stream";

const Headers = { "Client-Id": '6duqv66y6u4rsy9s1ktrmutyusw4p7', "Authorization": "Bearer " + 'qhnxjxau3jxtkx3dlt6gqnht9n4psm' }

function Home() {
    const [inputValue, setInputValue] = useState('');
    const [id, setId] = useState() // 실제 아이디
    const [digitId, setDigitId] = useState() // 숫자로 이루어진 아이디
    const [streamInfo, setStreamInfo] = useState() // 생방송 정보
    const [startTime, setStartTime] = useState() // 생방송 시작 시간
    const [viewerCount, setViewerCount] = useState() // 시청자 수
    const [name, setName] = useState() // 스트리머 이름
    const [streamers, setStreamers] = useState([]) // 페이지가 존재하는 스트리머 정보 담는 배열

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

    const getId = async (id) => { //api 사용하여 id에 대응하는 스트리머 정보 + 방송 정보 가져오기
        const json = await (
            await fetch(`https://api.twitch.tv/helix/users?login=${id}`, { headers: Headers })
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
    }
    const saveStreamer = (digitId, name, startTime, viewerCount) => { // 스트리머 정보 저장
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
    }

    const handleInputChange = (event) => { // input창에서 값 보여주기 위해 사용
        setInputValue(event.target.value);
    };

    const handleEnterPress = (event) => { // 엔터 클릭 시 api 가져오기
        if (event.key === 'Enter') {
            getId(inputValue)
            setInputValue('')
            // 여기서 원하는 작업 수행
        }
    }
    const handleButtonClick = () => { // '생성' 버튼 클릭 시 saveStreamer 실행
        saveStreamer(digitId, name, startTime, viewerCount);
      };
    const handleButtonClick2 = () => { // '초기화' 버튼 클릭 시 로컬 스토리지 및 배열 초기화
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
        <button onClick={handleButtonClick}>
            생성
        </button>
        <button onClick={handleButtonClick2}>
            초기화
        </button>
        <div>
            {id ? (id.error ? "잘못된 아이디입니다." : (id.data[0] ? null : "데이터가 없습니다.")) : "데이터가 없습니다."}
        </div>
        <div>
        스트리머 {name}
        </div>
        <div>
        {streamInfo && JSON.stringify(streamInfo)}
        </div>
        <div>
        시청자수 : {viewerCount}
        </div>
        <div>
        시작시간 : {startTime}
        </div>
        <Stream streamers={streamers}/>
    </div>
}

export default Home;