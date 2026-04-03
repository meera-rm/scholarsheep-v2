// https://api.multiavatar.com/Starcrasher.png?apikey=YOUR_API_KEY


// let avatarId = 'Binx Bond'
// fetch('https://api.multiavatar.com/Starcrasher.png?apikey=GrEsPOxKkHytdA'
// +JSON.stringify(avatarId))
//   .then(res => res.text())
//   .then(svg => console.log(svg))

// rapidapi
  const axios = require("axios");

const options = {
  method: 'GET',
  url: 'https://doppelme-avatars.p.rapidapi.com/assets/1101/eye',
  headers: {
    'X-RapidAPI-Key': '3d96f61a44mshef59cc06ccf7b17p1fd74ejsn2494fde4f842',
    'X-RapidAPI-Host': 'doppelme-avatars.p.rapidapi.com'
  }
};

axios.request(options).then(function (response) {
	console.log(response.data);
}).catch(function (error) {
	console.error(error);
});

// check this for firebase auth and to make profile pic for user to select
// https://dev.to/earthcomfy/build-authentication-using-firebase-react-express-28ig