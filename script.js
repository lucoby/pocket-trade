$(document).ready(function () {
    cardFiles = [
        'https://raw.githubusercontent.com/lucoby/pocket-trade/refs/heads/main/cards/A1.json',
        // 'https://raw.githubusercontent.com/lucoby/pocket-trade/refs/heads/main/cards/A1a.json',
        // 'https://raw.githubusercontent.com/lucoby/pocket-trade/refs/heads/main/cards/A2.json',
        // 'https://raw.githubusercontent.com/lucoby/pocket-trade/refs/heads/main/cards/A2a.json',
        // 'https://raw.githubusercontent.com/lucoby/pocket-trade/refs/heads/main/cards/P-A.json'
    ];
    let listItems = '';
    cardFiles.forEach(file => {
        $.getJSON(file, function (data) {
            $.each(data, function (index, item) {
                listItems += `<li><p>${item.rarity} - ${item.name}</p><img src="${item.image}" alt="${item.name}" width="100"></li>`;
            });
            $('#cardsContainer').html(listItems);
        }).fail(function () {
            console.error('Error loading JSON file');
        });
    });
    
});