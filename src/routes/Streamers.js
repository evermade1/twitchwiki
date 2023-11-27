import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';


function Streamers({ onSearch }) {
    const storedStreamers = localStorage.getItem('streamers');
    const streamers = JSON.parse(storedStreamers)
    const now = Date.now()
    const timeFunction = (time) => {
        const days = Math.floor(time / (1000 * 60 * 60 * 24)); // 일
        const hour = String(Math.floor((time / (1000 * 60 * 60)) % 24)).padStart(2, "0"); // 시
        const minutes = String(Math.floor((time / (1000 * 60)) % 60)).padStart(2, "0"); // 분
        const second = String(Math.floor((time / 1000) % 60)).padStart(2, "0"); // 초
        return `${hour}:${minutes}:${second}`
    }
    
    console.log(now);
    const handleMoveButtonClick = (digitId) => { // '이동' 버튼 클릭 시 해당 문서로 이동
        onSearch(digitId)
    }
    return <div style={{ marginTop: "2%" }}>
        {streamers && streamers.map((i, index) => (
            

            <div key={index} style={{ width: "90%", marginLeft: "5%", marginBottom: '15px' }}>
                <div style={{
                    borderRadius: "15px",
                    border: "1.5px solid #9146FF",
                    width: '100%',
                    height: '100px',
                    overflow: "hidden",
                    display: 'flex',
                    flexDirection: "row",
                    alignItems: "center"
                }}>
                    <img src={i.profileImage} style={{ width: '80px', height: '80px', marginLeft: '20px', borderRadius: "15px"}}></img>
                    <div style={{display: 'flex', flexDirection: 'column', marginLeft: "20px"}}>
                    <div style={{ fontWeight: 600, fontSize: 20}}>{i.name}</div>
                    <div style={{ fontSize: 15}}>{timeFunction(now - i.startTime)}</div>
                    <div style={{ fontSize: 15}}>{i.viewerCount}</div>
                    </div>
                    <Link key={i.digitId} to={`/page/${i.digitId}`}>
                        <Button style={{ backgroundColor: "#9146FF", borderColor: "#9146FF", fontSize: 15, margin: "20px" }} onClick={() => handleMoveButtonClick(i.digitId)}>이동</Button>
                    </Link>
                </div>
            </div>
        ))}
    </div>
}

export default Streamers;