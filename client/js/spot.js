var id = window.opener.id;
var data = window.opener.data;
var reviewForm = document.querySelector("form");
var selectedSpot;
var reviewSlot = document.getElementById("reviewCards");

window.onload = () => {
  loadNav();
  attachModals();
  getSpots();
  id ? (selectedSpot = sift(id)) : (selectedSpot = data);
  profileDisplay(selectedSpot);
  getReview(selectedSpot._id);
  // for (o = 0; o < selectedSpot.menu.length; o++) {
  //   MenuItemsDisplay(selectedSpot, o);
  // }
};

const sift = id => {
  let spot = [];
  for (x = 0; x < spots.length; x++) {
    if (id == spots[x]._id) {
      spot.push(spots[x]);
    }
  }
  return spot[0];
};

const getReview = spotId => {
  try {
    fetch(`/api/reviews/${spotId}`)
      .then(response => response.json())
      .then(data => {
        reviewSlot.innerHTML = "";
        data.body.map(review => reviewsDisplay(review));
      });
  } catch (error) {
    noReviewsDisplay();
    console.log(error);
  }
};

reviewForm.addEventListener("submit", event => {
  event.preventDefault();
  newTitle = document.getElementById("reviewTitle").value;
  newReview = document.getElementById("extendedReview").value;
  if (newTitle.trim(" ").length != 0 && newReview.trim(" ").length != 0) {
    try {
      var date = new Date();
      fetch("/api/reviews/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          spotId: selectedSpot._id,
          name: user.name,
          title: newTitle,
          review: newReview,
          date: `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`
        })
      }).then(response => {
        if (response.status == 200) {
          reviewSlot.innerHTML = "";
          getReview(selectedSpot._id);
          newName = "";
          newTitle = "";
          newReview = "";
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

var MenuItemsDisplay = (selectedSpot, i) => {
  menuItem = `<div class="sep"></div>
                                    <div class="col-sm-5 text-success">
                                        <h4>${selectedSpot.menu[i].name}</h4>
                                    </div>
                                    <div class="col-sm-5">${selectedSpot.menu[
                                      i
                                    ].price.toLocaleString("en-US", {
                                      style: "currency",
                                      currency: "NGN"
                                    })}</div>`;
  document
    .getElementById("menuItems")
    .insertAdjacentHTML("beforeend", menuItem);
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
          <div>
            <h5 class="card-title">There are currently no reviews for this spot</h5>
          </div>`;

  reviewSlot.insertAdjacentHTML("beforeend", card);
};
