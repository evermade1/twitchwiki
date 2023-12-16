import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';


function NoPage({ id }) {
    return <div style={{ marginTop: "75px", marginBottom: "75px"}}>
        <div style={{ fontSize: "24px", fontWeight: "600" }}>문서가 존재하지 않습니다.</div>
        <div style={{ fontSize: "15px", fontWeight: "600", color: "gray" }}>아이디를 다시 한 번 확인해 주세요.</div>
        <Link to={`/search/${id}`}>
            <Button style={{ backgroundColor: "#9146FF", borderColor: "#9146FF", fontSize: 15, fontWeight: "600", marginTop: "20px" }}>'{id}' 검색하기</Button>
        </Link>
    </div>;
};

export default NoPage;