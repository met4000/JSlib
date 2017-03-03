// Includes the most updated version of jslib. If unable to, uses the local version.
var _JSLIB_loadwait = 15;

try {
	var js = document.createElement("script");
	js.type = "text/javascript";
	js.src = "http://rawgit.com/met4000/jslib/master/JSlib.js";
	document.head.appendChild(js);
} finally {
	setTimeout(function () {
		var success = false, _JSLIB_timeoutfunc = function () {
			if (!!_JSLIB)
				console.info("JSlib: JSlib " + _JSLIB + " loaded");
			else
				console.error("JSlib: Unable to detect any loaded JSlib");
		};
		try {
			if (!!_JSLIB) { success = true; }
		} catch (err) {
			var js = document.createElement("script");
			js.type = "text/javascript";
			js.src = "JSlib.local.js";
			document.head.appendChild(js);
		}
		if (!success)
			console.warn("JSlib: Unable to detect loaded copy of JSlib from remote. Loading local copy instead");
		setTimeout(_JSLIB_timeoutfunc, _JSLIB_loadwait);
	}, _JSLIB_loadwait);
}
