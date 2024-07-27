
import {
    auth, createUserWithEmailAndPassword,
    db, doc, setDoc, getDocs, collection,
    signInWithEmailAndPassword, deleteUser, deleteDoc, getDoc, updateDoc
} from '../DB/db.js';

var index = 0;

function signUp() {
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
            showAlert('Wait', 'warning');
            const user = userCredential.user;
            const docRef = doc(db, "users", user.uid);
            await setDoc(docRef, {
                email: email,
                password: password,
                mac: "",
                id: user.uid
            });
        }).then(async () => {
            document.getElementById('email').value = '';
            document.getElementById('password').value = '';
            await auth.signOut();
            showAlert('User Created Successfully!', 'success');
            location.reload();
        }).catch((error) => {
            document.getElementById('email').value = '';
            document.getElementById('password').value = '';
            showAlert(error.message, 'danger');
        });
} 

document.getElementById('auth-button').addEventListener('click', signUp);

function showAlert(message, type) {
    const alertContainer = document.getElementById('alert-container');
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type}`;
    alertDiv.role = 'alert';
    alertDiv.innerText = message;
    alertContainer.appendChild(alertDiv);
    setTimeout(() => {
        alertDiv.remove();
    }, 3000);
}


async function GetAllUsers() {
    const UsersSnapshot = await getDocs(collection(db, "users"));
    UsersSnapshot.forEach(docum => {
        const email = docum.data().email;
        const password = docum.data().password;
        const id = docum.id;

        // Create List Item
        const userItem = document.createElement("li");
        userItem.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center");
        userItem.innerText = email;

        // Create Button Container
        const buttonContainer = document.createElement("div");
        buttonContainer.classList.add("btn-group");

        // Create Accept Icon
        const acceptIcon = document.createElement("button");
        acceptIcon.classList.add("btn", "btn-success", "btn-sm");
        acceptIcon.innerText = "Add To Script";
        acceptIcon.style.marginRight = "5px"; // Optional margin for spacing
        acceptIcon.addEventListener("click", async () => {
            if (index == 0) {
                showAlert('Select Script', 'danger');
            } else {
                console.log(index);
                const docRef = doc(db, "scripts", index.toString()); 
                const docSnap = await getDoc(docRef);
                var users = docSnap.data()['users'];
                if (users.includes(id)) {
                    showAlert('User already have permission to script', 'danger');
                }
                else { 
                    users.push(id);
                    await updateDoc(docRef, { users: users });
                    showAlert('Done!', 'success');
                }
            }
        });

        // Create Delete Icon
        const deleteIcon = document.createElement("button");
        deleteIcon.classList.add("btn", "btn-danger", "btn-sm");
        deleteIcon.innerText = "Delete";
        deleteIcon.addEventListener("click", () => {
            deleteUserFromDatabase(email, password);
        });

        // Append Icons to Button Container
        buttonContainer.appendChild(acceptIcon);
        buttonContainer.appendChild(deleteIcon);

        // Append Button Container to List Item
        userItem.appendChild(buttonContainer);

        // Parent 
        const parent = document.getElementById("list-group");
        parent.appendChild(userItem);
    })
}
GetAllUsers();

async function deleteUserFromDatabase(email, password) {
    try {
        showAlert('Wait', 'warning');
        // Sign in the user
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        await deleteDoc(doc(db, "users", user.uid));
        // Delete the user
        await deleteUser(user);
        // Show success message
        showAlert('User deleted successfully!', 'success');
        // Optional: Sign out after deletion
        await auth.signOut();
        // Optionally, refresh the user list or remove the item from the DOM
        location.reload(); // Simple way to refresh the list
    } catch (error) {
        showAlert(`Error deleting user: ${error.message}`, 'danger');
    }
}


document.getElementById("1").addEventListener('click', function () { 
    index = 1;
    document.getElementById("1").classList.add('script-border');
    document.getElementById("2").classList.remove('script-border');
    document.getElementById("list-group-script-user").innerHTML = '';
    getAvilableUserToScript(1);
});
document.getElementById("2").addEventListener('click', function () {
    index = 2;
    document.getElementById("2").classList.add('script-border');
    document.getElementById("1").classList.remove('script-border');
    document.getElementById("list-group-script-user").innerHTML = '';
    getAvilableUserToScript(2);
});

async function getAvilableUserToScript(id) {
    const docRef = doc(db, "scripts", id.toString());
    const docSnap = await getDoc(docRef);
    var AllUsers = docSnap.data()['users'];
    AllUsers.forEach(async docum => {
        console.log("here");
        const userID = docum;
        console.log(userID);
        const user = doc(db, "users", userID);
        const userData = await getDoc(user);
        // Create List Item
        const userItem = document.createElement("li");
        userItem.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center");
        userItem.innerText = userData.data()['email'];

        // Create Button Container
        const buttonContainer = document.createElement("div");
        buttonContainer.classList.add("btn-group");

        // Create Delete Icon
        const deleteIcon = document.createElement("button");
        deleteIcon.classList.add("btn", "btn-danger", "btn-sm");
        deleteIcon.innerText = "Delete";
        deleteIcon.addEventListener("click", async () => {
            const docRef = doc(db, "scripts", id.toString());
            const docSnap = await getDoc(docRef);
            var users = docSnap.data()['users'];
            let index = users.indexOf(userID);
            users.splice(index, 1);
            await updateDoc(docRef, { users: users });
            document.getElementById("list-group-script-user").innerHTML = '';
            getAvilableUserToScript(id);   
        });
        // Append Icons to Button Container
        buttonContainer.appendChild(deleteIcon);

        // Append Button Container to List Item
        userItem.appendChild(buttonContainer);

        // Parent 
        const parent = document.getElementById("list-group-script-user");
        parent.appendChild(userItem);
    })
}