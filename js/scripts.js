/**
 * Treerhouse FSJS Techdegree
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
 * Cards can be clicked to reveal additional user info: phone, full address (with street, ZIP) and birthday
 */


const peopleUrl = 'https://randomuser.me/api/?nat=us&results=12';
const peopleDiv = document.getElementById('gallery');

//Call to fetch, passing it the url of the data source (Random User API)
//fetch will return a Promise and a Response object containing status code/message
//parse Response data to JSON using .then
//response.json will read the response and return a Promise that resolves to JSON
//Once the Promise is resolved, the Promise (response data results) can be stored in the variable 'profiles'
//console.log (profiles) ---> an array of 12 employee objects
//Call function to generate HTML 
//add catch() method for errors (check status code of request)


fetch(peopleUrl)
    .then( response => response.json() )
    .then(data => {
    let profiles = data.results;
    console.log(profiles);
    generateHTML(profiles);
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
    </div>`

    gallery.insertAdjacentHTML('beforeend', staffMember)
    })
};



