var spots;
var user;
var navbar = document.getElementById("nav");
var login = document.getElementById("loginButton");
signUp = document.getElementById("signUpButton");

const getSpots = () => {
  try {
    fetch("/api/spots")
      .then(response => response.json())
      .then(data => sessionStorage.setItem("spots", JSON.stringify(data.body)));
  } catch (error) {
    console.log(error);
  }

  spots = JSON.parse(sessionStorage.getItem("spots"));
};

const loadNav = () => {
  user = getUser();
  if (user == null || undefined) {
    displayNavbarLogIn();
  } else {
    displayNavbarLoggedIn(user);
  }
};

const getFormData = formId => {
  var kvpairs = [];
  var form = document.getElementById(formId);
  for (var i = 0; i < form.elements.length; i++) {
    var e = form.elements[i];
    kvpairs.push(encodeURIComponent(e.value));
  }
  return kvpairs;
};

signUp.addEventListener("click", event => {
  try {
    var [name, email, password] = getFormData("signUpForm");
    name = name.replace("%20", " ");
    email = email.replace("%40", "@");
    fetch("/api/users/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password })
    })
      .then(response => {
        if (response.status == 201) {
          return response.json();
        } else {
          alert(
            "An account already exists with this email address. Log in to continue"
          );
          $("#logIn").modal("show");
        }
      })
      .then(data => {
        console.log(data);
        alert("signup Successful, login to continue ");
        $("#logIn").modal("show");
      });
  } catch (error) {
    alert("Signup failed. Please try again");
    console.log(error);
  }
  event.preventDefault();
});

login.addEventListener("click", event => {
  try {
    var [email, password] = getFormData("loginForm");
    email = email.replace("%40", "@");
    fetch("/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    })
      .then(response => {
        if (response.status == 200) {
          return response.json();
        } else {
          alert("incorrect email or password, please check and try again");
        }
      })
      .then(data => {
        sessionStorage.setItem("user", JSON.stringify(data.body));
        loadNav();
      });
  } catch (error) {
    alert("Error! please try again");
    console.log(error);
  }
  event.preventDefault();
});

const getUser = () => JSON.parse(sessionStorage.getItem("user"));

const displayNavbarLogIn = () => {
  card = ` <a class="navbar-brand" href="../client/index.html"><img
                src="https://res.cloudinary.com/gboyega/image/upload/v1574848771/grillspot/LogoMakr_7e9Jxn_a6oa1d.png"
                height="30" alt="logo"></a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02"
            aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul class="navbar-nav mr-auto mt-2 mt-lg-0">

            </ul>
            <div class="form-inline my-2 my-lg-0">

                <button class="btn btn-outline-dark my-2 my-sm-0" data-toggle="modal" data-target="#login">Log
                    In</button>
            </div>
        </div>`;
  navbar.innerHTML = " ";
  navbar.insertAdjacentHTML("beforeend", card);
};

const displayNavbarLoggedIn = user => {
  card = `  <a class="navbar-brand" href="../client/index.html"><img
                src="https://res.cloudinary.com/gboyega/image/upload/v1574848771/grillspot/LogoMakr_7e9Jxn_a6oa1d.png"
                height="30" alt="logo"></a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggler"
            aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarToggler">
            <ul class="navbar-nav ml-auto mt-2 mt-lg-0 justify-content-end">
            <li><h5 class="mr-sm-3 mt-sm-2">${user.name}</h5></li>
            <li><button class="btn btn-outline-dark my-2 my-sm-0 mr-sm-2" data-toggle="modal" data-target="#addSpot">Add
                    Spot</button></li>
            <li><button class="btn btn-outline-dark my-2 my-sm-0" id="logOut">Log Out</button></li>
            </ul>
        </div>`;
  navbar.innerHTML = " ";
  navbar.insertAdjacentHTML("beforeend", card);
};

document.addEventListener("click", e => {
  if (e.target && e.target.id == "logOut") {
    sessionStorage.removeItem("user");
    loadNav();
    e.preventDefault();
  }
});
