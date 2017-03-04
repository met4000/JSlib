//Used by JSlib.js to detect whether JSlib has been included
window._JSLIB = "v1.0.1";


//Array of letters
var letters = {};
letters.lower = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
letters.upper = [];
for (var i = 0; i < letters.lower.length; i++)
	letters.upper.push(letters.lower[i].toUpperCase());
letters.both = letters.lower.concat(letters.upper);

//Array of digits
var digits = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];


/*
** Refreshes the page.
*/
function refreshPage() {
    window.location = window.location;
}

/*
** Returns a string with the char located at 'index' replaced with 'char'.
*/
String.prototype.replaceCharAt = function (index, char) {
    var internalCalc1 = this, internalCalc2 = "";
    internalCalc1 = this.substring(0, index);
    internalCalc2 = this.substring(index + 1);
    return internalCalc1 + char + internalCalc2;
};

/*
** Returns the index of the 'n'th 'char'. Negative 'n' values return the 'n'th last index of 'char'.
*/
String.prototype.nIndexOf = function (char, n) {
	var total = this.amountOf(char);
	if (total < Math.abs(n))
		return -1;
	for (internalCalc = 0, index = 0; index < this.length; index++) {
		if (this.charAt(n>0?index:this.length-1-index) === char) {
			internalCalc++;
			if (internalCalc === (n>0?n:total+n+1)) { return index; }
		}
	}
	return -1;
};

/*
** Returns the number of times 'char' is found in the string.
** If 'char' is *, then will return the number of occurances of all alphanumerical characters.
*/
String.prototype.amountOf = function (char) {
	var charAmount = 0;
	if (char === "*") {
		for (index = 0; index < this.length; index++) {
			if (letters.lower.indexOf(this.charAt(index).toLowerCase()) > -1 || digits.indexOf(this.charAt(index)) > -1) { charAmount++; }
		}
	} else {
		for (index = 0; index < this.length; index++) {
			if (this.substr(index, char.length) === char) { charAmount++; }
		}
	}
	return charAmount;
};

/*
** Returns the number of indexs od 'this' 'input' appears in.
*/
Array.prototype.amntOf = function (input) {
	var stringAmount = 0;
	for(var index = 0; index < this.length; index++) {
		if (this[index].amountOf(input)>0) { stringAmount++; }
	}
	return stringAmount;
};

/*
** Returns the number of times 'input' appears in 'this'.
*/
Array.prototype.amountOf = function (input) {
	var stringAmount = 0;
	for(var index = 0; index < this.length; index++) {
		stringAmount += this[index].amountOf(input);
	}
	return stringAmount;
};

