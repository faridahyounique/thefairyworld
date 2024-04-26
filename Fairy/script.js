document.addEventListener('DOMContentLoaded', function () {
    function selectStory(storyName) {
        const storyPath = `./${storyName}/index.html`;
        window.location.href = storyPath;
    }


// Event listeners for each story option
document.getElementById('littleredridinghood').addEventListener('click', function () {
    selectStory('littleredridinghood');
});

document.getElementById('cinderella').addEventListener('click', function () {
    selectStory('Cinderella');
});

document.getElementById('sleepingbeauty').addEventListener('click', function () {
    selectStory('sleepingbeauty');
});

document.getElementById('beautyandthebeast').addEventListener('click', function () {
    selectStory('beautyandthebeast');
});

document.getElementById('goldilocks').addEventListener('click', function () {
    selectStory('goldilocks');
});
})