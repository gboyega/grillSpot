// let data = spots;
let loc;
let gr
let btn = document.getElementById('search');


const form = document.querySelector("form");
form.addEventListener("submit", event => {
    loc = document.getElementById("locationSelect").value;
    grub = document.getElementById("grubSelect").value;
    console.log(loc, grub);
  // submit event detected
  event.preventDefault();
});

btn.onclick()
// sort data with search terms
const sort = () => {

}