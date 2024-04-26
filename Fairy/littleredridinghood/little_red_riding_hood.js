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
            text: "Once upon a time, in a village far away, lived a little girl named Little Red Riding Hood. She was known for her red hood. One day, her grandmother asked her to bring some goodies. Do you:",
            options: [
                { text: "Go through the dark forest to grandma's house", next: 1, image: 'red-riding-hood1.png' },
                { text: "Stay at home and play", next: 2, image: 'red-riding-hood-play.png' }
            ]
        },
        {
            text: "Little Red Riding Hood decided to take the path through the dark forest. As she walked, she noticed strange noises around her. Do you:",
            options: [
                { text: "Continue walking bravely", next: 3, image: 'red-riding-hood2.png' },
                { text: "Turn back and go home", next: 4, image: 'red-riding-hood-turn-back.png' }
            ]
        },
        {
            text: "As Little Red Riding Hood continued through the forest, a sly wolf approached her. The wolf asked where she was going and learned about her visit to grandma's house. Do you:",
            options: [
                { text: "Tell the wolf about grandma's house", next: 5, image: 'red-riding-hood-wolf-talk.png' },
                { text: "Keep it a secret and be cautious", next: 6, image: 'red-riding-hood1.png' }
            ]
        },
        {
            text: "Little Red Riding Hood decided to turn back and go home. Wise decision! As she reached home, she found out about a cunning wolf in the forest. Do you:",
            options: [
                { text: "Stay home and play safely", next: 2, image: 'red-riding-hood-safe.png' },
                { text: "Decide to explore another day", next: 1, image: 'red-riding-hood-explore.png' }
            ]
        },
        {
            text: "Little Red Riding Hood, unaware of the wolf's plan, reached her grandma's house. She found the door open and her grandma in bed. Do you:",
            options: [
                { text: "Approach and greet grandma", next: 7, image: 'red-riding-hood-grandma.png' },
                { text: "Feel something is wrong and hesitate", next: 8, image: 'red-riding-hood-trust-wolf.png' }
            ]
        },
        {
            text: "Little Red Riding Hood, suspicious of the situation, hesitated to approach her grandma. She sensed danger and decided to leave. Wise choice! Do you:",
            options: [
                { text: "Head back home", next: 2, image: 'red-riding-hood-play.png' },
                { text: "Look for help in the forest", next: 12, image: 'red-riding-hood-hesitate-help.png' }
            ]
        },
        {
            text: "Little Red Riding Hood greeted her grandma, but something felt off. She noticed the wolf disguised as her grandma. Do you:",
            options: [
                { text: "Confront the wolf", next: 13, image: 'red-riding-hood-confront-wolf.png' },
                { text: "Try to escape from the house", next: 14, image: 'red-riding-hood-escape.png' }
            ]
        },
        {
            text: "Little Red Riding Hood decided to head back home, making a wise choice. She learned to be cautious in the forest. Do you:",
            options: [
                { text: "Continue with other adventures", next: 15, image: 'red-riding-hood-wise.png' },
                { text: "End the story here", next: 16, image: 'red-riding-hood-end.png' }
            ]
        },
        {
            text: "Little Red Riding Hood tried to escape from the house but the wolf was too quick. Unfortunately, the story takes a dark turn! Do you:",
            options: [
                { text: "Accept this ending", next: 11, image: 'red-riding-hood-wolf-gobble.png' },
                { text: "Rewind the story and make a different choice", next: 0, image: 'red-riding-hood-rewind.png' }
            ]
        },
        {
            text: "The Little Red Riding Hood story comes to an end. Thanks for playing!",
            options: [
                { text: "Back to Homepage", next: 0, image: 'red-riding-hood-end.png' }
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
        backgroundImage.src = currentPageData.options[0]?.image || '';
        pointDisplay.textContent = "Score: "+point;
    }


    function makeChoice(choice) {
        console.log(currentPage);
        const currentPageData = storyData[currentPage];
        const nextPage = currentPageData?.options?.[choice - 1]?.next;

        if (nextPage !== undefined) {
            currentPage = nextPage;
            displayPage();
            point = point+1;
            console.log(point);
        } else {
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



