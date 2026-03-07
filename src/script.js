function scrollToOverview(){

document.getElementById("overview").scrollIntoView({
behavior:"smooth"
})

}

document.addEventListener("DOMContentLoaded", () => {

const counters = document.querySelectorAll(".counter");

counters.forEach(counter => {

const target = +counter.getAttribute("data-target");

let count = 0;

const updateCounter = () => {

const increment = target / 100;

if(count < target){

count += increment;

counter.innerText = Math.floor(count);

requestAnimationFrame(updateCounter);

}
else{

counter.innerText = target;

}

};

updateCounter();

});

});
