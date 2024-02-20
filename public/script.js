document.addEventListener('keydown', function (event) {
    if (event.code === "Enter") {
        event.preventDefault();
        document.getElementById('button').click()
    }
})

function validate_login() {
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: username, password: password }),
    }).then(response => response.json()).then(data => {
        if (data.success) {
            window.location.href = 'success.html?topic=' + data.message;
        }
        else {
            document.getElementById("errorText").innerText = data.message;
        }
    });
}