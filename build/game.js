(function ($global) { "use strict";
var $estr = function() { return js_Boot.__string_rec(this,''); },$hxEnums = $hxEnums || {},$_;
function $extend(from, fields) {
	var proto = Object.create(from);
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var EReg = function(r,opt) {
	this.r = new RegExp(r,opt.split("u").join(""));
};
EReg.__name__ = true;
EReg.prototype = {
	match: function(s) {
		if(this.r.global) {
			this.r.lastIndex = 0;
		}
		this.r.m = this.r.exec(s);
		this.r.s = s;
		return this.r.m != null;
	}
	,__class__: EReg
};
var HxOverrides = function() { };
HxOverrides.__name__ = true;
HxOverrides.cca = function(s,index) {
	var x = s.charCodeAt(index);
	if(x != x) {
		return undefined;
	}
	return x;
};
HxOverrides.substr = function(s,pos,len) {
	if(len == null) {
		len = s.length;
	} else if(len < 0) {
		if(pos == 0) {
			len = s.length + len;
		} else {
			return "";
		}
	}
	return s.substr(pos,len);
};
HxOverrides.now = function() {
	return Date.now();
};
var Lambda = function() { };
Lambda.__name__ = true;
Lambda.exists = function(it,f) {
	var x = $getIterator(it);
	while(x.hasNext()) {
		var x1 = x.next();
		if(f(x1)) {
			return true;
		}
	}
	return false;
};
Math.__name__ = true;
var Reflect = function() { };
Reflect.__name__ = true;
Reflect.isFunction = function(f) {
	if(typeof(f) == "function") {
		return !(f.__name__ || f.__ename__);
	} else {
		return false;
	}
};
Reflect.compareMethods = function(f1,f2) {
	if(f1 == f2) {
		return true;
	}
	if(!Reflect.isFunction(f1) || !Reflect.isFunction(f2)) {
		return false;
	}
	if(f1.scope == f2.scope && f1.method == f2.method) {
		return f1.method != null;
	} else {
		return false;
	}
};
var Std = function() { };
Std.__name__ = true;
Std.string = function(s) {
	return js_Boot.__string_rec(s,"");
};
Std.parseInt = function(x) {
	if(x != null) {
		var _g = 0;
		var _g1 = x.length;
		while(_g < _g1) {
			var i = _g++;
			var c = x.charCodeAt(i);
			if(c <= 8 || c >= 14 && c != 32 && c != 45) {
				var nc = x.charCodeAt(i + 1);
				var v = parseInt(x,nc == 120 || nc == 88 ? 16 : 10);
				if(isNaN(v)) {
					return null;
				} else {
					return v;
				}
			}
		}
	}
	return null;
};
Std.random = function(x) {
	if(x <= 0) {
		return 0;
	} else {
		return Math.floor(Math.random() * x);
	}
};
var haxe_Exception = function(message,previous,native) {
	Error.call(this,message);
	this.message = message;
	this.__previousException = previous;
	this.__nativeException = native != null ? native : this;
};
haxe_Exception.__name__ = true;
haxe_Exception.caught = function(value) {
	if(((value) instanceof haxe_Exception)) {
		return value;
	} else if(((value) instanceof Error)) {
		return new haxe_Exception(value.message,null,value);
	} else {
		return new haxe_ValueException(value,null,value);
	}
};
haxe_Exception.thrown = function(value) {
	if(((value) instanceof haxe_Exception)) {
		return value.get_native();
	} else if(((value) instanceof Error)) {
		return value;
	} else {
		var e = new haxe_ValueException(value);
		return e;
	}
};
haxe_Exception.__super__ = Error;
haxe_Exception.prototype = $extend(Error.prototype,{
	unwrap: function() {
		return this.__nativeException;
	}
	,get_native: function() {
		return this.__nativeException;
	}
	,__class__: haxe_Exception
});
var haxe_Timer = function(time_ms) {
	var me = this;
	this.id = setInterval(function() {
		me.run();
	},time_ms);
};
haxe_Timer.__name__ = true;
haxe_Timer.delay = function(f,time_ms) {
	var t = new haxe_Timer(time_ms);
	t.run = function() {
		t.stop();
		f();
	};
	return t;
};
haxe_Timer.prototype = {
	stop: function() {
		if(this.id == null) {
			return;
		}
		clearInterval(this.id);
		this.id = null;
	}
	,run: function() {
	}
	,__class__: haxe_Timer
};
var haxe_ValueException = function(value,previous,native) {
	haxe_Exception.call(this,String(value),previous,native);
	this.value = value;
};
haxe_ValueException.__name__ = true;
haxe_ValueException.__super__ = haxe_Exception;
haxe_ValueException.prototype = $extend(haxe_Exception.prototype,{
	unwrap: function() {
		return this.value;
	}
	,__class__: haxe_ValueException
});
var haxe_http_HttpBase = function(url) {
	this.url = url;
	this.headers = [];
	this.params = [];
	this.emptyOnData = $bind(this,this.onData);
};
haxe_http_HttpBase.__name__ = true;
haxe_http_HttpBase.prototype = {
	onData: function(data) {
	}
	,onBytes: function(data) {
	}
	,onError: function(msg) {
	}
	,onStatus: function(status) {
	}
	,hasOnData: function() {
		return !Reflect.compareMethods($bind(this,this.onData),this.emptyOnData);
	}
	,success: function(data) {
		this.responseBytes = data;
		this.responseAsString = null;
		if(this.hasOnData()) {
			this.onData(this.get_responseData());
		}
		this.onBytes(this.responseBytes);
	}
	,get_responseData: function() {
		if(this.responseAsString == null && this.responseBytes != null) {
			this.responseAsString = this.responseBytes.getString(0,this.responseBytes.length,haxe_io_Encoding.UTF8);
		}
		return this.responseAsString;
	}
	,__class__: haxe_http_HttpBase
};
var haxe_http_HttpJs = function(url) {
	this.async = true;
	this.withCredentials = false;
	haxe_http_HttpBase.call(this,url);
};
haxe_http_HttpJs.__name__ = true;
haxe_http_HttpJs.__super__ = haxe_http_HttpBase;
haxe_http_HttpJs.prototype = $extend(haxe_http_HttpBase.prototype,{
	request: function(post) {
		var _gthis = this;
		this.responseAsString = null;
		this.responseBytes = null;
		var r = this.req = js_Browser.createXMLHttpRequest();
		var onreadystatechange = function(_) {
			if(r.readyState != 4) {
				return;
			}
			var s;
			try {
				s = r.status;
			} catch( _g ) {
				s = null;
			}
			if(s == 0 && js_Browser.get_supported() && $global.location != null) {
				var protocol = $global.location.protocol.toLowerCase();
				var rlocalProtocol = new EReg("^(?:about|app|app-storage|.+-extension|file|res|widget):$","");
				var isLocal = rlocalProtocol.match(protocol);
				if(isLocal) {
					s = r.response != null ? 200 : 404;
				}
			}
			if(s == undefined) {
				s = null;
			}
			if(s != null) {
				_gthis.onStatus(s);
			}
			if(s != null && s >= 200 && s < 400) {
				_gthis.req = null;
				_gthis.success(haxe_io_Bytes.ofData(r.response));
			} else if(s == null || s == 0 && r.response == null) {
				_gthis.req = null;
				_gthis.onError("Failed to connect or resolve host");
			} else if(s == null) {
				_gthis.req = null;
				var onreadystatechange = r.response != null ? haxe_io_Bytes.ofData(r.response) : null;
				_gthis.responseBytes = onreadystatechange;
				_gthis.onError("Http Error #" + r.status);
			} else {
				switch(s) {
				case 12007:
					_gthis.req = null;
					_gthis.onError("Unknown host");
					break;
				case 12029:
					_gthis.req = null;
					_gthis.onError("Failed to connect to host");
					break;
				default:
					_gthis.req = null;
					var onreadystatechange = r.response != null ? haxe_io_Bytes.ofData(r.response) : null;
					_gthis.responseBytes = onreadystatechange;
					_gthis.onError("Http Error #" + r.status);
				}
			}
		};
		if(this.async) {
			r.onreadystatechange = onreadystatechange;
		}
		var uri;
		var _g = this.postData;
		var _g1 = this.postBytes;
		if(_g == null) {
			if(_g1 == null) {
				uri = null;
			} else {
				var bytes = _g1;
				uri = new Blob([bytes.b.bufferValue]);
			}
		} else if(_g1 == null) {
			var str = _g;
			uri = str;
		} else {
			uri = null;
		}
		if(uri != null) {
			post = true;
		} else {
			var _g = 0;
			var _g1 = this.params;
			while(_g < _g1.length) {
				var p = _g1[_g];
				++_g;
				if(uri == null) {
					uri = "";
				} else {
					uri = (uri == null ? "null" : Std.string(uri)) + "&";
				}
				var s = p.name;
				var value = (uri == null ? "null" : Std.string(uri)) + encodeURIComponent(s) + "=";
				var s1 = p.value;
				uri = value + encodeURIComponent(s1);
			}
		}
		try {
			if(post) {
				r.open("POST",this.url,this.async);
			} else if(uri != null) {
				var question = this.url.split("?").length <= 1;
				r.open("GET",this.url + (question ? "?" : "&") + (uri == null ? "null" : Std.string(uri)),this.async);
				uri = null;
			} else {
				r.open("GET",this.url,this.async);
			}
			r.responseType = "arraybuffer";
		} catch( _g ) {
			var e = haxe_Exception.caught(_g).unwrap();
			this.req = null;
			this.onError(e.toString());
			return;
		}
		r.withCredentials = this.withCredentials;
		if(!Lambda.exists(this.headers,function(h) {
			return h.name == "Content-Type";
		}) && post && this.postData == null) {
			r.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		}
		var _g = 0;
		var _g1 = this.headers;
		while(_g < _g1.length) {
			var h = _g1[_g];
			++_g;
			r.setRequestHeader(h.name,h.value);
		}
		r.send(uri);
		if(!this.async) {
			onreadystatechange(null);
		}
	}
	,__class__: haxe_http_HttpJs
});
var haxe_io_Bytes = function(data) {
	this.length = data.byteLength;
	this.b = new Uint8Array(data);
	this.b.bufferValue = data;
	data.hxBytes = this;
	data.bytes = this.b;
};
haxe_io_Bytes.__name__ = true;
haxe_io_Bytes.ofData = function(b) {
	var hb = b.hxBytes;
	if(hb != null) {
		return hb;
	}
	return new haxe_io_Bytes(b);
};
haxe_io_Bytes.prototype = {
	getString: function(pos,len,encoding) {
		if(pos < 0 || len < 0 || pos + len > this.length) {
			throw haxe_Exception.thrown(haxe_io_Error.OutsideBounds);
		}
		if(encoding == null) {
			encoding = haxe_io_Encoding.UTF8;
		}
		var s = "";
		var b = this.b;
		var i = pos;
		var max = pos + len;
		switch(encoding._hx_index) {
		case 0:
			var debug = pos > 0;
			while(i < max) {
				var c = b[i++];
				if(c < 128) {
					if(c == 0) {
						break;
					}
					s += String.fromCodePoint(c);
				} else if(c < 224) {
					var code = (c & 63) << 6 | b[i++] & 127;
					s += String.fromCodePoint(code);
				} else if(c < 240) {
					var c2 = b[i++];
					var code1 = (c & 31) << 12 | (c2 & 127) << 6 | b[i++] & 127;
					s += String.fromCodePoint(code1);
				} else {
					var c21 = b[i++];
					var c3 = b[i++];
					var u = (c & 15) << 18 | (c21 & 127) << 12 | (c3 & 127) << 6 | b[i++] & 127;
					s += String.fromCodePoint(u);
				}
			}
			break;
		case 1:
			while(i < max) {
				var c = b[i++] | b[i++] << 8;
				s += String.fromCodePoint(c);
			}
			break;
		}
		return s;
	}
	,__class__: haxe_io_Bytes
};
var haxe_io_Encoding = $hxEnums["haxe.io.Encoding"] = { __ename__:true,__constructs__:null
	,UTF8: {_hx_name:"UTF8",_hx_index:0,__enum__:"haxe.io.Encoding",toString:$estr}
	,RawNative: {_hx_name:"RawNative",_hx_index:1,__enum__:"haxe.io.Encoding",toString:$estr}
};
haxe_io_Encoding.__constructs__ = [haxe_io_Encoding.UTF8,haxe_io_Encoding.RawNative];
var haxe_io_Error = $hxEnums["haxe.io.Error"] = { __ename__:true,__constructs__:null
	,Blocked: {_hx_name:"Blocked",_hx_index:0,__enum__:"haxe.io.Error",toString:$estr}
	,Overflow: {_hx_name:"Overflow",_hx_index:1,__enum__:"haxe.io.Error",toString:$estr}
	,OutsideBounds: {_hx_name:"OutsideBounds",_hx_index:2,__enum__:"haxe.io.Error",toString:$estr}
	,Custom: ($_=function(e) { return {_hx_index:3,e:e,__enum__:"haxe.io.Error",toString:$estr}; },$_._hx_name="Custom",$_.__params__ = ["e"],$_)
};
haxe_io_Error.__constructs__ = [haxe_io_Error.Blocked,haxe_io_Error.Overflow,haxe_io_Error.OutsideBounds,haxe_io_Error.Custom];
var haxe_iterators_ArrayIterator = function(array) {
	this.current = 0;
	this.array = array;
};
haxe_iterators_ArrayIterator.__name__ = true;
haxe_iterators_ArrayIterator.prototype = {
	hasNext: function() {
		return this.current < this.array.length;
	}
	,next: function() {
		return this.array[this.current++];
	}
	,__class__: haxe_iterators_ArrayIterator
};
var js_Boot = function() { };
js_Boot.__name__ = true;
js_Boot.getClass = function(o) {
	if(o == null) {
		return null;
	} else if(((o) instanceof Array)) {
		return Array;
	} else {
		var cl = o.__class__;
		if(cl != null) {
			return cl;
		}
		var name = js_Boot.__nativeClassName(o);
		if(name != null) {
			return js_Boot.__resolveNativeClass(name);
		}
		return null;
	}
};
js_Boot.__string_rec = function(o,s) {
	if(o == null) {
		return "null";
	}
	if(s.length >= 5) {
		return "<...>";
	}
	var t = typeof(o);
	if(t == "function" && (o.__name__ || o.__ename__)) {
		t = "object";
	}
	switch(t) {
	case "function":
		return "<function>";
	case "object":
		if(o.__enum__) {
			var e = $hxEnums[o.__enum__];
			var con = e.__constructs__[o._hx_index];
			var n = con._hx_name;
			if(con.__params__) {
				s = s + "\t";
				return n + "(" + ((function($this) {
					var $r;
					var _g = [];
					{
						var _g1 = 0;
						var _g2 = con.__params__;
						while(true) {
							if(!(_g1 < _g2.length)) {
								break;
							}
							var p = _g2[_g1];
							_g1 = _g1 + 1;
							_g.push(js_Boot.__string_rec(o[p],s));
						}
					}
					$r = _g;
					return $r;
				}(this))).join(",") + ")";
			} else {
				return n;
			}
		}
		if(((o) instanceof Array)) {
			var str = "[";
			s += "\t";
			var _g = 0;
			var _g1 = o.length;
			while(_g < _g1) {
				var i = _g++;
				str += (i > 0 ? "," : "") + js_Boot.__string_rec(o[i],s);
			}
			str += "]";
			return str;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( _g ) {
			return "???";
		}
		if(tostr != null && tostr != Object.toString && typeof(tostr) == "function") {
			var s2 = o.toString();
			if(s2 != "[object Object]") {
				return s2;
			}
		}
		var str = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		var k = null;
		for( k in o ) {
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str.length != 2) {
			str += ", \n";
		}
		str += s + k + " : " + js_Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str += "\n" + s + "}";
		return str;
	case "string":
		return o;
	default:
		return String(o);
	}
};
js_Boot.__interfLoop = function(cc,cl) {
	if(cc == null) {
		return false;
	}
	if(cc == cl) {
		return true;
	}
	var intf = cc.__interfaces__;
	if(intf != null) {
		var _g = 0;
		var _g1 = intf.length;
		while(_g < _g1) {
			var i = _g++;
			var i1 = intf[i];
			if(i1 == cl || js_Boot.__interfLoop(i1,cl)) {
				return true;
			}
		}
	}
	return js_Boot.__interfLoop(cc.__super__,cl);
};
js_Boot.__instanceof = function(o,cl) {
	if(cl == null) {
		return false;
	}
	switch(cl) {
	case Array:
		return ((o) instanceof Array);
	case Bool:
		return typeof(o) == "boolean";
	case Dynamic:
		return o != null;
	case Float:
		return typeof(o) == "number";
	case Int:
		if(typeof(o) == "number") {
			return ((o | 0) === o);
		} else {
			return false;
		}
		break;
	case String:
		return typeof(o) == "string";
	default:
		if(o != null) {
			if(typeof(cl) == "function") {
				if(js_Boot.__downcastCheck(o,cl)) {
					return true;
				}
			} else if(typeof(cl) == "object" && js_Boot.__isNativeObj(cl)) {
				if(((o) instanceof cl)) {
					return true;
				}
			}
		} else {
			return false;
		}
		if(cl == Class ? o.__name__ != null : false) {
			return true;
		}
		if(cl == Enum ? o.__ename__ != null : false) {
			return true;
		}
		return o.__enum__ != null ? $hxEnums[o.__enum__] == cl : false;
	}
};
js_Boot.__downcastCheck = function(o,cl) {
	if(!((o) instanceof cl)) {
		if(cl.__isInterface__) {
			return js_Boot.__interfLoop(js_Boot.getClass(o),cl);
		} else {
			return false;
		}
	} else {
		return true;
	}
};
js_Boot.__cast = function(o,t) {
	if(o == null || js_Boot.__instanceof(o,t)) {
		return o;
	} else {
		throw haxe_Exception.thrown("Cannot cast " + Std.string(o) + " to " + Std.string(t));
	}
};
js_Boot.__nativeClassName = function(o) {
	var name = js_Boot.__toStr.call(o).slice(8,-1);
	if(name == "Object" || name == "Function" || name == "Math" || name == "JSON") {
		return null;
	}
	return name;
};
js_Boot.__isNativeObj = function(o) {
	return js_Boot.__nativeClassName(o) != null;
};
js_Boot.__resolveNativeClass = function(name) {
	return $global[name];
};
var js_Browser = function() { };
js_Browser.__name__ = true;
js_Browser.get_supported = function() {
	if(typeof(window) != "undefined" && typeof(window.location) != "undefined") {
		return typeof(window.location.protocol) == "string";
	} else {
		return false;
	}
};
js_Browser.createXMLHttpRequest = function() {
	if(typeof XMLHttpRequest != "undefined") {
		return new XMLHttpRequest();
	}
	if(typeof ActiveXObject != "undefined") {
		return new ActiveXObject("Microsoft.XMLHTTP");
	}
	throw haxe_Exception.thrown("Unable to create XMLHttpRequest object.");
};
var motuz_State = $hxEnums["motuz.State"] = { __ename__:true,__constructs__:null
	,LOADING: {_hx_name:"LOADING",_hx_index:0,__enum__:"motuz.State",toString:$estr}
	,TYPING: {_hx_name:"TYPING",_hx_index:1,__enum__:"motuz.State",toString:$estr}
	,CHECKING: {_hx_name:"CHECKING",_hx_index:2,__enum__:"motuz.State",toString:$estr}
	,FINISHING: {_hx_name:"FINISHING",_hx_index:3,__enum__:"motuz.State",toString:$estr}
};
motuz_State.__constructs__ = [motuz_State.LOADING,motuz_State.TYPING,motuz_State.CHECKING,motuz_State.FINISHING];
var motuz_Game = function() {
	this.lastChar = "";
	this.lastTimeStamp = 0;
	this.lang = "fr";
	this.state = motuz_State.LOADING;
	this.wordLength = 5;
	var _gthis = this;
	var p_lang = motuz_Game.getParameter("lang");
	if(p_lang != null) {
		this.lang = p_lang;
	}
	var p_length = motuz_Game.getParameter("length");
	if(p_length != null) {
		this.wordLength = Std.parseInt(p_length);
	}
	window.document.querySelector("#current-lang").innerText = this.lang;
	var selectElement = js_Boot.__cast(window.document.querySelector("#letters") , HTMLSelectElement);
	selectElement.value = Std.string(this.wordLength);
	selectElement.addEventListener("change",function(e) {
		if(Std.parseInt(selectElement.value) != _gthis.wordLength) {
			var tmp = window.document.location.origin + window.document.location.pathname + "?lang=" + _gthis.lang + "&length=";
			window.document.location.href = tmp + selectElement.value;
		}
	});
	this.loadWords(this.lang);
	window.addEventListener("keydown",$bind(this,this.onType));
	this.letterModelElement = window.document.querySelector(".letter").cloneNode(true);
	this.rowModelElement = window.document.querySelector(".row");
	this.rowModelElement.parentNode.removeChild(this.rowModelElement);
	var _g = 0;
	var _g1 = this.wordLength - 1;
	while(_g < _g1) {
		var i = _g++;
		var node = this.letterModelElement.cloneNode(true);
		this.rowModelElement.append(node);
	}
	window.document.querySelector(".centerframe").append(this.rowModelElement.cloneNode(true));
	window.document.querySelector(".centerframe").append(this.rowModelElement.cloneNode(true));
	window.document.querySelector(".centerframe").append(this.rowModelElement.cloneNode(true));
	window.document.querySelector(".centerframe").append(this.rowModelElement.cloneNode(true));
	window.document.querySelector(".centerframe").append(this.rowModelElement.cloneNode(true));
	window.document.querySelector(".centerframe").append(this.rowModelElement.cloneNode(true));
	this.inputElement = window.document.querySelector("#input");
	this.inputElement.addEventListener("input",$bind(this,this.onInput));
};
motuz_Game.__name__ = true;
motuz_Game.getParameter = function(name) {
	var urlString = window.location.href;
	var url = new URL(urlString);
	return url.searchParams.get(name);
};
motuz_Game.main = function() {
	new motuz_Game();
};
motuz_Game.prototype = {
	loadWords: function(lang) {
		var _gthis = this;
		this.showPopup("Loading dictionary...");
		var http = new haxe_http_HttpJs("../deps/words_" + lang + ".txt." + this.wordLength);
		http.onData = function(data) {
			var received = data.split("\n");
			_gthis.words = received;
			_gthis.prepareNewGame();
		};
		http.request();
	}
	,clearRows: function() {
		var letters = window.document.querySelectorAll(".letter");
		var _g = 0;
		while(_g < letters.length) {
			var item = letters[_g];
			++_g;
			var el = item;
			el.classList.remove("correct");
			el.classList.remove("useless");
			el.classList.remove("nothere");
			el.classList.remove("filled");
			el.innerText = "";
		}
		while(window.document.querySelectorAll(".row").length > 6) {
			var frame = window.document.querySelector(".centerframe");
			frame.removeChild(frame.lastChild);
		}
	}
	,prepareNewGame: function() {
		this.showPopup("New game [" + this.lang + "]",1000);
		this.clearRows();
		var r = Std.random(this.words.length);
		this.solution = this.words[r];
		this.state = motuz_State.TYPING;
		this.rowIndex = 0;
		this.onNewRow();
		this.setupInput();
	}
	,onNewRow: function() {
		this.current = "";
		this.rowElement = window.document.querySelectorAll(".row")[this.rowIndex];
		this.state = motuz_State.TYPING;
	}
	,setupInput: function() {
		var letterElement = this.getLetterElement(this.current.length);
		if(letterElement != null) {
			var rect = letterElement.getBoundingClientRect();
			this.inputElement.style.top = rect.top + "px";
			this.inputElement.style.left = rect.left + "px";
			this.inputElement.style.width = rect.width + "px";
			this.inputElement.style.height = rect.height + "px";
		}
	}
	,onType: function(e) {
		if(this.state._hx_index == 1) {
			var key = e.key;
			if(key.length == 1) {
				if(window.document.activeElement != this.inputElement) {
					var code = HxOverrides.cca(key,0);
					if(code >= 97 && code <= 122) {
						this.addLetter(key);
					}
				}
			}
			if(e.keyCode == 13) {
				this.check();
			} else if(e.keyCode == 8) {
				this.removeLetter();
			}
		}
	}
	,onInput: function(e) {
		if(e.data != null && e.data != "") {
			var c = e.data.charAt(e.data.length - 1);
			if(c.length == 1) {
				c = c.toLowerCase();
				if(this.lastChar != c || e.timeStamp - this.lastTimeStamp > 150) {
					this.addLetter(c);
					this.lastChar = c;
					this.lastTimeStamp = e.timeStamp;
				}
				this.inputElement.value = "";
			}
		}
	}
	,getLetterElement: function(index) {
		return this.rowElement.querySelectorAll(".letter")[index];
	}
	,addLetter: function(letter) {
		if(this.current.length < this.wordLength) {
			this.current += letter;
			var el = this.getLetterElement(this.current.length - 1);
			el.innerText = letter;
			el.classList.add("filled");
			this.setupInput();
		}
	}
	,removeLetter: function() {
		if(this.current.length > 0) {
			var el = this.getLetterElement(this.current.length - 1);
			el.innerText = "";
			el.classList.remove("filled");
			this.current = HxOverrides.substr(this.current,0,this.current.length - 1);
			this.setupInput();
		}
	}
	,bounceRow: function() {
		var _gthis = this;
		this.rowElement.classList.remove("bounce");
		haxe_Timer.delay(function() {
			_gthis.rowElement.classList.add("bounce");
		},1);
	}
	,check: function() {
		this.state = motuz_State.CHECKING;
		if(this.current.length < this.wordLength) {
			this.showPopup("Not enough letters!",1000);
			this.state = motuz_State.TYPING;
			this.bounceRow();
			return;
		}
		var index = this.words.indexOf(this.current);
		if(index == -1) {
			this.showPopup("Unknown word?",1000);
			this.state = motuz_State.TYPING;
			this.bounceRow();
			return;
		} else {
			this.checkLetter(0);
		}
	}
	,checkLetter: function(index) {
		var _gthis = this;
		var el = this.getLetterElement(index);
		el.classList.remove("filled");
		var c = this.current.charAt(index);
		var d = this.solution.charAt(index);
		if(c == d) {
			el.classList.add("correct");
		} else if(this.solution.indexOf(c) != -1) {
			el.classList.add("nothere");
		} else {
			el.classList.add("useless");
		}
		if(index < this.wordLength - 1) {
			haxe_Timer.delay(function() {
				_gthis.checkLetter(index + 1);
			},200);
		} else if(this.current == this.solution) {
			this.showPopup("Correct!",2000);
			haxe_Timer.delay($bind(this,this.prepareNewGame),2000);
		} else {
			this.rowIndex++;
			this.onNewRow();
			if(this.rowElement == null) {
				window.document.querySelector(".centerframe").append(this.rowModelElement.cloneNode(true));
				this.rowElement = window.document.querySelectorAll(".row")[this.rowIndex];
				window.scrollTo(0,window.document.body.scrollHeight);
			}
			this.setupInput();
		}
	}
	,showPopup: function(msg,duration) {
		if(duration == null) {
			duration = 0;
		}
		var el = window.document.querySelector(".popup");
		el.innerText = msg;
		el.style.opacity = "1";
		if(duration != 0) {
			haxe_Timer.delay($bind(this,this.hidePopup),duration);
		}
	}
	,hidePopup: function() {
		window.document.querySelector(".popup").style.opacity = "0";
	}
	,__class__: motuz_Game
};
function $getIterator(o) { if( o instanceof Array ) return new haxe_iterators_ArrayIterator(o); else return o.iterator(); }
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $global.$haxeUID++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = m.bind(o); o.hx__closures__[m.__id__] = f; } return f; }
$global.$haxeUID |= 0;
if(typeof(performance) != "undefined" ? typeof(performance.now) == "function" : false) {
	HxOverrides.now = performance.now.bind(performance);
}
if( String.fromCodePoint == null ) String.fromCodePoint = function(c) { return c < 0x10000 ? String.fromCharCode(c) : String.fromCharCode((c>>10)+0xD7C0)+String.fromCharCode((c&0x3FF)+0xDC00); }
String.prototype.__class__ = String;
String.__name__ = true;
Array.__name__ = true;
var Int = { };
var Dynamic = { };
var Float = Number;
var Bool = Boolean;
var Class = { };
var Enum = { };
js_Boot.__toStr = ({ }).toString;
motuz_Game.main();
})(typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this);
