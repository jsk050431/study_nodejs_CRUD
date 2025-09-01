const form = document.getElementById("form_delete");
form.addEventListener("submit", (event) => {
    if (!confirm("삭제하시겠습니까?")) {
        event.preventDefault();
    }
});
