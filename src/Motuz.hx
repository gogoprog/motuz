package;

import js.Browser.document;

enum State {
    LOADING;
    TYPING;
    CHECKING;
    FINISHING;
}

class Motuz {
    var wordLength = 5;

    var words:Array<String>;
    var solution:Int;
    var current:String;
    var rowIndex:Int;
    var rowElement:js.html.Element;
    var state = LOADING;
    var rowModelElement:js.html.Element;

    public function new() {
        loadWords("fr");
        js.Browser.window.addEventListener("keydown", onType);
        rowModelElement = cast document.querySelector(".row").cloneNode(true);
    }

    private function loadWords(lang:String) {
        words = [];
        var http = new haxe.Http("../deps/words_" + lang + ".txt");
        http.onData = function(data) {
            var received = data.split("\n");
            words = [];

            for(word in received) {
                if(word.length == wordLength) {
                    words.push(word);
                }
            }

            prepareNewGame();
        }
        http.request();
    }

    private function prepareNewGame() {
        solution = Std.random(words.length);
        state = TYPING;
        current = "";
        rowIndex = 0;
        rowElement = cast document.querySelectorAll(".row")[rowIndex];
    }

    private function onType(e) {
        switch(state) {
            case TYPING:
                var key:String = e.key;

                if(key.length == 1) {
                    var code = key.charCodeAt(0);

                    if(code >= 97 && code <= 122) {
                        addLetter(key);
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

    private function getLetterElement(index:Int):js.html.Element {
        return cast rowElement.querySelectorAll(".letter")[index];
    }

    private function addLetter(letter:String) {
        if(current.length < wordLength) {
            current += letter;
            var el = getLetterElement(current.length - 1);
            el.innerText = letter;
            el.classList.add("filled");
        }
    }

    private function removeLetter() {
        if(current.length > 0) {
            var el = getLetterElement(current.length - 1);
            el.innerText = "";
            el.classList.remove("filled");
            current = current.substr(0, current.length - 1);
        }
    }

    private function check() {
        state = CHECKING;

        if(current.length < wordLength) {
            trace("Not enough letters");
            state = TYPING;
            return;
        }

        var index = words.indexOf(current);

        if(index == -1) {
            trace("Not a real word");
            state = TYPING;
            return;
        } else {
            trace("Ok : " + current);
            checkLetter(0);
        }
    }

    private function checkLetter(index:Int) {
        var el = getLetterElement(index);
        el.classList.remove("filled");
        var c = current.charAt(index);
        var d = words[solution].charAt(index);

        if(c == d) {
            el.classList.add("correct");
        } else {
            if(words[solution].indexOf(c) != -1) {
                el.classList.add("nothere");
            } else {
                el.classList.add("useless");
            }
        }

        if(index < wordLength - 1) {
            haxe.Timer.delay(function() {checkLetter(index + 1);}, 5);
        } else {
            if(current == words[solution]) {
                trace("winrar!");
            } else {
                state = TYPING;
                rowIndex++;
                rowElement = cast document.querySelectorAll(".row")[rowIndex];
                current = "";

                if(rowElement == null) {
                    document.querySelector(".centerframe").append(rowModelElement.cloneNode(true));
                    rowElement = cast document.querySelectorAll(".row")[rowIndex];
                }
            }
        }
    }

    static function main() {
        new Motuz();
    }
}
