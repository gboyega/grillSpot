var id = window.opener.id;
var selectedSpot;

window.onload = () => {
  console.log(id);
};

const sift = id => {
  for (x = 0; x < spots; x++) {
    if (spots[x].uId === id) {
      selectedSpot.push(spots[x]);
    }
  }
};

var profileDisplay = selectedSpot => {
  profile = ` <p><img src="https://res.cloudinary.com/gboyega/image/upload/v1574855485/grillspot/asun-4_gcz2ji.jpg"
                                    alt="Asun" style="max-height: 40vh; max-width: 100%;"></p>
                            <div class="sep"></div>
                            <h4 class="card-title">${selectedSpot.name}</h5>
                                <div class="sep"></div>
                                <p class="card-text">${selectedSpot.address}<span class=" text-success text-start">Address:</span> <span
                                        class="text-end"></span> </p>
                                <div class="sep"></div>
                                <p class="card-text"><span class=" text-success text-start">Owner/Operator:</span> <span
                                        class="text-end">${selectedSpot.Operator}</span> </p>
                                <div class="sep"></div>
                                <p class="card-text"><span class=" text-success text-start">Phone:</span> <span
                                        class="text-end">${selectedSpot.phone}</span> </p>
                                <div class="sep"></div>
                                <p class="card-text"><span class=" text-success text-start">E-mail</span>:</span> <span
                                        class="text-end">${selectedSpot.mail}</span> </p>
                                <div class="sep"></div>
                                <p class="card-text"><span class=" text-success text-start">Website</span>:</span> <span
                                        class="text-end">${selectedSpot.web}</span> </p>
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
    .getElementById("menuItems").insertAdjacentHTML("beforeend", menuItem);
};
var reviewsDisplay = (selectedSpot, i) => {
  review = ` <div class="sep"></div>
                                <div class="card mb-3" style="max-width: 90%;">
                                    <div class="row no-gutters">
                                        <div class="col-md-4">
                                            <img src="${selectedSpot.review[i].img}" alt="..." class="img-thumbnail">
                                        </div>
                                        <div class="col-md-8">
                                            <div class="card-body">
                                                <h5 class="card-title">${selectedSpot.review[i].Title}</h5>
                                                <p class="card-text">${selectedSpot.review[i].review}</p>
                                                <p class="card-text"><small class="text-muted">${selectedSpot.review[i].im}</small></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>`;
  spotCard.insertAdjacentHTML("beforeend", review);
};
