compile:
	haxe build.hxml

dictionaries:
	for number in 5 6 7 8 14 15 16; do \
		hl build/tools.hl deps/words_en.txt $$number;\
		hl build/tools.hl deps/words_fr.txt $$number;\
		hl build/tools.hl deps/words_es.txt $$number;\
		hl build/tools.hl deps/words_de.txt $$number;\
	done

