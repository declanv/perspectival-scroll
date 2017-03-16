$( document ).ready(function() {


    var resetNavItems = function(navItems, navHeight) {

        //  var navMiddle = navHeight / 2;
        //
        // function getDistanceFromMiddle(element) {
        //      // elementMiddle = Math.abs(element.offsetTop + element.offsetHeight / 2);
        //
        //     // var elementMiddle = Math.abs(element.offsetTop + element.offsetHeight / 2);
        //
        //     // var distance = Math.abs(navMiddle - element.offsetTop);
        //     // var distance = Math.abs(navMiddle - $(element).position().top);
        //     var distance = Math.abs(navMiddle - element.offsetTop);
        //
        //     console.log("Element: ", element.innerText, " distance: ", distance);
        //
        //     return distance;
        // }

        // function compare(a,b) {
        //     if (getDistanceFromMiddle(a) < getDistanceFromMiddle(b))
        //         return -1;
        //     if (getDistanceFromMiddle(a) > getDistanceFromMiddle(b))
        //         return 1;
        //     return 0;
        // }

        // function compare(a,b) {
        //     return getDistanceFromMiddle(b) - getDistanceFromMiddle(a);
        // }
        //
        // sortedNavItems = navItems.sort(compare);
        //
        // highestFont = 12;
        //
        // sortedNavItems.each(function(index, element) {
        //
        //     $(element).css('font-size', highestFont);
        //     highestFont--;
        //
        // })

        // console.log("sortedNavItems: ", sortedNavItems);
        //
        // debugger;


        navItems.each(function( index, element ) {
           // elDistance = element.offsetTop

            // var elementMiddle = element.offsetTop + element.offsetHeight / 2;
            var elementMiddle = element.offsetTop;

            var parentMiddle = element.parentNode.scrollTop + 50;

            var difference = Math.abs(elementMiddle - parentMiddle);

            // var bottom = navHeight - element.offsetHeight;
            // var offsetBtm = bottom - element.offsetTop;
            //
            // // var difference = Math.abs(middleOfNav - elDistance);
            //
            // var offsetDiff = Math.abs(element.offsetTop - offsetBtm);
            //
            // var difference = Math.abs(navHeight / 2 - offsetDiff);

            console.log("element: ", element.innerText, " element middle: ", elementMiddle, " navHeight: ", navHeight / 2, " difference: ", difference);
            // var fontSize = 100 / difference * 10;

            var removeAllReduceClasses = function(element) {
                element.removeClass('reduce reduce-1 reduce-2');
            }

            if (difference > 55) {
                removeAllReduceClasses($(element));
                $(element).addClass('reduce-2')
            } else if (difference > 45) {
                removeAllReduceClasses($(element));
                $(element).addClass('reduce-1')
            } else if (difference > 35) {
                removeAllReduceClasses($(element));
                $(element).addClass('reduce')
            } else if (difference < 20) {
                removeAllReduceClasses($(element));
            }

        })
    }

    $("#primary-nav").on('scroll', function() {

        // middleOfNav = $(this).prop("scrollHeight") / 2;

        resetNavItems($(this).children(".dropdown.top-level"), $(this).prop("scrollHeight"));


        // console.log("Here's the academics section scrollTop: ", $(this).children().first().position().top)
    })



});