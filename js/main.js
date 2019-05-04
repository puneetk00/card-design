$(function () {
    canvas = new fabric.Canvas('front', {
        selection: false
    });
    fabric.isWebglSupported(fabric.textureSize);
    canvas.setWidth(mxWidth);
    canvas.setHeight(mxHeight);
    canvas.backgroundColor = "#ffffff";
    fabric.Object.prototype.transparentCorners = false;
    let activeObj = canvas.getActiveObject();
    fabric.Object.prototype.setControlsVisibility({
        tl: true, //top-left
        mt: false, // middle-top
        tr: false, //top-right
        ml: false, //middle-left
        mr: false, //middle-right
        bl: false, // bottom-left
        mb: false, //middle-bottom
        br: true //bottom-right
    });

    fabric.Object.prototype.set({
        hasRotatingPoint: false
    });

    fabric.Object.prototype.customiseCornerIcons({
        settings: {
            borderColor: '#1573cb'
        },
        tl: {
            icon: 'images/corner-image.png'
        },
        br: {
            icon: 'images/corner-image.png'
        },
    }, function () {
        canvas.renderAll();
    });

    canvas.observe('object:modified', function () {
        console.log('modified');
    });
    canvas.observe('object:moving', function (e) {
        console.log('moving');
        $('.canvas-editing-options').css({
            display: 'none'
        });
        var obj = e.target;
        if (obj.currentHeight > obj.canvas.height || obj.currentWidth > obj.canvas.width) {
            return;
        }
        obj.setCoords();
        if (obj.getBoundingRect().top < 0 || obj.getBoundingRect().left < 0) {
            obj.top = Math.max(obj.top, obj.top - obj.getBoundingRect().top);
            obj.left = Math.max(obj.left, obj.left - obj.getBoundingRect().left);
        }
        if (obj.getBoundingRect().top + obj.getBoundingRect().height > obj.canvas.height || obj.getBoundingRect().left + obj.getBoundingRect().width > obj.canvas.width) {
            obj.top = Math.min(obj.top, obj.canvas.height - obj.getBoundingRect().height + obj.top - obj.getBoundingRect().top);
            obj.left = Math.min(obj.left, obj.canvas.width - obj.getBoundingRect().width + obj.left - obj.getBoundingRect().left);
        }
    });
    canvas.observe('object:scaling', function () {
        console.log('scaling');
    });
    canvas.observe('object:skewing', function () {
        console.log('skewing');
    });
    canvas.observe('object:moved', function () {
        console.log('moved');
    });
    canvas.observe('object:scaled', function () {
        console.log('scaled');
    });
    canvas.observe('object:rotating', function () {
        console.log('rotating');
    });
    canvas.observe('object:rotated', function () {
        console.log('rotated');
    });
    canvas.observe('object:skewed', function () {
        console.log('skewed');
    });
    canvas.observe('object:modified', function (e) {
        console.log('modified');
        canvas.renderAll();
    });
    canvas.observe('object:selected', function (e) {
        console.log('selected');
        let targetLeftVal = e.target.oCoords.tr.x;
        if (canvas.getActiveObject().shapeCanvas === 'texts') {
            if (targetLeftVal < 315) {
                $('#textEditOptions').css({
                    display: 'block',
                    top: e.target.oCoords.tr.y - 115,
                    left: e.target.oCoords.tr.x
                });
            } else {
                $('#textEditOptions').css({
                    display: 'block',
                    top: e.target.oCoords.tr.y - 115,
                    left: 315
                });
            }
        } else {
            if (targetLeftVal < 315) {
                $('#imageEditOptions').css({
                    display: 'block',
                    top: e.target.oCoords.tr.y - 75,
                    left: e.target.oCoords.tr.x
                });
            } else {
                $('#imageEditOptions').css({
                    display: 'block',
                    top: e.target.oCoords.tr.y - 75,
                    left: 315
                });
            }
        }
        switchFunction();
    });
    canvas.observe('selection:cleared', function (e) {
        console.log('cleared');
        $('.more-slide ul').animate({ right: '0' });
        $('.canvas-editing-options').hide();
        $('.top-slide-container').hide();
    });
    canvas.observe('selection:updated', function (e) {
        console.log('updated');
        $('.more-slide ul').animate({ right: '0' });
        let targetLeftVal = e.target.oCoords.tr.x;
        if (canvas.getActiveObject().shapeCanvas === 'texts') {
            if (targetLeftVal < 315) {
                $('#textEditOptions').css({
                    display: 'block',
                    top: e.target.oCoords.tr.y - 115,
                    left: e.target.oCoords.tr.x
                });
            } else {
                $('#textEditOptions').css({
                    display: 'block',
                    top: e.target.oCoords.tr.y - 115,
                    left: 315
                });
            }
        } else {
            if (targetLeftVal < 315) {
                $('#imageEditOptions').css({
                    display: 'block',
                    top: e.target.oCoords.tr.y - 115,
                    left: e.target.oCoords.tr.x
                });
            } else {
                $('#imageEditOptions').css({
                    display: 'block',
                    top: e.target.oCoords.tr.y - 115,
                    left: 315
                });
            }
        }
        switchFunction();
    });
    canvas.observe('mouse:up', function () {
        // console.log('mouse:up');
    });
    canvas.observe('mouse:down', function () {
        // console.log('mouse:down');
    });
    canvas.observe('mouse:move', function () {
        // console.log('mouse:move');
    });
    canvas.observe('mouse:over', function () {
        // console.log('mouse:over');
    });
    canvas.observe('mouse:out', function () {
        // console.log('mouse:out');
    });

    $('.slide-for-more').on('click', function () {
        $('.more-slide ul').animate({
            right: '525px'
        });
    });

    $('.slide-for-less').on('click', function () {
        $('.more-slide ul').animate({
            right: '0'
        });
    });

    function switchFunction() {
        let activeObj = canvas.getActiveObject();
        var activeCanvasObject = null;
        if (!!canvas.getActiveObject()) {
            var activeObjectfind = canvas.getActiveObject().shapeCanvas;
            switch (activeObjectfind) {
                case 'texts': {
                    $('.inputVal').val(activeObj.text);
                    $('#imageEditOptions').css('display', 'none');
                    break;
                }
                case 'image': {
                    $('#textEditOptions').css('display', 'none');
                    break;
                }
            }
        }
    };

    $('#left-control li a').on('click', function () {
        $('#left-control li').removeClass('active');
        $(this).parents('li').addClass('active');
        let thisClass = $(this).attr('class');
        $('.card-editing-tabs').css('display', 'none');
        $('#' + thisClass).css('display', 'block');
    });

    $('#right-control li a').on('click', function () {
        $('#right-control li').removeClass('active');
        $(this).parents('li').addClass('active');
    });

    // $(document).click(function (e) {
    //     let front = $('#front-view').css('display');
    //     if (!$(e.target).is('.card-editing-area-wrapper-left, .card-editing-area-wrapper-left *, .canvas-wrapper, .canvas-wrapper *, .canvas-editing-options, .canvas-editing-options *, .card-main-control, .card-main-control *, .ui-colorpicker-dialog, .ui-colorpicker-dialog *')) {
    //         $('.canvas-editing-options').hide();
    //         if (front === 'block') {
    //             canvas.discardActiveObject();
    //             canvas.renderAll();
    //         } else {
    //             canvasBack.discardActiveObject();
    //             canvasBack.renderAll();
    //         }
    //     }
    // });

    $('.instant-preview').on('click', function () {
        $("div#back-view-text.add-new-fields").find('.form_group').empty();
        canvasBack.clear();
        $('.instant-preview').removeClass('active');
        $(this).addClass('active');
    });

    $('.card-front').on('click', function () {
        $('#front-view, #front-view-text').css('display', 'block');
        $('#back-view,#back-view-one, #back-view-text').css('display', 'none');
    });

    $('.card-back').on('click', function () {
        $('#back-view, #back-view-text').css('display', 'block');
        $('#front-view,#back-view-one, #front-view-text').css('display', 'none');
    });
    initCenteringGuidelines(canvas);
    initAligningGuidelines(canvas);
    $('.edit-front-canvas').on('click', function () {
        $('.close-card-preview, .card-front').click();
        $('#front-view, #front-view-text').css('display', 'block');
        $('#back-view, #back-view-text').css('display', 'none');
    });
    $('.edit-back-canvas').on('click', function () {
        $('.close-card-preview, .card-back').click();
        $('#back-view, #back-view-text').css('display', 'block');
        $('#front-view, #front-view-text').css('display', 'none');
    });




    $('.save-btn').on('click', function () {
        // canvas._objects.set({
        //     lockMovementX: false,
        //     lockMovementY: false,
        //     lockRotation: false,
        //     lockScalingFlip: false,
        //     lockScalingX: false,
        //     lockScalingY: false,
        //     lockSkewingX: false,
        //     lockSkewingY: false,
        //     lockUniScaling: false
        // });
        // canvas.renderAll();
        // canvas.forEachObject(function (obj) {
        //     console.log(obj);
        // });
    });
});


