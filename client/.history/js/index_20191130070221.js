// let data = spots;
let loc = document.getElementById('locationSelect').value;
let grub = document.getElementById('grubSelect').value;
let btn = document.getElementById('search');


const form = document.querySelector("form");
form.addEventListener("submit", event => {
    
    console.log(loc, grub);
  // submit event detected
  event.preventDefault();
});

btn.onclick()
// sort data with search terms
const sort = () => {

}