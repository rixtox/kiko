/*
Bones Scripts File
Author: Eddie Machado

This file should contain any js scripts you want to add to the site.
Instead of calling it in the header or throwing it inside wp_head()
this file will be called automatically in the footer so as not to
slow the page load.

*/

// IE8 ployfill for GetComputed Style (for Responsive Script below)
$ = jQuery;

if (!window.getComputedStyle) {
    window.getComputedStyle = function(el, pseudo) {
        this.el = el;
        this.getPropertyValue = function(prop) {
            var re = /(\-([a-z]){1})/g;
            if (prop == 'float') prop = 'styleFloat';
            if (re.test(prop)) {
                prop = prop.replace(re, function () {
                    return arguments[2].toUpperCase();
                });
            }
            return el.currentStyle[prop] ? el.currentStyle[prop] : null;
        }
        return this;
    }
}

// as the page loads, call these scripts
jQuery(document).ready(function($) {

    /*
    Responsive jQuery is a tricky thing.
    There's a bunch of different ways to handle
    it, so be sure to research and find the one
    that works for you best.
    */
    
    /* getting viewport width */
    var responsive_viewport = $(window).width();
    
    /* if is below 481px */
    if (responsive_viewport < 481) {
    
    } /* end smallest screen */
    
    /* if is larger than 481px */
    if (responsive_viewport > 481) {
        
    } /* end larger than 481px */
    
    /* if is above or equal to 768px */
    if (responsive_viewport >= 768) {
    
        /* load gravatars */
        $('.comment img[data-gravatar]').each(function(){
            $(this).attr('src',$(this).attr('data-gravatar'));
        });
        
    }
    
    /* off the bat large screen actions */
    if (responsive_viewport > 1030) {
        
    }
    
	
	// add all your scripts here

    // Google Font Loader
    WebFontConfig = {
        google: { families: [ 'Cagliostro', 'Cantarell:400,700,400italic,700italic', 'Quando' ] }
      };
      (function() {
        var wf = document.createElement('script');
        wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
    '://ajax.googleapis.com/ajax/libs/webfont/1.0.31/webfont.js';
        wf.type = 'text/javascript';
        wf.async = 'true';
        var s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(wf, s);
    })();



    // Comment Sharing Links
    $('.comment-share-link').live('click', function() {
        share_comment(this);
    })
}); /* end of as page load scripts */


/*! A fix for the iOS orientationchange zoom bug.
 Script by @scottjehl, rebound by @wilto.
 MIT License.
*/
(function(w){
	// This fix addresses an iOS bug, so return early if the UA claims it's something else.
	if( !( /iPhone|iPad|iPod/.test( navigator.platform ) && navigator.userAgent.indexOf( "AppleWebKit" ) > -1 ) ){ return; }
    var doc = w.document;
    if( !doc.querySelector ){ return; }
    var meta = doc.querySelector( "meta[name=viewport]" ),
        initialContent = meta && meta.getAttribute( "content" ),
        disabledZoom = initialContent + ",maximum-scale=1",
        enabledZoom = initialContent + ",maximum-scale=10",
        enabled = true,
		x, y, z, aig;
    if( !meta ){ return; }
    function restoreZoom(){
        meta.setAttribute( "content", enabledZoom );
        enabled = true; }
    function disableZoom(){
        meta.setAttribute( "content", disabledZoom );
        enabled = false; }
    function checkTilt( e ){
		aig = e.accelerationIncludingGravity;
		x = Math.abs( aig.x );
		y = Math.abs( aig.y );
		z = Math.abs( aig.z );
		// If portrait orientation and in one of the danger zones
        if( !w.orientation && ( x > 7 || ( ( z > 6 && y < 8 || z < 8 && y > 6 ) && x > 5 ) ) ){
			if( enabled ){ disableZoom(); } }
		else if( !enabled ){ restoreZoom(); } }
	w.addEventListener( "orientationchange", restoreZoom, false );
	w.addEventListener( "devicemotion", checkTilt, false );
})( this );



// Custome Code Below
// Constant Variables
var EXCERPT_LIMIT = 80;


function share_comment(e) {
    var comment_id = '#' + $(e).closest('article').attr('id'),
        comment_excerpt = get_comment_excerpt(comment_id),
        comment_url = window.location + comment_id;

    console.debug($(e).text());

    switch($(e).text()){
        case 'Twitter':
            share_twitter(comment_excerpt, comment_url);
            break;
            
        case 'Weibo':
            share_sina(comment_excerpt, comment_url);
            break;
    }
}

function share_sina(title, url) {
    var url = 'http://service.weibo.com/share/share.php?title=' + title + '&url=' + url;
    window.open(url, '_blank');
}

function share_twitter(text, url) {
    var url = 'https://twitter.com/intent/tweet?text=' + text + '&url=' + url;
    window.open(url, '_blank');
}

function get_comment_excerpt(comment_id) {
    var content = $(comment_id + ' .comment_content').text();
    return( excerpt( content , EXCERPT_LIMIT ) );
}

function excerpt( str, limit )
{
    var retval = str.replace( /^[\t\s]*/g, '' )
        .replace( /[\t\s]*$/g, '' )
        .replace( /[\n\r]/g, '' )
        + ' ';
    retval = retval.substr( 0, retval.lastIndexOf( ' ', limit ) ) + '...';
 
    return retval;
}