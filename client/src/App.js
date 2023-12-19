import { useState, useEffect } from "react";
import './App.module.css'
import Home from "./routes/Home";
import Button from 'react-bootstrap/Button';
import Streamers from "./routes/Streamers";
import Page from "./routes/Page";
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
  const storedStreamers = localStorage.getItem('streamers');
  const [streamers, setStreamers] = useState()

  /**
   * 로컬 스토리지에 저장된 문서를 업데이트 하는 함수 -> 실시간 시청자와 방송 정보 업데이트, 24시간 지난 문서 삭제, 시청자수 기준 정렬
   */
  // const updateStreamers = async () => {
  //   const storedStreamers = await (await fetch('http://localhost:5000/api/streamers')).json()
  //   if (storedStreamers) {
  //     const updatedStreamers = await Promise.all(storedStreamers.map(async (streamer) => {
  //       const json2 = await (
  //         await fetch(`https://api.twitch.tv/helix/streams?user_id=${streamer.digitId}`, { headers: Headers })
  //       ).json();

  //       if (json2.data[0]) {
  //         return {
  //           ...streamer,
  //           viewerCount: json2.data[0].viewer_count,
  //           streamInfo: json2.data[0]
  //         };
  //       }
  //       return {
  //         ...streamer,
  //         viewerCount: 0
  //       };
  //     }));
  //     const filteredUpdatedStreamers = updatedStreamers.filter(item => item.startTime + 86400000 > Date.now());
  //     const remainingStreamers = updatedStreamers.filter(item => item.startTime + 86400000 <= Date.now());
  //     remainingStreamers.forEach(item => localStorage.removeItem(item.id));
  //     const sortedUpdatedStreamers = [...filteredUpdatedStreamers].sort((a, b) => b.viewerCount - a.viewerCount) // 시청자수 기준으로 정렬
  //     const response = await fetch(`http://localhost:5000/api/streamers`, {
  //       method: 'PUT',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(sortedUpdatedStreamers),
  //     });
  //     localStorage.setItem('streamers', JSON.stringify(sortedUpdatedStreamers));
  //     setStreamers(sortedUpdatedStreamers);
  //   }
  // };
  /**'검색' 버튼 클릭 시 아이디에 대해 검색 실행 */
  const handleSearchButtonClick = async (searchValue) => {
    setMoveTo(searchValue)
  }
  /**
   * 새 문서를 생성하거나 기존 문서로 이동하는 함수
   * @param {Number} makeOrMove 새 문서 생성 -> 0, 기존 문서 이동 -> 1
   * @param {Number} digitId 숫자로 구성된 고유 아이디
   * @param {*} id 아이디
   * @param {*} name 스트리머 닉네임
   * @param {*} startTime 방송 시작 시간
   * @param {*} viewerCount 시청자 수
   * @param {*} profileImage 프로필 이미지
   * @param {*} userInfo 스트리머 정보
   * @param {*} streamInfo 방송 정보
   * @returns 
   */
  const SearchResultFunction = async (makeOrMove, digitId, id, name, startTime, viewerCount, profileImage, userInfo, streamInfo) => { // '생성' 버튼 클릭 시 스트리머 정보 저장
    if (makeOrMove == 1) {
      handleMoveButtonClick(id)
      return
    }
    const isDuplicate = streamers.some((streamer) => streamer.digitId === digitId)
    if (isDuplicate) { return } // 중복확인
    const newStreamer = { digitId, id, name, startTime, viewerCount, profileImage, userInfo, streamInfo }
    const response = await fetch('http://localhost:5000/api/streamers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newStreamer)
    })
    if (!response.ok) {
      console.error('Failed to fetch:', response.status, response.statusText);
      return;
    }
    const result = await response.json();
    
    const updatedStreamers = [...streamers, newStreamer]
    const sortedUpdatedStreamers = [...updatedStreamers].sort((a, b) => b.viewerCount - a.viewerCount)
    localStorage.setItem('streamers', JSON.stringify(sortedUpdatedStreamers));
    setStreamers(sortedUpdatedStreamers)
  }
  /**'이동' 버튼 클릭 시 해당 스트리머 문서로 이동 */
  const handleMoveButtonClick = (id) => {
    setMoveTo(id)
  }
  /**'초기화' 버튼 클릭 시 로컬 스토리지 및 streamers 배열 초기화 */
  const handleClearButtonClick = () => {
    localStorage.clear()
    setStreamers([])
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const updateResponse = await fetch('http://localhost:5000/api/streamers', {
        method: 'PUT', // 또는 PATCH
        headers: {
          'Content-Type': 'application/json',
        },
        // 업데이트할 데이터 (필요에 따라 빈 객체 또는 실제 데이터 추가)
        body: JSON.stringify({})
      });
        const response = await fetch('http://localhost:5000/api/streamers');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const result = await response.json();
        setStreamers(result.streamers);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
    
  }, []);
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <MainNavBar onSearch={handleSearchButtonClick} />
      <Button style={{ backgroundColor: "#2E2E2E", width: "100px", marginTop: '100px', marginLeft: "10px", borderColor: "#9146FF" }} onClick={handleClearButtonClick}>초기화</Button>
      <Routes>
        <Route path="/" element={<div><Home /><Streamers onSearch={handleMoveButtonClick} /></div>} />
        <Route path="/search/:moveTo"
          element={<div><SearchResult onSearch={SearchResultFunction} /><Streamers onSearch={handleMoveButtonClick} /></div>} />
        <Route path="/page/:moveTo" element={<Page />} />
      </Routes>

    </Router>
  );
}

export default App;
