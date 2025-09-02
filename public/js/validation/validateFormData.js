function checkEmptyTitle(title) {
    if (!title.length) {
        return "제목을 입력하세요.";
    } else return null;
}

function checkEmptyDescription(description) {
    if (!description.length) {
        return "내용을 입력하세요.";
    } else return null;
}

function checkIncludeBannedChar(title) {
    const BANNED_CHARS = /[\/\\:*?"<>|]/;
    if (BANNED_CHARS.test(title)) {
        return `제목에는 다음 문자를 사용할 수 없습니다.\n\ / : * ? < > |`;
    } else return null;
}

function checkDuplicateTitle(title) {
    let contentsList = [...document.getElementsByClassName("content")].map(
        (data) => data.innerText
    );
    // edit일 때 (id = targetTitle 태그 존재시), contentsList에서 자기자신 제목 빼기
    if (document.getElementById("targetTitle")) {
        const targetTitle = document.getElementById("targetTitle").value;
        contentsList = contentsList.filter((data) => data !== targetTitle);
    }
    if (contentsList.includes(title)) {
        return "이미 존재하는 제목입니다.";
    } else return null;
}

async function startValidation(title, description) {
    const validations = [
        () => checkEmptyTitle(title),
        () => checkIncludeBannedChar(title),
        () => checkDuplicateTitle(title),
        () => checkEmptyDescription(description),
    ];

    for (const step of validations) {
        const msg = await step();
        if (msg) {
            alert(msg);
            return false;
        }
    }
    return true;
}

function main() {
    const form = document.getElementById("form");
    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        const title = document.getElementById("title").value.trim();
        const description = document.getElementById("description").value.trim();

        const isvalid = await startValidation(title, description);
        if (isvalid) form.submit();
    });
}

main();
