/*
link for read (https://stackoverflow.com/questions/31974582/difference-between-document-getelementbyid-and-document-getelementsbyclassname)
Difference between document.getElementById and document.getElementsByClassName:

Because getElementsByClassName returns an array-like object of all child elements which have all of the given class names.

getElementById returns a single DOM element whose ID matches your query. getElementsByClassName returns an HtmlCollection - an array-like structure containing the DOM elements that matched your query. 
You have to iterate through each element in the array to apply your style.
*/

// const container=document.getElementsByClassName('container');
// console.log(container);

//We use here querySelector instead 
// which scans whole Html Document and return the first element which matches the class or Id.
// querySelectorAll returns all elements which matches class or Id in the form of array.Returns NodeList.
const container = document.querySelector('.container');
//const seat=document.getElementsByClassName('seat'); also works like same as below but it returns HtmlCollection List.
const seats = document.querySelectorAll('.row .seat:not(.occupied)'); // .row for eliminating legend seats & :not(.occupied) for eliminating occupied seats
const count = document.getElementById('count');
const total = document.getElementById('total');
const selectedMovie = document.getElementById('movie');
let ticketPrice = +selectedMovie.value; // + converts strings to numeric data type, its let because it will change when movie is changed.
console.log(container);
console.log(seats);
console.log(total,count);
console.log(ticketPrice);

// Get data from local storage and populate UI so after refreshing page the movie which is selected earlier will remain
populateUI();

// Event listeners details: https://www.w3schools.com/js/js_htmldom_eventlistener.asp

container.addEventListener('click', e => /* function(e){} instead of this, we use arrow function because we r using ES6 which is new format of JS */
{   // Arrow Functions details: https://www.w3schools.com/react/react_es6_arrow.asp

    console.log(e)
    console.log(e.target); // e represents event parameter through which we can access builtin functions of event
    // .target returns the element on which Event (click) is happening.
    
    /* We cannot use className here because we cannot deselect the seat after selecting it in 2nd click

    if (e.target.className == 'seat') {
        console.log('success');
        e.target.className = 'seat selected';   
    }
    if (e.target.className == 'seat selected' ) {
        console.log('success');
        e.target.className = 'seat';
    }

    Here we use classList which returns list of class names of element e.g: ['seat', 'occupied', value: 'seat occupied']
    while className returns string of element's class e.g.: 'seat selected'
    Link to read: https://www.w3schools.com/jsref/prop_element_classlist.asp
    */
    console.log(e.target.className);
    console.log(e.target.classList);

    /* .contains & .toggle are the methods of classList. 
       .contains returns true or false after checking element's class list contain the class or not */ 
   if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
       e.target.classList.toggle('selected'); // .toggle adds & removes class 
      //unlike .add which only adds class so we have to remove it again for deselecting seat in another if condition  
      
      updateSeatsAndPrice(); //calling function to update selected seats and total ticket price
    }})
    // List of Events (HTML DOM EVENTS) for Event handlers: https://www.w3schools.com/jsref/dom_obj_event.asp
    //Another link: https://www.khanacademy.org/computing/computer-programming/html-css-js/html-js-dom-events/a/dom-event-types
    
    selectedMovie.addEventListener('change',e => {  // for monitoring any change in movie selection.
        ticketPrice = +selectedMovie.value; //updates ticket price if movie is changed
        console.log(ticketPrice);
        updateSeatsAndPrice(); //updates toal ticket price if change in movie is occured after selection of seats.
        setMovieData(e.target.selectedIndex,e.target.value);
    })

    function updateSeatsAndPrice() {
        const seatSelected = document.querySelectorAll('.row .seat.selected'); // for scanning total no. of selected seats
        count.innerText = seatSelected.length; 
        total.innerText = seatSelected.length * ticketPrice; // Calculating total ticket price for total no. of seats
      
        // For storing actual position of selected seats in an array. i.e. seatIndex
        console.log(seatSelected);
        const check = [...seatSelected] // just for learning things, we have made an array b/c seatSelected it self is a NodeList.
        console.log([...seats]); // here the seats array have now selected seats also.
        console.log([...seats].indexOf(check[0])); // indexOf returns actual index of 1st(can change it by giving indexValue to check) selectedSeat in whole cinema seats. 
        const seatIndex = [...seatSelected].map(function(x){
            console.log([...seats].indexOf(x));
            return [...seats].indexOf(x);
        });
        /* If we write above map function in arrow function for ES6, Arrow Functions details: https://www.w3schools.com/react/react_es6_arrow.asp
        const seatIndex = [...seatSelected].map( x => [...seats].indexOf(x)) ; */

        console.log(seatIndex);
        // we will store these selected seats index i.e. seatIndex in local storage of browser so we can reuse it later after refreshing the page
        // local storage returns object as Key,value
        localStorage.setItem('selectedSeats',JSON.stringify(seatIndex)); // here seatIndex is an array we canot save array in local storage, so Convert a JavaScript array/object into a string with JSON.stringify().https://www.w3schools.com/js/js_json_stringify.asp.
        // When sending/receiving data to a web server, the data has to be a string.

        /* Following is the description of some above used things
            ... = The JavaScript spread operator (...) allows us to quickly copy all or part of an existing array 
            or object into another array or object. https://www.w3schools.com/react/react_es6_spread.asp

            .map() = JavaScript Array map(), creates a new array from calling a function for every array element.
                    Calls a function once for each element in an array. https://www.w3schools.com/jsref/jsref_map.asp
            
            .indexOf() = JavaScript Array indexOf(),method returns the first index (position) of a specified value.
                        method returns -1 if the value is not found. https://www.w3schools.com/jsref/jsref_indexof_array.asp
        */
    }

     // For storing movie data in local storage 
    function setMovieData (movieIndex,price){
        localStorage.setItem('selectedMovieIndex',movieIndex);
        localStorage.setItem('ticketPrice',price)
    }

    function populateUI (){
        const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats')); // When using the JSON.parse() on a JSON derived from an array, the method will return a JavaScript array, instead of a JavaScript object.
        if (selectedSeats !== null && selectedSeats.length > 0 ) { // for checking selectedSeats is not empty in local storage
            seats.forEach((item,index) => {
                if (selectedSeats.indexOf(index) != -1 /* or > -1 */ ) //because indexOf returns -1 if it doesnot matches
                    item.classList.add('selected');
                    updateSeatsAndPrice();
                })
        }
        const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
        if (selectedMovieIndex != null) {
            selectedMovie.selectedIndex = selectedMovieIndex;
            ticketPrice = +localStorage.getItem('ticketPrice');
            updateSeatsAndPrice();
        }
        
        
    }