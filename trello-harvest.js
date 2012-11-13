var iconUrl = chrome.extension.getURL('images/harvest-icon-background.png');

$(function() {

    $('.window').bind('DOMNodeInserted', function(e) {
        var $window = $(e.target);
        var $subscribeButton = $window.find('.js-subscribe-sidebar-button');

        if ($subscribeButton.length) {
            // Create the button node we want.
            $button = $('<a class="button-link"><span class="app-icon small-icon harvest-icon" style="background-image: url(' + iconUrl + ');"></span> Harvest</a>');

            // Listen for clicks on the button:
            $button.on('click', function(e) {
                // Find the board's title.
                var boardTitle = $('.js-board-title').html();

                // Find the card's ID from the sidebar.
                var cardId = $window.find('.window-sidebar > .window-module > .quiet.bottom > span > span').html().split(' ')[1];

                // Find the card's title from the window.
                var rawCardTitle = $window.find('.window-title-text').html();
                var cardTitle = (rawCardTitle.indexOf('(') == 0) ? rawCardTitle.match(/\(\d+\) ([^]*)/)[1] : rawCardTitle;

                // TODO: Add the shortLink to the card to the info.
                var cardUrl = window.location;

                // Format the message.
                var info = cardId + ' - ' + cardTitle + '\r\n' + cardUrl;

                // Copy the information into the clipboard:
                chrome.extension.sendRequest({ text: info });
            });

            // Append the element to the list right after the subscribe button.
            $subscribeButton.after($button);
        }
    });

});
