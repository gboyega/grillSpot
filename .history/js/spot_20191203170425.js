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
    profile = ` <p><img src="https://res.cloudinary.com/gboyega/image/upload/v1574855485/grillspot/asun-4_gcz2ji.jpg"
                                    alt="Asun" style="max-height: 40vh; max-width: 100%;"></p>
                            <div class="sep"></div>
                            <h4 class="card-title">${selectedSpot}</h5>
                                <div class="sep"></div>
                                <p class="card-text"><span class=" text-success text-start">Address:</span> <span
                                        class="text-end">15 Caulcrick drive, Lekki phase 1, Lagos.</span> </p>
                                <div class="sep"></div>
                                <p class="card-text"><span class=" text-success text-start">Owner/Operator:</span> <span
                                        class="text-end">Adamu Danladi</span> </p>
                                <div class="sep"></div>
                                <p class="card-text"><span class=" text-success text-start">Phone:</span> <span
                                        class="text-end">07034548594</span> </p>
                                <div class="sep"></div>
                                <p class="card-text"><span class=" text-success text-start">E-mail</span>:</span> <span
                                        class="text-end">a.danladi@gmail.com</span> </p>
                                <div class="sep"></div>
                                <p class="card-text"><span class=" text-success text-start">Website</span>:</span> <span
                                        class="text-end">http://aspot.com</span> </p>
                                <div class="sep"></div>`;
    spotCard.insertAdjacentHTML("beforeend", profile);
};
var MenuItemsDisplay = (selectedSpot, i) => {
    menuItem = ``
    spotCard.insertAdjacentHTML("beforeend", menuItem);
};
var reviewsDisplay = (selectedSpot, i) => {
    review = ``
    spotCard.insertAdjacentHTML("beforeend", review);
};