// var textarea = $('.inputs-ctrl');
// var select = $('.add-more-field');

// var addOrRemoveRequiredAttribute = function () {
//     if (textarea.val().length) {
//         select.attr('required', true);
//     }
//     else {
//         select.attr('required', false);
//     }
// };

// Run now
// addOrRemoveRequiredAttribute();

// And when textarea changes
// textarea.on('change', addOrRemoveRequiredAttribute);

// $("#front-add-field").on('click', function(){
//     var isFormValid = true;

//     $(".inputs-ctrl").each(function(){
//         if ($.trim($(this).val()).length == 0){
//             $(this).addClass("highlight");
//             isFormValid = false;
//         }
//         else{
//             $(this).removeClass("highlight");
//         }
//     });

//     if (!isFormValid) alert("Please fill in all the required fields (indicated by *)");

//     return isFormValid;
// });


// $(document).ready(function () {
//     $("#user_errors").hide();
//     var user_err = true;

//     $('.inputs-ctrl').keyup(function () {
//         alert(user_val);
//         form_validate();
//     })

//     function form_validate() {
//         var user_val = $('.inputs-ctrl').val();

//         if (user_val == "") {
//             $("#user_errors").show();
//             $("#user_errors").html("**please fill the required field");
//             $("#user_errors").focus();
//             $("#user_errors").css({
//                 color: '#FF0000',
//                 border: '1px solid #FF0000'
//             })
//             var user_err = false;
//             return false;
//         } else {
//             $("#user_errors").hide();
//         }


