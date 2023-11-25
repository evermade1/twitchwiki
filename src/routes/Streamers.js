import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function Streamers({ onSearch }) {
    const storedStreamers = localStorage.getItem('streamers');
    const streamers = JSON.parse(storedStreamers)
    const handleMoveButtonClick = (digitId) => { // '이동' 버튼 클릭 시 해당 문서로 이동
        onSearch(digitId)
    }
    return <div>
        {streamers && streamers.map((i, index) => (

            <div key={index}>
                {i.name} {i.startTime} 
                <Link key={i.digitId} to={`/page/${i.digitId}`}>
                    <button onClick={() => handleMoveButtonClick(i.digitId)}>이동</button>
                </Link>
            </div>
        ))}
    </div>
}

export default Streamers;