console.log('javascript file is loaded');
 
const weatherForm = document.querySelector('form');
const search = document.getElementById('search-input');
const messageOne = document.querySelector('#message-one')
const messageTwo = document.querySelector('#message-two')

weatherForm.addEventListener('submit', evt => {
    messageOne.textContent = 'loading';
    messageTwo.textContent = '';
    evt.preventDefault();
    const searchTerm = search.value;
    if (searchTerm){
        retrieveWeather(searchTerm, (err, res) => {
            if (err){
                messageOne.textContent = err;
            } else {
                messageOne.textContent = res.location;
                messageTwo.textContent = res.forecast;
            }
            // const main = document.getElementById('main-content');
            // main.innerHTML += `<div id="result">
            //     <div>${res.location}</div>
            //     <div>${res.address}</div>
            //     <div>${res.forecast}</div>
            // </div>`
        })
    }
})


const retrieveWeather = (search, callback) => {
    fetch(`/weather?address=${search}`).then(res => {
        res.json().then(data => {
            if (data.error) {
                callback(data.error, undefined);
            } else {
                callback(undefined, data)
            }
        })
    })
}