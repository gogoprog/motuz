package motuz;

import js.Browser.document;

enum State {
    LOADING;
    TYPING;
    CHECKING;
    FINISHING;
}

class Game {
    var wordLength = 5;

    var words:Array<String>;
    var solution:String;
    var current:String;
    var rowIndex:Int;
    var rowElement:js.html.Element;
    var state = LOADING;
    var rowModelElement:js.html.Element;
    var letterModelElement:js.html.Element;
    var lang:String = "fr";
    var inputElement:js.html.InputElement;

    public function new() {
        var p_lang = getParameter("lang");

        if(p_lang != null) {
            lang = p_lang;
        }

        var p_length = getParameter("length");

        if(p_length != null) {
            wordLength = Std.parseInt(p_length);
        }

        document.querySelector("#current-lang").innerText = lang;
        var selectElement = cast(document.querySelector("#letters"), js.html.SelectElement);
        selectElement.value = Std.string(wordLength);
        selectElement.addEventListener("change", function(e) {
            if(Std.parseInt(selectElement.value) != wordLength) {
                document.location.href = document.location.origin + document.location.pathname + "?lang=" + lang + "&length=" + selectElement.value;
            }
        });
        loadWords(lang);
        js.Browser.window.addEventListener("keydown", onType);
        letterModelElement = cast document.querySelector(".letter").cloneNode(true);
        rowModelElement = cast document.querySelector(".row");
        rowModelElement.parentNode.removeChild(rowModelElement);

        for(i in 0...wordLength-1) {
            var node = letterModelElement.cloneNode(true);
            rowModelElement.append(node);
        }

        for(i in 0...6) {
            document.querySelector(".centerframe").append(rowModelElement.cloneNode(true));
        }

        inputElement = cast document.querySelector("#input");
        inputElement.addEventListener("input", onInput);
    }


    static private function getParameter(name:String):String {
        var urlString = js.Browser.window.location.href;
        var url = new js.html.URL(urlString);
        return url.searchParams.get(name);
    }

    private function loadWords(lang:String) {
        showPopup("Loading dictionary...");
        var http = new haxe.Http("../deps/words_" + lang + ".txt." + wordLength);
        http.onData = function(data) {
            var received = data.split("\n");
            words = received;
            prepareNewGame();
        }
        http.request();
    }

    private function clearRows() {
        var letters = document.querySelectorAll(".letter");

        for(item in letters) {
            var el:js.html.Element = cast item;
            el.classList.remove("correct");
            el.classList.remove("useless");
            el.classList.remove("nothere");
            el.classList.remove("filled");
            el.innerText = "";
        }

        while(document.querySelectorAll(".row").length > 6) {
            var frame = document.querySelector(".centerframe");
            frame.removeChild(frame.lastChild);
        }
    }

    private function prepareNewGame() {
        showPopup("New game [" + lang + "]", 1000);
        clearRows();
        var r = Std.random(words.length);
        solution = words[r];
        state = TYPING;
        rowIndex = 0;
        onNewRow();
        setupInput();
    }

    private function onNewRow() {
        current = "";
        rowElement = cast document.querySelectorAll(".row")[rowIndex];
        state = TYPING;
    }

    private function setupInput() {
        var letterElement= getLetterElement(current.length);

        if(letterElement != null) {
            var rect = letterElement.getBoundingClientRect();
            inputElement.style.top = rect.top + "px";
            inputElement.style.left = rect.left + "px";
            inputElement.style.width = rect.width + "px";
            inputElement.style.height = rect.height + "px";
        }
    }

    private function onType(e) {
        switch(state) {
            case TYPING:
                var key:String = e.key;

                if(key.length == 1) {
                    if(document.activeElement != inputElement) {
                        var code = key.charCodeAt(0);

                        if(code >= 97 && code <= 122) {
                            addLetter(key);
                        }
                    }
                }

                if(e.keyCode == 13) {
                    check();
                } else if(e.keyCode == 8) {
                    removeLetter();
                }

            default:
        }
    }



    private var lastTimeStamp = 0;
    private var lastChar = "";

    private function onInput(e) {
        if(e.data != null && e.data != "") {
            var c = e.data.charAt(e.data.length - 1);

            if(c.length == 1) {
                c = c.toLowerCase();

                if(lastChar != c || e.timeStamp - lastTimeStamp > 150) { // :NOTE: Required for Firefox Mobile, clear the input resends the event.
                    addLetter(c);
                    lastChar = c;
                    lastTimeStamp = e.timeStamp;
                }

                inputElement.value = "";
            }
        }
    }

    private function getLetterElement(index:Int):js.html.Element {
        return cast rowElement.querySelectorAll(".letter")[index];
    }

    private function addLetter(letter:String) {
        if(current.length < wordLength) {
            current += letter;
            var el = getLetterElement(current.length - 1);
            el.innerText = letter;
            el.classList.add("filled");
            setupInput();
        }
    }

    private function removeLetter() {
        if(current.length > 0) {
            var el = getLetterElement(current.length - 1);
            el.innerText = "";
            el.classList.remove("filled");
            current = current.substr(0, current.length - 1);
            setupInput();
        }
    }

    private function bounceRow() {
        rowElement.classList.remove("bounce");
        haxe.Timer.delay(function() {rowElement.classList.add("bounce");}, 1);
    }

    private function check() {
        state = CHECKING;

        if(current.length < wordLength) {
            showPopup("Not enough letters!", 1000);
            state = TYPING;
            bounceRow();
            return;
        }

        var index = words.indexOf(current);

        if(index == -1) {
            showPopup("Unknown word?", 1000);
            state = TYPING;
            bounceRow();
            return;
        } else {
            checkLetter(0);
        }
    }

    private function checkLetter(index:Int) {
        var el = getLetterElement(index);
        el.classList.remove("filled");
        var c = current.charAt(index);
        var d = solution.charAt(index);

        if(c == d) {
            el.classList.add("correct");
        } else {
            if(solution.indexOf(c) != -1) {
                el.classList.add("nothere");
            } else {
                el.classList.add("useless");
            }
        }

        if(index < wordLength - 1) {
            haxe.Timer.delay(function() {checkLetter(index + 1);}, 200);
        } else {
            if(current == solution) {
                showPopup("Correct!", 2000);
                haxe.Timer.delay(prepareNewGame, 2000);
            } else {
                rowIndex++;
                onNewRow();

                if(rowElement == null) {
                    document.querySelector(".centerframe").append(rowModelElement.cloneNode(true));
                    rowElement = cast document.querySelectorAll(".row")[rowIndex];
                    js.Browser.window.scrollTo(0, document.body.scrollHeight);
                }

                setupInput();
            }
        }
    }

    private function showPopup(msg:String, ?duration = 0) {
        var el = document.querySelector(".popup");
        el.innerText = msg;
        el.style.opacity = "1";

        if(duration != 0) {
            haxe.Timer.delay(hidePopup, duration);
        }
    }

    private function hidePopup() {
        document.querySelector(".popup").style.opacity = "0";
    }

    static function main() {
        new Game();
    }
}
