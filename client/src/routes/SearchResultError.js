function SearchResultError() {
    return <div style={{ marginTop: "12%", marginBottom: "75px" }}>
        <div style={{ marginTop: "75px", fontSize: "24px", fontWeight: "600" }}>잘못된 아이디 형식입니다.</div>
        <div style={{ fontSize: "15px", fontWeight: "600", color: "gray" }}>아이디를 다시 한 번 확인해 주세요.</div>
        <div style={{ fontSize: "12px", fontWeight: "600", color: "#6E6E6E" }}>
            아이디는 4자 이상 25자 이하의 알파벳, 숫자 또는 언더바로 구성되며, 특수문자, 한글, 띄어쓰기는 사용할 수 없습니다.
        </div>

    </div>
}

export default SearchResultError;
