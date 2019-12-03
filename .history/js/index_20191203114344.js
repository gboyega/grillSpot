const onLoadSpot = spots.sort(() => { return (Math.random() - Math.random()) }).slice(0,3)
var loc;
var grub;
var sortedSpot;
var howTo = document.getElementById("findGrubs");
var title = document.getElementById("searchTitle");
var spotCard = document.getElementById("spotCards");
const form = document.querySelector("form");
var clickedSpot;

window.onload = () => {
 for (i = 0; i < onLoadSpot.length; i++) {
   displaySearchResults(onLoadSpot, i);
 }
};


form.addEventListener("submit", event => {
  loc = document.getElementById("locationSelect").value;
  grub = document.getElementById("grubSelect").value;
  if (loc != "Location" || grub != "Looking for") {
    if (loc != "Location" && grub === "Looking for") {
      title.innerHTML = `<h3 class="text-success text-center">${loc}</h3>`;
    } else if (loc === "Location" && grub != "Looking for") {
      title.innerHTML = `<h3 class="text-success text-center">${grub}</h3>`;
    } else {
      title.innerHTML = `<h3 class="text-success text-center">${grub} in ${loc}</h3>`;
    }
    sortedSpot = sort(loc, grub);
    howTo.innerHTML='';
    spotCard.innerHTML='';
    for (i=0; i<sortedSpot.length; i++){
      displaySearchResults(sortedSpot, i);
    }
    
    //
  } else {
    alert(
      "Please select a food to see all spots that serve that food, or select a location to see all spots in that location"
    );
  }
  event.preventDefault();
});

function reply_click() {
  console.log(event.target);
}


// spotCard.addEventListener("click", () => {
//   console.log(this.value);
//   // window.location.pathname = "../html/spot.html";
// });

const sort = (loc, grub) => {
  let results = [];
  for (i = 0; i < spots.length; i++) {
    if (loc === "Location") {
      if (spots[i].category === grub) {
        results.push(spots[i]);
      }
    } else if (grub === "Looking for") {
      if (spots[i].location === loc) {
        results.push(spots[i]);
      }
    } else {
      if (spots[i].location === loc && spots[i].category === grub) {
        results.push(spots[i]);
      }
    }
  }

  return results;
};

const displaySearchResults = (sortedSpot, i) => {
  let spot = sortedSpot[i];
  card = ` <div class ="col-sm-4 mb-5" >
            <div class="card cardHover h-100" id="${spot.uId}" onClick="reply_click()">
                    <img src="${spot.img}"
                        class="card-img-top" alt="${spot.category}">
                    <div class="card-body">
                        <a class="card-title text-center text-success">${spot.name}</h>
                        <p class="card-text text-muted">${spot.address}</p>
                        <p class="card-text">${spot.location}</p>
                        <p class="card-text">
                            <span class="badge badge-success text-dark">${spot.location}</span>
                            <span class="badge badge-dark text-success">${spot.category}</span>
                        </p>
                    </div>
                    <div class="card-footer">
                        <small class="text-muted">${spot.review.length} reviews</small>
                    </div>
                </div>
                </div>`;
  spotCard.insertAdjacentHTML("beforeend", card);
};
