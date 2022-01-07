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
    var state = LOADING;

    public function new() {
        loadWords("fr");
        js.Browser.window.addEventListener("keydown", onType);
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

            trace(words);
            prepareNewGame();
        }
        http.request();
    }

    private function prepareNewGame() {
        solution = Std.random(words.length);
        state = TYPING;
        current = "";
        rowIndex = 0;
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

            default:
        }
    }

    private function addLetter(letter:String) {
        current += letter;
        var row:js.html.Element = cast document.querySelectorAll(".row")[rowIndex];
        var el:js.html.Element = cast row.querySelectorAll(".letter")[current.length - 1];
        el.innerText = letter;

        if(current.length == wordLength) {
        }
    }

    static function main() {
        new Motuz();
    }
}
