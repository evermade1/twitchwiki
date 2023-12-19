import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import twitchlogo from './twitchlogo.png'
import { RiQuestionnaireLine } from "react-icons/ri";


export const Home = () => {
    const [help, setHelp] = useState(false)
    const openHelp = () => {
        setHelp(!help)
    }
    // useEffect(() => {
    //     setHelp(false)
    // }, [])
    return <div style={{ width: "70%", marginLeft: "15%", marginTop: "10%", textAlign: 'center' }}>
        <div style={{ fontSize: '24px', fontWeight: '600', marginBottom: '10px', display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>여러분이 가꾸어 나가는 트위치의 이야기</div>
        <div style={{ fontSize: '15px', fontWeight: '600', color: 'gray', marginBottom: '30px' }}>검증되지 않았거나 편향된 내용이 있을 수 있습니다.</div>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
            {!help ? <Button style={{ backgroundColor: "#2E2E2E", borderColor: "#9146FF", fontSize: 15, height: '40px', width: '100px', marginRight: '20px' }} onClick={openHelp}>도움말</Button>
                : <Button style={{ backgroundColor: "#9146FF", borderColor: "#9146FF", fontSize: 15, height: '40px', width: '100px', marginRight: '20px' }} onClick={openHelp}>닫기</Button>
            }
            <Link to={`https://www.twitch.tv/`}>
                <Button style={{ backgroundColor: "#2E2E2E", borderColor: "#9146FF", fontSize: 15, height: '40px', width: '100px' }}><img src={twitchlogo} style={{ height: '20px', objectFit: 'cover' }} /></Button>
            </Link>
        </div>
        {help && <div style={{ marginTop: '50px', color: 'lightgray', lineHeight: '25px' }}>
            <div>Twitchwiki는 다시보기가 사라진 한국 트위치의 문제점을 해결하기 위해 만들어졌습니다.</div>
            <div>방송에서 일어난 일, 스트리머의 멘트 등 시청자가 궁금해 할 만한 내용이면 무엇이든, 누구든 적을 수 있고, 수정할 수 있고, 읽을 수 있습니다. </div>
            <div>원하는 방송은 '생성된 문서' 에서 직접 찾거나, 아이디로 검색할 수 있습니다.</div>
            <div style={{ borderTop: '1px solid #424242', margin: '30px 100px 20px 100px' }} />

            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: '10px', marginBottom: '30px' }}>
                <div style={{ width: '400px', marginRight: '100px' }}>
                    <div style={{ marginBottom: '10px' }}>문서가 있는 경우</div>
                    <div>'문서로 이동' 버튼을 클릭하여 문서로 이동합니다.</div>
                </div>
                <div style={{ width: '400px' }}>
                    <div style={{ marginBottom: '10px' }}>문서가 없는 경우</div>
                    <div>현재 방송중인 스트리머의 아이디를 검색합니다.</div>
                    <div>'문서 생성하기' 버튼을 클릭하여 문서를 생성합니다.</div>
                </div>
            </div>
            <div style={{ borderTop: '1px solid #424242', margin: '0px 100px 30px 100px' }} />
            <div>문서를 열람하거나, '편집' 버튼을 클릭하여 작성, 수정합니다.</div>
            <div style={{ marginTop: '20px' }}>문서는 스트리머가 방송을 시작한 시간 기준 24시간 후에 자동 삭제됩니다.</div>
            <div style={{ color: 'red' }}>사실만을 객관적으로 작성해 주시기 바랍니다.</div>
            <div style={{ color: 'red', marginBottom: '-30px' }}>문제가 있는 내용은 삭제될 수 있습니다.</div>
        </div>}
    </div>;
};

export default Home;
