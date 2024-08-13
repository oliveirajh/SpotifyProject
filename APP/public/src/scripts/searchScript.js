document.getElementById('searchForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const searchInput = document.getElementById('search').value;
    console.log('Valor do input:', searchInput);

    if (searchInput) {
        const formAction = `/home/search/${encodeURIComponent(searchInput)}`;
        console.log('Nova action:', formAction);
        this.action = formAction;
        this.submit();
    } else {
        console.log('O input de pesquisa está vazio.');
    }
});