import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import { FaCircle } from "react-icons/fa";
import ElapsedTime from './ElaspedTime';

function Streamers({ onSearch }) {
    const storedStreamers = localStorage.getItem('streamers');
    const streamers = JSON.parse(storedStreamers)
    /** '이동' 버튼 클릭 시 App.js로 id 전달 -> 문서로 이동 */
    const handleMoveButtonClick = (id) => { 
        onSearch(id)
    }
    return <div style={{ width: "70%", marginLeft: "15%", marginTop: "5%" }}>
        <div style={{ fontWeight: 600, fontSize: 20, marginBottom: "10px" }}>생성된 문서</div>
        {streamers && streamers.map((i, index) => (
            <div key={index} style={{ marginBottom: '15px' }}>
                <div style={{
                    borderRadius: "15px",
                    border: "1.5px solid #9146FF",
                    width: '100%',
                    height: '100px',
                    overflow: "hidden",
                    display: 'flex',
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: 'space-between'
                }}>
                    <div style={{display: 'flex', flexDirection: "row", alignItems: "center"}} >
                    <img src={i.profileImage} style={{ width: '80px', height: '80px', marginLeft: '20px', borderRadius: "15px"}}></img>
                    <div style={{ display: 'flex', flexDirection: 'column', marginLeft: "20px" }}>
                        <div style={{ fontWeight: 600, fontSize: '18px' }}>{i.name} ({i.id})</div>
                        {i.viewerCount ? <div>
                            <ElapsedTime style={{ fontSize: '13px' }} time={i.startTime} />
                            <div style={{ display: 'flex', flexDirection: 'row', alignItems: "center" }}>
                                <FaCircle style={{ fontSize: "10px", color: "red", marginRight: 5, marginTop: 2 }} />
                                <div style={{ fontSize: '14px' }}>{i.viewerCount.toLocaleString()}</div>
                            </div></div> :
                            <div>
                                <div style={{ display: 'flex', flexDirection: 'row', alignItems: "center" }}>
                                    <FaCircle style={{ fontSize: "10px", color: "gray", marginRight: 5, marginTop: 2 }} />
                                    <div style={{ fontSize: '14px', color: 'gray' }}>오프라인</div>
                                </div>
                            </div>
                        }
                    </div>
                    </div>
                    <div style={{marginRight: '20px'}}>
                        <Link to={`/page/${i.id}`} style={{ marginLeft: "20px" }}>
                            <Button style={{ backgroundColor: "#9146FF", borderColor: "#9146FF", fontSize: 15 }} onClick={() => handleMoveButtonClick(i.id)}>문서로 이동</Button>
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