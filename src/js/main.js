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
        $chatWindow = $(".message-window");

    function addMessage() {
        if ($messageInput.val() !== "") {
            var $newMessage = $("<div>").appendTo($chatWindow);
            message = new Message(name, $messageInput.val(), new Date());
            $newMessage.addClass("user-message").load("message.html", function () {
                $newMessage.find(".message__text").html(message.text).end().find(".time").html(message.time);
            });
        }
    };
    $chat.hide();
    $formLogin.submit(function (event) {
        event.preventDefault();
        if ($inputName.val() !== "") {
            name = $inputName.val();
            $names.html(name);
            $login.fadeOut(1000);
            $chat.fadeIn(1000);
        } else {
            alert("Пожалуйста введите свое имя");
        }
    });
    $buttonSend.click(function () {
        addMessage();
    });
});