/*
** Returns a random int between 'min' and 'max', inclusive. If no parameters are specified, gets a random integer.
*/
function getRandomInt(min, max) {
	min = min === undefined ? 0 : min;
	max = max === undefined ? 9 : max;
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

/*
** Includes the JavaScript file located at 'jsFilePath'.
*/
function includeJs(jsFilePath) {
	var js = document.createElement("script");
	js.type = "text/javascript";
	js.src = jsFilePath;
	document.body.appendChild(js);
}

/*
** Returns the slashified string.
*/
String.prototype.slashify = function () {
	var slashified = "\\" + this.toString();
	for (var pos = 2; pos < slashified.length; pos+=2)
		slashified = slashified.substring(0, pos) + "\\" + slashified.substring(pos);
	return slashified;
};

var binary = "2";
var trinary = "3";
var quadnary = "4";
var pentanary = "5";
var hexanary = "6";
var decimal = "10";
var hexadecimal = "16";

/*
** Returns the base 'base' number in base 10.
*/
String.prototype.toDec = function (base) {
    var symbols = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ\`\-\=\~\!\@\#\$\%\^\&\*\(\)\_\+\[\]\\\{\}\|\;\'\:\"\,\.\/\<\>\?".split("");
    var decimal = 0;
    var conversion = this.toString();
    var hierarchy = 0;
    if (base === undefined) { base = 94; }
    if (base > symbols.length || base <= 1) { return false; }
    for (var position = conversion.length - 1; position >= 0; position--) {
        if (symbols.indexOf(conversion.charAt(position)) >= base) { return false; }
        decimal = (symbols.indexOf(conversion.charAt(position)) * Math.pow(base, hierarchy)) + decimal;
        hierarchy++;
    }
    return decimal.toString();
};

/*
** Returns the base 10 number in base 'base'.
*/
String.prototype.toBase = function (base) {
    var symbols = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ\`\-\=\~\!\@\#\$\%\^\&\*\(\)\_\+\[\]\\\{\}\|\;\'\:\"\,\.\/\<\>\?".split("");
    var decimal = parseFloat(this.toString());
    var conversion = "";
    if (base > symbols.length || base <= 1) { return false; }
    while (decimal >= 1) {
        conversion = symbols[(decimal - (base * Math.floor(decimal / base)))] + conversion;
        decimal = Math.floor(decimal / base);
    }
    return (base < 11) ? parseInt(conversion) : conversion;
};

/*
** Returns the base 'from' number to base 'to'.
*/
String.prototype.convertBase = function (from, to) {
	return this.toDec(from).toBase(to);
};

/*
** Prints to the console.
*/
function print(input) {
	console.log(input === undefined ? "" : input);
}

/*
** Clears the console.
*/
function clear() {
	console.clear();
}

/*
** Creates an (uu)id like string.
*/
function id() {
    function m() { return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1); }
    function l() { return letters.both[Math.floor(Math.random() * 52).toString()]; }
    return l() + m().substring(1) + m() + "-" + m() + "-" + m() + "-" + m() + "-" + m() + m() + m();
}

/*
** Pauses the code for 'msec' milliseconds
*/
function sleep(milliseconds) {
	var start = new Date().getTime();
	for (var i = 0; i < 1e7; i++)
		if ((new Date().getTime() - start) > milliseconds) { break; }
}

var ajaxfunc = {};
//Whether AJAX should be async
ajaxfunc.async = true;
//Function called once a AJAX response has been received
ajaxfunc.completeFunction = function() {
	if (!!ajaxReturn(this)) {
		if (this.status == 200) {
			console.info("AJAX post successful");
			this.func(this);
		} else if (this.responseText == "send_failed")
			console.error("Unable to send AJAX post");
		else
			console.error("AJAX error");
	}
};

/*
** AJAX POST function. Works for both async and sync. 'value' and 'data' can be either in the form of strings, or string arrays.
** 'func' is only used in async mode, and is called on a successful AJAX communication. It has one parameter, which is the AJAX object.
*/
ajaxfunc.post = function (url, value, data, func) {
	if (func === undefined)
		func = function (ajax) {};
	var ajax = XMLHttpRequest();
	ajax.func = func;
	var send = "";
	value = typeof(value) === "object" ? value : [value];
	data = typeof(data) === "object" ? data : [data];
	for (i = 0, i < value.length && i < data.length; i++, send += "&")
		send += value[i] + "=" + data[i];
	ajax.open("POST", url, ajaxfunc.async);
	if (ajaxfunc.async)
		ajax.onreadystatechange = ajaxfunc.completeFunction;
	ajax.send(send);
	if (!ajaxfunc.async) {
		ajaxfunc.completeFunction(ajax);
		return ajax.responseText;
	}
};

/*
** AJAX GET function. Works for both async and sync. 'value' and 'data' can be either in the form of strings, or string arrays.
*/
ajaxfunc.get = function (url, value, data) {
	if (func === undefined)
		func = function (ajax) {};
	var ajax = XMLHttpRequest();
	ajax.func = func;
	var send = "";
	value = typeof(value) === "object" ? value : [value];
	data = typeof(data) === "object" ? data : [data];
	for (i = 0, i < value.length && i < data.length; i++, send += "&")
		send += value[i] + "=" + data[i];
	ajax.open("GET", url + "?" + send, ajaxfunc.async);
	if (ajaxfunc.async)
		ajax.onreadystatechange = ajaxfunc.completeFunction;
	ajax.send();
	if (!ajaxfunc.async) {
		ajaxfunc.completeFunction(ajax);
		return ajax.responseText;
	}
};
