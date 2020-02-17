var reviewForm = document.querySelector("form");
var reviewSlot = document.getElementById("reviewCards");
var menuSlot = document.getElementById("menuItems");
var selectedSpot = JSON.parse(sessionStorage.getItem("selectedSpot"));

window.onload = () => {
  loadNav();
  attachModals();
  profileDisplay(selectedSpot);
  if (user) {
    getMenu(selectedSpot._id);
    getReview(selectedSpot._id);
  } else {
    NotLoggedIn("menu", "to view menu");
    NotLoggedIn("review", "to view or write review");
  }
  if (user._id || user.id == selectedSpot.ownerId) {
    menuForm();
  }
};

const getReview = spotId => {
  fetch(`/api/reviews/${spotId}`)
    .then(response => {
      if (response.status == 200) {
        return response.json();
      }
    })
    .then(data => {
      if (data) {
        reviewSlot.innerHTML = "";
        data.body.map(review => reviewsDisplay(review));
      } else {
        noReviewsDisplay();
      }
    })
    .catch(error => console.log(error));
};

const getMenu = spotId => {
  fetch(`/api/menu/${spotId}`)
    .then(response => {
      if (response.status == 200) {
        return response.json();
      }
    })
    .then(data => {
      if (data) {
        menuSlot.innerHTML = "";
        data.body.map(menu => MenuItemsDisplay(menu));
      } else {
        noMenuDisplay();
      }
    })
    .catch(error => console.log(error));
};

document.getElementById("reviewForm").addEventListener("submit", event => {
  event.preventDefault();
  newTitle = document.getElementById("reviewTitle").value;
  newReview = document.getElementById("extendedReview").value;
  if (newTitle.trim(" ").length != 0 && newReview.trim(" ").length != 0) {
    try {
      var date = new Date();
      var day = date.getDate();
      if (day.length < 2) {
        day = "0" + day.toString();
      }
      fetch("/api/reviews/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          spotId: selectedSpot._id,
          name: user.name,
          title: newTitle,
          review: newReview,
          date: `${day}-${date.getMonth() + 1}-${date.getFullYear()}`
        })
      }).then(response => {
        if (response.status == 200) {
          getReview(selectedSpot._id);
        } else {
          console.log(response);
          alert("error adding review, Please try again");
        }
      });
    } catch (error) {
      console.log(error);
      alert("server error, Please try again");
    }
  } else {
    alert("Please fill all appropriate fields");
  }
});

var createMenu = () => {
  event.preventDefault();
  var [name, price] = getFormData("addMenu");
  try {
    fetch("/api/menu/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        spotId: selectedSpot._id,
        name,
        price
      })
    }).then(response => {
      if (response.status == 200) {
        getMenu(selectedSpot._id);
      } else {
        console.log(response);
        alert("error adding review, Please try again");
      }
    });
  } catch (error) {
    console.log(error);
    alert("server error, Please try again");
  }
};

var profileDisplay = selectedSpot => {
  profile = ` <p><img src="${selectedSpot.image}"
                                    alt="${
                                      selectedSpot.name
                                    }" style="max-height: 40vh; max-width: 100%;"></p>
                            <div class="sep"></div>
                            <h4 class="card-title">${selectedSpot.name}</h5>
                                <div class="sep"></div>
                                <p class="card-text"><span class="text-success text-start">Address</span>: <span
                                        class="text-end">${selectedSpot.address ||
                                          "N/A"}</span> </p>
                                <div class="sep"></div>
                                <p class="card-text"><span class=" text-success text-start">Owner/Operator</span>: <span
                                        class="text-end">${selectedSpot.operator ||
                                          "N/A"}</span> </p>
                                <div class="sep"></div>
                                <p class="card-text"><span class=" text-success text-start">Phone</span>: <span
                                        class="text-end">${selectedSpot.phone ||
                                          "N/A"}</span> </p>
                                <div class="sep"></div>
                                <p class="card-text"><span class=" text-success text-start">E-mail</span>: <span
                                        class="text-end">${selectedSpot.mail ||
                                          "N/A"}</span></p>
                                <div class="sep"></div>
                                <p class="card-text"><span class=" text-success text-start">Website</span>: <span
                                        class="text-end">${selectedSpot.web ||
                                          "N/A"}</span></p>
                                <div class="sep"></div>`;
  document.getElementById("profile").insertAdjacentHTML("beforeend", profile);
};

var MenuItemsDisplay = menu => {
  // const formatter = new Intl.NumberFormat("en-US", {
  //   style: "currency",
  //   currency: "NGN",
  //   minimumFractionDigits: 2
  // });
  var price = formatter.format(Number(menu.price));
  menuItem = `<div class="sep"></div>
                                    <div class="col-sm-5 text-success">
                                        <h4>${menu.name}</h4>
                                    </div>
                                    <div class="col-sm-5"><span>&#8358;</span> ${menu.price}</div>`;

  menuSlot.insertAdjacentHTML("beforeend", menuItem);
};
var reviewsDisplay = review => {
  review = ` <div class="sep"></div>
                                <div class="card mb-3" style="max-width: 90%;">
                                    <div class="row no-gutters">
                                        <div class="col-md-8">
                                            <div class="card-body">
                                                <h5 class="card-title">${review.title}</h5>
                                                <p class="card-text">${review.review}</p>
                                                <p class="card-text"><small class="text-muted">${review.name}</small><br><small class="text-muted">${review.date}</small></p>
                                            </div>                                            
                                        </div>
                                    </div>
                                </div>`;

  reviewSlot.insertAdjacentHTML("beforeend", review);
};

var noReviewsDisplay = () => {
  card = `<div class="sep"></div>
                                <div class="card mb-3" style="max-width: 90%;">
                                    <div class="row no-gutters">
                                        <div class="col-md-8">
                                            <div class="card-body">
                                                <h5 class="card-title text-center">No reviews available for this spot!</h5>
                                            </div>                                            
                                        </div>
                                    </div>
                                </div>`;

  reviewSlot.insertAdjacentHTML("beforeend", card);
};

var NotLoggedIn = (slotId, text) => {
  text = `<div class="align-middle">
                                <h4 class="text-center"><a href="#"class="text-success" data-toggle="modal" data-target="#login">Login</a></h4>
                                <p class="text-center">${text}</p>
                            </div>`;
  document.getElementById(slotId).innerHTML = "";
  document.getElementById(slotId).insertAdjacentHTML("beforeend", text);
};

var menuForm = () => {
  form = `<form class='form-inline justify-content-center' id="addMenu" onsubmit="createMenu()">
                                        <label class="sr-only" for="foodName">Name</label>
                                        <input type="text" class="form-control mb-2 mr-sm-2" id="foodName"
                                            placeholder="Name">

                                        <label class="sr-only" for="foodPrice">Price</label>
                                        <div class="input-group mb-2 mr-sm-2">
                                            <input type="number" class="form-control" id="foodPrice"
                                                placeholder="price">
                                        </div>

                                        <button type="submit" class="btn btn-success text-dark mb-2">Submit</button>
                                </form>`;
  document.getElementById("menuForm").innerHTML = "";
  document.getElementById("menuForm").insertAdjacentHTML("beforeend", form);
};

var noMenuDisplay = () => {
  card = `<div class="sep"></div>
                                <div class=" col-12 align-center">
                                  <h4>No menu available for this spot!</h5>
                                </div>`;

  menuSlot.insertAdjacentHTML("beforeend", card);
};
