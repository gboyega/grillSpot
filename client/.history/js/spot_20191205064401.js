var id = window.opener.id;
var selectedSpot;

window.onload = () => {
  selectedSpot = sift(id);
  profileDisplay(selectedSpot);
  for (o = 0; o < selectedSpot.menu.length; o++) {
    MenuItemsDisplay(selectedSpot, o);
  }
  for (u = 0; u < selectedSpot.review.length; u++) {
    reviewsDisplay(selectedSpot, u);
  }

  console.log(selectedSpot);
};

const sift = id => {
  let spot = [];
  for (x = 0; x < spots.length; x++) {
    if (id == spots[x].uId) {
      spot.push(spots[x]);
    }
  }
  return spot[0];
};

form.addEventListener("submit", event => {
  name = document.getElementById("").value;
  title = document.getElementById("grubSelect").value;
  review = document.getElementById("locationSelect").value;
  if (loc != "Location" || grub != "Looking for") {
    if (loc != "Location" && grub === "Looking for") {
      title.innerHTML = `<h3 class="text-success text-center">${loc}</h3>`;
    } else if (loc === "Location" && grub != "Looking for") {
      title.innerHTML = `<h3 class="text-success text-center">${grub}</h3>`;
    } else {
      title.innerHTML = `<h3 class="text-success text-center">${grub} in ${loc}</h3>`;
    }
    sortedSpot = [];
    sortedSpot = sort(loc, grub);
    howTo.innerHTML = "";
    spotCard.innerHTML = "";
    for (i = 0; i < sortedSpot.length; i++) {
      displaySearchResults(sortedSpot, i);
    }
  } else {
    alert(
      "Please select a food to see all spots that serve that food, or select a location to see all spots in that location"
    );
  }
  event.preventDefault();
});

var profileDisplay = selectedSpot => {
  profile = ` <p><img src="${selectedSpot.img}"
                                    alt="${selectedSpot.category}" style="max-height: 40vh; max-width: 100%;"></p>
                            <div class="sep"></div>
                            <h4 class="card-title">${selectedSpot.name}</h5>
                                <div class="sep"></div>
                                <p class="card-text"><span class="text-success text-start">Address</span>:<span
                                        class="text-end">${selectedSpot.address}</span> </p>
                                <div class="sep"></div>
                                <p class="card-text"><span class=" text-success text-start">Owner/Operator</span>:<span
                                        class="text-end">${selectedSpot.Operator}</span> </p>
                                <div class="sep"></div>
                                <p class="card-text"><span class=" text-success text-start">Phone</span>:<span
                                        class="text-end">${selectedSpot.phone}</span> </p>
                                <div class="sep"></div>
                                <p class="card-text"><span class=" text-success text-start">E-mail</span>:<span
                                        class="text-end">${selectedSpot.mail}</span></p>
                                <div class="sep"></div>
                                <p class="card-text"><span class=" text-success text-start">Website</span>:<span
                                        class="text-end">${selectedSpot.web}</span></p>
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
  document.getElementById("menuItems").insertAdjacentHTML("beforeend", menuItem);
};
var reviewsDisplay = (selectedSpot, i) => {
  review = ` <div class="sep"></div>
                                <div class="card mb-3" style="max-width: 90%;">
                                    <div class="row no-gutters">
                                        <div class="col-md-4">
                                            <img src="${selectedSpot.review[i].img}" alt="${selectedSpot.review[i].name}" class="img-thumbnail">
                                        </div>
                                        <div class="col-md-8">
                                            <div class="card-body">
                                                <h5 class="card-title">${selectedSpot.review[i].Title}</h5>
                                                <p class="card-text">${selectedSpot.review[i].review}</p>
                                                <p class="card-text"><small class="text-muted">${selectedSpot.review[i].name}</small></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>`;
  document.getElementById("reviewCards").insertAdjacentHTML("beforeend", review);
};
