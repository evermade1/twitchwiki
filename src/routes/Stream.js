import { useState, useEffect } from "react"

function Stream({streamers}) {
    return <div>
        {streamers.map((i,index) => (
            <div key={index}>{i.name}</div>
        ))}
    </div>
}

export default Stream;