import { useState, useEffect } from "react"
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

const MainNavBar = ({ onSearch }) => {
    const [inputValue, setInputValue] = useState('');
    const handleSubmit = (event) => {
        event.preventDefault(); // 기본 동작 막기
        handleSearchButtonClick(); // 검색 버튼 클릭 시 동일한 로직 수행
      };
    const handleInputChange = (event) => { // input창에서 값 보여주기 위해 사용
        setInputValue(event.target.value);
    };
    const handleSearchButtonClick = () => {
        console.log(inputValue);
        onSearch(inputValue)
    }
    useEffect(() => {
        console.log(inputValue);
    }, [])
    return (
        <Navbar data-bs-theme="dark" expand="lg" className="bg-body">
            <Container fluid>
                <Navbar.Brand href="/#">Twitchwiki</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >

                        <Nav.Link href="#">
                            Link
                        </Nav.Link>
                    </Nav>
                    <Form onSubmit={handleSubmit} className="d-flex">
                        <Form.Control
                            type="text"
                            value={inputValue}
                            onChange={handleInputChange}
                            
                        />
                        <Button variant="outline-success">Search</Button>
                    </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default MainNavBar;