let loc;
let grub;
let data = Spo

const form = document.querySelector("form");
form.addEventListener("submit", event => {
  loc = document.getElementById("locationSelect").value;
  grub = document.getElementById("grubSelect").value;
  if (loc != "Location" || grub != "Looking for") {
    console.log(loc, grub, data);
    window.location.pathname = "../html/index.html";
  } else {
     window.alert(
    "Please select a food to see all spots that serve that food, or select a location to see all spots in that location"
  );
  }
 

  // submit event detected
  event.preventDefault();
});

const card = document.getElementById("cards");
card.addEventListener("click", ()=>{
  console.log('me');
  window.location.pathname = "../html/spot.html";
})

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
