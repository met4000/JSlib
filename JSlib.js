/*
function Article() {
    "use strict";
    var internalErrorPrefix = 0;
    var externalErrorPrefix = 0;
}
*/

/**
 * Refreshes the page
**/
function refreshPage() {
    "use strict";
    window.location = window.location;
}

/**
 * Returns a string with the char located at 'position' replaced with 'char'
**/
String.prototype.setCharAt = function (position, char) {
    "use strict";
    var internalCalc1 = this, internalCalc2 = "";
    internalCalc1 = this.substring(0, position);
    internalCalc2 = this.substring(position + 1);
    return internalCalc1 + char + internalCalc2;
};

/**
 * Returns the index of the 'n'th 'char'
**/
String.prototype.nIndexOf = function (char, n) {
    "use strict";
    var internalCalc = 0, index = 0, found = false;
    for (; index < this.length && !found; index++) {
        if (this.charAt(index) === char) {
            internalCalc++;
            if (internalCalc === n) {
                found = true;
            }
        }
    }
    if (!found) { index = -1; console.error("ERROR: unable to find " + n + "'th occurance of '" + char + "' in " + this); window.alert("ERROR: unable to find " + n + "'th occurance of '" + char + "' in " + this); } else { index--; }
    return index;
};

/**
 * Returns the index of the 'n'th last 'char'
 *
 * BUG: SEEMS TO BE UNABLE TO DETECT LAST CHARACTER AS CHAR
**/
String.prototype.nLastIndexOf = function (char, n) {
    "use strict";
    var internalCalc = 0, index = this.length, found = false;
    for (; index > 0 && !found; index--) {
        if (this.charAt(index) === char) {
            internalCalc++;
            if (internalCalc === n) {
                found = true;
            }
        }
    }
    if (!found) { index = -1; console.error("ERROR: unable to find " + n + "'th last occurance of '" + char + "' in " + this); window.alert("ERROR: unable to find " + n + "'th last occurance of '" + char + "' in " + this); } else { index--; }
    return index;
};

/**
 * Returns the number of times 'char' is found in the string
 * If 'char' is *, then will return the number of non " " characters
**/
String.prototype.amountOf = function (char) {
    var charAmount = 0;
    if (char === "*") {
        for(index = 0; index < this.length; index++) {
            if (this.charAt(index) !== " ") { charAmount++; }
        }
    } else {
        for(index = 0; index < this.length; index++) {
            if (this.substr(index, char.length) === char) { charAmount++; }
        }
    }
    return charAmount;
}

/**
 * Creates a linebreak 'amount' long (use with span/div and onload)
**/
HTMLObjectElement.prototype.br = function (amount) {
    var internalCalc = "";
    for (var x = 0; x < amount; x++) {
        internalCalc = internalCalc + "<br>";
    }
    this.innerHTML = internalCalc;
};

/**
 * Returns a random int between 'min' and 'max'
**/
function getRandomInt(min, max) {
    "use strict";
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Includes the JavaScript file located at 'jsFilePath'
**/
function includeJs (jsFilePath) {
    var js = document.createElement("script");
    js.type = "text/javascript";
    js.src = jsFilePath;
    document.body.appendChild(js);
}

/**
 * Returns the slashified string
 **/
String.prototype.slashify = function () {
    var slashified = "\\" + this.toString();
    for (var pos = 2; pos < slashified.length; pos = pos + 2) {
        slashified = slashified.substring(0, pos) + "\\" + slashified.substring(pos);
    }
    return slashified;
}

function stringMath() {}

/**
 * Adds two strings together, as if they were integers
 **/
stringMath.prototype.add = function (string1, string2) {
    "use strict";
    var num = "", ipos = 0;
    for (var pos = (string1.length > string2.length) ? string1.length - 1 : string2.length - 1; pos >= 0; pos--) {
        if (string1.charAt(string1.length - 1 - ipos) === "") {
            num = parseInt(string2.charAt(string2.length - 1 - ipos)) + num;
        } else if (string2.charAt(string2.length - 1 - ipos) === "") {
            num = parseInt(string1.charAt(string1.length - 1 - ipos)) + num;
        } else {
            num = parseInt(string1.charAt(string1.length - 1 - ipos)) + parseInt(string2.charAt(string2.length - 1 - ipos)) + num;
        }
        ipos++;
    }
    return num;
};

var binary = "2";
var trinary = "3";
var quadnary = "4";
var pentanary = "5";
var hexanary = "6";
var decimal = "10";
var hexadecimal = "16";

/**
 * Returns the base 'base' number in base 10
 **/
String.prototype.toDec = function (base) {
    "use strict";
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
}

/**
 * Returns the base 10 number in base 'base'
**/
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
}
