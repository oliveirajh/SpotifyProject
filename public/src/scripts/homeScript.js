const currentTrack = document.querySelector('#currentTrack');
const currentTrackImg = document.querySelector('#track-image');
const trackName = document.querySelector('#track-name');
const trackInfo = document.querySelector('#track-info');

currentTrack.addEventListener('mouseover', () => {
    currentTrackImg.classList.remove('lg:h-24', 'lg:mr-3', 'lg:w-32');
    trackName.classList.remove('text-sm');
    trackInfo.classList.remove('w-full', 'items-start');

    currentTrackImg.classList.add('mx-auto', 'lg:h-48', 'lg:mx-auto', "lg:mb-3");
    trackName.classList.add('text-base');
    trackInfo.classList.add('items-center');

    currentTrackImg.style.transition = `all 0.2s ease-in-out`;
    currentTrackImg.style.transitionDelay = '0s';
});

currentTrack.addEventListener('mouseout', () => {
    currentTrackImg.classList.remove('lg:h-48', 'lg:mx-auto', "lg:mb-3");
    trackName.classList.remove('text-base');
    trackInfo.classList.remove('items-center');

    currentTrackImg.classList.add('lg:h-24', 'lg:mr-3', 'lg:w-32');
    trackName.classList.add('text-sm', 'items-start');
    trackInfo.classList.add('w-full');

    currentTrackImg.style.transition = `all 0s ease-in-out`;
    currentTrackImg.style.transitionDelay = '0s';
});

const updateCurrentTrack = async () => {
    try {
        const response = await fetch('home/current-track');
        const data = await response.json();

        if (data && data.item) {
            document.getElementById('track-url').href = data.item.album.external_urls.spotify;
            document.getElementById('track-image').src = data.item.album.images[0].url;
            document.getElementById('track-name').innerHTML = data.item.name.length > 20
                ? `<a href="${data.item.external_urls.spotify}" target="_blank">${data.item.name.substring(0, 20) + '...'}</a>`
                : `<a href="${data.item.external_urls.spotify}" target="_blank">${data.item.name}</a>`;
            document.getElementById('track-artists').innerHTML = data.item.album.artists.length > 1
                ? data.item.album.artists.map((artist, index) =>
                    `<a href="${artist.external_urls.spotify}" target="_blank">${artist.name}</a>${index < data.item.album.artists.length - 1 ? ',' : ''}`
                ).join(' ')
                : `<a href="${data.item.album.artists[0].external_urls.spotify}" target="_blank">${data.item.album.artists[0].name}</a>`;

            const totalTime = data.item.duration_ms;
            const currentTime = data.progress_ms;
            const progressPercentage = (currentTime / totalTime) * 100;

            document.getElementById('track-progress').style.width = `${progressPercentage}%`;

            document.getElementById('current-time').textContent = `${Math.floor(currentTime / 60000)}:${('0' + Math.floor((currentTime % 60000) / 1000)).slice(-2)}`;
            document.getElementById('total-time').textContent = `${Math.floor(totalTime / 60000)}:${('0' + Math.floor((totalTime % 60000) / 1000)).slice(-2)}`;
        }
    } catch (error) {
        console.error('Error fetching current track:', error);
    }
};


setInterval(updateCurrentTrack, 1000);
