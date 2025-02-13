function watchNow() {
    alert("You are now watching the sponsored video!");
}

function scrollNavLeft() {
    const navList = document.getElementById('navList');
    navList.scrollBy({
        left: -100, // Left side move karne ke liye
        behavior: 'smooth'
    });
}

function scrollNavRight() {
    const navList = document.getElementById('navList');
    navList.scrollBy({
        left: 100, // Right side move karne ke liye
        behavior: 'smooth'
    });
}

function watchNow() {
    alert("You are now watching the sponsored video!");
}