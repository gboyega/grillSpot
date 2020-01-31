let loc;
let grub;


const form = document.querySelector("form");
form.addEventListener("submit", event => {
    loc = document.getElementById("locationSelect").value;
    grub = document.getElementById("grubSelect").value;
    console.log(loc, grub);
  // submit event detected
  event.preventDefault();
});

const sort = (loc, grub)=>{
  let results = [];
  if(loc != 'Location' | grub != 'Looking for'){
    for (i=0; i<spots.length; i++){
    
  }
  }
  
}
