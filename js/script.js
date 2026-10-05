$(document).ready(function() {
    $('.hero-text').hover(
        function() { $(this).addClass('active'); }, 
        function() { $(this).removeClass('active'); }
    );
});
