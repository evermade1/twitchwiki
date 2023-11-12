import { useState, useEffect } from "react"

const Headers = { "Client-Id": '6duqv66y6u4rsy9s1ktrmutyusw4p7', "Authorization": "Bearer " + 'qhnxjxau3jxtkx3dlt6gqnht9n4psm' }

function Home() {
    const [inputValue, setInputValue] = useState('');
    const [id, setId] = useState()
    const [digitId, setDigitId] = useState()
    const [channelInfo, setChannelInfo] = useState()
    const getId = async (id) => {
        const json = await (
            await fetch(`https://api.twitch.tv/helix/users?login=${id}`, { headers: Headers })
        ).json()
        setId(json)
        if (json && json.hasOwnProperty("data") && json.data[0]) {
            setDigitId(json.data[0].id)
            const json2 = await (
                await fetch(`https://api.twitch.tv/helix/streams?user_id=${json.data[0].id}`, { headers: Headers })
            ).json()
            setChannelInfo(json2)
        }
        
        // setLoading(false)
    }
    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleEnterPress = (event) => {
        if (event.key === 'Enter') {
            getId(inputValue)
            // 여기서 원하는 작업 수행
        }
    }
    return <div>
        <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyPress={handleEnterPress}
        />
        <div>
            {id && id.error ? "잘못된 아이디입니다." : (id.data[0] ? id.data[0].display_name : "데이터가 없습니다.")}
        </div>
        <div>
        {id && JSON.stringify(id)}
        </div>
        <div>
        {channelInfo && JSON.stringify(channelInfo)}
        </div>
    </div>
}

export default Home;