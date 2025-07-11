const HEADER = "https://fsa-puppy-bowl.herokuapp.com/api/2505-FTB-CT-WEB-PT";
const NAME = "JasielC";
const API = HEADER + NAME;

const $app = document.querySelector("#app");

// State Variables
let playerArr = [];
let selectedPlayer;
let teamArr = [];

//-------------------------------------------------------------------------------------------------------------
// API FUNCTIONS

// Gets all the players data stored in the API and updates the variable "playerArr"
const GetAllPlayers = async () => {
  try {
    const response = await fetch(API + "/players");
    const result = await response.json();
    playerArr = result.data.players;
  } catch (error) {
    console.error(error.message);
  }
};

/*Adds a new player to the API and then re-renders the page*/
const AddPlayer = async (name, breed, imageUrl) => {
  const newPlayer = {
    name: name,
    breed: breed,
    imageUrl: imageUrl,
  };

  try {
    const response = await fetch(API + "/players", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPlayer),
    });
    await GetAllPlayers();
    Render();
  } catch (error) {
    console.error(error.message);
  }
};

//Removes player from API given ID and re-renders the page
const RemovePlayer = async (id) => {
  try {
    const response = await fetch(API + "/players/" + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    selectedPlayer = null;
    await GetAllPlayers();
    Render();
  } catch (error) {
    console.error(error.message);
  }
};

// Gets player object from the API given the ID and updates selectedPlayer variable and then re-renders page
const GetPlayer = async (id) => {
  try {
    const response = await fetch(API + "/players/" + id);
    const result = await response.json();
    selectedPlayer = result.data.player;
    Render();
  } catch (error) {
    console.error(error.message);
  }
};

//Gets teams from API and updates the "teamArr" variable and returns a team name given the team id and player id
const GetTeams = async () => {
  try {
    const response = await fetch(API + "/teams");
    const result = await response.json();
    teamArr = result.data.teams;
  } catch (error) {
    console.error(error.message);
  }
};

//--------------------------------------------------------------------------------------------------
//COMPONENT FUNCTIONS



//Returns the a Team name given the team id, Its used it the player details component
const GetTeam = (teamId) => {
  for (let team of teamArr) {
    if (team.id === teamId) return team.name;
  }
  return "Unassigned";
};

//This function returns the Player Details Elemtent
const PlayerDetailsComponent = () => {
  if (!selectedPlayer) {
    const $p = document.createElement("p");
    $p.textContent = "Select a player to learn more.";
    return $p;
  } else {
    const $player = document.createElement("section");
    $player.innerHTML = `
        <img src=${selectedPlayer.imageUrl} alt=${selectedPlayer.name} width="200" height="300">
        <h3>Name: ${selectedPlayer.name}</h3>
        <h3>ID: ${selectedPlayer.id}</h3>
        <h3>Status: ${selectedPlayer.status}</h3>
        <h3>Breed: ${selectedPlayer.breed}</h3>
        <h3>Team: ${GetTeam(selectedPlayer.teamId)}</h3>
        <button type="button" id="delete">Remove From Roster</button>
        `;

    const $delete = $player.querySelector("#delete");
    $delete.addEventListener("click", () => RemovePlayer(selectedPlayer.id));

    return $player;
  }
};

//This function returns the Player List Element
const PlayerListComponent = () => {
  const $list = document.createElement("ul");

  for (let player of playerArr) {
    const $player = document.createElement("li");
    $player.innerHTML = `
        <a href="#selected">
        <img src=${player.imageUrl} alt=${player.name} width="100" height="150">
        ${player.name}
        </a>
        `;
    $list.append($player);

    //This eventlistener updates the SelectedPlayer variable and then re-renders the page
    $player.addEventListener("click", () => GetPlayer(player.id));
  }
  return $list;
};

//Gets called after a state variable has been changed. Also Renders the initial page elements
const Render = () => {
  $app.innerHTML = `
    <h1>Puppy Bowl</h1>
    <main>
     <section>
      <h2>Players List</h2>
      <PlayersList></PlayersList>
     </section>
     <section>
      <h2>Player Details</h2>
      <SelectedPlayer></SelectedPlayer>
     </section>
     <section>
      <h2>Invite A Puppy</h2>
      <InvitePuppy></InvitePuppy>
     </section>
    </main>
    `;

  $app.querySelector("PlayersList").replaceWith(PlayerListComponent());
  $app.querySelector("SelectedPlayer").replaceWith(PlayerDetailsComponent());
  $app.querySelector("InvitePuppy").replaceWith();
};

const Run = async () => {
  await GetAllPlayers();
  await GetTeams();
  Render();
};

Run();
