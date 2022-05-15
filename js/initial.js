var beforeWindowWidthResizeFunctions = [];

(function ($, window) {
    $(window).on("pageshow", function (event) {
        // if page is loading from back-forward cache of browser reload it (works for Safari iOS)
        if (event.originalEvent.persisted) {
            window.location.reload();
        }
    });

    $(document).ready(function () {
        // Does nothing but break the back-forward cache in browser (works for some browsers)
        $(window).on('unload', function () {
        });

        var mobileWidth = 991,
            phoneWidth = 767;

        (function () {
            var windowWidth = window.innerWidth;

            $(window).on('load', function () {
                windowWidth = window.innerWidth;
            });

            window.isHorizontalResize = function () {
                return windowWidth != window.innerWidth;
            };

            window.setWindowWidth = function () {
                if (windowWidth != window.innerWidth) {
                    windowWidth = window.innerWidth;
                }
            };

            window.mobileToDesktopChanged = function () {
                return isHorizontalResize() && windowWidth <= mobileWidth && window.innerWidth > mobileWidth;
            };

            window.desktopToMobileChanged = function () {
                return isHorizontalResize() && windowWidth > mobileWidth && window.innerWidth <= mobileWidth;
            };

            window.tabletToMobileChanged = function () {
                return isHorizontalResize() && windowWidth > phoneWidth && window.innerWidth <= phoneWidth;
            };

            window.mobileToTabletChanged = function () {
                return isHorizontalResize() && windowWidth <= phoneWidth && window.innerWidth > phoneWidth;
            };
        })();

        window.isMobile = function () {
            return (window.innerWidth <= mobileWidth);
        };

        window.isPhone = function() {
            return (window.innerWidth <= phoneWidth);
        };

        window.isTablet = function() {
            return isMobile() && !isPhone();
        };
    });

    $(window).on('load', function () {
        window.addEventListener('resize', function () {
            var beforeResizeFunctionsResults = [];

            beforeWindowWidthResizeFunctions.forEach(function (callback) {
                var callbackResult = callback();
                if (typeof callbackResult != 'undefined') {
                    beforeResizeFunctionsResults.push(callbackResult);
                }
            });

            if (beforeResizeFunctionsResults.length > 0) {
                $.when.apply(this, beforeResizeFunctionsResults).then(function () {
                    setWindowWidth();
                });
            } else {
                setWindowWidth();
            }
        });
    });
})(jQuery, window);