var sayThis;
var wordList;
var lang;
var voiceName;
var functionName;
var tabId;

chrome.storage.local.get('lang', function(data){
    if (typeof (data.lang) == "undefined") {
        chrome.storage.local.set({'lang':'ko-KR', 'voiceName':'Yuna'});
        lang = "ko-KR";
        voiceName = "Yuna";
    } else {
        lang = data.lang;
        voiceName = data.voiceName;
    }
    $('.radioLang').each(function(){
        var _this = $(this);
        if (_this.val() == lang) {
            _this.prop('checked',true).parent().addClass('active');
            return;
        }
    });
});

chrome.storage.local.get('tabId', function(data){
    if (typeof (data.tabId) == "undefined") {
        chrome.storage.local.set({'tabId':'tts'});
        tabId = "tts";
    } else {
        tabId = data.tabId;
    }
    showTabs();
});

$(document).ready(function() {
    sayThis = $("#sayThis");
    wordList = $("#wordList");

    chrome.tabs.executeScript( {
        code: "window.getSelection().toString();"
    }, function(selection) {
        if (typeof(selection[0]) != "undefined") {
            sayThis.val(selection[0]);
        }
    });

    $('#speak').click(function(event){
        chrome.tts.stop();
        if (sayThis.val()) {
            chrome.tts.speak(sayThis.val(), {
                rate : 0.8,
                lang: lang,
                voiceName : voiceName,
                onEvent: function(event) {
                    // console.log(event.type);
                }
            });
        }
    });

    $('.radioLang').change(function(){
        lang = $('.radioLang:checked').val(),
        voiceName = $('.radioLang:checked').data('name');
        chrome.storage.local.set({'lang':lang, 'voiceName':voiceName});
    });

    sayThis. on('focus',function(event){
        chrome.tts.stop();
    });

    $(document).on('click', '#btnFunctionSearch', function(){
        var _value = $('#functionName').val();
        if (_value) {
            functionName = _.unescape(_value);
            functionName = functionName.replace(/\u200B/g,'');
            chrome.storage.local.set({'functionName':functionName});
            callPHPnet();
        }
    });

    $(document).on('click', '.nav-link', function() {
        var _this = $(this),
            _value = _this.data('value');
        if (_value) {
            chrome.storage.local.set({'tabId':_value});
            tabId = _value;
            showTabs();
        }
    });

    $(window).on('keypress',function(event){
        if ($('#functionName').is(':focus') && event.keyCode == 13) {
            $('#btnFunctionSearch').trigger('click');
        }
    });

    $(document).on('click', '.linkToPHPnet', function(event){
        event.preventDefault();
        $('#functionName').val($(this).text());
        $('#btnFunctionSearch').trigger('click');
    });

    $(document).on('click', '#functionName', function(){
        var _this = $(this);
        if (_this.val()) {
            _this.data('preVal',_this.val());
            _this.val('');
        }
    });

    $(document).on('blur', '#functionName', function(){
        var _this = $(this);
        if (_this.data('preVal')) {
            _this.val(_this.data('preVal'));
        }
    });
});

function showTabs() {
    if ($('#' + tabId).length > 0) {
        $('.nav-link').each(function(){
            if ($(this).data('value') == tabId) {
                $(this).addClass('active');
            } else {
                $(this).removeClass('active');
            }
        });
        $('.container-fluid > .container').each(function(){
            if ($(this).attr('id') == tabId) {
                $(this).removeClass('d-none');
            } else {
                $(this).addClass('d-none');
            }
        });

        if (tabId == "functionSearch") {
            chrome.storage.local.get('functionName', function(data){
                if (typeof (data.functionName) != "undefined") {
                    $('#functionName').val(data.functionName);
                    $('#btnFunctionSearch').trigger('click');
                }
            });
        }
    }
}

function callPHPnet() {
    var div = $('#functionDesc');
    var xhr = new XMLHttpRequest();
    var url = "http://php.net/manual-lookup.php?pattern=" + functionName + "&scope=quickref";
    xhr.open("GET", url, true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            var tmp = $('<div>').html(xhr.responseText);
            tmp.find('.child-menu-list a').each(function(){
                $(this).addClass('linkToPHPnet');
            });

            tmp.find('a:not(.linkToPHPnet)').each(function(){
                $(this).wrapInner('<span>');
                $(this).find('span').unwrap();
            });

            var html = "";
            div.html('');
            if (tmp.find('.description').length > 0) {
                html += tmp.find('.description').html();
                html += '<p></p>';
                html += tmp.find('.parameters').html();

                if (tmp.find('.parent-menu-list').length > 0) {
                    tmp.find('.parent-menu-list').addClass('container').wrap('<div id="tmpList">');
                    tmp.find('.parent-menu-list .child-menu-list').addClass('pl-2');
                    html += tmp.find('#tmpList').html();
                }

                html += '<a href="' + url + ' " id="btnViewInPHP" class="btn btn-success btn-sm" style="font-size:0.8rem" target="_blank">VIEW IN PHP.net</button>';
                div.html(html);
            } else if (tmp.find('.partintro').length > 0) {
                html += tmp.find('.partintro').html();
                div.html(html);
            } else {
                html += "<div class='notFound'>" + functionName + " doesn't exist. Closest matches:</div>";
                xhr.open("GET", url, true);
                xhr.onreadystatechange = function() {
                    if (xhr.readyState == 4) {
                        var tmp = $('<div>').html(xhr.responseText);
                        tmp.find('#quickref_functions li a').each(function(){
                            $(this).addClass('linkToPHPnet');
                        });
                        tmp.find('#quickref_functions').wrap('<div id="tmpList">');
                        html += tmp.find('#tmpList').html();
                        div.html(html);
                    }
                }
                xhr.send();
            }
            div.show();
            window.scrollTo(0, 0);
        }
    }
    xhr.send();
}