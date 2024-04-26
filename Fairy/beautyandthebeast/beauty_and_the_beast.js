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
            text: "Once upon a time in a quiet village, there lived a young woman named Belle. She was known for her love of books and her kind heart.",
            options: [
                { text: "Follow Belle on her daily routine", next: 1, image: 'belle_image1.png' },
                { text: "Ignore Belle's invitations", next: 2 }
            ]
        },
        {
            text: "One day, Belle's father Maurice gets lost in the forest and stumbles upon a mysterious castle. He is taken captive by the Beast, the cursed owner of the castle.",
            options: [
                { text: "Join Belle in her quest to rescue her father", next: 3, image: 'belle_image11.png' },
                { text: "Do nothing and continue with daily life", next: 4 }
            ]
        },
        {
            text: "Belle arrives at the castle and offers herself in exchange for her father's freedom. Over time, she discovers the Beast's softer side and begins to see beyond his appearance.",
            options: [
                { text: "Continue exploring the castle with Belle", next: 5, image: 'belle_image3.png' },
                { text: "Remain skeptical of the Beast", next: 6 }
            ]
        },
        {
            text: "As Belle spends more time with the Beast, their friendship blossoms into something more. The enchanted objects in the castle, such as Lumière the candelabra and Cogsworth the clock, play a part in bringing them together.",
            options: [
                { text: "Embrace the enchanted objects' help", next: 7, image: 'belle_image9.png' },
                { text: "Keep a distance from the enchanted objects", next: 8 }
            ]
        },
        {
            text: "Despite the growing bond, the Beast's curse remains. The only way to break it is through true love. As Belle and the Beast's feelings deepen, a transformation begins.",
            options: [
                { text: "Express love for the Beast", next: 9, image: 'belle_image5.png' },
                { text: "Hesitate to reveal true feelings", next: 10 }
            ]
        },
        {
            text: "Belle's love breaks the curse, transforming the Beast back into a handsome prince. The enchanted objects celebrate, and Belle and the Prince live happily ever after.",
            options: [
                { text: "Celebrate the happy ending", next: 11, image: 'belle_image6.png' }
            ]
        },
        {
            text: "Beauty and the Beast's enchanting tale concludes!",
            options: [
                { text: "Back to Homepage", next: 0, image: 'belle_image7.png' },
                { text: "End", next: 0 }
            ]
        },
        {
            text: "Thanks for playing! This is the end of Beauty and the Beast's magical story.",
            options: [
                { text: "Back to Homepage", next: 0, image: 'belle_image8.png' },
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
        backToHomepageButton.href = '../index.html';
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
    function goBack() {
        window.history.back();
    }
});