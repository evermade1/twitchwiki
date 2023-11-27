import { useState, useEffect } from "react";
import './App.module.css'
import Button from 'react-bootstrap/Button';
import Streamers from "./routes/Streamers";
import Page from "./routes/Page";
import Loading from "./routes/Loading";
import MainNavBar from "./routes/Navbar";
import SearchResult from "./routes/SearchResult";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom"

const Headers = { "Client-Id": '6duqv66y6u4rsy9s1ktrmutyusw4p7', "Authorization": "Bearer " + 'qhnxjxau3jxtkx3dlt6gqnht9n4psm' }

function App() {
  const [moveTo, setMoveTo] = useState(null);
  const [userInfo, setUserInfo] = useState() // 스트리머 정보
  const [streamInfo, setStreamInfo] = useState(null) // 생방송 정보
  const [streamers, setStreamers] = useState([]) // 페이지가 존재하는 스트리머 정보 담는 배열

  useEffect(() => { // 방송 시작 후 24시간이 지난 문서 삭제 (렌더링 시마다 실행)
    const storedStreamers = localStorage.getItem('streamers');
    if (storedStreamers) {
      const tmpStreamers = JSON.parse(storedStreamers)
      const filteredTmpStreamers = tmpStreamers.filter(item => item.startTime + 86400000 > Date.now())
      setStreamers(filteredTmpStreamers)
      localStorage.setItem('streamers', JSON.stringify(filteredTmpStreamers));
    }
  }, []);

  const getId = async (inputvalue) => { // 스트리머 정보 가져오기
    const json = await (
      await fetch(`https://api.twitch.tv/helix/users?login=${inputvalue}`, { headers: Headers })
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
  const handleSearchButtonClick = async (searchValue) => { // '검색' 버튼 클릭 시 아이디에 대해 검색 실행
    await getId(searchValue)
  }
  const SearchResultFunction = (makeOrMove, digitId, name, startTime, viewerCount, profileImage, userInfo, streamInfo) => { // '생성' 버튼 클릭 시 스트리머 정보 저장
    // 숫자 아이디 - 스트리머 이름 - 시작시간 - 시청자수 순서로 저장
    if (makeOrMove == 1) {
      handleMoveButtonClick(digitId)
      return
    }
    const isDuplicate = streamers.some((streamer) => streamer.digitId === digitId)
    if (isDuplicate) { return } // 중복확인
    const newStreamer = { digitId, name, startTime, viewerCount, profileImage, userInfo, streamInfo }
    const updatedStreamers = [...streamers, newStreamer] // 이전 배열에 새 오브젝트 추가
    const sortedUpdatedStreamers = [...updatedStreamers].sort((a, b) => b.viewerCount - a.viewerCount) // 시청자수 기준으로 정렬

    setStreamers(sortedUpdatedStreamers);
    localStorage.setItem('streamers', JSON.stringify(sortedUpdatedStreamers));
  }
  const handleMoveButtonClick = (digitId) => { // '이동' 버튼 클릭 시 해당 스트리머 문서로 이동
    setMoveTo(digitId)
  }
  const handleClearButtonClick = () => { // '초기화' 버튼 클릭 시 로컬 스토리지 및 streamers 배열 초기화
    setStreamers([])
    localStorage.clear()
  }
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <MainNavBar onSearch={handleSearchButtonClick} />
      <Button style={{backgroundColor: "#2E2E2E", width: "4%", borderColor: "#9146FF"}} onClick={handleClearButtonClick}>초기화</Button>
      <Routes>
        <Route path="/search_result" element={((userInfo && streamInfo) ? (streamInfo.data[0] ? <div><SearchResult userInfo={userInfo} streamInfo={streamInfo} onSearch={SearchResultFunction} /> {streamers && <Streamers onSearch={handleMoveButtonClick} />} </div>
          : <div><div>생방송 중이 아닙니다.</div> {streamers && <Streamers onSearch={handleMoveButtonClick} />} </div>) 
          : userInfo ? (userInfo.error ? <div><div>잘못된 아이디입니다.</div> {streamers && <Streamers onSearch={handleMoveButtonClick} />} </div> 
          : <div><div>데이터가 없습니다.</div> {streamers && <Streamers onSearch={handleMoveButtonClick} />} </div>) : <Loading />)} />
        {streamers && <Route path="/" element={<Streamers onSearch={handleMoveButtonClick} />} />}
        <Route path="/page/:moveTo"
          element={moveTo && streamers ? <Page digitId={moveTo} streamers={streamers} /> : <Loading />} />
      </Routes>
    </Router>
  );
}

export default App;
