import { useState, useEffect } from "react"
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';

const MainNavBar = ({ onSearch }) => {
    const navigate = useNavigate();
    const [inputValue, setInputValue] = useState('');
    const handleSubmit = (event) => {
        event.preventDefault(); // 기본 동작 막기
        handleSearchButtonClick(); // 검색 버튼 클릭 시와 동일한 로직 수행
    };
    // input창에서 값 보여주기 위해 사용
    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };
    /**
     * 검색 버튼 클릭 시 검색 결과 창으로 이동 + App.js에 아이디 전달하여 거기서 창 내용 만들기
     */
    const handleSearchButtonClick = () => {
        navigate(`/search/${inputValue}`);
        onSearch(inputValue)
    }
    return (
        <Navbar data-bs-theme="dark" expand="lg" className="bg-body" style={{position: 'fixed', width: "100%"}}>
            <Container fluid>
                <Navbar.Brand href="/" style={{display: 'flex', flexDirection: 'row', alignItems: 'flex-end'}}><div style={{fontSize: "20px", fontWeight: "600"}}>Twitchwiki</div><div style={{marginLeft: '1px', fontSize: "10px", fontStyle: 'italic', color: '#9146FF'}}>βeta</div></Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll>
                        {/* <Nav.Link href="#">
                            Link
                        </Nav.Link> */}
                    </Nav>
                    <Form onSubmit={handleSubmit} className="d-flex">
                        <Form.Control
                            type="text"
                            value={inputValue}
                            onChange={handleInputChange}
                            style={{marginRight: '10px', }}
                        />
                        <Button style={{backgroundColor: "#2E2E2E", borderColor: "#9146FF", fontSize: '15px', width: "100px"}} onClick={handleSubmit}>검색</Button>
                    </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default MainNavBar;