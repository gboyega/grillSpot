var id = window.opener.id;
var selectedSpot;

window.onload = () => {
  console.log(id);
};

const sift = id => {
  for (x = 0; x < spots; x++) {
    if (spots[x].uId === id) {
      selectedSpot.push(spots[x]);
    };
  }
};

var profileDisplay = selectedSpot => {
    profile = ``
    spotCard.insertAdjacentHTML("beforeend", card);
};
var MenuItemsDisplay = selectedSpot => {

    spotCard.insertAdjacentHTML("beforeend", card);
};
var ratingsDisplay = selectedSpot => {

    spotCard.insertAdjacentHTML("beforeend", card);
};

