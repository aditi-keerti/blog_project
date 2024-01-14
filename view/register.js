
const regbtn = document.getElementById("registerbtn");

regbtn.addEventListener("click", (e) => {
    e.preventDefault();

    fetch("https://practice-mifg.onrender.com/users/register", {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify({
            name: document.getElementById("r_name").value,
            email: document.getElementById("r_email").value,
            password: document.getElementById("r_password").value,
            role: document.getElementById("role-select").value,
        }),
    })
    .then((response) => {
        if (!response.ok) {
            window.alert("please enter right credintials (password should contain minimum 8 letters, mix of alphabet, special character, and numbers)");
            throw new Error(`Registration failed: ${response.statusText}`);
        }

        return response.json();
    })
    .then((data) => {
        console.log(data);
        window.location.reload();
    })
    .catch((err) => {
        console.log(err.message);
    });
});


const logbtn = document.getElementById("loginbtn");

logbtn.addEventListener("click", (e) => {
    e.preventDefault();

    fetch("https://practice-mifg.onrender.com/users/login", {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify({
            email: document.getElementById("l_email").value,
            password: document.getElementById("l_password").value,
        }),
    })
    .then((response) => {
        if (!response.ok) {
            // window.alert("please enter right credintials");
            // throw new Error(`Login failed: ${response.statusText}`);
            console.log("no")
        }
        
        return response.json();
    })
    // .then((res)=>res.json())
    .then((data) => {
        console.log(data);

        localStorage.setItem("token", data.access_token);
        localStorage.setItem("token2", data.refresh_token);
        localStorage.setItem("name", data.name);
        location.href = "./notesDashboard.html";
    })
    .catch((err) => {
        console.log(err.message);
    });
});
