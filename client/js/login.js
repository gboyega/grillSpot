var spots;
var user;
var navbar = document.getElementById("nav");
var login = document.getElementById("loginButton");

const getSpots = () => {
  try {
    fetch("/api/spots")
      .then(response => response.json())
      .then(data => localStorage.setItem("spots", JSON.stringify(data.body)));
  } catch (error) {
    console.log(error);
  }

  spots = JSON.parse(localStorage.getItem("spots"));
};


const loadNav = () => user ? displayNavbarLoggedIn(user) : displayNavbarLogIn();

const getFormData = formId => {
  var kvpairs = [];
  var form = document.getElementById(formId);
  for (var i = 0; i < form.elements.length; i++) {
    var e = form.elements[i];
    kvpairs.push(
      encodeURIComponent(e.name) + "=" + encodeURIComponent(e.value)
    );
  }
  var queryString = kvpairs.join(",");
  var query = JSON.parse(JSON.stringify(kvpairs));
  console.log(query);
  return query;
};

login.addEventListener("click", event => {
  try {
    fetch("/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: getFormData("loginForm")
    })
      .then(response => response.json())
      .then(data => {
        alert("Login Successful");
        console.log(data);
      });
  } catch (error) {
    console.log(error);
  }
  console.log();
  event.preventDefault();
});

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
  navbar.insertAdjacentHTML("beforeend", card);
};

const displayNavbarLoggedIn = user => {
  card = `  <a class="navbar-brand" href="../client/index.html"><img
                src="https://res.cloudinary.com/gboyega/image/upload/v1574848771/grillspot/LogoMakr_7e9Jxn_a6oa1d.png"
                height="30" alt="logo"></a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02"
            aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul class="navbar-nav mr-auto mt-2 mt-lg-0"></ul>
            <div class="form-inline my-2 my-lg-0">

                <h5 class="mr-sm-3 mt-sm-2">Adegboyega Jaiyeola</h5>
                <button class="btn btn-outline-dark my-2 my-sm-0 mr-sm-2" data-toggle="modal" data-target="#addSpot">Add
                    Spot</button>

                <button class="btn btn-outline-dark my-2 my-sm-0" id="logOut">Log Out</button>
            </div>
        </div>`;
  navbar.insertAdjacentHTML("beforeend", card);
};
