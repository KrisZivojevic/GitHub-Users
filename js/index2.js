const getUsers = async () => {
    try {
        //fetch data
        const url = 'https://api.github.com/users';
        const response = await (await fetch(url)).json();

        let resultsContainer = document.getElementById('results__container');
        response.map(user => {
            // console.log(user);

        })
        

    } catch (err) {
        console.log(err.toString());
    }
}

(() => {
    getUsers();
})()

const getUser = async (value) => {
    try {
        //fetch data
        const url = `https://api.github.com/users/${value}`;
        const response = await (await fetch(url)).json();
        
        const name = response.name ? response.name : 'No Name';
        const username = response.login;
        const repos = response.public_repos ? response.public_repos : '0';
        const avatar = response.avatar_url;
        const company = response.company ? response.company.split(',') : 'No company';
        const biography = response.bio ? response.bio : 'No bio';
        const dateCreated = response.created_at;
        const date = moment(dateCreated).format('D. MMMM YYYY');
        const email = response.email ? response.email : 'No email';
        const location = response.location ? response.location : 'No location';
        const blog = response.blog ? response.blog : 'No Blog';

        const card = `
            <div class="user-card">
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
                <p>23218 Followers</p>
                <p>11 Following</p>
            </div>
            <div class="user-card__body">
                <div>
                    <div class="user-card__media user-card__media--modifier">
                        <img src="./images/company.png">
                            <ul>
                                <li>@chatterbugapp</li>
                                <li>@redwoodjs</li>
                                <li>@preston-werner-ventures</li>
                            </ul>
                    </div>
                    <div class="user-card__media user-card__media--modifier">
                        <img src="./images/bio.png">
                        <p class="empty-content">No Bio</p>
                    </div>
                    <div class="user-card__media user-card__media--modifier">
                        <img src="./images/active.png">
                        <p>Active since 20. October 2007</p>
                    </div>
                </div>

                <div>
                    <div class="user-card__media">
                        <img src="./images/email.png">
                        <p class="empty-content">No Email</p>
                    </div>
                    <div class="user-card__media">
                        <img src="./images/location.png">
                        <p>San Francisco</p>
                    </div>
                    <div class="user-card__media">
                        <img src="./images/blog.png">
                        <p>http://tom.preston-werner.com</p>
                    </div>
                </div>
            </div>
        </div>
        
        `
        
    document.getElementById('results__container').innerHTML = card;


            

            

        

        



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