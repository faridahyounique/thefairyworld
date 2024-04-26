document.addEventListener('DOMContentLoaded', function () {
    const storyContainer = document.getElementById('story-container');
    const storyText = document.getElementById('story-text');
    const option1Button = document.getElementById('option1');
    const option2Button = document.getElementById('option2');
    const backgroundImage = document.getElementById('background-image');
    const settingsIcon = document.getElementById('settings-icon');
    const settingsPage = document.getElementById('settings-page');
    const volumeControl = document.getElementById('volume-control');
    const muteButton = document.getElementById('mute-button');
    const audioSelect = document.getElementById('audio-select');
    const pointDisplay = document.getElementById('point-display');

    let point = 0;

    const storyData = [
        {
            text: "Once upon a time, in a faraway kingdom, there lived a beautiful princess named Aurora. She was cursed by an evil fairy to prick her finger on a spindle and fall into a deep sleep. Do you:",
            options: [
                { text: "Try to prevent the curse", next: 1, image: 'image1.png' },
                { text: "Accept the fate and wait for a hero", next: 2, image: 'image2.png' }
            ]
        },
        {
            text: "Despite efforts to avoid the curse, Aurora pricks her finger and falls into a deep sleep. The entire kingdom falls into slumber as well. Do you:",
            options: [
                { text: "Search for a way to break the curse", next: 3, image: 'image3.png' },
                { text: "Join the kingdom in the enchanted sleep", next: 4, image: 'image4.png' }
            ]
        },
        {
            text: "Years pass, and a prince arrives. He battles through the thorns surrounding the castle and kisses Aurora, breaking the curse. Do you:",
            options: [
                { text: "Celebrate the awakening with a grand feast", next: 5, image: 'image5.png' },
                { text: "Question the prince's true intentions", next: 6, image: 'image6.png' }
            ]
        },
        {
            text: "The kingdom awakens, and a grand feast is held. Aurora and the prince fall in love. Do you:",
            options: [
                { text: "Attend the royal wedding", next: 7, image: 'image7.png' },
                { text: "Wander into the forest for new adventures", next: 8, image: 'image8.png' }
            ]
        },
        {
            text: "Aurora and the prince get married, and they rule the kingdom together. Do you:",
            options: [
                { text: "Live happily ever after", next: 9, image: 'image9.png' }
            ]
        },
        {
            text: "Sleeping Beauty's adventure comes to an end!",
            options: [
                { text: "Back to Homepage", next: 0, image: 'image10.png' }
            ]
        },
        {
            text: "Thanks for playing! This is the end of Sleeping Beauty's enchanting story.",
            options: [
                { text: "Back to Homepage", next: 0, image: 'image9.png' },
                { text: "End", next: 0 }
            ]
        }
    ];

    let currentPage = 0;

    // Play a single background audio for the whole game
    const backgroundAudio = new Audio('background-audio1.mp3'); // Use the default audio (audio1) initially
    backgroundAudio.loop = true;
    backgroundAudio.volume = 1; // Initial volume
    backgroundAudio.play();

    function changeAudio() {
        const selectedAudio = audioSelect.value;
    
        // Update the audio source based on the selected option
        if (selectedAudio === 'audio1') {
            backgroundAudio.src = 'background-audio1.mp3';
        } else if (selectedAudio === 'audio2') {
            backgroundAudio.src = 'background-audio2.mp3';
        }
    
        // Play the updated audio
        backgroundAudio.play();
    }
    option1Button.addEventListener('click', function () {
        changeAudio(1);
    });

    option2Button.addEventListener('click', function () {
        changeAudio(2);
    });
    

    function displayPage() {
    const currentPageData = storyData[currentPage];
    storyText.textContent = currentPageData.text;
    option1Button.textContent = currentPageData.options[0]?.text || '';
    option2Button.textContent = currentPageData.options[1]?.text || '';
    pointDisplay.textContent = "Score: "+point;
    // Display background image
    backgroundImage.src = currentPageData.options[0]?.image || '';
}


    function makeChoice(choice) {
        const currentPageData = storyData[currentPage];
        const nextPage = currentPageData?.options?.[choice - 1]?.next;

        if (nextPage !== undefined) {
            currentPage = nextPage;
            point = point+1;
            console.log(point);
            displayPage();
        } else {
            // End of the story, handle accordingly
            storyContainer.innerHTML = "<h2>Thanks for playing!</h2>";
            addBackToHomepageButton();
        }
    }
     // Attach event listeners to buttons
     option1Button.addEventListener('click', function () {
        makeChoice(1);
    });

    option2Button.addEventListener('click', function () {
        makeChoice(2);
    });

    function addBackToHomepageButton() {
        const backToHomepageButton = document.createElement('a');
        backToHomepageButton.textContent = 'Back to Homepage';
        backToHomepageButton.href = 'index.html';
        backToHomepageButton.addEventListener('click', function () {
            resetStory(); // Reset the story content
        });

        // Append the button to the back-to-home div only if it's the end of the story
        const backToHomeContainer = document.getElementById('back-to-home');
        backToHomeContainer.innerHTML = ''; // Clear previous content
        backToHomeContainer.appendChild(backToHomepageButton);
    }

    function resetStory() {
        currentPage = 0; // Reset to the homepage
        storyContainer.innerHTML = ''; // Clear previous content
        displayPage(); // Display the initial content
    }

    function openSettings() {
    // Toggle the visibility of the settings page
    settingsPage.style.display = (settingsPage.style.display === 'none' || settingsPage.style.display === '') ? 'block' : 'none';

    // Only display volume controls when the settings page is visible
    if (settingsPage.style.display === 'block') {
        volumeControl.style.display = 'block';
        muteButton.style.display = 'block';
        audioSelect.style.display = 'block';
        
        // Play background audio on user interaction
        backgroundAudio.play().catch(error => {
            // Handle the error, e.g., user interaction required
            console.error('Failed to play audio:', error);
        });
    } else {
        volumeControl.style.display = 'none';
        muteButton.style.display = 'none';
        audioSelect.style.display = 'none';
    }
}


    function adjustVolume() {
        const volume = volumeControl.value;
        backgroundAudio.volume = volume;
    }

    function toggleMute() {
        if (backgroundAudio.muted) {
            backgroundAudio.muted = false;
            muteButton.textContent = 'Mute';
        } else {
            backgroundAudio.muted = true;
            muteButton.textContent = 'Unmute';
        }
    }

    // Initial display
    displayPage();

   

    // Attach event listener to the settings icon
    settingsIcon.addEventListener('click', openSettings);

    // Add event listeners for volume control and mute button
    volumeControl.addEventListener('input', adjustVolume);
    muteButton.addEventListener('click', toggleMute);
});
