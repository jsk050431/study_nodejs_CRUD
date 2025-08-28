const form = document.getElementById("form");
form.addEventListener("submit", (event) => {
    const title = document.getElementById("title").value;
    const contentsList = [...document.getElementsByClassName("content")].map(
        (data) => data.innerText
    );
    if (contentsList.includes(title)) {
        alert("이미 존재하는 제목입니다.");
        event.preventDefault();
    }
});
