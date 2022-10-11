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
            resultsMore.src = '../next.png';
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
    } catch (err) {
        console.log(err.toString());
    }
}

(() => {
    getUsers();
})()


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