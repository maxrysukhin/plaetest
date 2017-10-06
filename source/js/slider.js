(function() {
    'use strict'

    var arrowLeft = document.getElementsByClassName("arrow-left")[0],
        arrowRight = document.getElementsByClassName("arrow-right")[0],
        //rangeNum = $('.range__num'),
        items = $('.shoeslist__image', '.shoeslist'), 
        rangeList = $('.range__type', '.rangelist'),
        rangeNum = $('.range__num'),  
        activeItem,
        rangeActive,
        counter = 0,
        rangeOrdinal = counter,
        duration = 300,
        inProcess = false;

        //console.log('rangeNum: ' + rangeNum.text());

    function moveSlide(direction) {
        activeItem = items.filter('.shoeslist_active-img');
        rangeActive = rangeList.filter('.range_active');
            //direction = trigger === arrowLeft ? -100 : 100;

        
        if (direction === arrowRight) {
            counter++;
        } else {
            counter--;
        }

        if (counter >= items.length) counter = 0;
        if (counter < 0) counter = items.length - 1;
        
        console.log(">>>>>" + counter);

        var reqItem = items.eq(counter),
            reqRange = rangeList.eq(counter);

        console.log(items);
        
        if (direction === arrowRight) {
            reqItem.css('left', '-100%');
            
            activeItem.animate({
                'left' : '100%'
            }, duration);
        } else {
            reqItem.css('left', '100%');
            
            activeItem.animate({
                'left' : '-100%'
            }, duration);
        }

        rangeActive.animate({
            opacity: "hide"
          },150, function() {
            reqRange.show(150, function() {
                rangeActive.removeClass('range_active');
                $(this).addClass('range_active');
            });
        });

        rangeNum.fadeOut(150, function() {
            rangeNum.text(counter+1);
        });
        rangeNum.fadeIn(150);

        reqItem.animate({
            'left' : 0
        }, duration, function() {
            activeItem.removeClass('shoeslist_active-img');
            $(this).addClass('shoeslist_active-img');
            inProcess = false;
        })
    }
    
    $('.arrow').on('click', function (e) {
        e.preventDefault();

        if(!inProcess) {
            inProcess = true;
            moveSlide(e.currentTarget);

            //console.log(e.currentTarget === arrowLeft);
        }

        console.log(counter);
    });
})();