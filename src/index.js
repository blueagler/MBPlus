import load from '^/load'
window.throttle = function (fn, delay) {
    var timer;
    return function () {
        var _this = this;
        var args = arguments;
        if (timer) {
            return;
        }
        timer = setTimeout(function () {
            fn.apply(_this, args);
            timer = null;
        }, delay)
    }
};
(function($) {
    $.fn.change = function(cb, e) {
      e = e || { subtree:true, childList:true, characterData:true };
      $(this).each(function() {
        function callback(changes) { cb.call(node, changes, this); }
        var node = this;
        (new MutationObserver(callback)).observe(node, e);
      });
    };
  })(jQuery);
document.addEventListener("turbolinks:load", load)