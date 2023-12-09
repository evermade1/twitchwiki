import { useState, useEffect, useRef } from "react"
import Button from 'react-bootstrap/Button';
import { Link, useParams } from 'react-router-dom';
import { FaCircle } from "react-icons/fa";
import ProfileOnline from "./ProfileOnline";
import ProfileOffline from "./ProfileOffline";

function Page() {
    const { moveTo } = useParams()
    console.log(moveTo);
    const digitId = moveTo
    const [tmpPageContent, setTmpPageContent] = useState(localStorage.getItem(digitId))
    const [pageContent, setPageContent] = useState(tmpPageContent ? JSON.parse(tmpPageContent) : '')
    const [myStreamer, setMyStreamer] = useState()
    const [inputValue, setInputValue] = useState('');
    const [editPage, setEditPage] = useState(false)
    const storedStreamers = localStorage.getItem('streamers');
    const streamers = JSON.parse(storedStreamers)

    const getInfo = () => {
        const findMyStreamer = streamers.filter((i) => {
            return i.id == digitId
        })
        setMyStreamer(findMyStreamer[0])
        console.log(JSON.stringify(findMyStreamer[0]));
    }
    const handleInputChange = (event) => { // input창에서 값 보여주기 위해 사용
        setInputValue(event.target.value);
    };
    const handleSubmit = (event) => {
        event && event.preventDefault(); // 기본 동작 막기
        localStorage.setItem(digitId, JSON.stringify(inputValue))
        setPageContent(inputValue)
        setInputValue('')
        setEditPage(false)
    };
    const handleEditButtonClick = () => {
        if (!editPage) {
            setInputValue(pageContent)
        }
        else {handleSubmit()}
        setEditPage(!editPage)
    }
    useEffect(() => {
        getInfo()
        const tmp = localStorage.getItem(digitId);
        setPageContent(tmp ? JSON.parse(tmp) : '')
    }, [])

    return <div style={{ width: "90%", marginLeft: "5%", marginTop: "2%" }}>
        {/* <div>
            {myStreamer && JSON.stringify(myStreamer)}
        </div> */}
        {myStreamer ?
            // <div style={{
            //     backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url(${myStreamer.userInfo.profile_image_url})`,
            //     backgroundRepeat: "no-repeat",
            //     backgroundSize: "cover",
            //     backgroundPosition: "center left",
            //     borderRadius: "15px",
            //     width: '100%',
            //     height: '100%',
            //     overflow: "hidden"
            // }}>
            //     <div style={{ padding: "1%", display: "flex", flexDirection: "row" }}>
            //         <img src={myStreamer.userInfo.profile_image_url} style={{ width: '150px', height: '150px', borderRadius: "15px" }}></img>
            //         <div style={{ marginLeft: "20px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            //             <div>
            //                 <div style={{ fontWeight: 600, fontSize: 24, margin: 5 }}>{myStreamer.name} ({myStreamer.userInfo.login})</div>
            //                 <div style={{ fontSize: 15, marginLeft: 5, marginTop: 10 }}>{myStreamer.streamInfo.title}</div>
            //                 <div style={{ fontSize: 15, marginLeft: 5, marginTop: 5 }}>{myStreamer.streamInfo.game_name}</div>

            //             </div>
            //             <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
            //                 <FaCircle style={{ fontSize: "10px", color: "red", marginRight: 5, marginTop: 2 }} />
            //                 <div>{myStreamer.viewerCount.toLocaleString()}</div>
            //                 <Link to={`https://www.twitch.tv/${myStreamer.userInfo.id}`} style={{ marginLeft: "20px" }}>
            //                     <Button style={{ backgroundColor: "#9146FF", borderColor: "#9146FF", fontSize: 15 }}>방송으로 이동</Button>
            //                 </Link>
            //             </div>
            //         </div>
            //     </div>
            // </div>
            myStreamer.viewerCount ?
            <ProfileOnline userInfo={myStreamer.userInfo} streamInfo={myStreamer.streamInfo} buttonFor={'page'}/>
            : <ProfileOffline userInfo={myStreamer.userInfo} />
            :
            <div>문서가 존재하지 않습니다.</div>
        }
        <Button style={{ backgroundColor: "#2E2E2E", borderColor: "#9146FF", width: '100px' }} onClick={handleEditButtonClick} >{editPage ? "완료" : "편집" }</Button>
        {!editPage && <div style={{ marginTop: 50, marginLeft: "10%", height: "200px", whiteSpace: 'pre-line' }}>
            {pageContent}
        </div>}
        {editPage && <textarea onSubmit={handleSubmit} className="d-flex" style={{ marginTop: 50, marginLeft: "10%", width: "500px", height: "200px", backgroundColor: "#2E2E2E", color: "white", borderColor: '#9146FF', resize: 'none'}}
                type="text"
                value={inputValue}
                onChange={handleInputChange}
            >
            {/* <Button style={{ backgroundColor: "#2E2E2E", borderColor: "#9146FF", width: '100px' }} onClick={handleSubmit} >게시</Button> */}
        </textarea> }
    </div>
}

export default Page;