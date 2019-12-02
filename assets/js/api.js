const base_url = "https://api.football-data.org/v2/";
const api_token = "b257c2b2ee224580854b56794cd40de8";
const id_league = 2021;
const standings_url = `${base_url}competitions/${id_league}/standings?standingType=TOTAL`;
const teams_url = `${base_url}competitions/${id_league}/teams?stage=REGULAR_SEASON`;
const team_url = `${base_url}teams/`;

const fetchAPI = function (url) {
    return fetch(url, {
        headers: {
            'X-Auth-Token': api_token
        }
    });
};

function status(response) {
    if (response.status !== 200) {
        console.log("Error: " + response.status);
        // Method reject() akan membuat blok catch terpanggil
        return Promise.reject(new Error(response.statusText));
    } else {
        // Mengubah suatu objek menjadi Promise akan membuat blok then terpanggil
        return Promise.resolve(response);
    }
};

function json(response) {
    return response.json();
};

function error(error) {
    console.error("Error: " + error);
};

async function getStandings() {
    try {
        if ("caches" in window) {
            caches.match(standings_url).then((response) => {
                if (response) {
                    console.log(response.url);
                    response.json().then((data) => {
                        setStandings(data);
                    })
                }
            })
        }
    } catch (error) {
        console.log("Error: ", error);
    }
    fetchAPI(standings_url)
        .then(status)
        .then(json)
        .then((data) => {
            // Objek/array JavaScript dari response.json() masuk lewat data
            setStandings(data)
            console.dir(data);
        })
        .catch(error)
        .then(() => {
            document.querySelector(".preloader-wrapper").style.display = "none";
        });
};

function getTeams() {
    if ("caches" in window) {
        caches.match(teams_url).then((response) => {
            if (response) {
                console.log(response.url);
                response.json().then((data) => {
                    setTeams(data);
                    const btnFavs = document.querySelectorAll("a.btn-fav-index");
                    btnFavs.forEach((btn) => {
                        btn.addEventListener("click", (event) => {
                            btn.style.visibility = "hidden";
                        })
                    })

                    const osName = "teamFavorites";
                    dbPromise.then(function (db) {
                        var tx = db.transaction(osName, "readonly");
                        var store = tx.objectStore(osName);
                        return store.getAllKeys();
                    }).then((items) => {
                        items.forEach((item => {
                            document.getElementById(item).style.visibility = "hidden";
                        }))
                    })
                });
            }
        });
    }

    fetchAPI(teams_url)
        .then(status)
        .then(json)
        .then((data) => {
            setTeams(data)
            const btnFavs = document.querySelectorAll("a.btn-fav-index");
            btnFavs.forEach((btn) => {
                btn.addEventListener("click", (event) => {
                    btn.style.visibility = "hidden";
                })
            })
            const osName = "teamFavorites";
            dbPromise.then(function (db) {
                var tx = db.transaction(osName, "readonly");
                var store = tx.objectStore(osName);
                return store.getAllKeys();
            }).then((items) => {
                items.forEach((item => {
                    document.getElementById(item).style.visibility = "hidden";
                }))
            })
            console.dir(data)
        })
        .catch(error)
        .then(() => {
            document.querySelector(".preloader-wrapper").style.display = "none";
        });
};

function getTeamById(id = 0) {
    const urlParams = new URLSearchParams(window.location.search);
    var idParam = urlParams.get("id");

    if (idParam == null) {
        idParam = id;
    }

    if ("caches" in window) {
        caches.match(team_url + idParam).then((response) => {
            if (response) {
                console.log(response.url);
                response.json().then((data) => {
                    if (urlParams.get("id") != null) {
                        setTeamById(data);
                        const btn = document.getElementById("btn-fav");
                        btn.addEventListener("click", (event) => {
                            saveFavoriteTeam(data).then(() => {
                                btn.style.visibility = "hidden";
                            })
                        });
                        const osName = "teamFavorites";
                        dbPromise.then((db) => {
                            const tx = db.transaction(osName, "readonly");
                            const store = tx.objectStore(osName);
                            store.getKey(data.id).then((elm) => {
                                if (elm != undefined) {
                                    btn.style.visibility = "hidden";
                                } else {
                                    btn.style.visibility = "visible";
                                }
                            })
                        })
                    } else {
                        saveFavoriteTeam(data);
                    }
                });
            }
        });
    }

    fetchAPI(team_url + idParam)
        .then(status)
        .then(json)
        .then((data) => {
            // Objek Javascript dari response.json() masuk lewat variabel data
            if (urlParams.get("id") != null) {
                setTeamById(data);
                const btn = document.getElementById("btn-fav");
                btn.addEventListener("click", (event) => {
                    saveFavoriteTeam(data)
                    btn.style.visibility = "hidden";
                });
                const osName = "teamFavorites";
                dbPromise.then((db) => {
                    const tx = db.transaction(osName, "readonly");
                    const store = tx.objectStore(osName);
                    store.getKey(data.id).then((elm) => {
                        if (elm != undefined) {
                            btn.style.visibility = "hidden";
                        } else {
                            btn.style.visibility = "visible";
                        }
                    })
                })
            } else {
                saveFavoriteTeam(data);
            }
        })
        .catch(error)
}