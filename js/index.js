const getUsers = async () => {
    try {
        //fetch data
        const url = 'https://api.github.com/users';
        const response = await (await fetch(url)).json();

        let resultsContainer = document.getElementById('results__container');
        response.map(user => {
            let resultsCard = document.createElement('div');
            resultsCard.classList.add('results__card');
            resultsContainer.append(resultsCard);

            let resultsImg = document.createElement('img');
            resultsImg.src = user.avatar_url;
            resultsImg.setAttribute("alt","avatar");
            resultsImg.classList.add('results__img');
            resultsCard.append(resultsImg);

            let resultsUsername = document.createElement('p');
            resultsUsername.classList.add('results__username');
            resultsUsername.textContent = user.login;
            resultsCard.append(resultsUsername);

            let resultsMore = document.createElement('img');
            resultsMore.src = './images/next.png';
            resultsMore.classList.add('results__btn-more');
            resultsMore.setAttribute('onclick', `getUser('${user.login}')`);


            resultsCard.append(resultsMore);

        })
        

    } catch (err) {
        console.log(err.toString());
    }
}


const getUser = async (username) => {
    try {
        //fetch data
        const url = `https://api.github.com/users/${username}`;
        const response = await (await fetch(url)).json();
        console.log(response);
        let resultsContainer = document.getElementById('results__container');
        resultsContainer.innerHTML = '';

        console.log(response);

        if (!response.login) {
            resultsContainer.innerHTML = '<p>No results.</p>';
        } else {
            //Zapis koji lici na React

            let userCard = document.createElement('div')
            userCard.classList.add('user-card');
            resultsContainer.append(userCard);

            let userHeader = document.createElement('div');
            userHeader.classList.add('user-card__header');
            userCard.append(userHeader);

            let userImg = document.createElement('img');
            userImg.src = response.avatar_url;
            userImg.classList.add('user-card__img');
            userImg.setAttribute('alt', 'profile image');
            userHeader.append(userImg);

            let userInfo = document.createElement('div');
            userInfo.classList.add('user-card__info');
            userHeader.append(userInfo);

            let userName = document.createElement('p');
            userName.textContent = response.name;
            userName.classList.add('user-card__name');
            userInfo.append(userName);

            let login = document.createElement('p');
            login.textContent = response.login;
            login.classList.add('user-card__login');
            userInfo.append(login);

            let repositoriesDiv = document.createElement('div');
            repositoriesDiv.classList.add('user-card__repositories');
            userInfo.append(repositoriesDiv);

            let repositories = document.createElement('span');
            repositories.classList.add('user-card__public-repos');
            repositories.textContent = 'Number of repositories';
            repositoriesDiv.append(repositories);

            let repositoriesNum = document.createElement('p');
            repositoriesNum.classList.add('user-card__public-repos-num');
            repositoriesNum.textContent = response.public_repos;
            repositoriesDiv.append(repositoriesNum);

            let followDiv = document.createElement('div');
            followDiv.classList.add('user-card__follow');
            userCard.append(followDiv);

            let followers = document.createElement('p');
            followers.textContent = `${response.followers} Followers`;
            followDiv.append(followers);

            let following = document.createElement('p');
            following.textContent = `${response.following} Following`;
            followDiv.append(following);

            

            

        }

        



        // Kraci nacin za isto ako bi se pisao cist JS
        // resultsContainer.innerHTML = `
        // <div class="user-card">
        //     <div class="user-card__header">
        //         <img class="user-card__img" alt="profile image" src="${response.avatar_url}">
        //         <div class="user-card__info">
        //             <p class="user-card__name">${response.name}</p>
        //             <p class="user-card__login">${response.login}</p>
        //         </div>
        //     </div>
        // </div> 
        // `;







    } catch (err) {
        console.log(err.toString());
    }
}

(() => {
    getUsers();
})()

const searchBtn = document.querySelector('#search');
const onSearch = () => {
    console.log('click');
    const username = document.getElementById('username');
    console.log(username.value);
    let resultsContainer = document.getElementById('results__container');
    
    if (username.value == '') {
        resultsContainer.innerHTML = '';
        getUsers();
    } else {
        //pretraga pojedinacnog korisnika
        resultsContainer.innerHTML = '';
        getUser(username.value);
    }
    

}
searchBtn.addEventListener('click', onSearch);


/*<div class="results__card">
    <img class="results__img" alt="avatar" src="/avatar.png" width="64px" height="64px">
    <p class="results__username">Username</p>
    <img class="results__btn-more" alt="see more" src="/next.png" width="40px" height="40px">
</div>*/

//Kada kliknem na see more ikonicu, treba da pozovem fju getUser i prosledim username datog korisnika.
//Zatim to treba da me odvede na podatke o jednom useru.
//Kada u search ne ukucam nista, i kliknem na search ikonicu, treba da se vrati lista svih usera.
//kada u search ukucam postojeci username, ponovo se poziva fja getUser i isti izgled se prikazuje.
//ako u search ukucam nesto sto ne postoji, ispisuje se 'No results'.