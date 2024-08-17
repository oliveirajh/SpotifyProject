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