import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import { FaCircle } from "react-icons/fa";
import ElapsedTime from './ElaspedTime';



function Streamers({ onSearch }) {
    const storedStreamers = localStorage.getItem('streamers');
    const streamers = JSON.parse(storedStreamers)
    
    
    const handleMoveButtonClick = (digitId) => { // '이동' 버튼 클릭 시 해당 문서로 이동
        onSearch(digitId)
    }
    return <div style={{ marginTop: "2%" }}>
        <div style={{ fontWeight: 600, fontSize: 20, marginLeft: "5%", marginBottom: "10px" }}>생성된 문서</div>
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
                    <img src={i.profileImage} style={{ width: '80px', height: '80px', marginLeft: '20px', borderRadius: "15px" }}></img>
                    <div style={{ display: 'flex', flexDirection: 'column', marginLeft: "20px" }}>
                        <div style={{ fontWeight: 600, fontSize: 20 }}>{i.name} ({i.id})</div>
                        <ElapsedTime style={{ fontSize: 15 }} time={i.startTime} />
                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: "center" }}>
                            <FaCircle style={{ fontSize: "10px", color: "red", marginRight: 5, marginTop: 2 }} />
                            <div style={{ fontSize: 15 }}>{i.viewerCount.toLocaleString()}</div>
                        </div>
                    </div>
                    <div style={{ position: "absolute", left: "500px" }}>
                        <Link to={`/page/${i.digitId}`} style={{ marginLeft: "20px" }}>
                            <Button style={{ backgroundColor: "#9146FF", borderColor: "#9146FF", fontSize: 15 }} onClick={() => handleMoveButtonClick(i.digitId)}>문서로 이동</Button>
                        </Link>
                        <Link to={`https://www.twitch.tv/${i.id}`} style={{ marginLeft: "20px" }}>
                            <Button style={{ backgroundColor: "#9146FF", borderColor: "#9146FF", fontSize: 15 }}>방송으로 이동</Button>
                        </Link>
                    </div>
                </div>
            </div>
        ))}
    </div>
}

export default Streamers;