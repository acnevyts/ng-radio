"use strict";
exports.__esModule = true;
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var NgRadio = /** @class */ (function () {
    function NgRadio() {
        this.separator = ':';
        this._eventBus = new rxjs_1.Subject();
    }
    NgRadio.prototype.keyMatch = function (key, wildcard) {
        var w = '*';
        var ww = '**';
        var partMatch = function (wl, k) {
            var match = (wl === w) || (wl === k);
            return match;
        };
        var sep = this.separator;
        var kArr = key.split(sep);
        var wArr = wildcard.split(sep);
        var kLen = kArr.length;
        var wLen = wArr.length;
        var max = Math.max(kLen, wLen);
        for (var i = 0; i < max; i++) {
            var cK = kArr[i];
            var cW = wArr[i];
            // '**' match all gragments
            if (cW == ww && (typeof cK !== 'undefined')) {
                return true;
            }
            // test if fragments match
            if (!partMatch(cW, cK)) {
                return false;
            }
        }
        return true;
    };
    NgRadio.prototype.cast = function (key, data) {
        if (typeof key !== 'string' || !key.length) {
            throw 'Bad key. Please provide a string';
        }
        this._eventBus.next({ key: key, data: data });
    };
    NgRadio.prototype.on = function (key) {
        var _this = this;
        return this._eventBus.asObservable()
            .pipe(operators_1.filter(function (event) {
            return _this.keyMatch(event.key, key);
        }), operators_1.map(function (event) { return event.data; }));
    };
    return NgRadio;
}());
exports.NgRadio = NgRadio;
