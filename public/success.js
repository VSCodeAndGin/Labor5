window.onload = function () {
    // Extract topic from URL
    const url = new URL(window.location.href);
    const topic = url.searchParams.get("topic");

    // Show the corresponding topic layer
    if (topic) {
        showTopic(topic);
    } else {
        // If no topic specified in the URL, default to a topic (e.g., art)
        showTopic("art");
    }

    // Add event listeners to color buttons
    const colorButtons = document.querySelectorAll('.color-button');
    colorButtons.forEach(button => {
        button.addEventListener('click', changeColor);
    });
}

function showTopic(topic) {
    // Hide all topic layers
    const topicLayers = document.querySelectorAll('.topic-layer');
    topicLayers.forEach(layer => {
        layer.classList.remove('active');
    });

    // Show the selected topic layer
    const selectedTopic = document.getElementById(topic);
    if (selectedTopic) {
        selectedTopic.classList.add('active');
    }

    // Set unique background color for each topic layer
    const colors = ['#ffcccc', '#ccffcc', '#ccccff']; // Define an array of colors
    const index = Array.from(topicLayers).indexOf(selectedTopic); // Get index of selected topic layer
    selectedTopic.style.backgroundColor = colors[index % colors.length]; // Set background color based on index
}

function changeColor(event) {
    const button = event.target;
    // Change button color when pressed
    button.style.backgroundColor = getRandomColor();
}

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        document.getElementById("geolocation").innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
    document.getElementById("geolocation").innerHTML = "Latitude: " + position.coords.latitude + "<br>Longitude: " + position.coords.longitude;
}

getLocation();

function showTime() {
    var date = new Date();
    var time = date.toLocaleTimeString();
    document.getElementById("system-time").innerHTML = "System Time: " + time;
}

setInterval(showTime, 1000);
