import { useState, useEffect } from "react"
import Button from 'react-bootstrap/Button';
import { useParams } from 'react-router-dom';
import ProfileOnline from "./ProfileOnline";
import ProfileOffline from "./ProfileOffline";
import NoPage from "./NoPage";
import ElapsedTime from "./ElaspedTime";

function Page() {
    const { moveTo } = useParams()
    console.log(moveTo);
    const id = moveTo
    const [tmpPageContent, setTmpPageContent] = useState(localStorage.getItem(id))
    const [pageContent, setPageContent] = useState(tmpPageContent ? JSON.parse(tmpPageContent) : '')
    const [myStreamer, setMyStreamer] = useState()
    const [inputValue, setInputValue] = useState('');
    const [editPage, setEditPage] = useState(false)
    const storedStreamers = localStorage.getItem('streamers');
    const streamers = JSON.parse(storedStreamers)
    

    const getInfo = () => {
        const findMyStreamer = streamers.filter((i) => {
            return i.id == id
        })
        setMyStreamer(findMyStreamer[0])
        console.log(JSON.stringify(findMyStreamer[0]));
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
        else {handleSubmit()}
        setEditPage(!editPage)
    }
    useEffect(() => {
        getInfo()
        const tmp = localStorage.getItem(id);
        setPageContent(tmp ? JSON.parse(tmp) : '')
    }, [])

    return <div style={{ width: "90%", marginLeft: "5%", marginTop: "2%"}}>
        {myStreamer ?
            myStreamer.viewerCount ?
                <ProfileOnline userInfo={myStreamer.userInfo} streamInfo={myStreamer.streamInfo} buttonFor={'page'} />
                : <ProfileOffline userInfo={myStreamer.userInfo} />
            :
            <NoPage id={id} />
        }
        <div style={{ width: '90%', marginLeft: '5%', marginTop: '2%' }}>
            {editPage && <Button style={{ backgroundColor: "#9146FF", borderColor: "#9146FF", width: '100px', color: 'white' }} onClick={handleEditButtonClick} >완료</Button>}
            {!editPage && <Button style={{ backgroundColor: "#2E2E2E", borderColor: "#9146FF", width: '100px' }} onClick={handleEditButtonClick} >편집</Button>}
            {myStreamer && myStreamer.startTime && <div style={{display: 'flex', flexDirection: 'row', fontSize: "20px", fontWeight: '600'}}><ElapsedTime time={myStreamer.startTime} /></div>}
            {!editPage && <div style={{ marginTop: 50, width: "500px", height: "200px", whiteSpace: 'pre-line', border: '1px solid #9146FF', borderRadius: '5px'  }}>{pageContent}</div>}
            {editPage && <textarea onSubmit={handleSubmit} className="d-flex" style={{ marginTop: 50, width: "500px", height: "200px", backgroundColor: "#2E2E2E", color: "white", borderColor: 'white', borderRadius: '5px', resize: 'none' }}
                type="text"
                value={inputValue}
                onChange={handleInputChange}
            >
            </textarea>}
        </div>
    </div>
}

export default Page;