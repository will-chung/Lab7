// script.js

import { router } from './router.js'; // Router imported so you can use it to manipulate your SPA app here
const setState = router.setState;

// Make sure you register your service worker here too

let state;

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
          router.setState(state);
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
  }
  router.setState(state);
});

settings.addEventListener('click', () => {
  console.log('settings clicked');
  state = {
    className: 'settings',
    url: '/#settings',
  }
  router.setState(state);
});