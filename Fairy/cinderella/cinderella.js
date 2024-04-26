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
             text: "Once upon a time, in a magical kingdom, there lived a kind-hearted girl named Cinderella. She lived with her stepmother and two stepsisters. Cinderella had to work hard while the others slept well into the day.The poor girl could not stay clean, from all the ashes and cinders by the fire. Do you:",
               options: [
                         { text: "Help Cinderella clean the kitchen", next: 1, image: 'image1.png' },
                         { text: "Ignore Cinderella's hardwork", next: 2 }
                         ]
                     },
                     {
                        text: "One day, big news came to town.  It was time for the Prince to find a bride. The King and Queen were going to have a ball!  All of the young ladies in the land were invited to come to the ball. Cinderella dreamed of attending the royal ball. Do you:",
                        options: [
                             { text: "Help Cinderella get ready for the ball", next: 3, image: 'image2.png' },
                            { text: "Ignore Cinderella's dreams", next: 4 }
                         ]
                     },
                     {
                         text: "Cinderella's fairy godmother appears to help her. She transforms Cinderella's rags into a beautiful gown and a pumpkin into a carriage. Do you:",
                         options: [
                             { text: "Be amazed by the magical transformation", next: 5, image: 'image3.png' },
                             { text: "Doubt the fairy godmother's magic", next: 6 }
                         ]
                     },
                     {
                         text: "Cinderella arrives at the royal ball and captures the Prince's heart. However, she must leave before midnight. In her haste, she leaves behind a glass slipper. The Prince, determined to find her, searches the kingdom. Do you:",
                         options: [
                             { text: "Search for Cinderella", next: 7, image: 'image6.png' },
                             { text: "Worry about the midnight curfew", next: 8, image: 'image7.png' }
                         ]
                     },
                     {
                         text: "Cinderella's glass slipper fits perfectly. The Prince proposes, and they live happily ever after. Cinderella's adventure comes to a happy end! Do you:",
                         options: [
                             { text: "Celebrate the happy ending", next: 9, image: 'image9.png' }
                         ]
                     },
                     {
                         text: "Cinderella's adventure comes to an end!",
                         options: [
                             { text: "Back to Homepage", next: 0, image: 'image10.png' },
                             { text: "End game", next: 0 }
                         ]
                     },
                     {
                         text: "Thanks for playing! This is the end of Cinderella's enchanting story.",
                         options: [
                             { text: "Back to Homepage", next: 0, image: 'image11.png' },
                             { text: "End", next: 0 }
                         ]
                     }
    ];

    let currentPage = 0;

    // Play a single background audio for the whole game
    const backgroundAudio = new Audio('background-audio2.mp3'); // Use the default audio (audio1) initially
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
        console.log(currentPage);
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

    
})