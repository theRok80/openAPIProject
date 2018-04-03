let changeColor = document.getElementById('changeColor');
let restoreColor = document.getElementById('restoreColor');

chrome.storage.sync.get('color', function(data) {
    changeColor.style.backgroundColor = data.color;
    changeColor.setAttribute('value', data.color);
});

changeColor.onclick = function(element) {
    let color = element.target.value;
    chrome.tabs.executeScript(
        // tabs[0].id,
        {code: 'document.body.style.backgroundColor = "' + color + '";'}
    );
  };

restoreColor.onclick = function() {
    chrome.tabs.executeScript(
        {code: 'document.body.style.backgroundColor = null;'}
    );
};