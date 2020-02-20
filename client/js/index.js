var loc;
var grub;
var howTo = document.getElementById("findGrubs");
var title = document.getElementById("searchTitle");
var spotCard = document.getElementById("spotCards");
const form = document.getElementById("selectForm");
var id;
var data;

window.onload = () => {
  loadPage();
  attachModals();
};

form.addEventListener("submit", event => {
  loc = document.getElementById("locationSelect").value;
  grub = document.getElementById("grubSelect").value;
  if (loc != "" || grub != "Looking for") {
    if (loc != "" && grub === "Looking for") {
      title.innerHTML = `<h3 class="text-success text-center">${loc}</h3>`;
    } else if (loc === "" && grub != "Looking for") {
      title.innerHTML = `<h3 class="text-success text-center">${grub}</h3>`;
    } else {
      title.innerHTML = `<h3 class="text-success text-center">${grub} in ${loc}</h3>`;
    }
    sortedSpot = [];
    sortedSpot = sort(loc, grub);
    howTo.innerHTML = "";
    spotCard.innerHTML = "";
    if(sortedSpot.length < 1){
      spotCard.innerHTML =
        `<div class="justify-content-center"><h5>No result found for ${grub} in ${loc}</h5></div>`;
    }else{
      sortedSpot.map(spot => displaySearchResults(spot));
    }
    
  } else {
    alert(
      "Please select a food to see all spots that serve that food, or select a location to see all spots in that location"
    );
  }
  event.preventDefault();
});


const sift = id => {
  let spot = [];
  for (x = 0; x < spots.length; x++) {
    if (id == spots[x]._id) {
      spot.push(spots[x]);
    }
  }
  return spot[0];
};

const reply_click = spotInfo => {
  if (event) {
    getSpots();
    sessionStorage.setItem(
      "selectedSpot",
      JSON.stringify(sift(event.target.id))
    );
    window.open("./html/spot.html", "_self");
  } else {
    sessionStorage.setItem("selectedSpot", JSON.stringify(spotInfo));
    window.open("./html/spot.html", "_self");
  }
};

const loadPage = () => {
  loadNav();
  getSpots();
  var sortedSpot = spots
    .sort(() => {
      return Math.random() - Math.random();
    })
    .slice(0, 3);
  sortedSpot.map(spot => displaySearchResults(spot));
};

const sort = (loc, grub) => {
  let results = [];
  for (i = 0; i < spots.length; i++) {
    if (loc === "Location") {
      if (spots[i].category.toUpperCase() === grub.toUpperCase()) {
        results.push(spots[i]);
      }
    } else if (grub === "Looking for") {
      if (spots[i].location.toUpperCase() === loc.toUpperCase()) {
        results.push(spots[i]);
      }
    } else {
      if (
        spots[i].location.toUpperCase() === loc.toUpperCase() &&
        spots[i].category.toUpperCase() === grub.toUpperCase()
      ) {
        results.push(spots[i]);
      }
    }
  }

  return results;
};

const displaySearchResults = spot => {
  var details = JSON.stringify(spot);
  card = ` <div class ="col-sm-4 mb-5" >
            <div class="card h-100" >
                    <img src="${spot.image}"
                        class="card-img-top" alt="${spot.category}" style="max-height:200px;">
                    <div class="card-body">
                        <h5 class='text-center'><a class="card-title text-success" id="${spot._id}" onClick="reply_click()">${spot.name}</a></h5>
                        <p class="card-text text-muted">${spot.address}</p>
                        <p class="card-text">${spot.location}</p>
                    </div>
                    <div class="card-footer">
                          <span class="badge badge-success text-dark">${spot.location}</span>
                          <span class="badge badge-dark text-success">${spot.category}</span>
                    </div>
                </div>
                </div>`;
  spotCard.insertAdjacentHTML("beforeend", card);
};
