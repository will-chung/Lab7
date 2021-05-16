// script.js

import { router } from './router.js'; // Router imported so you can use it to manipulate your SPA app here
const setState = router.setState;

let state;

// Make sure you register your service worker here too
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('./sw.js').then(function(registration) {
      // Registration was successful
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, function(err) {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
    });

    state = {
      className: '',
      url: '/',
    };
    setState(state); 
  });
} else {
  console.log('serviceWorker not available');
}

document.addEventListener('DOMContentLoaded', () => {
  fetch('https://cse110lab6.herokuapp.com/entries')
    .then(response => response.json())
    .then(entries => {
      entries.forEach(entry => {
        let newPost = document.createElement('journal-entry');
        newPost.entry = entry;
        
        newPost.addEventListener('click', (event) => {
          let entries = event.target.parentElement.children;
          let entryNumber;
          for (let i = 0; i < entries.length; i++) {
            if (entries.item(i) == event.target)
              entryNumber = i + 1;
          }
          console.log(`journal entry ${entryNumber} clicked`);
          state = {
            className: 'single-entry',
            url: '/#entry' + entryNumber,
            entryNumber: entryNumber,
            entry: event.target.entry,
          };
          setState(state);
        });
        
        document.querySelector('main').appendChild(newPost);
      });
    });
});

let title = document.querySelector('header > h1');
let settings = document.querySelector('header > img');

title.addEventListener('click', () => {
  console.log('title clicked');
  state = {
    className: '',
    url: '/',
  };
  setState(state);
});

settings.addEventListener('click', () => {
  console.log('settings clicked');
  state = {
    className: 'settings',
    url: '/#settings',
  };
  setState(state);
});

// window.addEventListener('load', () => {
//   state = {
//     className: '',
//     url: '/',
//   };
//   setState(state);
// })

window.addEventListener('popstate', (event) => {
  console.log('back button pressed');
  setState(event.state, true);
});