import { useState, useEffect } from "react"
import Button from 'react-bootstrap/Button';
import { useParams } from 'react-router-dom';
import ProfileOnline from "./ProfileOnline";
import ProfileOffline from "./ProfileOffline";
import { GoLightBulb } from "react-icons/go";
import NoPage from "./NoPage";
import Time from "./Time";

function Page() {
    const { moveTo } = useParams()
    console.log(moveTo);
    const id = moveTo
    const [pageContent, setPageContent] = useState('')
    const [myStreamer, setMyStreamer] = useState()
    const [inputValue, setInputValue] = useState('');
    const [editPage, setEditPage] = useState(false)
    const [operate, setOperate] = useState(false)
    const storedStreamers = localStorage.getItem('streamers');
    const streamers = JSON.parse(storedStreamers)

    const getInfo = () => {
        const findMyStreamer = streamers.filter((i) => {
            return i.id == id
        })
        setMyStreamer(findMyStreamer[0])
        setOperate(true)
    }
    const handleInputChange = (event) => { // input창에서 값 보여주기 위해 사용
        setInputValue(event.target.value);
    };
    const handleSubmit = (event) => {
        event && event.preventDefault(); // 기본 동작 막기
        localStorage.setItem(id, JSON.stringify(inputValue))
        setPageContent(inputValue)
        setInputValue('')
        setEditPage(false)
    };
    const handleEditButtonClick = () => {
        if (!editPage) {
            setInputValue(pageContent)
        }
        else { handleSubmit() }
        setEditPage(!editPage)
    }
    useEffect(() => {
        getInfo()
        const tmp = localStorage.getItem(id);
        setPageContent(tmp ? JSON.parse(tmp) : '')
    }, [])

    return <div style={{ width: "70%", marginLeft: "15%", marginTop: "2%" }}>
        {myStreamer ?
            myStreamer.viewerCount ?
                <ProfileOnline userInfo={myStreamer.userInfo} streamInfo={myStreamer.streamInfo} buttonFor={'page'} />
                : <ProfileOffline userInfo={myStreamer.userInfo} />
            : operate ? <NoPage id={id} /> : null
        }
        {myStreamer &&
        <div style={{ marginTop: '1%', marginBottom: "5%" }}>
            {myStreamer && myStreamer.startTime && <div style={{ marginBottom: "3%", alignItems: 'center', fontSize: "15px", fontWeight: '600' }}>
                <div style={{ display: 'flex', flexDirection: 'row' }}><Time time={myStreamer.startTime} /><div style={{ marginLeft: "5px" }}>시작</div></div>
                <div style={{color: 'gray', fontSize: '13px', fontWeight: '500', alignItems: 'center', fontStyle: 'italic', display: 'flex', flexDirection: 'row', alignItems: 'center'}}><GoLightBulb style={{marginRight: '3px'}}/>문서는 방송 시작 시간에서 24시간이 경과하면 자동 삭제됩니다.</div>
            </div>}
            {!editPage && <Button style={{ backgroundColor: "#2E2E2E", borderColor: "#9146FF", width: '100px' }} onClick={handleEditButtonClick} >편집</Button>}
            {editPage && <Button style={{ backgroundColor: "#9146FF", borderColor: "#9146FF", width: '100px', color: 'white' }} onClick={handleEditButtonClick} >완료</Button>}
            {!editPage && <div style={{ marginTop: "20px", width: "100%", minHeight: "200px", lineHeight: "22px", fontSize: "15px", whiteSpace: 'pre-line', border: '1px solid #9146FF', 
            borderRadius: '5px', paddingLeft: "10px", paddingRight: "10px", paddingTop: "10px", paddingBottom: "50px", overflow: 'auto' }}>
                {pageContent ? pageContent : 
                <div style={{color: "gray"}}>작성된 내용이 없습니다. '편집' 버튼을 클릭하여 작성을 시작해 보세요.</div>}
                </div>}
            {editPage && <textarea onSubmit={handleSubmit} className="d-flex" style={{ marginTop: "20px", width: "100%", minHeight: "200px", lineHeight: "22px", fontSize: "15px", 
            backgroundColor: "#2E2E2E", color: "white", borderColor: 'white', borderRadius: '5px', resize: 'none', paddingLeft: "10px", paddingRight: "10px", 
            paddingTop: "10px", paddingBottom: "50px", overflow: 'auto' }}
                type="text"
                value={inputValue}
                onChange={handleInputChange}
            >
            </textarea>}
        </div>}
    </div>
}

export default Page;