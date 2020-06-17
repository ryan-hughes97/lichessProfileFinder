// Search Input
const searchUser = document.getElementById('search-user');
const searchBtn = document.getElementById('search-btn');
const errorAlert = document.getElementById('error-alert')

// Search Input Event Listener 
// searchUser.addEventListener('keyup', getUser);
searchBtn.addEventListener('click', getUser);


async function getUser() {
  if(searchUser.value === '') {
    errorAlert.style.display = 'block';
    errorAlert.innerHTML = 'Please enter a valid username';

    setTimeout(() => {
      errorAlert.style.display = 'none';
    },3000);
  }
  // console.log(searchUser.value);
  fetch(`https://lichess.org/api/user/${searchUser.value}`)
    .then(res => res.json())
    .then(function(data) {
      if(this.status === 404) {
        console.log("error");
      }
      console.log(data);
      let output = '';
      output += `
      <h2 class="player-stats">${searchUser.value}'s Stats</h2>
      <div class="stat-container">
        <div><p class="title stat-item">Title: ${data.title}</p></div>
        <div><p class="followers stat-item">Followers: ${data.nbFollowers}</p></div>
        <div><p class="following stat-item">Following: ${data.nbFollowing}</p></div>
        <div><p class="wins stat-item">Wins: ${data.count.win}</p></div>
        <div><p class="draws stat-item">Draws: ${data.count.draw}</p></div>
        <div><p class="losses stat-item">Losses: ${data.count.loss}</p></div>
        <div><p class="bullet stat-item">Bullet Rating: ${data.perfs.bullet.rating}</p></div>
        <div><p class="blitz stat-item">Blitz Rating: ${data.perfs.blitz.rating}</p></div>
        <div><p class="rapid stat-item">Rapid Rating: ${data.perfs.rapid.rating}</p></div>
      </div>
      `;
      document.getElementById('profile').innerHTML = output;
    })
    .catch(error => {
      console.error('There has been a problem with your fetch operation:', error);
      if(error) {
        errorAlert.style.display = 'block';
        errorAlert.innerHTML = 'Please enter a valid username';

        setTimeout(() => {
          errorAlert.style.display = 'none';
        },3000);
      }
    });
}