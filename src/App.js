import { useState, useEffect } from "react";
import Home from "./routes/Home";
import Page from "./routes/Page";
import Loading from "./routes/Loading";
import MainNavBar from "./routes/Navbar";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom"
import SearchResult from "./routes/SearchResult";
const Headers = { "Client-Id": '6duqv66y6u4rsy9s1ktrmutyusw4p7', "Authorization": "Bearer " + 'qhnxjxau3jxtkx3dlt6gqnht9n4psm' }

function App() {
  const [searchResult, setSearchResult] = useState(null);
  const [inputValue, setInputValue] = useState('');
    const [id, setId] = useState() // 스트리머 정보
    const [digitId, setDigitId] = useState() // 숫자로 이루어진 아이디
    const [streamInfo, setStreamInfo] = useState() // 생방송 정보
    const [startTime, setStartTime] = useState() // 생방송 시작 시간
    const [viewerCount, setViewerCount] = useState() // 시청자 수
    const [name, setName] = useState() // 스트리머 이름
    const [streamers, setStreamers] = useState([]) // 페이지가 존재하는 스트리머 정보 담는 배열

    useEffect(() => { // 방송 시작 후 24시간이 지난 문서 삭제
        const storedStreamers = localStorage.getItem('streamers');
        if (storedStreamers) {
            const tmpStreamers = JSON.parse(storedStreamers)
            const filteredTmpStreamers = tmpStreamers.filter(item => item.startTime + 86400000 > Date.now())
            setStreamers(filteredTmpStreamers)
            localStorage.setItem('streamers', JSON.stringify(filteredTmpStreamers));
        }
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
  
  const handleSearchButtonClick = async (searchValue) => { // '검색' 버튼 클릭 시 검색 결과창으로 이동
    const result = await getId(searchValue)
    console.log(JSON.stringify(result));
    setInputValue('')
  }
  const handleMakeButtonClick = (digitId, name, startTime, viewerCount, streamInfo) => { // '생성' 버튼 클릭 시 스트리머 정보 저장
    // 숫자 아이디 - 스트리머 이름 - 시작시간 - 시청자수 순서로 저장
    const isDuplicate = streamers.some((streamer) => streamer.digitId === digitId)
    // 중복확인
    if (isDuplicate) { // 중복
        return
    }
    const newStreamer = { digitId, name, startTime, viewerCount, streamInfo }
    // 이전 배열에 새 오브젝트 추가
    const updatedStreamers = [...streamers, newStreamer]
    // 시청자수 기준으로 정렬
    const sortedUpdatedStreamers = [...updatedStreamers].sort((a, b) => b.viewerCount - a.viewerCount)

    // 상태 업데이트
    setStreamers(sortedUpdatedStreamers);
    localStorage.setItem('streamers', JSON.stringify(sortedUpdatedStreamers));
  }
  const handleMoveButtonClick = (digitId) => {
    setSearchResult(digitId)
  }
  const handleClearButtonClick = () => {
    localStorage.clear()
    setStreamers([])
  }
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <MainNavBar onSearch={handleSearchButtonClick} />
      <button onClick={handleClearButtonClick}>초기화</button>
      {/* {id && id.data[0] && streamInfo && streamInfo.data[0] && <SearchResult id={id} streamInfo={streamInfo} onSearch={handleMakeButtonClick} />} */}
      <Routes>
        <Route path="/result" element={((id && streamInfo) ? (streamInfo.data[0] ? <div><SearchResult id={id} streamInfo={streamInfo} onSearch={handleMakeButtonClick} /> {streamers && <Home streamers={streamers} onSearch={handleMoveButtonClick}/>} </div>
        : console.log("생방송 중이 아닙니다.")) : id ? (id.error ? console.log("잘못된 아이디입니다.") : console.log("데이터가 없습니다.")) : <Loading/>)}/>
        {streamers && <Route path="/" element={<Home streamers={streamers} onSearch={handleMoveButtonClick}/>} /> }
        <Route path="/page/:searchResult"
          element={searchResult && streamers ? <Page digitId={searchResult} streamers={streamers} /> : <Loading /> }/>
        {/* <Route path="/page/:digitId"
          element={searchResult ? <Navigate to={`/page/${searchResult}`} /> : <Loading /> }/> */}
      </Routes>
    </Router>
  );
}

export default App;
