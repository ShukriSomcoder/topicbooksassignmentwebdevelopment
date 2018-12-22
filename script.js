/* Navigation from w3schools responsive navigation */
/* Toggle between adding and removing the "responsive" class to topnav when the user clicks on the icon */
function myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += "responsive";
    } else {
        x.className = "topnav";
    }
}

/*creating responsive slider from Javascript and Jquery book By John Duckett */
$('.slider').each(function(){
    var $this = $(this);
    var $group = $this.find('.slide-group');
    var $slides = $this.find ('.slide');
    var buttonArray = [];
    var currentIndex = 0;
    var timeout;

    //move () - The function to move the slide goes here
    function move(newIndex){
        var animateLeft, slideLeft;
        advance();


        //        If current slide is showing or a slide is animating then the if statement will do nothing
        if ($group.is(':animated')|| currentIndex === newIndex){
            return;
        }
        
        buttonArray[currentIndex].removeClass('active');// this will remove class from item
        buttonArray[newIndex].addClass('active');// this will add class to the new item

        //        if the new item is current the new slide will be to the right and the cuurent group will go to the left
        if (newIndex > currentIndex){
            slideLeft = '100%';
            animateLeft ='-100%';  
            //       or it will place the new slide to the left and the cuurent group will be to the right 
        } else {
            slideLeft = '-100%';
            animateLeft ='100%';  
        }

        //        This will position the new slide to the left (if it is less) or right (if it is more) of current
        $slides.eq(newIndex).css({left: slideLeft, display: 'block'} );
        $group.animate({left: animateLeft} , function(){
            $slides.eq(currentIndex).css({display: 'none'} );
            $slides.eq(newIndex).css({left:0} );
            $group.css({left: 0} );
            currentIndex =newIndex;});

    }

    //the funtion will set a timer between slides
    function advance (){
        ClearTimeout (timeout);
        //    start timer to sun an anonymous function every 4 seconds
        timeout = setTimeout(function(){
            if (currentIndex < ($slides.length - 1)){
                move (currentIndex + 1);
            } else{ 
                move (0);
            }
        }, 4000);
    }

    $.each($slides,function(index){
        // this will create a button element for the button
        var $button = $('<button type="button" class= "slide-btn">&bull;</button>');
        if (index === currentIndex){
            $button.addClass('active');

        }
        $button.on('click', function(){
            move(index);       
        }).appendTo($this.find('.slide-buttons'));
        buttonArray.push($button);
    });
    advance();

});


