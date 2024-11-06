const togglePassword = document.getElementById("togglePassword");
const passwordField = document.getElementById("password");

const eyeVisible = "image/eye-view-interface-symbol-svgrepo-com.svg";
const eyeHidden = "image/eye-password-hide-svgrepo-com.svg";
const successMessageContainer = document.getElementById("successMessage");
const userDetailsContainer = document.getElementById("userDetails");

// Toggle password visibility
togglePassword.addEventListener("click", function () {
    const type =
        passwordField.getAttribute("type") === "password" ? "text" : "password";
    passwordField.setAttribute("type", type);

    togglePassword.src = type === "password" ? eyeVisible : eyeHidden;
    togglePassword.alt =
        type === "password" ? "Show Password" : "Hide Password";
});

document
    .getElementById("loginForm")
    .addEventListener("submit", function (event) {
        event.preventDefault();

        const role = document.getElementById("role").value;
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        if (!role || !username || !password) {
            alert("Please fill in all the fields.");
            return;
        }

        const apiKey =
            "TU8006a67d385d98ce2923e80f7cbf742706efbcf969c021c89a58a703c80fd3a2c80f3235cfed29b9f10060a315e80192"; // replace with your own API key
        const requestBody = { UserName: username, PassWord: password };

        // Step 1: Authenticate with the TU API
        fetch("https://restapi.tu.ac.th/api/v1/auth/Ad/verify", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Application-Key": apiKey,
            },
            body: JSON.stringify(requestBody),
        })
            .then((response) => {
                if (!response.ok) {
                    if (response.status === 400) {
                        throw new Error(
                            "Incorrect username or password. Please try again."
                        );
                    } else if (response.status === 401) {
                        throw new Error(
                            "Unauthorized. Please check your API key."
                        );
                    } else {
                        throw new Error(
                            `Error: Could not login. HTTP status: ${response.status}`
                        );
                    }
                }
                return response.json();
            })
            .then((data) => {
                if (!data.status) {
                    throw new Error("Authentication failed. Please try again.");
                }

                // Check if the selected role matches the user's actual role from the API
                if (data.type !== role) {
                    alert(
                        `Role mismatch! You selected "${role}", but you are logged in as a "${data.type}".`
                    );
                    return;
                }

                // Save user data to the database
                return saveUserDataToDatabase(data);
            })
            .then((data) => {
                // Display success message and user details if login and save were successful
                displaySuccessMessage(data);
            })
            .catch((error) => {
                console.error("Error:", error);
                alert("Error: ไม่สามารถ Login ได้สำเร็จ");
            });
    });

function saveUserDataToDatabase(userData) {
    // URL of your backend endpoint to save user data
    const saveUrl = "http://localhost:8080/api/students/saveUser";

    // Prepare data to be sent to the backend
    const dataToSave = {
        userName: userData.username,
        displayNameTh: userData.displayname_th,
        displayNameEn: userData.displayname_en,
        email: userData.email,
        department: userData.department,
        faculty: userData.faculty || userData.organization,
        type: userData.type,
        tuStatus: userData.tu_status,
        statusWork: userData.StatusWork,
        statusEmp: userData.StatusEmp,
    };

    console.log("Data to save:", dataToSave); // Log data for troubleshooting

    return fetch(saveUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSave),
    }).then((response) => {
        if (!response.ok) {
            throw new Error("Failed to save user data to the database.");
        }
        return dataToSave; // Pass saved data to the next step
    });
}

function displaySuccessMessage(userData) {
    successMessageContainer.style.display = "block";
    userDetailsContainer.innerHTML = `
        ชื่อ: ${userData.displayNameTh || userData.displayNameEn || "N/A"}<br>
        รหัสนักศึกษา: ${userData.userName || "N/A"}<br>
        คณะ: ${userData.faculty || "N/A"}<br>
        สาขา: ${userData.department || "N/A"}<br>
        สถานะ: Success
    `;
}
