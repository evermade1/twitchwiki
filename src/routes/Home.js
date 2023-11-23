import { useState, useEffect } from "react"
import Stream from "./Stream";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import MainNavBar from "./Navbar";
import 'bootstrap/dist/css/bootstrap.min.css';

const Headers = { "Client-Id": '6duqv66y6u4rsy9s1ktrmutyusw4p7', "Authorization": "Bearer " + 'qhnxjxau3jxtkx3dlt6gqnht9n4psm' }

function Home({ streamers, onSearch }) {

    const handleMoveButtonClick = (digitId) => {
        onSearch(digitId)
    }
    return <div>

        <div>
            {streamers.map((i, index) => (

                <div key={index}>
                    {i.name} {i.startTime}
                    <Link key={i.digitId} to={`/page/${i.digitId}`}>
                        <button onClick={() => handleMoveButtonClick(i.digitId)}>이동</button>
                    </Link>
                    {/* <button onClick={() => handleRemoveButtonClick(i.digitId)}>
                    삭제
                </button> */}
                </div>
            ))}
        </div>
    </div>
}

export default Home;