package motuz;

using StringTools;

class Tools {
    static private function convertWord(word:String):String {
        word = word.toLowerCase();
        word = word.replace("â", "a");
        word = word.replace("ê", "e");
        word = word.replace("î", "i");
        word = word.replace("ô", "o");
        word = word.replace("û", "u");
        word = word.replace("à", "a");
        word = word.replace("è", "e");
        word = word.replace("é", "e");
        word = word.replace("ì", "i");
        word = word.replace("ò", "o");
        word = word.replace("ù", "u");
        word = word.replace("ë", "e");
        word = word.replace("ï", "i");
        word = word.replace("ü", "u");
        return word;
    }

    static function main() {
        var dictionary_file = Sys.args()[0];
        var letter_count = Std.parseInt(Sys.args()[1]);
        Sys.println("Extracting " + letter_count + " letters words from " + dictionary_file);
        var content:String = sys.io.File.getContent(dictionary_file);
        var all_words = content.split("\n");
        var selected_words = new Array<String>();

        for(word in all_words) {
            if(word.length == letter_count) {
                var converted = convertWord(word);
                selected_words.push(converted);
            }
        }

        sys.io.File.saveContent(dictionary_file + "." + letter_count, selected_words.join("\n"));
    }
}
