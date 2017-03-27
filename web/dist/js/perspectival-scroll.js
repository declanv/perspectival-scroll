$( document ).ready(function() {

    // An attempt to close all dropdowns other than the currently-clicked one...not working for some reason
    // $('.dropdown.top-level').on('click', function(){
    //
    //     $(this).parent().find('.open').not(this).dropdown('toggle');
    // })

    var resetNavItems = function(navItems, navHeight) {

        navItems.each(function( index, element ) {

            var elementMiddle = element.offsetTop;
            var parentMiddle = element.parentNode.scrollTop + 50;
            var difference = Math.abs(elementMiddle - parentMiddle);
            var childTitle = $(element).children('.dropdown-toggle');

            var removeAllReduceClasses = function(element) {
                element.removeClass('reduce reduce-1 reduce-2');
            }

            // if (difference > 75) {
            //     removeAllReduceClasses(childTitle);
            //     childTitle.addClass('reduce-3');
            // } else if (difference > 55) {
            if (difference > 55) {
                removeAllReduceClasses(childTitle);
                childTitle.addClass('reduce-2');
            } else if (difference > 45) {
                removeAllReduceClasses(childTitle);
                childTitle.addClass('reduce-1');
            } else if (difference > 35) {
                removeAllReduceClasses(childTitle);
                childTitle.addClass('reduce');
            } else if (difference < 20) {
                removeAllReduceClasses(childTitle);
            }

        })
    }

    $("#primary-nav").on('scroll', function() {

        resetNavItems($(this).children('.dropdown.top-level'), $(this).prop('scrollHeight'));
        // resetNavItems($(this).children('.open').find('.dropdown'), $(this).prop('scrollHeight'));

    })



});