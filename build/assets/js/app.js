(function() {
  'use strict';

  $(document).ready(function(){
    $('section').verticalDotNav({
      align : "right",
      scroll_speed : 1000,
      dot_size: 10,
      dot_style: "circle",
      dot_color: "#fff"
    });
  })

})();
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ncmVhdGluZ19waWN0dXJlJykuY2xhc3NMaXN0LmFkZCgnbS0tc2hvdycpO1xuICB9LCAxMDAwKTtcbn0pKCk7Il19

(function ( $ ) {

	var default_options = {
		align : "right", 
		scroll_speed : 1000,
		dot_size: 10,
		dot_style: "circle",
		dot_color: "#fff"
	}


    $.fn.verticalDotNav = function(options) {

    	$.extend(default_options, options);

		var nav_height,
			nav_width,
    		nav_pos_top, 
    		jq_dots,
    		jq_nav,
    		nav_styles = {},
            assignStyles,
    		nav = "<ul class='vertical-dot-nav'>",
    		dot_styles = {},
    		sections_arr = [],
			window_height = $(window).height(),
			navbar = $('.nav'),
			navbar_width = navbar.width(),
    		click_scroll = false;

 
        this.each(function(index) {
            var container = $(this),
            	container_offset = container.offset().top;

            sections_arr.push({
            	name : "section-" + index,
            	offset : container_offset,
                ref : container
            });

            nav += "<li class='dot' data-target='section-"+index+"'></li>";  
        });

        nav += "</ul>";
        
        $("body").append(nav);

    	jq_nav = $(".vertical-dot-nav"),
    	jq_dots = $(".vertical-dot-nav .dot");

		nav_height = jq_nav.height();
		nav_width = jq_nav.width();
		nav_pos_top = (window_height/2) - (nav_height/2);
		nav_pos_right = (navbar_width/2) - (nav_width/2);

        dot_styles["width"] = default_options.dot_size + "px";
       	dot_styles["height"] = dot_styles["width"];
       	dot_styles["border-color"] = default_options.dot_color;
        dot_styles["border-radius"] = default_options.dot_style === "circle" ? "50%" : "100%";
		nav_styles["top"] = nav_pos_top + "px";
		nav_styles["right"] = nav_pos_right + "px";
        nav_styles["background-color"] = default_options.nav_color;
        nav_styles["left"] = default_options.align === "left" ? 0 : "auto";

        jq_dots.css(dot_styles);
    	jq_nav.css(nav_styles);

        assignStyles = function(target) {
            jq_dots.removeClass("active");
            jq_dots.css("background-color", "transparent");
            target.addClass("active");
            target.css("background-color", default_options.dot_color);
        }

        jq_dots.each(function(index){

        	$(this).on("mouseover", function(){
        		$(this).css("background-color", default_options.dot_color);
        	}).on("mouseout", function(){
        		if($(this).hasClass("active") === false){
        			$(this).css("background-color", "transparent");
        		} 	
        	})
        	 
        	 $(this).on("click", function(){

        	 	var target_section = sections_arr[index].offset;
                var target = $(this);

        	 	click_scroll = true;
                assignStyles(target);
 	 
        	 	$('html,body').animate({
			        scrollTop: target_section + 1
			    }, default_options.scroll_speed); 

        	 	setTimeout(function(){ 
        	 		click_scroll = false; 
        	 	}, default_options.scroll_speed); 
        	 })
        })

        var checkScrollPos = function() {

			var scroll_pos = $(window).scrollTop();

              if ((window.innerHeight + window.scrollY) >= $('.wrapper').height()) {
                    target_dot = $(".vertical-dot-nav .dot[data-target='"+sections_arr[sections_arr.length - 1].name+"']");
                    assignStyles(target_dot);

                } else {
                    for(var i=sections_arr.length - 1; i > -1; i--){
                        if(sections_arr[i].offset <= scroll_pos) {

                            target_dot = $(".vertical-dot-nav .dot[data-target='"+sections_arr[i].name+"']");
                            assignStyles(target_dot);

                            return;
                        }
                    }
                }
		}
 
 		$(window).resize(function(){
 			window_height = $(window).height();
 			jq_nav.css("top", (window_height/2) - (nav_height/2));
			 navbar_width = navbar.width(),
			jq_nav.css("right", (navbar_width/2) - (nav_width/2));



            for(var i=0;i<sections_arr.length;i++){
                sections_arr[i].offset =  sections_arr[i].ref.offset().top;
            }

             console.log(sections_arr);
 		})

        $(window).scroll(function(){
        	if(click_scroll) {
        		return;
        	} else {
        		checkScrollPos();
        	}
        })

        checkScrollPos();
        return this;
    };

 
}(jQuery));
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImpxLXZlcnRpY2FsLWRvdC1uYXYuanMiLCJzbGlkZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN4SkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gICQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCl7XG4gICAgJCgnc2VjdGlvbicpLnZlcnRpY2FsRG90TmF2KHtcbiAgICAgIGFsaWduIDogXCJyaWdodFwiLFxuICAgICAgc2Nyb2xsX3NwZWVkIDogMTAwMCxcbiAgICAgIGRvdF9zaXplOiAxMCxcbiAgICAgIGRvdF9zdHlsZTogXCJjaXJjbGVcIixcbiAgICAgIGRvdF9jb2xvcjogXCIjZmZmXCJcbiAgICB9KTtcbiAgfSlcblxufSkoKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zjg7YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0p6YjNWeVkyVnpJanBiSW1Gd2NDNXFjeUpkTENKdVlXMWxjeUk2VzEwc0ltMWhjSEJwYm1keklqb2lRVUZCUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFTSXNJbVpwYkdVaU9pSmhjSEF1YW5NaUxDSnpiM1Z5WTJWelEyOXVkR1Z1ZENJNld5SW9ablZ1WTNScGIyNG9LU0I3WEc0Z0lDZDFjMlVnYzNSeWFXTjBKenRjYmx4dUlDQnpaWFJVYVcxbGIzVjBLR1oxYm1OMGFXOXVLQ2tnZTF4dUlDQWdJR1J2WTNWdFpXNTBMbkYxWlhKNVUyVnNaV04wYjNJb0p5NW5jbVZoZEdsdVoxOXdhV04wZFhKbEp5a3VZMnhoYzNOTWFYTjBMbUZrWkNnbmJTMHRjMmh2ZHljcE8xeHVJQ0I5TENBeE1EQXdLVHRjYm4wcEtDazdJbDE5XG4iLCIoZnVuY3Rpb24gKCAkICkge1xuXG5cdHZhciBkZWZhdWx0X29wdGlvbnMgPSB7XG5cdFx0YWxpZ24gOiBcInJpZ2h0XCIsIFxuXHRcdHNjcm9sbF9zcGVlZCA6IDEwMDAsXG5cdFx0ZG90X3NpemU6IDEwLFxuXHRcdGRvdF9zdHlsZTogXCJjaXJjbGVcIixcblx0XHRkb3RfY29sb3I6IFwiI2ZmZlwiXG5cdH1cblxuXG4gICAgJC5mbi52ZXJ0aWNhbERvdE5hdiA9IGZ1bmN0aW9uKG9wdGlvbnMpIHtcblxuICAgIFx0JC5leHRlbmQoZGVmYXVsdF9vcHRpb25zLCBvcHRpb25zKTtcblxuXHRcdHZhciBuYXZfaGVpZ2h0LFxuXHRcdFx0bmF2X3dpZHRoLFxuICAgIFx0XHRuYXZfcG9zX3RvcCwgXG4gICAgXHRcdGpxX2RvdHMsXG4gICAgXHRcdGpxX25hdixcbiAgICBcdFx0bmF2X3N0eWxlcyA9IHt9LFxuICAgICAgICAgICAgYXNzaWduU3R5bGVzLFxuICAgIFx0XHRuYXYgPSBcIjx1bCBjbGFzcz0ndmVydGljYWwtZG90LW5hdic+XCIsXG4gICAgXHRcdGRvdF9zdHlsZXMgPSB7fSxcbiAgICBcdFx0c2VjdGlvbnNfYXJyID0gW10sXG5cdFx0XHR3aW5kb3dfaGVpZ2h0ID0gJCh3aW5kb3cpLmhlaWdodCgpLFxuXHRcdFx0bmF2YmFyID0gJCgnLm5hdicpLFxuXHRcdFx0bmF2YmFyX3dpZHRoID0gbmF2YmFyLndpZHRoKCksXG4gICAgXHRcdGNsaWNrX3Njcm9sbCA9IGZhbHNlO1xuXG4gXG4gICAgICAgIHRoaXMuZWFjaChmdW5jdGlvbihpbmRleCkge1xuICAgICAgICAgICAgdmFyIGNvbnRhaW5lciA9ICQodGhpcyksXG4gICAgICAgICAgICBcdGNvbnRhaW5lcl9vZmZzZXQgPSBjb250YWluZXIub2Zmc2V0KCkudG9wO1xuXG4gICAgICAgICAgICBzZWN0aW9uc19hcnIucHVzaCh7XG4gICAgICAgICAgICBcdG5hbWUgOiBcInNlY3Rpb24tXCIgKyBpbmRleCxcbiAgICAgICAgICAgIFx0b2Zmc2V0IDogY29udGFpbmVyX29mZnNldCxcbiAgICAgICAgICAgICAgICByZWYgOiBjb250YWluZXJcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBuYXYgKz0gXCI8bGkgY2xhc3M9J2RvdCcgZGF0YS10YXJnZXQ9J3NlY3Rpb24tXCIraW5kZXgrXCInPjwvbGk+XCI7ICBcbiAgICAgICAgfSk7XG5cbiAgICAgICAgbmF2ICs9IFwiPC91bD5cIjtcbiAgICAgICAgXG4gICAgICAgICQoXCJib2R5XCIpLmFwcGVuZChuYXYpO1xuXG4gICAgXHRqcV9uYXYgPSAkKFwiLnZlcnRpY2FsLWRvdC1uYXZcIiksXG4gICAgXHRqcV9kb3RzID0gJChcIi52ZXJ0aWNhbC1kb3QtbmF2IC5kb3RcIik7XG5cblx0XHRuYXZfaGVpZ2h0ID0ganFfbmF2LmhlaWdodCgpO1xuXHRcdG5hdl93aWR0aCA9IGpxX25hdi53aWR0aCgpO1xuXHRcdG5hdl9wb3NfdG9wID0gKHdpbmRvd19oZWlnaHQvMikgLSAobmF2X2hlaWdodC8yKTtcblx0XHRuYXZfcG9zX3JpZ2h0ID0gKG5hdmJhcl93aWR0aC8yKSAtIChuYXZfd2lkdGgvMik7XG5cbiAgICAgICAgZG90X3N0eWxlc1tcIndpZHRoXCJdID0gZGVmYXVsdF9vcHRpb25zLmRvdF9zaXplICsgXCJweFwiO1xuICAgICAgIFx0ZG90X3N0eWxlc1tcImhlaWdodFwiXSA9IGRvdF9zdHlsZXNbXCJ3aWR0aFwiXTtcbiAgICAgICBcdGRvdF9zdHlsZXNbXCJib3JkZXItY29sb3JcIl0gPSBkZWZhdWx0X29wdGlvbnMuZG90X2NvbG9yO1xuICAgICAgICBkb3Rfc3R5bGVzW1wiYm9yZGVyLXJhZGl1c1wiXSA9IGRlZmF1bHRfb3B0aW9ucy5kb3Rfc3R5bGUgPT09IFwiY2lyY2xlXCIgPyBcIjUwJVwiIDogXCIxMDAlXCI7XG5cdFx0bmF2X3N0eWxlc1tcInRvcFwiXSA9IG5hdl9wb3NfdG9wICsgXCJweFwiO1xuXHRcdG5hdl9zdHlsZXNbXCJyaWdodFwiXSA9IG5hdl9wb3NfcmlnaHQgKyBcInB4XCI7XG4gICAgICAgIG5hdl9zdHlsZXNbXCJiYWNrZ3JvdW5kLWNvbG9yXCJdID0gZGVmYXVsdF9vcHRpb25zLm5hdl9jb2xvcjtcbiAgICAgICAgbmF2X3N0eWxlc1tcImxlZnRcIl0gPSBkZWZhdWx0X29wdGlvbnMuYWxpZ24gPT09IFwibGVmdFwiID8gMCA6IFwiYXV0b1wiO1xuXG4gICAgICAgIGpxX2RvdHMuY3NzKGRvdF9zdHlsZXMpO1xuICAgIFx0anFfbmF2LmNzcyhuYXZfc3R5bGVzKTtcblxuICAgICAgICBhc3NpZ25TdHlsZXMgPSBmdW5jdGlvbih0YXJnZXQpIHtcbiAgICAgICAgICAgIGpxX2RvdHMucmVtb3ZlQ2xhc3MoXCJhY3RpdmVcIik7XG4gICAgICAgICAgICBqcV9kb3RzLmNzcyhcImJhY2tncm91bmQtY29sb3JcIiwgXCJ0cmFuc3BhcmVudFwiKTtcbiAgICAgICAgICAgIHRhcmdldC5hZGRDbGFzcyhcImFjdGl2ZVwiKTtcbiAgICAgICAgICAgIHRhcmdldC5jc3MoXCJiYWNrZ3JvdW5kLWNvbG9yXCIsIGRlZmF1bHRfb3B0aW9ucy5kb3RfY29sb3IpO1xuICAgICAgICB9XG5cbiAgICAgICAganFfZG90cy5lYWNoKGZ1bmN0aW9uKGluZGV4KXtcblxuICAgICAgICBcdCQodGhpcykub24oXCJtb3VzZW92ZXJcIiwgZnVuY3Rpb24oKXtcbiAgICAgICAgXHRcdCQodGhpcykuY3NzKFwiYmFja2dyb3VuZC1jb2xvclwiLCBkZWZhdWx0X29wdGlvbnMuZG90X2NvbG9yKTtcbiAgICAgICAgXHR9KS5vbihcIm1vdXNlb3V0XCIsIGZ1bmN0aW9uKCl7XG4gICAgICAgIFx0XHRpZigkKHRoaXMpLmhhc0NsYXNzKFwiYWN0aXZlXCIpID09PSBmYWxzZSl7XG4gICAgICAgIFx0XHRcdCQodGhpcykuY3NzKFwiYmFja2dyb3VuZC1jb2xvclwiLCBcInRyYW5zcGFyZW50XCIpO1xuICAgICAgICBcdFx0fSBcdFxuICAgICAgICBcdH0pXG4gICAgICAgIFx0IFxuICAgICAgICBcdCAkKHRoaXMpLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24oKXtcblxuICAgICAgICBcdCBcdHZhciB0YXJnZXRfc2VjdGlvbiA9IHNlY3Rpb25zX2FycltpbmRleF0ub2Zmc2V0O1xuICAgICAgICAgICAgICAgIHZhciB0YXJnZXQgPSAkKHRoaXMpO1xuXG4gICAgICAgIFx0IFx0Y2xpY2tfc2Nyb2xsID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBhc3NpZ25TdHlsZXModGFyZ2V0KTtcbiBcdCBcbiAgICAgICAgXHQgXHQkKCdodG1sLGJvZHknKS5hbmltYXRlKHtcblx0XHRcdCAgICAgICAgc2Nyb2xsVG9wOiB0YXJnZXRfc2VjdGlvbiArIDFcblx0XHRcdCAgICB9LCBkZWZhdWx0X29wdGlvbnMuc2Nyb2xsX3NwZWVkKTsgXG5cbiAgICAgICAgXHQgXHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7IFxuICAgICAgICBcdCBcdFx0Y2xpY2tfc2Nyb2xsID0gZmFsc2U7IFxuICAgICAgICBcdCBcdH0sIGRlZmF1bHRfb3B0aW9ucy5zY3JvbGxfc3BlZWQpOyBcbiAgICAgICAgXHQgfSlcbiAgICAgICAgfSlcblxuICAgICAgICB2YXIgY2hlY2tTY3JvbGxQb3MgPSBmdW5jdGlvbigpIHtcblxuXHRcdFx0dmFyIHNjcm9sbF9wb3MgPSAkKHdpbmRvdykuc2Nyb2xsVG9wKCk7XG5cbiAgICAgICAgICAgICAgaWYgKCh3aW5kb3cuaW5uZXJIZWlnaHQgKyB3aW5kb3cuc2Nyb2xsWSkgPj0gJCgnLndyYXBwZXInKS5oZWlnaHQoKSkge1xuICAgICAgICAgICAgICAgICAgICB0YXJnZXRfZG90ID0gJChcIi52ZXJ0aWNhbC1kb3QtbmF2IC5kb3RbZGF0YS10YXJnZXQ9J1wiK3NlY3Rpb25zX2FycltzZWN0aW9uc19hcnIubGVuZ3RoIC0gMV0ubmFtZStcIiddXCIpO1xuICAgICAgICAgICAgICAgICAgICBhc3NpZ25TdHlsZXModGFyZ2V0X2RvdCk7XG5cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBmb3IodmFyIGk9c2VjdGlvbnNfYXJyLmxlbmd0aCAtIDE7IGkgPiAtMTsgaS0tKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHNlY3Rpb25zX2FycltpXS5vZmZzZXQgPD0gc2Nyb2xsX3Bvcykge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0X2RvdCA9ICQoXCIudmVydGljYWwtZG90LW5hdiAuZG90W2RhdGEtdGFyZ2V0PSdcIitzZWN0aW9uc19hcnJbaV0ubmFtZStcIiddXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFzc2lnblN0eWxlcyh0YXJnZXRfZG90KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblx0XHR9XG4gXG4gXHRcdCQod2luZG93KS5yZXNpemUoZnVuY3Rpb24oKXtcbiBcdFx0XHR3aW5kb3dfaGVpZ2h0ID0gJCh3aW5kb3cpLmhlaWdodCgpO1xuIFx0XHRcdGpxX25hdi5jc3MoXCJ0b3BcIiwgKHdpbmRvd19oZWlnaHQvMikgLSAobmF2X2hlaWdodC8yKSk7XG5cdFx0XHQgbmF2YmFyX3dpZHRoID0gbmF2YmFyLndpZHRoKCksXG5cdFx0XHRqcV9uYXYuY3NzKFwicmlnaHRcIiwgKG5hdmJhcl93aWR0aC8yKSAtIChuYXZfd2lkdGgvMikpO1xuXG5cblxuICAgICAgICAgICAgZm9yKHZhciBpPTA7aTxzZWN0aW9uc19hcnIubGVuZ3RoO2krKyl7XG4gICAgICAgICAgICAgICAgc2VjdGlvbnNfYXJyW2ldLm9mZnNldCA9ICBzZWN0aW9uc19hcnJbaV0ucmVmLm9mZnNldCgpLnRvcDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgIGNvbnNvbGUubG9nKHNlY3Rpb25zX2Fycik7XG4gXHRcdH0pXG5cbiAgICAgICAgJCh3aW5kb3cpLnNjcm9sbChmdW5jdGlvbigpe1xuICAgICAgICBcdGlmKGNsaWNrX3Njcm9sbCkge1xuICAgICAgICBcdFx0cmV0dXJuO1xuICAgICAgICBcdH0gZWxzZSB7XG4gICAgICAgIFx0XHRjaGVja1Njcm9sbFBvcygpO1xuICAgICAgICBcdH1cbiAgICAgICAgfSlcblxuICAgICAgICBjaGVja1Njcm9sbFBvcygpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG4gXG59KGpRdWVyeSkpOyIsIihmdW5jdGlvbigpIHtcbiAgICAndXNlIHN0cmljdCdcblxuICAgIHZhciBhcnJvd0xlZnQgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiYXJyb3ctbGVmdFwiKVswXSxcbiAgICAgICAgYXJyb3dSaWdodCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJhcnJvdy1yaWdodFwiKVswXSxcbiAgICAgICAgLy9yYW5nZU51bSA9ICQoJy5yYW5nZV9fbnVtJyksXG4gICAgICAgIGl0ZW1zID0gJCgnLnNob2VzbGlzdF9faW1hZ2UnLCAnLnNob2VzbGlzdCcpLCBcbiAgICAgICAgcmFuZ2VMaXN0ID0gJCgnLnJhbmdlX190eXBlJywgJy5yYW5nZWxpc3QnKSxcbiAgICAgICAgcmFuZ2VOdW0gPSAkKCcucmFuZ2VfX251bScpLCAgXG4gICAgICAgIGFjdGl2ZUl0ZW0sXG4gICAgICAgIHJhbmdlQWN0aXZlLFxuICAgICAgICBjb3VudGVyID0gMCxcbiAgICAgICAgcmFuZ2VPcmRpbmFsID0gY291bnRlcixcbiAgICAgICAgZHVyYXRpb24gPSAzMDAsXG4gICAgICAgIGluUHJvY2VzcyA9IGZhbHNlO1xuXG4gICAgICAgIC8vY29uc29sZS5sb2coJ3JhbmdlTnVtOiAnICsgcmFuZ2VOdW0udGV4dCgpKTtcblxuICAgIGZ1bmN0aW9uIG1vdmVTbGlkZShkaXJlY3Rpb24pIHtcbiAgICAgICAgYWN0aXZlSXRlbSA9IGl0ZW1zLmZpbHRlcignLnNob2VzbGlzdF9hY3RpdmUtaW1nJyk7XG4gICAgICAgIHJhbmdlQWN0aXZlID0gcmFuZ2VMaXN0LmZpbHRlcignLnJhbmdlX2FjdGl2ZScpO1xuICAgICAgICAgICAgLy9kaXJlY3Rpb24gPSB0cmlnZ2VyID09PSBhcnJvd0xlZnQgPyAtMTAwIDogMTAwO1xuXG4gICAgICAgIFxuICAgICAgICBpZiAoZGlyZWN0aW9uID09PSBhcnJvd1JpZ2h0KSB7XG4gICAgICAgICAgICBjb3VudGVyKys7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb3VudGVyLS07XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY291bnRlciA+PSBpdGVtcy5sZW5ndGgpIGNvdW50ZXIgPSAwO1xuICAgICAgICBpZiAoY291bnRlciA8IDApIGNvdW50ZXIgPSBpdGVtcy5sZW5ndGggLSAxO1xuICAgICAgICBcbiAgICAgICAgY29uc29sZS5sb2coXCI+Pj4+PlwiICsgY291bnRlcik7XG5cbiAgICAgICAgdmFyIHJlcUl0ZW0gPSBpdGVtcy5lcShjb3VudGVyKSxcbiAgICAgICAgICAgIHJlcVJhbmdlID0gcmFuZ2VMaXN0LmVxKGNvdW50ZXIpO1xuXG4gICAgICAgIGNvbnNvbGUubG9nKGl0ZW1zKTtcbiAgICAgICAgXG4gICAgICAgIGlmIChkaXJlY3Rpb24gPT09IGFycm93UmlnaHQpIHtcbiAgICAgICAgICAgIHJlcUl0ZW0uY3NzKCdsZWZ0JywgJy0xMDAlJyk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGFjdGl2ZUl0ZW0uYW5pbWF0ZSh7XG4gICAgICAgICAgICAgICAgJ2xlZnQnIDogJzEwMCUnXG4gICAgICAgICAgICB9LCBkdXJhdGlvbik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXFJdGVtLmNzcygnbGVmdCcsICcxMDAlJyk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGFjdGl2ZUl0ZW0uYW5pbWF0ZSh7XG4gICAgICAgICAgICAgICAgJ2xlZnQnIDogJy0xMDAlJ1xuICAgICAgICAgICAgfSwgZHVyYXRpb24pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmFuZ2VBY3RpdmUuYW5pbWF0ZSh7XG4gICAgICAgICAgICBvcGFjaXR5OiBcImhpZGVcIlxuICAgICAgICAgIH0sMTUwLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJlcVJhbmdlLnNob3coMTUwLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICByYW5nZUFjdGl2ZS5yZW1vdmVDbGFzcygncmFuZ2VfYWN0aXZlJyk7XG4gICAgICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygncmFuZ2VfYWN0aXZlJyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmFuZ2VOdW0uZmFkZU91dCgxNTAsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmFuZ2VOdW0udGV4dChjb3VudGVyKzEpO1xuICAgICAgICB9KTtcbiAgICAgICAgcmFuZ2VOdW0uZmFkZUluKDE1MCk7XG5cbiAgICAgICAgcmVxSXRlbS5hbmltYXRlKHtcbiAgICAgICAgICAgICdsZWZ0JyA6IDBcbiAgICAgICAgfSwgZHVyYXRpb24sIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgYWN0aXZlSXRlbS5yZW1vdmVDbGFzcygnc2hvZXNsaXN0X2FjdGl2ZS1pbWcnKTtcbiAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ3Nob2VzbGlzdF9hY3RpdmUtaW1nJyk7XG4gICAgICAgICAgICBpblByb2Nlc3MgPSBmYWxzZTtcbiAgICAgICAgfSlcbiAgICB9XG4gICAgXG4gICAgJCgnLmFycm93Jykub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgIGlmKCFpblByb2Nlc3MpIHtcbiAgICAgICAgICAgIGluUHJvY2VzcyA9IHRydWU7XG4gICAgICAgICAgICBtb3ZlU2xpZGUoZS5jdXJyZW50VGFyZ2V0KTtcblxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhlLmN1cnJlbnRUYXJnZXQgPT09IGFycm93TGVmdCk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zb2xlLmxvZyhjb3VudGVyKTtcbiAgICB9KTtcbn0pKCk7Il19
