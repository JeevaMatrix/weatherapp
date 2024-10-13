const menuIcons = document.querySelectorAll(".menu");
const sideBar = document.querySelector(".sidebar");
const toploc = document.getElementById("toploc");

menuIcons.forEach(menuIcon => {
    menuIcon.addEventListener("click", function() {
        if (sideBar.style.display === "none" || sideBar.style.display === "") {
            sideBar.style.display = "block";
            // toploc.style.zIndex = -1
            setTimeout(()=>{
                sideBar.style.transform = "translateX(0%)"
            },100)
        } else {
            sideBar.style.transform = "translateX(-100%)"
            setTimeout(()=>{
                sideBar.style.display = "none";
                // toploc.style.zIndex = 1
            },1000)
        }
    });
});

// optional link prevent default
document.querySelectorAll('.optional').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
    });
});

document.querySelectorAll('.sidebar a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        sideBar.style.transform = "translateX(-100%)"
        setTimeout(()=>{
            sideBar.style.display = "none";
            // toploc.style.zIndex = 1
        },100)
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

document.querySelectorAll(".menu").forEach(anchor =>{
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
    })
});