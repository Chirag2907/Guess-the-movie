import React from 'react'
import './GetMovie.css'
let movieLower = '';
let movieWithDash = '';
const getData = async () => {
    const randomPage = Math.floor(Math.random() * 500) + 1;
    const randomNumber = Math.floor(Math.random() * 19) + 1;
    let popularity = 0;
    while(popularity < 50) {
        const response = await fetch('https://api.themoviedb.org/3/movie/popular?api_key=961eac3266854d93b722e893e6485014&language=en-US&page='+randomPage);
        const data = await response.json();
        popularity = data.results[randomNumber].popularity;
        const add = document.getElementsByClassName('movie');
        let movie = data.results[randomNumber].title;
        movieLower = movie.toLowerCase();
        movieWithDash = movieLower.replace(/[qwrtypsdfghjklzxcvbnm]/g, '-');
        if(movieWithDash.indexOf('-') === -1) {
            getData();
        }
        console.log(movieLower);
        add[0].innerHTML = movieWithDash;
        break;
    }
    const win = document.getElementsByClassName('win');
    win[0].innerHTML = 'Number of attempts left: '+5;
    attempts = 5;
    let at = document.getElementsByClassName('attempts');
    let arr = [];
    mySet1.forEach(Element => { arr.push(Element) });
    at[0].innerHTML = 'Wrong Attempts: ' + arr;
}

let attempts = 5;
let mySet1 = new Set();

const checker = (e) => {
    if(e.key === 'Enter') {
        console.log(mySet1);
        let char = e.target.value;
        let win = document.getElementsByClassName('win');
        let flag = 0;
        for(let i=0; i<movieLower.length; i++) {
            if(char[0]===movieLower[i]) {
                movieWithDash = movieWithDash.substring(0, i) + char[0] + movieWithDash.substring(i+1);
                flag = 1;
            }
        }
        if(flag===0) {
            mySet1.add(char[0]);
            attempts--;
        }
        if(attempts===0) {
            const add = document.getElementsByClassName('movie');
            win[0].innerHTML = 'You lost!';
            e.target.value = '';
            movieWithDash = movieLower;
            mySet1.clear();
            add[0].innerHTML = movieWithDash;
            setTimeout(()=>getData(), 1000);
            attempts = 5;
            
        }
        else{
            win[0].innerHTML = 'Number of attempts left: '+attempts;
            let at = document.getElementsByClassName('attempts');
            let arr = [];
            mySet1.forEach(Element => { arr.push(Element) });
            at[0].innerHTML = 'Wrong Attempts: '+ arr;
            e.target.value = '';
            const add = document.getElementsByClassName('movie');
            add[0].innerHTML = movieWithDash;
            if(movieWithDash === movieLower) {
                win[0].innerHTML = 'You Win!';
                mySet1.clear();
                setTimeout(()=>getData(), 1500);
                attempts = 5;
                e.target.value = '';
            }
        }
    }
 }

 
 const GetMovie = () => {
     React.useEffect(() => {
        setTimeout(()=>getData(), 0);
      });
     return (
         <div>
        <p className='movie'></p>
        <p className='win'></p>
        <p className='attempts'></p>
        <input placeholder='Enter guess here' className='input' type='text' onKeyDown={checker} />
        <br/>
    </div>
  )
}

export default GetMovie

