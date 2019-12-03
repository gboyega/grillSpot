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
var MenuItemsDisplay = (selectedSpot, i) => {
    menuItem = ``
    spotCard.insertAdjacentHTML("beforeend", menuItem);
};
var reviewsDisplay = (selectedSpot, i => {
    review = ``
    spotCard.insertAdjacentHTML("beforeend", review);
};

