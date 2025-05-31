document.addEventListener('DOMContentLoaded', function() {
    let mysound = document.getElementById("mysound");
    let icon = document.getElementById("icon");
    let playlist = document.getElementById("playlist");
    let currentTrackIndex = 0;
    let tracks = [];
    
    
    // Function to load the JSON file
    function loadJSON(callback) {
    let xhr = new XMLHttpRequest();
    xhr.overrideMimeType("application/json");
    xhr.open('GET', '../music/music.json', true); 
    xhr.onreadystatechange = function() {
    console.log("readyState:", xhr.readyState, "status:", xhr.status); // Debugging
    if (xhr.readyState === 4 && xhr.status == "200") {
    callback(JSON.parse(xhr.responseText));
    }
    };
    xhr.send(null);
    }
    
    
    // Function to display the playlist
    function displayPlaylist(tracks) {
    playlist.innerHTML = ''; // Clear existing list
    tracks.forEach((track, index) => {
    let li = document.createElement("li");
    li.textContent = track.name;
    li.addEventListener('click', function() {
    loadTrack(index);
    });
    playlist.appendChild(li);
    });
    }
    
    
    // Function to load a track
    function loadTrack(trackIndex) {
    currentTrackIndex = trackIndex;
    mysound.src = tracks[trackIndex].path; // Set the audio source
    mysound.load();
    mysound.play();
    icon.src = "../images/pause.png"; // Change icon to pause
    }
    
    
    // Play/Pause function
    function togglePlayPause() {
    if (mysound.paused) {
    mysound.play();
    icon.src = "../images/pause.png";
    } else {
    mysound.pause();
    icon.src = "../images/play.png";
    }
    }
    
    
    // Load the playlist and set up event listeners
    loadJSON(function(data) {
     console.log(data); 
    tracks = data;
    displayPlaylist(tracks);
    });
    
    
    icon.onclick = togglePlayPause;
    });

/*
    document.addEventListener('DOMContentLoaded', function () {
        let artists = []; // Store artists from JSON
    
        // Fetch and display artists from JSON
        fetch('../music/artists.json')
            .then(response => response.json())
            .then(data => {
                artists = data; // Save data globally
                displayArtists(artists); // Initial display
            })
            .catch(error => console.error("Error loading JSON:", error));
    
        // Function to display artists
        function displayArtists(artistList) {
            let container = document.getElementById("artistsList");
            container.innerHTML = ""; // Clear previous list
            artistList.forEach(artist => {
                let li = document.createElement("li");
                li.innerHTML = `<h3>${artist.name}</h3><img src="${artist.image}" width="150">`;
                container.appendChild(li);
            });
        }
    
        // Function to filter/search artists
        window.searchArtist = function () {
            let query = document.getElementById("searchBar").value.toLowerCase();
            let filteredArtists = artists.filter(artist => artist.name.toLowerCase().includes(query));
            displayArtists(filteredArtists); // Display filtered artists
        };
    });
    */
    document.addEventListener('DOMContentLoaded', function () {
        let popularArtists = [];
        let upcomingArtists = [];
    
        // Fetch and display popular artists
        fetch('../music/artists.json')
            .then(response => response.json())
            .then(data => {
                popularArtists = data; // Store data globally
                displayArtists(popularArtists, "artistsList"); // Display in Popular Artists section
            })
            .catch(error => console.error("Error loading popular artists JSON:", error));
    
        // Fetch and display upcoming artists
        fetch('../music/upcoming.json') // Correct JSON file
            .then(response => response.json())
            .then(data => {
                upcomingArtists = data; // Store data globally
                displayArtists(upcomingArtists, "upcomingList"); // Display in Upcoming Artists section
            })
            .catch(error => console.error("Error loading upcoming artists JSON:", error));
    
        // Function to display artists in a given section
        function displayArtists(artistsList, containerId) {
            let container = document.getElementById(containerId);
            container.innerHTML = ""; // Clear previous list
            artistsList.forEach(artist => {
                let li = document.createElement("li");
                li.innerHTML = `<h3>${artist.name}</h3><img src="${artist.image}" width="150">`;
                container.appendChild(li);
            });
        }
    
        // Function to search artists
        window.searchArtist = function () {
            let query = document.getElementById("searchBar").value.toLowerCase();
            
            let filteredPopular = popularArtists.filter(artist => artist.name.toLowerCase().includes(query));
            let filteredUpcoming = upcomingArtists.filter(artist => artist.name.toLowerCase().includes(query));
    
            displayArtists(filteredPopular, "artistsList");  // Update Popular Artists
            displayArtists(filteredUpcoming, "upcomingList"); // Update Upcoming Artists
        };
    });



    //FOR LOGIN PAGE

    let isSignUp = false;
    function toggleForm() {
    isSignUp = !isSignUp;
    document.getElementById("form-title").innerText = isSignUp ? "Sign Up" : "Login";
    document.getElementById("username").style.display = isSignUp ? "block" : "none";
    document.querySelector(".toggle").innerText = isSignUp ? "Already have an account? Login" : "Don't have an account? Sign Up";
}