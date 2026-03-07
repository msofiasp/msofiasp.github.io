function scrollToOverview(){

document.getElementById("overview").scrollIntoView({
behavior:"smooth"
})

}

document.addEventListener("DOMContentLoaded", function () {

const counters = document.querySelectorAll(".counter");
let started = false;

function runCounters(){

if(started) return;

const section = document.querySelector("#data");
const sectionTop = section.getBoundingClientRect().top;

if(sectionTop < window.innerHeight - 100){

started = true;

counters.forEach(counter => {

const target = +counter.getAttribute("data-target");
let count = 0;

const duration = 1500;
const stepTime = 10;
const steps = duration / stepTime;
const increment = target / steps;

const update = () => {

count += increment;

if(count < target){

counter.innerText = Math.floor(count).toLocaleString();
setTimeout(update, stepTime);

}else{

counter.innerText = target.toLocaleString();

}

};

update();

});

}

}

window.addEventListener("scroll", runCounters);

});

function showDataset(num){

document.getElementById("dataset1").style.display="none";
document.getElementById("dataset2").style.display="none";

document.getElementById("dataset"+num).style.display="block";

}
