const APIURL = "https://api.github.com/users/";
const form = document.getElementById("form");
const search = document.getElementById("search-user");
const main = document.getElementById("loaded-data");
getUser("github");
async function getUser(user) {
  const resp = await fetch(APIURL + user);
  const respData = await resp.json();
  createUserCard(respData);
  getRepositories(user);
}
async function getRepositories(user) {
  const resp = await fetch(APIURL + user + "/repos");
  const respData = await resp.json();

  addReposToCard(respData);
}
function createUserCard(user) {
  const cardHtml = `
<div class="git-body">
    <div class="github">
          <div class="github-profile">
            <img
              src="${user.avatar_url}"
              alt="${user.avatar_url}"
              git
              class="github-profile-image"
            />
            <h3 class="githubprofile-name"> ${user.name}</h3>
          </div>
        </div>
        <div class="githubuser-details">
          <p class="githubprofile-bio">
            <b>Bio:</b> ${user.bio}
          </p>
          <p class="githubprofile-company">
            <b>Company:</b> ${user.company}
          </p>
          <p class='githubprofile-company'><b>followers:</b> ${user.followers}</>
          <p class='githubprofile-company'><b>following:</b> ${user.following}</>
        </div>

        <div class="github-repos">
          <p class="github-public-repos"><b> Repositories: </b> ${user.public_repos}</p>
          <ul  id="Github-repositories">

          </ul>
        </div>
        </div>
        `;
  main.innerHTML = cardHtml;
}
function addReposToCard(repos) {
  const repositoriesEL = document.getElementById("Github-repositories");
  repos.forEach((repo) => {
    const reposEl = document.createElement("li");
    const reposLink = document.createElement("a");
    reposLink.href = repo.html_url;
    reposLink.target = "_blank";
    reposLink.innerText = repo.name;
    reposEl.appendChild(reposLink);

    repositoriesEL.appendChild(reposEl);
  });
}
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const user = search.value;
  if (user) {
    getUser(user);
    search.value = "";
  }
});
