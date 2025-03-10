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
          cards += `<div class="col-3 col-lg-2 border-0 card selectable unselected ${item.rarity}" data-set="${key}" data-rarity="${item.rarity}" data-name="${item.name}" data-id="${item.id}">
          <img src="${item.image}" class="mx-auto w-100 d-block" alt="${item.name} img-fluid">
          </div>`;
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

  $('.filter-all-button').click(function() {
    if (!$('#filter◊').hasClass('active')) $('#filter◊').click();
    if (!$('#filter◊◊').hasClass('active')) $('#filter◊◊').click();
    if (!$('#filter◊◊◊').hasClass('active')) $('#filter◊◊◊').click();
    if (!$('#filter◊◊◊◊').hasClass('active')) $('#filter◊◊◊◊').click();
    if (!$('#filter☆').hasClass('active')) $('#filter☆').click();
    if (!$('#filter☆☆').hasClass('active')) $('#filter☆☆').click();
    if (!$('#filter☆☆☆').hasClass('active')) $('#filter☆☆☆').click();
    if (!$('#filterCrown').hasClass('active')) $('#filterCrown').click();
  });

  $('body').on('click', '.selectable', function() {
    $(this).toggleClass('unselected');
    $(this).toggleClass('text-bg-secondary');
  });

  $('.copy-button').click(function() {
    let cardList = '';
    $('.selectable:not(.unselected)').each(function() {
      cardList += $(this).data('set') + ' ' + $(this).data('rarity') + ' ' + $(this).data('name') + '\n';
    })
    navigator.clipboard.writeText(cardList).then(() => {
    }).catch(err => {
        console.error("Failed to copy:", err);
    });
  });

  $('.export-button').click(function() {
    let cardList = '';
    $('.selectable:not(.unselected)').each(function() {
      cardList += $(this).data('set') + ':' + $(this).data('id') + ',';
    })
    navigator.clipboard.writeText(cardList.slice(0, -1)).then(() => {
    }).catch(err => {
        console.error("Failed to copy:", err);
    });
  });

  $('.import-button').click(function() {
    let inputText = $('#importField').val();
    let cards = inputText.split(',').map(item => item.split(':'));
    $('.selectable').each(function() {
      let select = cards.some(item => item[0] == $(this).data('set') && item[1] == $(this).data('id'));
      if (select && $(this).hasClass('unselected')) {
        $(this).removeClass('unselected');
        $(this).addClass('text-bg-secondary');
      } else if (!select && !$(this).hasClass('unselected')) {
        $(this).addClass('unselected');
        $(this).removeClass('text-bg-secondary');
      }
    })
  });
});
