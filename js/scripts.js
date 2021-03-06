/**
 * Treehouse FSJS Techdegree
 * Project 5 - Public API Requests
 * Tamika Hayes
 * April 28, 2021
 * scripts.js
 */

"use strict";

//console.log("hello from the console!");

/**
 * Requests data from the open-source Random User Generator API 
 * Displays 12 random users as employee cards in a 4 X 3 grid
 * Each employee card contains user photo, first and last name, email address, city, state
 * Cards can be clicked to reveal additional user info: phone, full address (with street, ZIP code) and birthday
 */


const peopleUrl = 'https://randomuser.me/api/?exc=login&nat=us&results=12';
const peopleDiv = document.querySelector('gallery');
let modal = "";

/**
 * Version of fetch request with catch for HTTP errors
 */

// function handleErrors(response) {
//     if (!response.ok) throw new Error (response.error);
//     return response;
// }

// fetch(peopleUrl)
//     .then( response => response.json() )
//     .then(handleErrors)
//     .then(data => {
//     let profiles = data.results;
//     console.log(profiles);
//     generateHTML(profiles);
//     userClick(profiles);
//     })
//     .catch(error => {
//         gallery.insertAdjacentHTML('beforeEnd', 'Something went wrong. Please try again later.');
//     });

fetch(peopleUrl)
    .then( response => response.json() )
    .then(data => {
    let profiles = data.results;
    //console.log(profiles);
    generateHTML(profiles);
    userClick(profiles);
    })

/**
 * Generates HTML for each employee card by mapping over profiles array; inserts cards in gallery div
 * @param   {array}     arr - array of employee objects
 */
function generateHTML(arr) {
    arr.map(staffMember => {
        staffMember =
        `<div class="card">
        <div class="card-img-container">
            <img class="card-img" src=${staffMember.picture.large} alt="profile picture">
        </div>
        <div class="card-info-container">
            <h3 id="name" class="card-name cap">${staffMember.name.first} ${staffMember.name.last}</h3>
            <p class="card-text">${staffMember.email}</p>
            <p class="card-text cap">${staffMember.location.city}, ${staffMember.location.state}</p>
        </div>
    </div>`;

    gallery.insertAdjacentHTML('beforeend', staffMember);
    })

};

/**
 * Generates a modal with additional contact information when user clicks employee card
 * @param   {object}    person - individual employee object at arr[i]
 */
function generateModal(person) {
    modal = 
    `<div class="modal-container">
    <div class="modal">
        <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
        <div class="modal-info-container">
            <img class="modal-img" src=${person.picture.large} alt="profile picture">
            <h3 id="name" class="modal-name cap">${person.name.first} ${person.name.last}</h3>
            <p class="modal-text">${person.email}</p>
            <p class="modal-text cap">${person.location.city}</p>
            <hr>
            <p class="modal-text">${person.phone}</p>
            <p class="modal-text">${person.location.street.number} ${person.location.street.name}., ${person.location.city}, ${person.location.state} ${person.location.postcode}</p>
            <p class="modal-text">Birthday: ${person.dob.date.slice(5,7)}/${person.dob.date.slice(8,10)}/${person.dob.date.slice(0,4)}</p>
        </div>
    </div>`;

    //console.log(modal);
    gallery.insertAdjacentHTML('beforeend', modal);

}

/**
 * Closes modal when user clicks the "close button" in the modal's upper right corner
 * @param   {array}     arr - array of employee objects
 */

function closeModal(arr) {
    const modalElement = document.querySelector('.modal-container');
    const closeButton = document.querySelector('.modal-close-btn');
    //console.log(closeButton);
    closeButton.addEventListener('click', (e) => {
        //console.log('Clicked!');
        modalElement.remove();
    });
}


/**
 * Selects all HTML elements with the class .card and adds a click event listener
 * @param   {array}     arr - array of employee objects
 */
function userClick(arr) {
    const card = document.querySelectorAll('.card');
    for (let i = 0; i < arr.length; i++) {
        card[i].addEventListener('click', (e) => {
            //console.log(e.target);
            //console.log('Clicked!');
            generateModal(arr[i]);
            closeModal(arr[i]);
        });
    }
};






