const getUsers = async () => {
    try {
        document.getElementById('username').value = '';
        const url = 'https://api.github.com/users';
        const response = await (await fetch(url)).json();

        let resultsContainer = document.getElementById('results__container');
        resultsContainer.innerHTML = '';

        const resultsLabel = document.querySelector('p.results__title');

        if (resultsLabel) {
            resultsLabel.remove();
        }
        response.forEach(user => {

            const avatar = user.avatar_url;
            const username = user.login;
            const userTemplate = `
                <div class="results__card">
                    <img class="results__img" alt="avatar" src="${avatar}" width="64px" height="64px">
                    <p class="results__username">${username}</p>
                    <img class="results__btn-more" onclick="getUser('${username}')" alt="see more" src="./images/next.svg" width="40px" height="40px">
                </div>
            `;

            resultsContainer.insertAdjacentHTML('beforeend', userTemplate);
        })



    } catch (err) {
        console.log(err.toString());
    }
}

(() => {
    getUsers();
})()


const formatCompanies = (companiesString) => {
    let strToArr = companiesString.split(',');
    return strToArr.map(company => `<li>${company.trim()}</li>`).join('');
}

const getUser = async (value) => {
    try {

        const url = `https://api.github.com/users/${value}`;
        const response = await (await fetch(url)).json();
        const resultsContainer = document.getElementById('results__container');

        if (response.message == 'Not Found') {
            resultsContainer.insertAdjacentHTML('afterbegin', '<p>User not found</p>');
        } else {
            const name = response.name ? response.name : 'No Name';
            const username = response.login;
            const repos = response.public_repos ? response.public_repos : '0';
            const avatar = response.avatar_url;
            const followers = response.followers ? response.followers : '0';
            const following = response.following ? response.following : '0';
            const companies = response.company ? formatCompanies(response.company) : '<p class="empty-content">No Company</p>';
            const biography = response.bio ? `<p>${response.bio}</p>` : '<p class="empty-content">No Bio</p>';
            const dateCreated = response.created_at;
            const date = moment(dateCreated).format('D. MMMM YYYY');
            const email = response.email ? `<p>${response.email}</p>` : '<p class="empty-content">No Email</p>';
            const location = response.location ? `<p>${response.location}</p>` : '<p class="empty-content">No Location</p>';
            const blog = response.blog ? `<p>${response.blog}</p>` : '<p class="empty-content">No Blog</p>';

            const card = `
                <div class="user-card">
                    
                    <img src="./images/x_icon.svg" alt="" class="user-card__exit" id="exit" onclick="getUsers()">
                    
                    <div class="user-card__header">
                        <img class="user-card__img" alt="profile image" src="${avatar}">
                        <div class="user-card__info">
                            <p class="user-card__name">${name}</p>
                            <p class="user-card__username">${username}</p>
                            <div class="user-card__repositories">
                            <span class="user-card__public-repos">Number of repositories</span>
                            <p class="user-card__public-repos-num">${repos}</p>
                        </div>
                    </div>
                </div>
                <div class="user-card__follow">
                    <p>${followers} Followers</p>
                    <p>${following} Following</p>
                </div>
                <div class="user-card__body">
                    <div>
                        <div class="user-card__media user-card__media--modifier">
                            <img src="./images/company.svg">
                                <ul>
                                    ${companies}
                                </ul>
                        </div>
                        <div class="user-card__media user-card__media--modifier">
                            <img src="./images/bio.svg">
                            ${biography}
                        </div>
                        <div class="user-card__media user-card__media--modifier">
                            <img src="./images/active.svg">
                            <p>Active since ${date}</p>
                        </div>
                    </div>

                    <div>
                        <div class="user-card__media">
                            <img src="./images/email.svg">
                            ${email}
                        </div>
                        <div class="user-card__media">
                            <img src="./images/location.svg">
                            ${location}
                        </div>
                        <div class="user-card__media">
                            <img src="./images/blog.svg">
                            ${blog}
                            </div>
                        </div>
                    </div>
                </div>
            `;
            const resultsLabel = document.querySelector('p.results__title');

            if (!resultsLabel) {
                resultsContainer.insertAdjacentHTML('beforebegin', '<p class="results__title">Results:</p>');
            }

            resultsContainer.innerHTML = '';

            resultsContainer.insertAdjacentHTML('afterbegin', card);
        }
    } catch (err) {
        console.log(err.toString());
    }
}

const searchBtn = document.querySelector('#search');
const refreshBtn = document.getElementById('refresh');
const username = document.getElementById('username');

const onSearch = () => {
    let resultsContainer = document.getElementById('results__container');

    if (username.value == '') {
        resultsContainer.innerHTML = '';
        getUsers();
    } else {
        resultsContainer.innerHTML = '';
        getUser(username.value);
    }
}

username.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        onSearch();
    }
});


searchBtn.addEventListener('click', onSearch);
refreshBtn.addEventListener('click', getUsers);