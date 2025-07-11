const HEADER = "https://fsa-puppy-bowl.herokuapp.com/api/2505-FTB-CT-WEB-PT";
const NAME = "JasielC";
const API = HEADER + NAME;

const $app = document.querySelector("#app");

// State Variables
let playerArr = [];
let teamArr = [];
let SelectedPlayer;

//-------------------------------------------------------------------------------------------------------------
// API FUNCTIONS

/* Gets all the players data stored in the API and updates the variable "playerArr"
and then re-renders the page*/
const GetAllPlayers = async () => {
  try {
    const response = await fetch(API + "/players");
    const result = await response.json();
    playerArr = result.data.players;
    Render();
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
    Render();
  } catch (error) {
    console.error(error.message);
  }
};

// Gets player from the API given ID and returns the player data in an object, Used for Player Details section
const GetPlayer = async (id) => {
  try {
    const response = await fetch(API + "/players/" + id);
    const result = await response.json();
    return result.data.player;
  } catch (error) {
    console.error(error.message);
  }
};

//Gets teams from API and updates the "teamArr" variable
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

    $app.querySelector("PlayersList").replaceWith();
    $app.querySelector("SelectedPlayer").replaceWith();
    $app.querySelector("InvitePuppy").replaceWith();
};

Render();