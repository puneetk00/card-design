$(function () {
    /**User canvas front */
    canvasUser = new fabric.Canvas('user-front-export', {
        selection: false
    });
    fabric.isWebglSupported(fabric.textureSize);
    canvasUser.setWidth(mxWidth);
    canvasUser.setHeight(mxHeight);
    canvasUser.backgroundColor = "#ffffff";

    canvasUser.on('selection:created', function (ev) {
        ev.target.set({
            lockMovementX: true,
            lockMovementY: true,
            lockRotation: true,
            lockScalingFlip: true,
            lockScalingX: true,
            lockScalingY: true,
            lockSkewingX: true,
            lockSkewingY: true,
            lockUniScaling: true
        });
    });
    canvasUser.observe('object:selected', function (ev) {
        ev.target.set({
            lockMovementX: true,
            lockMovementY: true,
            lockRotation: true,
            lockScalingFlip: true,
            lockScalingX: true,
            lockScalingY: true,
            lockSkewingX: true,
            lockSkewingY: true,
            lockUniScaling: true
        });
    });

    canvasUser.observe('object:moved', function (ev) {
        ev.target.set({
            lockMovementX: true,
            lockMovementY: true,
            lockRotation: true,
            lockScalingFlip: true,
            lockScalingX: true,
            lockScalingY: true,
            lockSkewingX: true,
            lockSkewingY: true,
            lockUniScaling: true
        });
    });

    canvasUser.observe('object:moving', function (ev) {
        ev.target.set({
            lockMovementX: true,
            lockMovementY: true,
            lockRotation: true,
            lockScalingFlip: true,
            lockScalingX: true,
            lockScalingY: true,
            lockSkewingX: true,
            lockSkewingY: true,
            lockUniScaling: true
        });
    });

    canvasUser.observe('object:modified', function (ev) {
        ev.target.set({
            lockMovementX: true,
            lockMovementY: true,
            lockRotation: true,
            lockScalingFlip: true,
            lockScalingX: true,
            lockScalingY: true,
            lockSkewingX: true,
            lockSkewingY: true,
            lockUniScaling: true
        });
    });

    /**User canvas back */
    canvasUserBack = new fabric.Canvas('user-back-export', {
        selection: false
    });
    canvasUserBack.setWidth(mxWidth);
    canvasUserBack.setHeight(mxHeight);
    canvasUserBack.backgroundColor = "#ffffff";
    let activeObjUser = canvasUser.getActiveObject();
    let activeObjUserBack = canvasUserBack.getActiveObject();

    canvasUserBack.on('selection:created', function (ev) {
        ev.target.set({
            lockMovementX: true,
            lockMovementY: true,
            lockRotation: true,
            lockScalingFlip: true,
            lockScalingX: true,
            lockScalingY: true,
            lockSkewingX: true,
            lockSkewingY: true,
            lockUniScaling: true
        });
    });
    canvasUserBack.observe('object:selected', function (ev) {
        ev.target.set({
            lockMovementX: true,
            lockMovementY: true,
            lockRotation: true,
            lockScalingFlip: true,
            lockScalingX: true,
            lockScalingY: true,
            lockSkewingX: true,
            lockSkewingY: true,
            lockUniScaling: true
        });
    });

    canvasUserBack.observe('object:moved', function (ev) {
        ev.target.set({
            lockMovementX: true,
            lockMovementY: true,
            lockRotation: true,
            lockScalingFlip: true,
            lockScalingX: true,
            lockScalingY: true,
            lockSkewingX: true,
            lockSkewingY: true,
            lockUniScaling: true
        });
    });

    canvasUserBack.observe('object:moving', function (ev) {
        ev.target.set({
            lockMovementX: true,
            lockMovementY: true,
            lockRotation: true,
            lockScalingFlip: true,
            lockScalingX: true,
            lockScalingY: true,
            lockSkewingX: true,
            lockSkewingY: true,
            lockUniScaling: true
        });
    });
    // canvas.on('object:moving', function(options) {
    //     if (Math.round(options.target.left / grid * 4) % 4 == 0 &&
    //       Math.round(options.target.top / grid * 4) % 4 == 0) {
    //       options.target.set({
    //         left: Math.round(options.target.left / grid) * grid,
    //         top: Math.round(options.target.top / grid) * grid
    //       }).setCoords();
    //     }
    //   });

    canvasUserBack.observe('object:modified', function (ev) {
        ev.target.set({
            lockMovementX: true,
            lockMovementY: true,
            lockRotation: true,
            lockScalingFlip: true,
            lockScalingX: true,
            lockScalingY: true,
            lockSkewingX: true,
            lockSkewingY: true,
            lockUniScaling: true
        });
    });

    // $(canvasUser._objects).each(function () {
    //     console.log(this);
    // })
   let exportCounter = 0;
    $('.export-admin-user').on('click', function () {
      console.log('called');
        let jsonFront = JSON.stringify(canvas);
        let jsonBack = JSON.stringify(canvasBack);
        $('.front-inputs-ctrl').empty();
        $('.back-inputs-ctrl').empty();
        canvasUser.loadFromJSON(jsonFront, canvasUser.renderAll.bind(canvasUser), function (o, object) {
            exportCounter++;
            let thisText = object.text;
            if (object.type === 'i-text') {
                // $('.form_cntrl').parent().remove();
                // $('.form_cntrl').remove();
                $('.front-inputs-ctrl').append('<div class="form_cntrl"><textarea  required="required" class="require_field inputs-ctrl-user user-front-ctrl">' + thisText + '</textarea><h5 class="required_error" class="user_errors" class="help-block"></h5></div>');
            }
        });

        canvasUserBack.loadFromJSON(jsonBack, canvasUserBack.renderAll.bind(canvasUserBack), function (o, object) {
            exportCounter++;
            let thisText = object.text;
            if (object.type === 'i-text') {
                $('.back-inputs-ctrl').append('<div class="form_cntrl"><textarea required="required" class="require_field_back inputs-ctrl-user user-back-ctrl">' + thisText + '</textarea><h5 class="required_error" class="user_errors" class="help-block"></h5></div>');
            }
        });
       
    });

    $(document).on('focus', '.front-inputs-ctrl .user-front-ctrl', function () {
        let inputCtrlIndex = $(this).parents('.form_cntrl').index();
        console.log(inputCtrlIndex);
        inputCtrlIndex = inputCtrlIndex;
        canvasUser.setActiveObject(canvasUser._objects[inputCtrlIndex]);
        canvasUser.renderAll();
    });

    $(document).on('keyup', '.user-front-ctrl', function () {
        let updatedTextVal = $(this).val();
        canvasUser.getActiveObject().set('text', updatedTextVal);
        $('.inputVal').val(updatedTextVal);
        canvasUser.renderAll();
    });

    $(document).on('focus', '.user-back-ctrl', function () {
        let inputCtrlIndex = $(this).parents().index();
        inputCtrlIndex = inputCtrlIndex;
        canvasUserBack.setActiveObject(canvasUserBack._objects[inputCtrlIndex]);
        canvasUserBack.renderAll();
    });

    $(document).on('keyup', '.user-back-ctrl', function () {
        let updatedTextVal = $(this).val();
        canvasUserBack.getActiveObject().set('text', updatedTextVal);
        $('.inputVal').val(updatedTextVal);
        canvasUserBack.renderAll();
    });


    $('#addmore_backside').on('click', function(){
        alert('clicked');
        console.log(  $(this).parent());
        $('#addmore_backside .add_more_button').removeClass('activeClass');
        $(this).find('.add_more_button').addClass('activeClass');

        $(this).parent('.card-editing-area-wrapper-right').find('.canvas-container').append('<div class="top_scale"></div><div class="left_scale"></div><canvas id="back_more"></canvas>');
    })

});