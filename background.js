function copyToClipboard(text) {
    var input = document.getElementById("trello-harvest-clipboard");
    input.innerHTML = text;
    input.focus();
    input.select();
    document.execCommand('copy');
}

chrome.extension.onRequest.addListener(function(obj) {
    copyToClipboard(obj.text);
});
