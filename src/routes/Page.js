import { useState, useEffect, useRef } from "react"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import { AiOutlineLike } from "react-icons/ai";
import { AiOutlineDislike } from "react-icons/ai";
import { FaCircle } from "react-icons/fa";



function Page({ digitId, streamers }) {
    const [tmpPageContent, setTmpPageContent] = useState(localStorage.getItem(digitId))
    const [pageContent, setPageContent] = useState(tmpPageContent ? JSON.parse(tmpPageContent) : [])
    const [myStreamer, setMyStreamer] = useState()
    const [inputValue, setInputValue] = useState('');

    const getInfo = () => {
        const myStreamer = streamers.filter((i) => {
            return i.digitId == digitId
        })
        setMyStreamer(myStreamer[0])
    }
    const handleInputChange = (event) => { // input창에서 값 보여주기 위해 사용
        setInputValue(event.target.value);
    };
    const handleSubmit = (event) => {
        event.preventDefault(); // 기본 동작 막기
        localStorage.setItem(digitId, JSON.stringify([...pageContent, [inputValue, Date.now(), 0, 0, null]]))
        setPageContent([...pageContent, [inputValue, Date.now(), 0, 0, null]])
        setInputValue('')
    };
    const like = (index) => {
        const updatedPageContent = [...pageContent];
        updatedPageContent[index][2] += 1;
        localStorage.setItem(digitId, JSON.stringify(updatedPageContent))
        setPageContent(updatedPageContent);

    }
    const dislike = (index) => {
        const updatedPageContent = [...pageContent];
        updatedPageContent[index][3] += 1;
        localStorage.setItem(digitId, JSON.stringify(updatedPageContent))
        setPageContent(updatedPageContent);
    }
    function timeFunction(time) {
        const hours = String(Math.floor(((time / (1000 * 60 * 60)) + 9) % 24) ).padStart(2, "0"); // 시
        const minutes = String(Math.floor((time / (1000 * 60)) % 60)).padStart(2, "0"); // 분
        return `${hours}:${minutes}`
    }
    useEffect(() => {
        getInfo()
        const tmp = localStorage.getItem(digitId);
        setPageContent(tmp ? JSON.parse(tmp) : [])
    }, [])
    
    return <div style={{ width: "90%", marginLeft: "5%", marginTop: "2%" }}>
        {/* <div>
            {myStreamer && JSON.stringify(myStreamer)}
        </div> */}
        {myStreamer &&
        <div style={{
            backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url(${myStreamer.userInfo.data[0].profile_image_url})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center left",
            borderRadius: "15px",
            width: '100%',
            height: '100%',
            overflow: "hidden"
        }}>
            <div style={{ padding: "1%", display: "flex", flexDirection: "row" }}>
                <img src={myStreamer.userInfo.data[0].profile_image_url} style={{ width: '150px', height: '150px', borderRadius: "15px" }}></img>
                <div style={{ marginLeft: "20px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                    <div>
                        <div style={{ fontWeight: 600, fontSize: 24, margin: 5 }}>{myStreamer.name} ({myStreamer.userInfo.data[0].login})</div>
                        <div style={{ fontSize: 15, marginLeft: 5, marginTop: 10 }}>{myStreamer.streamInfo.data[0].title}</div>
                        <div style={{ fontSize: 15, marginLeft: 5, marginTop: 5 }}>{myStreamer.streamInfo.data[0].game_name}</div>
                        
                    </div>
                    <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                        <FaCircle style={{ fontSize: "10px", color: "red", marginRight: 5, marginTop: 2 }} />
                        <div>{myStreamer.viewerCount.toLocaleString()}</div>
                        <Link to={`https://www.twitch.tv/${myStreamer.userInfo.data[0].id}`} style={{ marginLeft: "20px" }}>
                            <Button style={{ backgroundColor: "#9146FF", borderColor: "#9146FF", fontSize: 15 }}>방송으로 이동</Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
}
        <div style={{ marginTop: 50, marginLeft: "10%", height: "400px", overflow: 'scroll' }}>
            {pageContent && pageContent.map((i, index) =>
                <div key={index} style={{ display: "flex", flexDirection: "row", alignItems: 'flex-end', marginBottom: 10 }}>
                    <div style={{ marginLeft: 5, fontSize: 20 }}>{i[0]}</div>
                    <div style={{ marginLeft: 5, fontSize: 12, color: "gray" }}>{timeFunction(i[1])}</div>
                    <AiOutlineLike style={{ marginLeft: 10, fontSize: 15, color: "gray" }} onClick={() => like(index)} />
                    <div style={{ marginLeft: 2, fontSize: 10, color: "gray" }}>{pageContent[index][2]}</div>
                    <AiOutlineDislike style={{ marginLeft: 10, fontSize: 15, color: "gray" }} onClick={() => dislike(index)} />
                    <div style={{ marginLeft: 2, fontSize: 10, color: "gray" }}>{pageContent[index][3]}</div>
                    {/* <button style={{marginLeft: 5, fontSize: 12, color: "gray"}}>삭제</button> */}
                </div>
            )}
        </div>
        <Form onSubmit={handleSubmit} className="d-flex" style={{ marginLeft: "10%", marginRight: "10%" }}>
            <Form.Control
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                style={{ marginRight: '10px' }}
            />
            <Button style={{ backgroundColor: "#2E2E2E", borderColor: "#9146FF", width: '100px' }} onClick={handleSubmit} >게시</Button>
        </Form>
    </div>
}

export default Page;