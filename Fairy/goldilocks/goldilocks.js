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
            text: "Once upon a time, there were three bears who lived in a cozy cottage in the woods. One day, they decided to take a walk while their porridge cooled. Goldilocks, a curious little girl, came across their cottage. Do you:",
            options: [
                { text: "Enter the cottage and try the porridge", next: 1, image: 'goldilocks1.png' },
                { text: "Continue walking and leave the cottage alone", next: 2 }
            ]
        },
        {
            text: "Goldilocks entered the cottage and found three bowls of porridge on the table. One was too hot, one was too cold, and one was just right. Do you:",
            options: [
                { text: "Eat the porridge that is too hot", next: 3, image: 'goldilocks2.png' },
                { text: "Eat the porridge that is too cold", next: 4, image: 'goldilocks3.png' },
                { text: "Eat the porridge that is just right", next: 5, image: 'goldilocks4.png' }
            ]
        },
        {
            text: "The porridge was too hot, and Goldilocks burned her mouth. She decided to explore further and found three chairs. One was too big, one was too small, and one was just right. Do you:",
            options: [
                { text: "Sit on the chair that is too big", next: 6, image: 'goldilocks5.png' },
                { text: "Sit on the chair that is too small", next: 7, image: 'goldilocks6.png' },
                { text: "Sit on the chair that is just right", next: 8, image: 'goldilocks7.png' }
            ]
        },
        {
            text: "The chair was too big, and Goldilocks fell off. Undeterred, she continued exploring and found three beds. One was too hard, one was too soft, and one was just right. Do you:",
            options: [
                { text: "Lie on the bed that is too hard", next: 9, image: 'goldilocks8.png' },
                { text: "Lie on the bed that is too soft", next: 10, image: 'goldilocks9.png' },
                { text: "Lie on the bed that is just right", next: 11, image: 'goldilocks10.png' }
            ]
        },
        {
            text: "The bed was just right, and Goldilocks fell asleep. The three bears returned home to find Goldilocks in their cottage. Do you:",
            options: [
                { text: "Wake up Goldilocks gently", next: 12, image: 'goldilocks11.png' },
                { text: "Scare Goldilocks away", next: 13, image: 'goldilocks12.png' }
            ]
        },
        {
            text: "Goldilocks woke up and saw the three bears. She was frightened but apologized for entering their cottage. The bears forgave her, and Goldilocks learned a valuable lesson about respecting others' homes. The end!",
            options: [
                { text: "Back to Homepage", next: 0, image: 'goldilocks13.png' }
            ]
        },
        {
            text: "Thanks for playing! This is the end of the Goldilocks and the Three Bears story.",
            options: [
                { text: "Back to Homepage", next: 0, image: 'goldilocks14.png' },
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
});