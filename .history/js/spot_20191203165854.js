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
    spotCard.insertAdjacentHTML("beforeend", profile);
};
var MenuItemsDisplay = selectedSpot => {
    menuItem = ``
    spotCard.insertAdjacentHTML("beforeend", menuItem);
};
var ratingsDisplay = selectedSpot => {
    rat
    spotCard.insertAdjacentHTML("beforeend", card);
};

