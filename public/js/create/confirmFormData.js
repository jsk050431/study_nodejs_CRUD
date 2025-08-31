const form = document.getElementById("form");
form.addEventListener("submit", (event) => {
    const title = document.getElementById("title").value;
    let contentsList = [...document.getElementsByClassName("content")].map(
        (data) => data.innerText
    );
    if (document.getElementById("targetTitle")) {
        const targetTitle = document.getElementById("targetTitle").value;
        contentsList = contentsList.filter((data) => data !== targetTitle);
    }
    if (contentsList.includes(title)) {
        alert("이미 존재하는 제목입니다.");
        event.preventDefault();
    }
});
