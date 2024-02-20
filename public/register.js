document.addEventListener('keydown', function (event) {
    if (event.code === "Enter" && document.activeElement.tagName !== 'TEXTAREA') {
        event.preventDefault();
        document.getElementById('register-button').click();
    }
});

function validateRegistration() {
    var vorname = document.getElementById('vorname').value;
    var nachname = document.getElementById('nachname').value;
    var benutzername = document.getElementById('benutzername').value;
    var passwort = document.getElementById('passwort').value;
    var geschlecht = document.querySelector('input[name="geschlecht"]:checked');
    var interessen = document.getElementById('interessen').value;
    var kommentare = document.getElementById('kommentare').value;
    var nutzungsbedingungen = document.getElementById('nutzungsbedingungen').checked;

    // Validation logic
    if (!/^[A-Za-z_-]{1,20}$/.test(vorname)) {
        alert("Bitte geben Sie einen gültigen Vornamen ein.");
        return;
    }

    if (!/^[A-Za-z_-]{1,20}$/.test(nachname)) {
        alert("Bitte geben Sie einen gültigen Nachnamen ein.");
        return;
    }

    if (!/^[A-Za-z0-9_-]{1,20}$/.test(benutzername)) {
        alert("Bitte geben Sie einen gültigen Benutzernamen ein.");
        return;
    }

    if (!/(?=.*\d)(?=.*[!#,+\-_?]).{8,}/.test(passwort)) {
        alert("Das Passwort muss mindestens 8 Zeichen lang sein und mindestens eine Zahl und ein Sonderzeichen enthalten.");
        return;
    }

    if (!geschlecht) {
        alert("Bitte wählen Sie Ihr Geschlecht aus.");
        return;
    }

    if (interessen.length === 0) {
        alert("Bitte wählen Sie mindestens eine Interessenskategorie aus.");
        return;
    }

    if (!nutzungsbedingungen) {
        alert("Bitte akzeptieren Sie die Nutzungsbedingungen.");
        return;
    }
    registerUser(vorname, nachname, benutzername, passwort, geschlecht.value, interessen, kommentare);
}

function registerUser(vorname, nachname, benutzername, passwort, geschlecht, interessen, kommentare) {
    fetch('/saveUser', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            vorname: vorname,
            nachname: nachname,
            benutzername: benutzername,
            passwort: passwort,
            geschlecht: geschlecht,
            interessen: interessen,
            kommentare: kommentare
        }),
    }).then(response => response.json()).then(data => {
        if (data.success) {
            var message;
            if (geschlecht === "männlich") {
                message = "Wilkommen Herr " + vorname + " " + nachname;
            } else if (geschlecht === "weiblich") {
                message = "Wilkommen Frau " + vorname + " " + nachname;
            } else {
                message = "Wilkommen " + vorname + " " + nachname;
            }
            if (confirm(message)) {
                window.location.href = "index.html";
            }
        }
        else {
            alert(data.message);
        }
    }).catch(error => {
        console.error('Error:', error);
        alert("Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.");
    });
}
