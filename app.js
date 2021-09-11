
function personDetail(fullName, email, pass) {
    this.fullName = fullName;
    this.email = email;
    this.pass = pass;
}
// var teamDetails = {
//     "teamName": "developer", "teamLeader": "sad@sad.com", "teamMembers": ["saad@abc.com"]
// };
function teamDetails(teamName, teamLeader, teamMembers, teamCategory) {
    this.teamName = teamName;
    this.teamLeader = teamLeader;
    this.teamMembers = teamMembers;
    this.teamCategory = teamCategory;

}

function getNamefromEmail(email) {
    var existingUser = JSON.parse(localStorage.getItem('userDetails'));
    for (var user in existingUser) {
        if (existingUser[user].email === email) {
            return existingUser[user].fullName;
        }
        else {
            return "";
        }
    }
}


function addTeam() {
    var teamName = document.getElementById("teamName").value;
    var teamCategory = document.getElementById("teamCategory").value;
    var teamMembers = document.getElementById("teamMembers").value;
    teamMembers = teamMembers.split(',');
    var existingTeam = JSON.parse(localStorage.getItem('teamDetails'));
    for (var user in existingTeam) {
        if (existingTeam[user].teamName === teamName) {
            return alert("Team Name already taken try another");
        }
    }

    if (teamMembers.includes(email)) {
        alert("Leader cannot be in member");
    }
    else {

        const newTeam = new teamDetails(teamName, localStorage.getItem('email'), teamMembers, teamCategory);
        console.log(newTeam);
        var tempTeam = [];//array to maintain all user information in one place
        if (localStorage.getItem('teamDetails') === null) {
            tempTeam.push(newTeam);
            localStorage.setItem('teamDetails', JSON.stringify(tempTeam));

        }
        else {
            var existingTeam = JSON.parse(localStorage.getItem('teamDetails'));
            for (var user in existingTeam) {
                tempTeam.push(existingTeam[user]);
            }
            tempTeam.push(newTeam)
            localStorage.setItem('teamDetails', JSON.stringify(tempTeam));
        }
    }
}
function getTeamNames() {
    email = localStorage.getItem('email');
    var existingTeam = JSON.parse(localStorage.getItem('teamDetails'));
    for (var user in existingTeam) {
        for (var l in existingTeam[user].teamMembers) {
            if (existingTeam[user].teamMembers[l] === email) {
                const newOPT = document.createElement("option");
                newOPT.setAttribute("value", existingTeam[user].teamMembers[l]);
                newOPT.innerText = existingTeam[user].teamName;
                document.getElementById("teamSelect1").appendChild(newOPT);
            }
        }
        if (existingTeam[user].teamLeader === email) {
            const newOPT = document.createElement("option");
            newOPT.setAttribute("value", existingTeam[user].teamName);
            newOPT.innerText = existingTeam[user].teamName;
            document.getElementById("teamSelect").appendChild(newOPT);
        }
    }
}
function openTeamOwnerView() {

}
function LogOut(){
    localStorage.setItem('email',"");
    window.location="login.html"
}
function loggedUser() {
    getTeamNames();
    email = localStorage.getItem('email');
    console.log(email);
    if (localStorage.getItem('email') === null) {
        alert("You must be logged in.")
        window.location = "login.html";
    }
    var existingUser = JSON.parse(localStorage.getItem('userDetails'));
    for (var user in existingUser) {
        if (existingUser[user].email === email) {
            var fullName = existingUser[user].fullName;
        }
    }
    document.getElementById("welcom-user").innerHTML = "Hi " + fullName;
    var existingTeam = JSON.parse(localStorage.getItem('teamDetails'));
    for (var user in existingTeam) {
        if (existingTeam[user].teamLeader === email) {
            document.getElementById("teamOwnNone").style.display = "none";

            const newDiv = document.createElement("div");
            const newHead = document.createElement("h2");
            const newPara = document.createElement("p");
            newPara.innerHTML = existingTeam[user].teamName + "<br>" + existingTeam[user].teamMembers;
            newHead.innerText = existingTeam[user].teamCategory;
            newDiv.appendChild(newHead);
            newDiv.appendChild(newPara);
            document.getElementById("teamOwn").appendChild(newDiv);
        }
        for (var i in existingTeam[user].teamMembers) {
            if (existingTeam[user].teamMembers[i] === email) {
                document.getElementById("teamPartNone").style.display = "none";
                const newDiv = document.createElement("div");
                const newHead = document.createElement("h2");
                const newPara = document.createElement("p");
                newPara.innerHTML = existingTeam[user].teamName + "<br> Members" + existingTeam[user].teamMembers;
                newHead.innerText = existingTeam[user].teamCategory;
                newDiv.appendChild(newHead);
                newDiv.appendChild(newPara);
                document.getElementById("teamPart").appendChild(newDiv);
            }
        }
    }

    // const newDiv = document.createElement("div");
    // const newHead = document.createElement("h2");
    // const newPara = document.createElement("p");
    // newPara.innerText = newTeam.teamMembers;
    // newHead.innerText = newTeam.teamName;
    // newDiv.appendChild(newHead);
    // newDiv.appendChild(newPara);
    // document.getElementById("teamOwn").appendChild(newDiv);
}
function validateUser(email, pass) {
    var existingUser = JSON.parse(localStorage.getItem('userDetails'));
    for (var user in existingUser) {
        if (existingUser[user].email === email && existingUser[user].pass === pass) {
            return true;
        }

    }

    return false;

}
function Login() {
    var email = document.getElementById("email").value;
    var pass = document.getElementById("password").value;
    if (validateUser(email, pass)) {
        localStorage.setItem('email', email);
        window.location = "TeamsHomePage.html";
    }
    else {
        document.getElementById("result").innerHTML = "User Doesn't Exits";
    }
}
function addUser() {
    var tempUser = [];//array to maintain all user information in one place
    if (localStorage.getItem('userDetails') === null) {
        const newUSer = new personDetail(
            document.getElementById("Fname").value,
            document.getElementById("email").value,
            document.getElementById("password").value,
        );
        tempUser.push(newUSer)
        localStorage.setItem('userDetails', JSON.stringify(tempUser));

    }
    else {
        var existingUser = JSON.parse(localStorage.getItem('userDetails'));
        for (var user in existingUser) {
            tempUser.push(existingUser[user]);
        }
        const newUSer = new personDetail(
            document.getElementById("Fname").value,
            document.getElementById("email").value,
            document.getElementById("password").value,
        );
        tempUser.push(newUSer)
        localStorage.setItem('userDetails', JSON.stringify(tempUser));
    }
}
function validateSignUpForm() {
    var existingUser = JSON.parse(localStorage.getItem('userDetails'));
    var email = document.getElementById("email").value;
    var flag = false;
    for (var user in existingUser) {
        if (existingUser[user].email === email) {
            // alert("User Already Exist");
            document.getElementById("userexist").innerHTML = "User Already Exists";
            flag = true;

            break;

        }
        else {
            flag = false;
            document.getElementById("userexist").style.display = "none";
        }
    }
    console.log(flag);
    if (flag) {
        return true;
    }
    else {
        return false;
    }
    // if(flag){
    //     alert("User Already Exist");
    // }
    // else{
    //     addUser();
    // }

}

function addUserFinal() {
    if (validateSignUpForm() === false) {
        addUser();
        window.location = "success.html";
    }
    else {
        alert("User Already Exist");
    }
}
