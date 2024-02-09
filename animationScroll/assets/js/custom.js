$(document).ready(function () {
    var throttleTimer;
    var throttleDelay = 250; // Adjust this value as needed
    $(window).scroll(function () {
        // Clear the throttle timer to prevent multiple executions
        clearTimeout(throttleTimer);
        // Set a new throttle timer to limit the event handling
        throttleTimer = setTimeout(function () {
            $('.carousel-container').each(function () {
                var buttonContainer = $(this);
                var carousel = buttonContainer.find('.carousel');
                var options = buttonContainer.find('.carousel-button');
                var optionsBorder = buttonContainer.find('.border-role');
                var currentIndex = 0;
                var firstClick = true;
                // Check if the section is close to the viewport and flag checks
                if (isNearScroll(buttonContainer)) {
                    var sname = buttonContainer.attr('class').split(' ').find(
                        cls => cls.startsWith('section-animation-'));
                    if (sname) {
                        var flagName = 'hasLogged' + sname.charAt(sname.length -
                            1).toUpperCase() + sname.slice(1);
                        // console.log(flagName)
                        if (!window[flagName]) {
                            window[flagName] = true;
                            buttonContainer.find(
                                '.carousel-button[data-carousel-target="0"]'
                            ).addClass('active');
                            buttonContainer.find(
                                '.border-role[data-carousel-target="0"]')
                                .addClass('roles-active');

                            function nextItem() {
                                if (currentIndex < options.length - 1) {
                                    currentIndex++;
                                    options.eq(currentIndex).click();
                                } else {
                                    clearInterval(interval);
                                }
                            }
                            var interval = setInterval(nextItem, 3000);
                            options.click(function () {
                                var targetIndex = $(this).data(
                                    'carousel-target');
                                carousel.carousel(targetIndex);
                                if (firstClick) {
                                    buttonContainer.find(
                                        '.carousel-button.active')
                                        .removeClass('active');
                                    $(this).addClass('active');
                                    if (currentIndex === options
                                        .length - 1) {
                                        firstClick = false;
                                        clearInterval(interval);
                                    }
                                    if (targetIndex !== currentIndex) {
                                        buttonContainer.find(
                                            '.carousel-button.active'
                                        ).removeClass('active');
                                        buttonContainer.find(
                                            '.carousel-button.active-user-click'
                                        ).removeClass(
                                            'active-user-click');
                                        $(this).addClass(
                                            'active-user-click');
                                        firstClick = false;
                                        clearInterval(interval);
                                    }
                                } else {
                                    buttonContainer.find(
                                        '.carousel-button.active')
                                        .removeClass('active');
                                    buttonContainer.find(
                                        '.carousel-button.active-user-click'
                                    ).removeClass(
                                        'active-user-click');
                                    $(this).addClass(
                                        'active-user-click');
                                }
                            });
                            optionsBorder.click(function () {
                                var targetIndex = $(this).data(
                                    'carousel-target');
                                carousel.carousel(targetIndex);
                                if (firstClick) {
                                    buttonContainer.find('.border-role')
                                        .removeClass('roles-active');
                                    $(this).addClass('roles-active');
                                    if (currentIndex === options
                                        .length - 1) {
                                        firstClick = false;
                                        clearInterval(interval);
                                    }
                                    if (targetIndex !== currentIndex) {
                                        buttonContainer.find(
                                            '.border-role')
                                            .removeClass(
                                                'roles-active');
                                        $(this).addClass(
                                            'roles-active');
                                        firstClick = false;
                                        clearInterval(interval);
                                    }
                                } else {
                                    buttonContainer.find('.border-role')
                                        .removeClass('roles-active');
                                    $(this).addClass('roles-active');
                                }
                            });
                        }
                    }
                }
            });
        }, throttleDelay);
    });
    // Function to check if the section is close to the scroll position
    function isNearScroll($elem) {
        var scrollPos = $(window).scrollTop();
        var elemTop = $elem.offset().top;
        // Calculate threshold based on viewport height
        var viewportHeight = $(window).height();
        var threshold = viewportHeight * 0.7; // Adjust the multiplier as needed
        return (elemTop <= scrollPos + threshold);
    }
});
if (history.scrollRestoration) {
    history.scrollRestoration = 'manual';
} else {
    window.onbeforeunload = function () {
        window.scrollTo(0, 0);
    }
}