const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
const crypto = require('crypto');
const path = require('path');
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

function hashPassword(password) {
    const hash = crypto.createHash('sha256');
    hash.update(password);
    return hash.digest('hex');
}
function getUsers() {
    const usersData = fs.readFileSync('users.json');
    return JSON.parse(usersData);
}
async function saveUsers(users) {
    fs.writeFileSync('users.json', JSON.stringify(users, null, 2));
}

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const users = getUsers();
        const user = users.find(user => user.username === username);

        if (user) {
            const passwordMatch = hashPassword(password) === user.password;
            if (passwordMatch) {
                res.status(200).send({ success: true, message: user.interest });
            } else {
                res.status(500).send({ success: false, message: "incorrect password" });
            }
        } else {
            res.status(500).send({ success: false, message: "user doesn't exist" });
        }
    } catch (err) {
        res.status(500).send({ success: false, message: err });
    }
});
app.post('/saveUser', async (req, res) => {
    const { vorname, nachname, benutzername, passwort, geschlecht, interessen, kommentare } = req.body;
    try {
        const users = getUsers();
        if (users.some(user => user.benutzername === benutzername)) {
            res.status(400).send({ success: false, message: 'Account with this username already exists' });
        } else {
            const newUser = {
                name: vorname,
                lastname: nachname,
                username: benutzername,
                password: hashPassword(passwort),
                gender: geschlecht,
                interest: interessen,
                comment: kommentare
            };
            users.push(newUser);
            await saveUsers(users);
            res.status(200).send({ success: true });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send({ success: false, message: 'Internal server error' });
    }
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});