var spots;
var user;
var navbar = document.getElementById("nav");

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

document.addEventListener("click", e => {
  if (e.target && e.target.id == "signUpButton") {
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
  }
  e.preventDefault();
});

document.addEventListener("click", e => {
  if (e.target && e.target.id == "loginButton") {
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
  }
  event.preventDefault();
});

const attachModals = () => {
  attachAddSpotModal();
  attachLoginModal();
  attachSignUpModal();
};

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

const attachSignUpModal = () => {
  card = `  <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title text-center" id="signUpTitle">Sign-Up</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form id="signUpForm">
                        <div class="form-group">
                            <label for="Name">Name</label>
                            <input type="text" class="form-control" id="userName" aria-describedby="name"
                                placeholder="Your First and Last name" required name="userName">
                        </div>

                        <div class="form-group">
                            <label for="Email">Email address</label>
                            <input type="email" class="form-control" id="userEmail" aria-describedby="email"
                                placeholder="Enter your email address" name="userEmail">
                        </div>

                        <div class="form-group">
                            <label for="Password">Password</label>
                            <input type="password" placeholder="at least 8 characters" class="form-control"
                                id="signUpPassword" name="signUpPassword">
                        </div>

                        <div class="form-group form-check">
                            <input type="checkbox" class="form-check-input" id="t&cCheck" required>
                            <label class="form-check-label" for="t&cCheck">I agree to all Terms and
                                privacy
                                policy</label>
                        </div>

                    </form>
                </div>
                <div class="modal-footer">
                    <p class="text-center">Already have an acount? <a class="text-success" data-toggle="modal"
                            data-target="#login" data-dismiss="modal">Log in</a></p> <button type="submit"
                        class="btn btn-success text-dark" id="signUpButton" data-dismiss="modal">Sign Up</button>

                </div>
            </div>
        </div>`;
  document.getElementById("signUp").innerHTML = " ";
  document.getElementById("signUp").insertAdjacentHTML("beforeend", card);
};

const attachLoginModal = () => {
  card = `  <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title text-center" id="loginTitle">Login</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form id="loginForm">

                        <div class="form-group">
                            <label for="Email">Email address</label>
                            <input type="email" class="form-control" id="loginEmail" aria-describedby="email"
                                placeholder="Enter your email address" name="email">
                        </div>

                        <div class="form-group">
                            <label for="Password">Password</label>
                            <input type="password" class="form-control" id="loginPassword" name="password">
                        </div>


                    </form>
                </div>
                <div class="modal-footer">
                    <p class="text-center">Don't have an account? <a class="text-success" data-toggle="modal"
                            data-target="#signUp" data-dismiss="modal">Sign-Up</a></p><button type="submit"
                        class="btn btn-success text-dark align-center" id="loginButton" data-dismiss="modal">login</button>

                </div>
            </div>
        </div>`;
  document.getElementById("login").innerHTML = " ";
  document.getElementById("login").insertAdjacentHTML("beforeend", card);
};

const attachAddSpotModal = () => {
  card = `  <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title text-center" id="addSpotTitle">Add Spot</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form id="imageForm">
                        <div class="form-group">
                            <label for="imageFile">Spot Image</label>
                            <input type="file" class="form-control-file" id="imageFile" name="image">
                        </div>
                    </form>

                    <form id="addSpotForm">
                        <div class="form-group">
                            <label for="Name">Name</label>
                            <input type="text" class="form-control" id="spotName" aria-describedby="name"
                                placeholder="Spot name" required name="name">
                        </div>

                        <div class="form-group">
                            <label for="location">Location</label>
                            <input type="text" class="form-control" id="spotLocation" aria-describedby="location"
                                placeholder="Spot location" required name="location">
                            <small id="locationHelp" class="form-text text-muted">Local government or town.</small>
                        </div>

                        <div class="form-group">
                            <label for="operator">Owner/Operator</label>
                            <input type="text" class="form-control" id="operator" aria-describedby="operator"
                                placeholder="Spot operator" required name="operator">
                        </div>

                        <div class="form-group">
                            <label for="address">Address</label>
                            <input type="text" class="form-control" id="address" aria-describedby="address"
                                placeholder="Spot address" required name="address">
                        </div>

                        <div class="form-group">
                            <label for="phone">Phone No.</label>
                            <input type="text" class="form-control" id="phone" aria-describedby="phone"
                                placeholder="Spot contact phone" required name="phone">
                        </div>

                        <div class="form-group">
                            <label for="Email">Email address</label>
                            <input type="email" class="form-control" id="spotEmail" aria-describedby="email"
                                placeholder="Enter spot email address or NA" name="email" required>
                        </div>

                        <div class="form-group">
                            <label for="website">Web address</label>
                            <input type="text" class="form-control" id="website" aria-describedby="website"
                                placeholder="Enter spot website address or NA" name="website">
                        </div>

                        <div class="form-group">
                            <label for="category">Known for</label>
                            <select class="form-control" id="category" name="category">
                                <option>Asun</option>
                                <option>Suya</option>
                            </select>
                        </div>

                        <div class="form-group form-check">
                            <input type="checkbox" class="form-check-input" id="spotT&cCheck" required>
                            <label class="form-check-label" for="t&cCheck">I agree to all Terms and
                                privacy
                                policy</label>
                        </div>

                        <button type="submit" class="btn btn-success text-dark" data-dismiss="modal"
                            id="addSpotButton" data-dismiss="modal">Add</button>
                    </form>
                </div>
            </div>
        </div>`;
  document.getElementById("addSpot").innerHTML = " ";
  document.getElementById("addSpot").insertAdjacentHTML("beforeend", card);
};

document.addEventListener("click", e => {
  if (e.target && e.target.id == "logOut") {
    sessionStorage.removeItem("user");
    loadNav();
    e.preventDefault();
  }
});
