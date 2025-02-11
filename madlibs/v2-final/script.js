(function () {
    "use strict";
    console.log("reading js");

    const form = document.getElementById("form-all");
    const outputContainer = document.querySelector(".output-container");
    const formContainer = document.getElementById("form-all");
    const playAgainBtn = document.getElementById("play-again");
    

    form.addEventListener("submit", function (event) {
        event.preventDefault();
    
        const animal = document.querySelector("#animal").value;
        const emotion = document.querySelector("#emotion").value;
        const place = document.querySelector("#place").value;
        const food = document.querySelector("#food").value;
        const verb = document.querySelector("#verb").value;
        const activity = document.querySelector("#activity").value;
        const object = document.querySelector("#object").value;
        const action = document.querySelector("#action").value;
    
        if (animal === "") {
            const error = document.createElement("div");
            error.textContent = "Please fill out this field";
            document.querySelector("#animal").classList.add("error");
        } else if (emotion === "") {
            const error = document.createElement("div");
            error.textContent = "Please fill out this field";
            document.querySelector("#emotion").classList.add("error");
        } else if (place === "") {
            const error = document.createElement("div");
            error.textContent = "Please fill out this field";
            document.querySelector("#place").classList.add("error");
        } else if (food === "") {
            const error = document.createElement("div");
            error.textContent = "Please fill out this field";
            document.querySelector("#food").classList.add("error");
        } else if (verb === "") {
            const error = document.createElement("div");
            error.textContent = "Please fill out this field";
            document.querySelector("#verb").classList.add("error");
        } else if (activity === "") {
            const error = document.createElement("div");
            error.textContent = "Please fill out this field";
            document.querySelector("#activity").classList.add("error");
        } else if (object === "") {
            const error = document.createElement("div");
            error.textContent = "Please fill out this field";
            document.querySelector("#object").classList.add("error");
        } else if (action === "") {  
            const error = document.createElement("div");
            error.textContent = "Please fill out this field";
            document.querySelector("#action").classList.add("error");
        } else {
    
            // generate the story
            document.querySelector("#animal-output").textContent = animal;
            document.querySelector("#animal-output2").textContent = animal;
            document.querySelector("#animal-output3").textContent = animal;
            document.querySelector("#animal-output4").textContent = animal;
            document.querySelector("#animal-output5").textContent = animal;
            document.querySelector("#emotion-output").textContent = emotion;
            document.querySelector("#place-output").textContent = place;
            document.querySelector("#place-output2").textContent = place;
            document.querySelector("#food-output").textContent = food;
            document.querySelector("#verb-output").textContent = verb;
            document.querySelector("#activity-output").textContent = activity;
            document.querySelector("#object-output").textContent = object;
            document.querySelector("#action-output").textContent = action;
    
            // hide form and show output
            formContainer.style.display = "none";
            outputContainer.style.display = "block";

            // change the image
            document.getElementById('pet-image').src = 'images/pet-2.png';
        }
    });
    
    // play again
    playAgainBtn.addEventListener("click", function () {
        formContainer.style.display = "block";
        outputContainer.style.display = "none";
        form.reset();

        // change the image back to the original
        document.getElementById('pet-image').src = 'images/pet.png';
    });
})(); 