'use strict';
animate('.moko-404', {
    timings: '2 0.05 0.1 0.0 1.3 0'.split(' '),
    frames: 5,
    frameNames: 'leafO stemO leafN stemN leafM stemM leafL stemL leafK stemK leafJ stemJ leafI stemI leafH leafG stemG leafF stemF leafE stemE leafD stemD leafC stemC leafB stemB leafA stemA eyeL eyeR pupilL pupilR'.split(' '),
    repeat: true,
    close: true
});
function animate(containerSelector) {
    var _ref = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
    var _ref$repeat = _ref.repeat;
    var repeat = _ref$repeat === undefined ? 0 : _ref$repeat;
    var _ref$timings = _ref.timings;
    var timings = _ref$timings === undefined ? [1] : _ref$timings;
    var _ref$frameNames = _ref.frameNames;
    var frameNames = _ref$frameNames === undefined ? ['frame'] : _ref$frameNames;
    var _ref$frames = _ref.frames;
    var frames = _ref$frames === undefined ? 2 : _ref$frames;
    var _ref$close = _ref.close;
    var close = _ref$close === undefined ? false : _ref$close;
    if (repeat === true) {
        repeat = Infinity;
    }
    var container = $(containerSelector);
    var styleElt = document.createElement('style');
    var styles = '';
    container.addClass('svg-animated');
    MorphSVGPlugin.convertToPath(containerSelector + ' circle,\n                                ' + containerSelector + ' rect,\n                                ' + containerSelector + ' ellipse,\n                                ' + containerSelector + ' line,\n                                ' + containerSelector + ' polygon,\n                                ' + containerSelector + ' polyline');
    frameNames.forEach(function (frameName) {
        var tl = new TimelineMax({ repeat: repeat });
        var firstFrame = container.find('.' + frameName + '1')[0];
        var i = undefined;
        var previousFrame = firstFrame;
        for (i = 2; i <= frames; i += 1) {
            if (window.CP.shouldStopExecution(1)) {
                break;
            }
            var className = '.' + frameName + i;
            var frame = container.find(className);
            styles += className + '{visibility:hidden;}';
            tl.to(firstFrame, timing(i), { morphSVG: frame.length ? frame : previousFrame }, '+=0');
            previousFrame = frame;
        }
        window.CP.exitedLoop(1);
        styles += '.' + frameName + '1{visibility:visible;}';
        if (close) {
            tl.to(firstFrame, timing(i), { morphSVG: firstFrame }, '+=0');
        }
        styleElt.innerHTML += styles;
        container.prepend(styleElt);
    });
    function timing(i) {
        return timings[Math.min(i - 2, timings.length - 1)];
    }
}