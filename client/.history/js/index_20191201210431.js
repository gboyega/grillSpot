var loc;
var grub;
var sortedSpot;
var indexContent = document.getElementById("mainContent");

const form = document.querySelector("form");
form.addEventListener("submit", event => {
  loc = document.getElementById("locationSelect").value;
  grub = document.getElementById("grubSelect").value;
  if (loc != "Location" || grub != "Looking for") {
    if (loc != "Location" && grub === "Looking for") {
    }
    indexContent.innerHTML = `<h3 class="text-success text-center">${grub} in ${loc}</h3>`;
    sortedSpot = sort(loc, grub);
    console.log(loc, grub, sortedSpot, indexContent);
    displaySearchResults(sortedSpot);
    // if (window.location.pathname != "../index.html") {
    //   window.location.pathname = "../index.html";
    // }
  } else {
    window.alert(
      "Please select a food to see all spots that serve that food, or select a location to see all spots in that location"
    );
  }

  event.preventDefault();
});

// const card = document.getElementById("cards");
// card.addEventListener("click", () => {
//   console.log("me");
//   window.location.pathname = "../html/spot.html";
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

const displaySearchResults = sortedSpot => {
  card = "<p>x</p>"
  indexContent.insertAdjacentHTML("beforeend", card);
};
