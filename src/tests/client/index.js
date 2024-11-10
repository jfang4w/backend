function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function register(usr, email, pwd, out) {
    const response = await fetch('http://localhost:8800/v1/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',  // Set the correct content type
        },
        body: JSON.stringify({
            email: email,
            username: usr,
            password: pwd,
        })
    });

    const data = await response.json();

    if (response.ok) {
        out.style.color = 'green';
        out.innerText = data+"Redirecting in 2s";
        await sleep(2000);
        window.location.href = 'login.html';
    } else {
        out.style.color = 'red';
        out.innerText = data.error;
    }
}

async function login(email, pwd, out) {
    const response = await fetch('http://localhost:8800/v1/signin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',  // Set the correct content type
        },
        body: JSON.stringify({
            email: email,
            password: pwd,
        })
    });

    const data = await response.json();

    if (response.ok) {
        out.style.color = 'green';
        out.innerText = JSON.stringify(data)+"Redirecting in 2s";
        await sleep(2000);
        window.location.href = `user.html`;
    } else {
        out.style.color = 'red';
        out.innerText = data.error;
    }
}

async function user(id, out) {
    const response = await fetch(`http://localhost:8800/v1/user/${id}`, {
        method: 'GET'
    });

    const data = await response.json();

    if (response.ok) {
        out.style.color = 'green';
        out.innerText = JSON.stringify(data);
    } else {
        out.style.color = 'red';
        out.innerText = data.error;
    }
}

async function logout(id, session, out) {
    const response = await fetch('http://localhost:8800/v1/signout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',  // Set the correct content type
        },
        body: JSON.stringify({
            userId: id,
            sessionId: session,
        })
    });

    const data = await response.json();

    if (response.ok) {
        out.style.color = 'green';
        out.innerText = JSON.stringify(data)+"Redirecting in 2s";
        await sleep(2000);
        window.location.href = `login.html`;
    } else {
        out.style.color = 'red';
        out.innerText = data.error;
    }
}

async function update(username, firstname, lastname, id, out) {
    const response = await fetch('http://localhost:8800/v1/user/update', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',  // Set the correct content type
        },
        body: JSON.stringify({
            username: username,
            nameFirst: firstname,
            nameLast: lastname,
            userId: id
        })
    });

    const data = await response.json();

    if (response.ok) {
        out.style.color = 'green';
        out.innerText = JSON.stringify(data);
    } else {
        out.style.color = 'red';
        out.innerText = data.error;
    }
}

async function newEmail(email, id, out) {
    const response = await fetch('http://localhost:8800/v1/user/email', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',  // Set the correct content type
        },
        body: JSON.stringify({
            newEmail: email,
            userId: id,
        })
    });

    const data = await response.json();

    if (response.ok) {
        out.style.color = 'green';
        out.innerText = JSON.stringify(data);
    } else {
        out.style.color = 'red';
        out.innerText = data.error;
    }
}

async function newPassword(oldPwd, newPwd, id, out) {
    const response = await fetch('http://localhost:8800/v1/user/password', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',  // Set the correct content type
        },
        body: JSON.stringify({
            oldPassword: oldPwd,
            newPassword: newPwd,
            userId: id
        })
    });

    const data = await response.json();

    if (response.ok) {
        out.style.color = 'green';
        out.innerText = JSON.stringify(data);
    } else {
        out.style.color = 'red';
        out.innerText = data.error;
    }
}

async function remove(pwd, id, out) {
    const response = await fetch(`http://localhost:8800/v1/user/${id}/delete`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',  // Set the correct content type
        },
        body: JSON.stringify({
            password: pwd
        })
    });

    const data = await response.json();

    if (response.ok) {
        out.style.color = 'green';
        out.innerText = JSON.stringify(data) + "Redirecting in 2s";
        await sleep(2000);
        window.location.href = 'login.html';
    } else {
        out.style.color = 'red';
        out.innerText = data.error;
    }
}