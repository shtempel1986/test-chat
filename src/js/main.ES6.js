/**
 * Created by Павел on 02.04.2017.
 */
class Message {
    constructor(person, text, time) {
        this.person = person;
        this.text = text;
        this.time = time;
    }
}
let ls = localStorage["testChatHistory"];
console.log(ls);
if (ls == undefined) {
    localStorage["testChatHistory"] = JSON.stringify([new Message()]);
    console.log(localStorage["testChatHistory"]);
}

$(document).ready(()=> {
    let $login = $(".login"),
        $chat = $(".chat"),
        $formLogin = $("#form-login"),
        $inputName = $("#input-name"),
        $names = $(".names"),
        name = "",
        $buttonSend = $("#message-send"),
        $messageInput = $("#message-input"),
        message,
        $chatFeed = $(".message-feed"),
        history = [];

    function addMessage(message) {
        let $newMessage = $("<div>").appendTo($chatFeed);
        if (message.person !== name) $newMessage.addClass("income-message");
        else $newMessage.addClass("user-message");
        $newMessage.load("message.html", function () {
            $newMessage.find(".message__text").html(message.text).end().find(".time").html(message.time);
            $(".message-window").scrollTop($chatFeed.prop('scrollHeight'));
        });

    }

    $chat.hide();
    $formLogin.submit((event)=> {
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
            for (let item of history) {
                addMessage(item)
            }
        } else {
            alert("Пожалуйста введите свое имя");
        }
    });
    $buttonSend.click(()=> {
        if ($messageInput.val() !== "") {
            message = new Message(name, $messageInput.val(), new Date());
            addMessage(message);
            history.push(message);
            localStorage["testChatHistory"] = JSON.stringify(history);
        }
        $messageInput.val("");
    });
    $messageInput.keydown((event)=> {
        if (event.which == 13 && $messageInput.val() !== "") {
            message = new Message(name, $messageInput.val(), new Date());
            addMessage(message);
            $messageInput.val("");
            history.push(message);
            localStorage["testChatHistory"] = JSON.stringify(history);
        }
    });
});