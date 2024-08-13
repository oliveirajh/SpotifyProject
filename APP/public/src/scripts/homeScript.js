const currentTrack = document.querySelector('#currentTrack');
const currentTrackImg = document.querySelector('#track-image');
const trackName = document.querySelector('#track-name');
const trackInfo = document.querySelector('#track-info');
const progressBar = document.querySelector('#progress-bar');

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

document.getElementById('searchForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const searchInput = document.getElementById('search').value;
    const searchForm = document.getElementById('searchForm');

    
    searchForm.action = `home/search/${encodeURIComponent(searchInput)}`;
    
    searchForm.submit();
});

const updateCurrentTrack = async () => {
    try {
        const response = await fetch('home/current-track');
        const data = await response.json();
        console.log(data.artists.length)

        if (data) {
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
        }
    } catch (error) {
        console.error('Error fetching current track:', error);
    }
};


setInterval(updateCurrentTrack, 1000);
