document.addEventListener("DOMContentLoaded", function () {

    let elemsSidenav = document.querySelectorAll(".sidenav");

    setNav();
    M.Sidenav.init(elemsSidenav);

    let brand_logo = document.querySelector("a.brand-logo img");

    function setBrandImage() {
        let window_width = window.innerWidth;
        if (window_width <= 600) {
            brand_logo.setAttribute("src", "assets/img/pl-logo-sprite-mobile-light.png");
            // brand_logo.classList.add("circle");
        } else {
            brand_logo.setAttribute("src", "assets/img/pl-logo-sprite-web-light.png");
        }
    }

    window.addEventListener("resize", setBrandImage);
    window.addEventListener("load", setBrandImage);
    window.addEventListener("maximize", setBrandImage);

    function setNav() {
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4) {
                if (this.status != 200) return;

                // Memuat daftar tautan menu
                document.querySelectorAll(".topnav, .sidenav")
                    .forEach(function (elm) {
                        elm.innerHTML = xhttp.responseText;
                    });

                // Daftarkan event listener untuk setiap tautan menu
                document.querySelectorAll("a.brand-logo, .topnav a, .sidenav a")
                    .forEach(function (elm) {
                        elm.addEventListener("click", function (event) {

                            // Tutup sidenav
                            let sidenav = document.querySelector(".sidenav");
                            // Muat halaman konten yang dipanggil
                            if (event.target.getAttribute("href") != null) {
                                page = event.target.getAttribute("href").substr(1);
                            }
                            M.Sidenav.getInstance(sidenav).close();
                            loadPage(page);
                        });
                    });
            }
        };
        xhttp.open("GET", 'nav.html', true);
        xhttp.send();
    }

    // Load page content
    let page = window.location.hash.substr(1);
    if (page == "") page = "home";

    loadPage(page);

    function loadPage(page) {
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4) {
                let content = document.querySelector("#content");
                if (this.status == 200) {
                    content.innerHTML = xhttp.responseText;
                    if (page == "home") {
                        getStandings();
                    } else if (page == "teams") {
                        getTeams();
                    } else {
                        getFavoriteTeams();
                    }
                } else if (this.status == 404) {
                    xhttp.open("GET", "404.html", true);
                    return xhttp.send();
                } else {
                    content.innerHTML = "<p>Ups... halaman tidak dapat diakses.</p>";
                }

            }
        };
        xhttp.open("GET", `pages/${page}.html`, true);
        xhttp.send();
    }
});