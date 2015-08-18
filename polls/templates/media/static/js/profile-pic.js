/*
For uploading profile pictures with crop and compression
Created 27/7/2015
*/

$(document).ready(function () {
    
    // Enables overlay interactions
    $.fn.enableOverlay = function (overlayID, closeOnClick) {
        var overlay = $(overlayID);
        var darkArea = overlay.find('.overlay-screen');
		var closeBtn = overlay.find('.close-overlay');
        
        if (closeOnClick){
            darkArea.on('click', function(event){
                if ($(event.target).attr('class') === darkArea.attr('class')){
                    overlay.addClass('hidden');
                    $(document.body).css( "overflow", "visible" );
                }
            });
        }
	 	closeBtn.on('click', function(event){
  			overlay.addClass('hidden');
  			$(document.body).css( "overflow", "visible" );
	 	});
        
        this.show = function() {
            overlay.removeClass('hidden');
            $(document.body).css( "overflow", "hidden" );  
        };
        
        this.hide = function() {
            overlay.removeClass('hidden');
            $(document.body).css( "overflow", "visible" );
        };
        
        return this;
    };    
    
    /* New solution for img uploads testing */
    
    var profilePic = $('#profile-picture');
    // Uploader
    var overlay = $('#choose-img-overlay');
    var container = $('.choose-img-container');
    var btnChoose = container.find('#choose');
    var btnZoomIn = container.find('#zoom-in');
    var btnZoomOut = container.find('#zoom-out'); 
    var btnCancel = container.find('#cancel');
    var btnSave = container.find('#save');
    var fileUploader = container.find('#file');
    var imgContainer = container.find('.img-container .image');
    var loading = container.find('.img-container .ellipsis');
    var imgURL = 'avatar.png';    
    
    // takes img on page and applies cropping js
    $.fn.enableCrop = function () {
        $(this).cropbox({
            width: 200,
            height: 200,
            controls: "false"
        }, function() {
            //on load
            //console.log('Url: ' + this.getDataURL());
        }).on('cropbox', function(e, data) {
            //console.log('crop window: ' + data);
        });
    };    
    // Provides URL of uploaded img and places it in overlay
    fileUploader.on('change', function(){
        loading.removeClass('hidden');
        overlay.removeClass('hidden');
        var reader = new FileReader();
        reader.onload = function(e) {
            imgURL = e.target.result;
            imgContainer.html('<img src="'+imgURL+'">');
            imgContainer.find('img').enableCrop();
            loading.addClass('hidden');
        }
        reader.readAsDataURL(this.files[0]);
        this.files = [];
    });
    
    // Clicking user's profile pic triggers browse img
    profilePic.on('click', function(){
        fileUploader.click();
    });
    // "Cancel" clears the file input and closes overlay
    btnCancel.on('click', function(){
        fileUploader.replaceWith( fileUploader = fileUploader.clone( true ) );
        overlay.addClass('hidden');
    });
    // "Choose" browses for another img to upload
    btnChoose.on('click', function(){
        fileUploader.click();
    });
    btnZoomIn.on('click', function(){
        imgContainer.find('img').data('cropbox').zoomIn();
    });
    btnZoomOut.on('click', function(){
        imgContainer.find('img').data('cropbox').zoomOut();
    });
    btnSave.on('click', function(){
        var src = imgContainer.find('img').data('cropbox').getDataURL();
        profilePic.html('<img src="'+src+'">');
        overlay.addClass('hidden');
        // TODO: send cropped img to database
    });    
    
});