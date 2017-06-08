# vue-rescue-input

If you have ever tried losing your input values because of a random browser refresh or any other incident that was out of your control, you know how frustrating this is for the user experience.
Saving the form values using localstorage has been a known UX enhancement for a long time, I could not find anything that worked for me with Vue JS, which is why I decided to create this directive.

## Getting Started

Install the directive through npm `npm install vue-rescue-input`, import it ` import VueRescue from 'vue-rescue-input'`, then `use` the directive by doing `Vue.use(VueRescue)`.

On your inputs you will now be able to do `<input type="text" v-rescue-input>` - your input will now be saved in localstorage - try to refresh your browser.

You can see a live demo of the directive here:

https://codepen.io/Reached/pen/GEKZVB

### Prerequisites

* npm
* Vue JS 2.*

### Installing

TODO - See the Getting Started section for now

## Authors

- **Casper Sørensen** -

Follow me on Twitter @caspersorensen1

## Acknowledgments

* http://blog.teamtreehouse.com/storing-data-on-the-client-with-localstorage
* https://www.sitepoint.com/community/t/storing-form-data-in-localstorage/176688
* http://html5doctor.com/storing-data-the-simple-html5-way-and-a-few-tricks-you-might-not-have-known/
