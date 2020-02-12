var id = window.opener.id;
var reviewForm = document.querySelector("form");
var selectedSpot;
var reviewSlot = document.getElementById("reviewCards")


window.onload = () => {
  loadNav();
  attachModals();
  getSpots();
  console.log(id,spots);
  selectedSpot = sift(id);
  profileDisplay(selectedSpot);
  for (o = 0; o < selectedSpot.menu.length; o++) {
    MenuItemsDisplay(selectedSpot, o);
  }
  for (u = 0; u < selectedSpot.review.length; u++) {
    reviewsDisplay(selectedSpot, u);
  }
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



reviewForm.addEventListener("submit", event => {
  newName = document.getElementById("name").value;
  newTitle = document.getElementById("reviewTitle").value;
  newReview = document.getElementById("extendedReview").value;
  if (newName.trim(" ").length != 0 && newTitle.trim(" ").length != 0 && newReview.trim(" ").length != 0 ) {
    var newReview = {
      name: newName,
      Title: newTitle,
      review: newReview
    };
    selectedSpot.review.push(newReview);
    reviewSlot.innerHTML = "";
    for (u = 0; u < selectedSpot.review.length; u++) {
      reviewsDisplay(selectedSpot, u);
    }

    // newName = "";
    // newTitle = "";
    // newReview = "";

  } else {
    alert(
      "Please fill all appropriate fields"
    );
  }
  console.log(selectedSpot)
  event.preventDefault();
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
var reviewsDisplay = (selectedSpot, i) => {
  review = ` <div class="sep"></div>
                                <div class="card mb-3" style="max-width: 90%;">
                                    <div class="row no-gutters">
                                        <div class="col-md-8">
                                            <div class="card-body">
                                                <h5 class="card-title">${selectedSpot.review[i].Title}</h5>
                                                <p class="card-text">${selectedSpot.review[i].review}</p>
                                                <p class="card-text"><small class="text-muted">${selectedSpot.review[i].name}</small></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>`;
  
    reviewSlot.insertAdjacentHTML("beforeend", review);
};
