// Registrasi Database
const osName = "teamFavorites";

const dbPromise = idb.open("premierLeagueDB", 1, (upgradeDB) => {
    if (!upgradeDB.objectStoreNames.contains(osName)) {
        const favTeamOS = upgradeDB.createObjectStore(osName);
        favTeamOS.createIndex("name", "name", {
            unique: false
        });
        favTeamOS.createIndex("created", "created", {
            unique: false
        })
    }
});

function saveFavoriteTeam(data) {
    dbPromise.then((db) => {
        const tx = db.transaction(osName, "readwrite");
        const store = tx.objectStore(osName);
        const item = {
            id: data.id,
            name: data.name,
            tla: data.tla,
            crestUrl: data.crestUrl,
            website: data.website,
            address: data.address,
            venue: data.venue,
            created: new Date().getTime()
        };
        store.getKey(item.id).then((key) => {
            if (!key) {
                store.add(item, item.id);
                M.toast({
                    html: `${item.name} adalah Tim Favorit Anda.`
                });

            }
        });
        console.dir(item);
        return tx.complete;
    }).then(() => {
        console.log("Proses transaksi berhasil.");
    }).catch(() => {
        console.log("Proses transaksi gagal.");
    })
};

function getFavoriteTeams() {
    dbPromise.then((db) => {
        const tx = db.transaction(osName, "readonly");
        const store = tx.objectStore(osName);
        return store.getAll();
    }).then((items) => {
        setFavoriteTeams(items);
        console.dir(items);
    })
        .catch(error)
        .then(() => {
            document.querySelector(".preloader-wrapper").style.display = "none";
        })
};

function deleteFavoriteTeam(id) {
    dbPromise.then((db) => {
        const tx = db.transaction(osName, "readwrite");
        const store = tx.objectStore(osName);
        store.delete(id);
        return tx.complete;
    }).then(() => {
        M.toast({
            html: "Data berhasil dihapus."
        })
        getFavoriteTeams();
        console.log("Proses transaksi berhasil.");
    }).catch((error) => {
        console.error("Proses transaksi gagal.", error);
    })
}