//     }
// })


$('.card-back-output').on('click', function () {
    var json = canvasBack.toJSON();
    console.log(json);
    canvasBack.clear();
    canvasBack.loadFromJSON(json, canvas.renderAll.bind(canvasBack));
    $('.card-back-output').removeClass('activeClass');
    $('.card-front-output').removeClass('activeClass');
    $(this).addClass('activeClass');
    $('#enableBack').css('display', 'inline-block');
    $('.backCardContent').css('display', 'block');

});
$('.card-front-output').on('click', function () {
    $('.card-front-output').removeClass('activeClass');
    $('.card-back-output').removeClass('activeClass');
    $('#enableBack').css('display', 'none');
    $('.backCardContent').css('display', 'none');
    $(this).addClass('activeClass');
});

$('.card-front-exprt').on('click', function () {
    $('#export_front,.front-view-text').css('display', 'block');
    $('#export_back,.back-view-text').css('display', 'none');
    $('#enableBack').css('display', 'none');

    
});
$('.card-back-exprt').on('click', function () {
    $('#export_front,.front-view-text').css('display', 'none');
    $('#export_back,.back-view-text').css('display', 'block');
    $('#enableBack').css('display', 'inline-block');

    
});


$('.save-btn').on('click', function () {
    // canvas._objects.set({
    //     lockMovementX: false,
    //     lockMovementY: false,
    //     lockRotation: false,
    //     lockScalingFlip: false,
    //     lockScalingX: false,
    //     lockScalingY: false,
    //     lockSkewingX: false,
    //     lockSkewingY: false,
    //     lockUniScaling: false
    // });
    // canvas.renderAll();
    // canvas.forEachObject(function (obj) {
    //     console.log(obj);
    // });

  

});

initCenteringGuidelines(canvas);
initAligningGuidelines(canvas);
$('.edit-front-canvas').on('click', function () {
    $('.close-card-preview, .card-front').click();
    $('#front-view, #front-view-text').css('display', 'block');
    $('#back-view, #back-view-text').css('display', 'none');
    $('.backCardContent').css('display', 'none');
});
$('.edit-back-canvas').on('click', function () {
    $('.close-card-preview, .card-back').click();
    $('#back-view, #back-view-text').css('display', 'block');
    $('#front-view, #front-view-text').css('display', 'inline-block');
    $('.backCardContent').css('display', 'block');
   
});

