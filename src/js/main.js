"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Created by Павел on 02.04.2017.
 */
var Message = function Message(person, text, time) {
    _classCallCheck(this, Message);

    this.person = person;
    this.text = text;
    this.time = time;
};

var ls = localStorage["testChatHistory"];
console.log(ls);
if (ls == undefined) {
    localStorage["testChatHistory"] = JSON.stringify([new Message()]);
    console.log(localStorage["testChatHistory"]);
}

$(document).ready(function () {
    var $login = $(".login"),
        $chat = $(".chat"),
        $formLogin = $("#form-login"),
        $inputName = $("#input-name"),
        $names = $(".names"),
        name = "",
        $buttonSend = $("#message-send"),
        $messageInput = $("#message-input"),
        message = void 0,
        $chatFeed = $(".message-feed"),
        history = [];

    function addMessage(message) {
        var $newMessage = $("<div>").appendTo($chatFeed);
        if (message.person !== name) $newMessage.addClass("income-message");else $newMessage.addClass("user-message");
        $newMessage.load("message.html", function () {
            $newMessage.find(".message__text").html(message.text).end().find(".time").html(message.time);
            $(".message-window").scrollTop($chatFeed.prop('scrollHeight'));
        });
    }

    $chat.hide();
    $formLogin.submit(function (event) {
        event.preventDefault();
        if ($inputName.val() !== "") {
            if (JSON.parse(localStorage["testChatHistory"]).length != 1) {
                history = JSON.parse(localStorage["testChatHistory"]);
            }
            name = $inputName.val();
            $names.html(name);
            $login.fadeOut(1000);
            $chat.fadeIn(1000);
            $chatFeed.html("");
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = history[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var item = _step.value;

                    addMessage(item);
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }
        } else {
            alert("Пожалуйста введите свое имя");
        }
    });
    $buttonSend.click(function () {
        if ($messageInput.val() !== "") {
            message = new Message(name, $messageInput.val(), new Date());
            addMessage(message);
            history.push(message);
            localStorage["testChatHistory"] = JSON.stringify(history);
        }
        $messageInput.val("");
    });
    $messageInput.keydown(function (event) {
        if (event.which == 13 && $messageInput.val() !== "") {
            message = new Message(name, $messageInput.val(), new Date());
            addMessage(message);
            $messageInput.val("");
            history.push(message);
            localStorage["testChatHistory"] = JSON.stringify(history);
        }
    });
});