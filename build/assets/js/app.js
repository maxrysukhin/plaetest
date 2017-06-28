(function() {
  'use strict';

  document.getElementById('form__button').onclick = function (e) {
    e.preventDefault();
    addComment();
  };

  document.getElementById('form__text').onkeydown = function (e) {
    if ((e.ctrlKey || e.metaKey) && (e.keyCode == 13 || e.keyCode == 10)) {
      addComment();
    }
  }

  let addComment = function () {
    let discussion = document.getElementsByClassName("posts"),
        posts = discussion[0].innerHTML,
        date = new Date(),
        text = document.getElementById('form__text'),
        textDate = date.getDate() + ' ' + getTextMonth(date) + ' ' + date.getYear();

    let comment = '<li class="post">' +
                '<div class="post__author">Аноним</div>' +
                '<div class="post__date">' + textDate + '</div>' +
                '<div class="post__text">' + text.value +
                '<div class="post__triangle"></div></div>' +
              '</li>';
    if (text.value !== '') {
      discussion[0].innerHTML = posts + comment;
      text.value = '';
    }
  };

  let getTextMonth = function (date) {
    let monthNames = ["января", "февраля", "марта", "апреля", "мая", "июня",
      "июля", "августа", "сентября", "октября", "ноября", "декабря"];

    return monthNames[date.getMonth()];
  }
})();
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ncmVhdGluZ19waWN0dXJlJykuY2xhc3NMaXN0LmFkZCgnbS0tc2hvdycpO1xuICB9LCAxMDAwKTtcbn0pKCk7Il19
