function setStandings(data) {
    var standingsHTML = " ";
    data.standings.forEach((standing) => {
        standing.table.forEach((teams) => {
            var crestUrl = teams.team.crestUrl;
            crestUrl = crestUrl.replace(/^http:\/\//i, 'https://');
            standingsHTML += `
                        <tr>
                            <td>${teams.position}</td>
                            <td class="team"><a href="team.html?id=${teams.team.id}" class="team-name"><img src="${crestUrl}" class="badge-25"/><span>${teams.team.name}</span></a></td>
                            <td>${teams.playedGames}</td>
                            <td>${teams.won}</td>
                            <td>${teams.draw}</td>
                            <td>${teams.lost}</td>
                            <td class="hide-me-on-med-and-down">${teams.goalsFor}</td>
                            <td class="hide-me-on-med-and-down">${teams.goalsAgainst}</td>
                            <td>${teams.goalDifference}</td>
                            <td>${teams.points}</td>
                        </tr>
                        `;
        });
    });
    // Sisipkan komponen table ke dalam elemen dengan id standings
    document.getElementById("standings").innerHTML = standingsHTML;
}

function setTeams(data) {
    var teamsHTML = "";
    data.teams.forEach((team) => {
        var crestUrl = team.crestUrl;
        crestUrl = crestUrl.replace(/^http:\/\//i, 'https://');
        teamsHTML += `
        <div class="col s12 m6 l3">
            <div class="card-teams card">
                <div class="card-header">
                    <div class="card-image circle white">
                        <img src="${crestUrl}" class="badge-80"><a class="btn-floating halfway-fab waves-effect waves-light pink btn-fav-index" onclick="getTeamById(${team.id});" id="${team.id}"><i class="material-icons medium">favorite</i></a>
                    </div>
                </div>
                <div class="card-content center-align">
                    <p class="team-name">${team.shortName}</p>
                    <p class="stadium-name">${team.venue}</p>
                </div>
                <div class="card-action center-align">
                    <a href="./team.html?id=${team.id}" class="flex-centered profile">Profile Tim<span
                            class="material-icons pink-text">arrow_forward</span></a>
                </div>
            </div>
        </div>
    `;
    });
    // Sisipkan komponen card ke dalam elemen dengan id teams
    document.getElementById("teams").innerHTML = teamsHTML;
};

function setFavoriteTeams(items) {
    var favoriteTeams = "";
    var no = 0;
    if (items.length > 0) {
        items.forEach((item) => {
            no += 1
            favoriteTeams += `
                <tr class="tr-teams">
                    <td>${no}.</td>
                    <td class="team"><a href="${item.website}" target="_blank" class="team-name"><img
                                src="${item.crestUrl}" class="badge-35"><span>${item.name}</span></a></td>
                    <td class="hide-me-on-med-and-down"><span>${item.address}</span></td>
                    <td>${item.venue}</td>
                    <td><button class="btn-small waves-effect waves-light pink" onclick="deleteFavoriteTeam(${item.id})">Hapus</td>
                </tr>
            `;
        });
    } else {
        favoriteTeams += `
            <tr>
                <td colspan="5" class="center-align">Data tim favorit masih kosong. Klik <a href="index.html#teams" onclick="window.location.href='index.html#teams'; window.location.reload(true);"> disini </a>untuk melihat daftar tim.</td>
            </tr>
        `;
    }
    document.getElementById("favorites").innerHTML = favoriteTeams;
};

function setTeamById(data) {
    var teamHTML = "";
    var crestUrl = data.crestUrl;
    crestUrl = crestUrl.replace(/^http:\/\//i, 'https://');
    var website = data.website;
    website = website.replace(/^http:\/\//i, '');
    teamHTML += `
    <div class="row">
        <div class="content-header">
            <div class="col s8">
                <p class="content-title">Profile Tim</p>
            </div>
            <div class="col s4">
                <a href="" class="right content-action btn white-text primary">
                    <p>Bagikan</p><i class="material-icons" class="right">share</i>
                </a>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col s12">
            <div class="card">
                <div class="card-header">
                    <div class="card-image circle white">
                        <img src="${crestUrl}" class="badge-80">
                        <a id="btn-fav" class="btn-floating halfway-fab waves-effect waves-light pink"><i
                            class="material-icons medium">favorite</i></a>
                    </div>
                </div>
                <div class="card-content center-align">
                    <p class="team-name">${data.shortName}</p>
                    <p class="stadium-name">${data.venue}</p>
                    <p class="official-website">Official Website: <a href="${data.website}" target="_blank">${website}</a></p>
                </div>
            </div>
        </div>
    </div>
    `;
    data.squad.forEach((coach) => {
        if (coach.role == "COACH") {
            teamHTML += `
            <div class="row">
                <div class="content-header">
                    <div class="col s12">
                        <p class="content-title">Pelatih</p>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col s12 m6 l4">
                    <div class="card">
                        <div class="card-content">
                            <ul class="collection with-header">
                                <li class="collection-header"><h6>${coach.name}</h6></li>
                                <li class="collection-item">Nationality <span class="right">${coach.nationality}</span></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            `;
        }
    });
    teamHTML += `
    <div class="row">
        <div class="content-header">
            <div class="col s12">
                <p class="content-title">Squad</p>
            </div>
        </div>
    </div>
    <div class="row">
    `;
    data.squad.forEach((player) => {
        var shirtNumber = player.shirtNumber;
        if (shirtNumber == null) shirtNumber = "-";
        if (player.role != "COACH") {
            teamHTML += `
            <div class="col s12 m6 l4">
                <div class="card-squad card">
                    <div class="card-content">
                        <ul class="collection with-header">
                            <li class="collection-header"><h6>${player.name}</h6></li>
                            <li class="collection-item">${shirtNumber}</li>
                            <li class="collection-item">${player.position}</li>
                            <li class="collection-item">Nationality <span class="right">${player.nationality}</span></li>
                        </ul>
                    </div>
                </div>
            </div>
            `;
        }
    });
    teamHTML += `</div>`;
    document.getElementById("content").innerHTML = teamHTML;
}