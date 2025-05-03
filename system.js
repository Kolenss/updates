let scoreA = 0;
let scoreB = 0;

let pendingPoints = null;
let pendingTeam = null;

const plusButtons = document.querySelectorAll(".plus-btn");
const add1Buttons = document.querySelectorAll(".add1");
const add2Buttons = document.querySelectorAll(".add2");
const add3Buttons = document.querySelectorAll(".add3");
const minusButtons = document.querySelectorAll(".minus-btn");


function updateScore(team, points) {
    if (team === "A") {
      scoreA = Math.max(0, scoreA + points);
      document.getElementById("scoreA").textContent = scoreA;
    } else {
      scoreB = Math.max(0, scoreB + points);
      document.getElementById("scoreB").textContent = scoreB;
    }
}
function enablePlayerSelection(team, points) {
    pendingPoints = points;
    pendingTeam = team;

    const players = document.querySelectorAll(
    team === "A" ? ".left-player" : ".right-player"
    );

    players.forEach(player => {
    player.classList.add("selectable");
    player.addEventListener("click", handlePlayerSelect);
    });
}
    
function handlePlayerSelect(e) {
    const playerCard = e.currentTarget;
    const scoreSpan = playerCard.querySelector(".player-score span");
    const currentScore = parseInt(scoreSpan.textContent);
    scoreSpan.textContent = currentScore + pendingPoints;

    document.querySelectorAll(".selectable").forEach(player => {
    player.classList.remove("selectable");
    player.removeEventListener("click", handlePlayerSelect);
    });

    updateScore(pendingTeam, pendingPoints);

    pendingPoints = null;
    pendingTeam = null;
}




plusButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const wrapper = btn.parentElement;
    const options = wrapper.querySelector(".point-options");
    options.classList.toggle("hidden");
  });
});

add1Buttons.forEach(btn => {
    btn.addEventListener("click", () => {
        const team = btn.getAttribute("data-team");
        enablePlayerSelection(team, 1);
        btn.parentElement.classList.add("hidden");
    });
});


add2Buttons.forEach(btn => {
    btn.addEventListener("click", () => {
        const team = btn.getAttribute("data-team");
        enablePlayerSelection(team, 2);
        btn.parentElement.classList.add("hidden");
    });
});

add3Buttons.forEach(btn => {
    btn.addEventListener("click", () => {
        const team = btn.getAttribute("data-team");
        enablePlayerSelection(team, 3);
        btn.parentElement.classList.add("hidden");
    });
});


minusButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        const team = btn.getAttribute("data-team");
        updateScore(team, -1);
    });
});


  