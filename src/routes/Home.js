import { useState, useEffect } from "react"

const Headers = { "Client-Id": '6duqv66y6u4rsy9s1ktrmutyusw4p7', "Authorization": "Bearer " + 'qhnxjxau3jxtkx3dlt6gqnht9n4psm' }

function Home() {
    const [inputValue, setInputValue] = useState('');
    const [id, setId] = useState()
    const [digitId, setDigitId] = useState()
    const [channelInfo, setChannelInfo] = useState()
    const [startTime, setStartTime] = useState()
    const [viewer, setViewer] = useState()
    const [name, setName] = useState()
    const [streamers, setStreamers] = useState([])
    const getId = async (id) => {
        const json = await (
            await fetch(`https://api.twitch.tv/helix/users?login=${id}`, { headers: Headers })
        ).json()
        setId(json)
        if (json && json.hasOwnProperty("data") && json.data[0]) { // 사용자가 존재하는 경우
            setDigitId(json.data[0].id)
            setName(json.data[0].display_name)
            const json2 = await (
                await fetch(`https://api.twitch.tv/helix/streams?user_id=${json.data[0].id}`, { headers: Headers })
            ).json()
            setChannelInfo(json2)
            if (json2 && json2.data[0]) { // 사용자가 존재하고 방송중인 경우
                setStartTime(json2.data[0].started_at)
                setViewer(json2.data[0].viewer_count)
            }
            else { // 사용하자 존재하지만 방송중이 아닌 경우
                setStartTime()
                setViewer()
            }
        }
        else { // 사용자가 존재하지 않는 경우
            setChannelInfo(null)
            setName()
            setDigitId('')
            setStartTime()
            setViewer()
        }
    }
    const saveStreamer = (digitId, name, startTime, viewer) => {
        const isDuplicate = streamers.some((streamer) => streamer.digitId === digitId);

        if (isDuplicate) {
            return;
        }
        const newStreamer = {
            digitId,
            name,
            startTime,
            viewer,
          };
          // 이전 상태를 기반으로 새로운 스트리머를 추가한 배열을 생성
          const updatedStreamers = [...streamers, newStreamer];
          const sortedUpdatedStreamers = [...updatedStreamers].sort((a, b) => b.viewer - a.viewer);
      
          // 상태 업데이트
          setStreamers(sortedUpdatedStreamers);
    }
    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleEnterPress = (event) => {
        if (event.key === 'Enter') {
            getId(inputValue)
            setInputValue('')
            // 여기서 원하는 작업 수행
        }
    }
    const handleButtonClick = () => {
        // 원하는 digitId, name, startTime, viewer 값을 전달하여 saveStreamer 호출
        saveStreamer(digitId, name, startTime, viewer);
      };
    function parseDate(str_date) {
        return new Date(Date.parse(str_date));
      }
      
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
        <div>
            {id ? (id.error ? "잘못된 아이디입니다." : (id.data[0] ? null : "데이터가 없습니다.")) : "데이터가 없습니다."}
        </div>
        <div>
        스트리머 {name}
        </div>
        <div>
        {channelInfo && JSON.stringify(channelInfo)}
        </div>
        <div>
        시청자수 : {viewer}
        </div>
        <div>
        시작시간 : {startTime}
        </div>
        <div>
            {JSON.stringify(streamers)}
        </div>
    </div>
}

export default Home;