$( document ).ready(function() {


    var resetNavItems = function(navItems, navHeight) {

        navItems.each(function( index, element ) {
           // elDistance = element.offsetTop

            var nearnessToMiddle = element.offsetTop + element.offsetHeight / 2;

            var difference = navHeight / 2 - nearnessToMiddle;

            // var bottom = navHeight - element.offsetHeight;
            // var offsetBtm = bottom - element.offsetTop;
            //
            // // var difference = Math.abs(middleOfNav - elDistance);
            //
            // var offsetDiff = Math.abs(element.offsetTop - offsetBtm);
            //
            // var difference = Math.abs(navHeight / 2 - offsetDiff);

            console.log("difference: ", difference);
            // var fontSize = 100 / difference * 10;

            if (difference > 200) {
                $(element).css('font-size', 6);
                console.log("font-size: ", 6);
            } else if (difference > 100) {
                $(element).css('font-size', 9);
                console.log("font-size: ", 9);
            } else if (difference > 50) {
                $(element).css('font-size', 11);
                console.log("font-size: ", 11);
            } else if (difference < 50) {
                $(element).css('font-size', 13);
                console.log("font-size: ", 13);
            }

        })
    }

    $("#primary-nav").on('scroll', function() {

        // middleOfNav = $(this).prop("scrollHeight") / 2;

        resetNavItems($(this).children(".dropdown.top-level"), $(this).prop("scrollHeight"));

    })



});