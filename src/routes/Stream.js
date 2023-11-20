import { useState, useEffect } from "react"
import { Link } from 'react-router-dom';

function Stream({ streamers }) {
    const handleButtonClick = () => {

    }
    return <div>
        {streamers.map((i, index) => (
            <div key={index}>
                <div>
                    {i.name}
                </div>
                <Link key={i.digitId} to={`/page/${i.digitId}`}>
                    <button>이동</button>
                </Link>
            </div>
        ))}
    </div>
}

export default Stream;