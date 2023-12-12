import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';


function NoPage({ id }) {
    return <div>
        <div>문서가 존재하지 않습니다.</div>
        <Link to={`/search/${id}`}>
            <Button style={{ backgroundColor: "#9146FF", borderColor: "#9146FF", fontSize: 15, marginLeft: "20px" }}>'{id}' 검색하기</Button>
        </Link>
    </div>;
};

export default NoPage;
