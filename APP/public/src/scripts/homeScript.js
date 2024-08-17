const currentTrack = document.querySelector('#currentTrack');
const currentTrackImg = document.querySelector('#track-image');
const trackName = document.querySelector('#track-name');
const trackInfo = document.querySelector('#track-info');
const progressBar = document.querySelector('#progress-bar');


document.getElementById('searchForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const searchInput = document.getElementById('search').value;
    const type = document.getElementById('type').value;

    if (searchInput) {
        const formAction = `/home/search/${encodeURIComponent(searchInput)}?type=${type}`;
        this.action = formAction;
        this.submit();
    } else {
        console.log('O input de pesquisa está vazio.');
    }
});

document.getElementById('type').addEventListener('change', function() {

    if(this.value === 'album') {
        this.classList.remove('pr-6');
        this.classList.add('pr-9');
    } else {
        this.classList.remove('pr-9');
        this.classList.add('pr-6');
    }
});

const errorMessage = document.getElementById('errorMessage');
if (errorMessage) {
    errorMessage.style.transition = 'opacity 0.5s ease-in-out';
    errorMessage.style.opacity = '1';

    setTimeout(() => {
        errorMessage.style.opacity = '0';

        setTimeout(() => {
            errorMessage.style.display = 'none';
        }, 500);
    }, 2000);
}


currentTrack.addEventListener('mouseover', () => {
    currentTrackImg.classList.remove('lg:h-24', 'lg:mr-3', 'lg:w-36');
    trackName.classList.remove('text-sm');
    trackInfo.classList.remove('w-full', 'items-start');

    currentTrackImg.classList.add('mx-auto', 'lg:h-48', 'lg:w-52', 'lg:mx-auto', "lg:mb-3");
    trackName.classList.add('text-base');
    trackInfo.classList.add('items-center');
    progressBar.classList.add('mt-3');

    currentTrackImg.style.transition = `all 0.2s ease-in-out`;
    currentTrackImg.style.transitionDelay = '0s';
});

currentTrack.addEventListener('mouseout', () => {
    currentTrackImg.classList.remove('lg:h-48', 'lg:mx-auto', 'lg:w-52', "lg:mb-3");
    trackName.classList.remove('text-base');
    trackInfo.classList.remove('items-center');
    progressBar.classList.remove('mt-3');

    currentTrackImg.classList.add('lg:h-14', 'lg:mr-3', 'lg:w-16');
    trackName.classList.add('text-sm', 'items-start');
    trackInfo.classList.add('w-full');
    progressBar.classList.add('mt-1');

    currentTrackImg.style.transition = `all 0s ease-in-out`;
    currentTrackImg.style.transitionDelay = '0s';
});

const updateCurrentTrack = async () => {
    try {
        let response = await fetch('/home/current-track');
        let data = await response.json();

        document.getElementById('track-url').href = data.url;
        document.getElementById('track-image').src = data.album.images[0].url;
        document.getElementById('track-name').innerHTML = data.name.length > 20
            ? `<a href="${data.url}" target="_blank">${data.name.substring(0, 20) + '...'}</a>`
            : `<a href="${data.url}" target="_blank">${data.name}</a>`;

        const artistLinks = data.artists.map((artist, index) => {
            let artistName = artist.name;
            if (artistName.length > 15) {
                artistName = artistName.substring(0, 15) + '...';
            }
            return `<a href="${artist.url}" target="_blank">${artistName}</a>${index < data.artists.length - 1 ? ', ' : ''}`;
        }).join('');

        document.getElementById('track-artists').innerHTML = artistLinks;

        const totalTime = data.duration_ms;
        const currentTime = data.progress_ms;
        const progressPercentage = (currentTime / totalTime) * 100;

        document.getElementById('track-progress').style.width = `${progressPercentage}%`;

        document.getElementById('current-time').textContent = `${Math.floor(currentTime / 60000)}:${('0' + Math.floor((currentTime % 60000) / 1000)).slice(-2)}`;
        document.getElementById('total-time').textContent = `${Math.floor(totalTime / 60000)}:${('0' + Math.floor((totalTime % 60000) / 1000)).slice(-2)}`;
    } catch (error) {
        console.error('Error fetching current track:', error);
    }
};

setInterval(updateCurrentTrack, 1000);