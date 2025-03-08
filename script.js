$(document).ready(function () {
  const cardFiles = {
    'A1': 'https://raw.githubusercontent.com/lucoby/pocket-trade/refs/heads/main/cards/A1.json',
    'A1a': 'https://raw.githubusercontent.com/lucoby/pocket-trade/refs/heads/main/cards/A1a.json',
    'A2': 'https://raw.githubusercontent.com/lucoby/pocket-trade/refs/heads/main/cards/A2.json',
    'A2a': 'https://raw.githubusercontent.com/lucoby/pocket-trade/refs/heads/main/cards/A2a.json',
    // 'P-A': 'https://raw.githubusercontent.com/lucoby/pocket-trade/refs/heads/main/cards/P-A.json'
  };
  $.each(cardFiles, (key, file) => {
    let cards = '';
    $.getJSON(file, data => {
        $.each(data, (index, item) => {
          cards += `<div class="col-2 border-0 card selectable unselected ${item.rarity}"><img src="${item.image}" class="mx-auto d-block" alt="${item.name}" width="170"></div>`;
        });
        $('#cardsContainer' + key).html(cards);
    }).fail(function () {
      console.error('Error loading JSON file');
    });
  });

  $('.filter-button').click(function() {
    var filterValue = $(this).data('filter');
    $(this).toggleClass('active');
    $('.' + filterValue).toggleClass('d-none');
  });

  $('body').on('click', '.selectable', function() {
    $(this).toggleClass('unselected');
    $(this).toggleClass('text-bg-secondary');
  });
});