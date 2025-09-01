const form = document.getElementById("form");
form.addEventListener("submit", (event) => {
    const title = document.getElementById("title").value;

    const BANNED_CHARS = /[\/\\:*?"<>|]/;
    if (BANNED_CHARS.test(title)) {
        alert(`제목에는 다음 문자를 사용할 수 없습니다.\n\\ / : * ? < > |`);
        event.preventDefault();
    }

    let contentsList = [...document.getElementsByClassName("content")].map(
        (data) => data.innerText
    );
    // 업데이트일 때 (id = targetTitle 태그 존재시), contentsList에서 자기자신 제목 빼기
    if (document.getElementById("targetTitle")) {
        const targetTitle = document.getElementById("targetTitle").value;
        contentsList = contentsList.filter((data) => data !== targetTitle);
    }
    if (contentsList.includes(title)) {
        alert("이미 존재하는 제목입니다.");
        event.preventDefault();
    }
});
