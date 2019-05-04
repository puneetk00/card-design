// $(function () {
//     /**User canvas front */
//     canvasUser = new fabric.Canvas('user-front', {
//         selection: false
//     });
//     fabric.isWebglSupported(fabric.textureSize);
//     canvasUser.setWidth(mxWidth);
//     canvasUser.setHeight(mxHeight);
//     canvasUser.backgroundColor = "#ffffff";

//     canvasUser.on('selection:created', function (ev) {
//         ev.target.set({
//             lockMovementX: true,
//             lockMovementY: true,
//             lockRotation: true,
//             lockScalingFlip: true,
//             lockScalingX: true,
//             lockScalingY: true,
//             lockSkewingX: true,
//             lockSkewingY: true,
//             lockUniScaling: true
//         });
//     });
//     canvasUser.observe('object:selected', function (ev) {
//         ev.target.set({
//             lockMovementX: true,
//             lockMovementY: true,
//             lockRotation: true,
//             lockScalingFlip: true,
//             lockScalingX: true,
//             lockScalingY: true,
//             lockSkewingX: true,
//             lockSkewingY: true,
//             lockUniScaling: true
//         });
//     });

//     canvasUser.observe('object:moved', function (ev) {
//         ev.target.set({
//             lockMovementX: true,
//             lockMovementY: true,
//             lockRotation: true,
//             lockScalingFlip: true,
//             lockScalingX: true,
//             lockScalingY: true,
//             lockSkewingX: true,
//             lockSkewingY: true,
//             lockUniScaling: true
//         });
//     });

//     canvasUser.observe('object:moving', function (ev) {
//         ev.target.set({
//             lockMovementX: true,
//             lockMovementY: true,
//             lockRotation: true,
//             lockScalingFlip: true,
//             lockScalingX: true,
//             lockScalingY: true,
//             lockSkewingX: true,
//             lockSkewingY: true,
//             lockUniScaling: true
//         });
//     });

//     canvasUser.observe('object:modified', function (ev) {
//         ev.target.set({
//             lockMovementX: true,
//             lockMovementY: true,
//             lockRotation: true,
//             lockScalingFlip: true,
//             lockScalingX: true,
//             lockScalingY: true,
//             lockSkewingX: true,
//             lockSkewingY: true,
//             lockUniScaling: true
//         });
//     });

//     /**User canvas back */
//     canvasUserBack = new fabric.Canvas('user-back', {
//         selection: false
//     });
//     canvasUserBack.setWidth(mxWidth);
//     canvasUserBack.setHeight(mxHeight);
//     canvasUserBack.backgroundColor = "#ffffff";
//     let activeObjUser = canvasUser.getActiveObject();
//     let activeObjUserBack = canvasUserBack.getActiveObject();

//     canvasUserBack.on('selection:created', function (ev) {
//         ev.target.set({
//             lockMovementX: true,
//             lockMovementY: true,
//             lockRotation: true,
//             lockScalingFlip: true,
//             lockScalingX: true,
//             lockScalingY: true,
//             lockSkewingX: true,
//             lockSkewingY: true,
//             lockUniScaling: true
//         });
//     });
//     canvasUserBack.observe('object:selected', function (ev) {
//         ev.target.set({
//             lockMovementX: true,
//             lockMovementY: true,
//             lockRotation: true,
//             lockScalingFlip: true,
//             lockScalingX: true,
//             lockScalingY: true,
//             lockSkewingX: true,
//             lockSkewingY: true,
//             lockUniScaling: true
//         });
//     });

//     canvasUserBack.observe('object:moved', function (ev) {
//         ev.target.set({
//             lockMovementX: true,
//             lockMovementY: true,
//             lockRotation: true,
//             lockScalingFlip: true,
//             lockScalingX: true,
//             lockScalingY: true,
//             lockSkewingX: true,
//             lockSkewingY: true,
//             lockUniScaling: true
//         });
//     });

//     canvasUserBack.observe('object:moving', function (ev) {
//         ev.target.set({
//             lockMovementX: true,
//             lockMovementY: true,
//             lockRotation: true,
//             lockScalingFlip: true,
//             lockScalingX: true,
//             lockScalingY: true,
//             lockSkewingX: true,
//             lockSkewingY: true,
//             lockUniScaling: true
//         });
//     });

//     canvasUserBack.observe('object:modified', function (ev) {
//         ev.target.set({
//             lockMovementX: true,
//             lockMovementY: true,
//             lockRotation: true,
//             lockScalingFlip: true,
//             lockScalingX: true,
//             lockScalingY: true,
//             lockSkewingX: true,
//             lockSkewingY: true,
//             lockUniScaling: true
//         });
//     });

//     // $(canvasUser._objects).each(function () {
//     //     console.log(this);
//     // })

//     $('.export-admin-user').on('click', function () {
//         let jsonFront = JSON.stringify(canvas);
//         let jsonBack = JSON.stringify(canvasBack);

//         canvasUser.loadFromJSON(jsonFront, canvasUser.renderAll.bind(canvasUser), function (o, object) {
//             let thisText = object.text;
//             if (object.type === 'i-text') {
//                 $('.front-inputs-ctrl').append('<div class="form_cntrl"><textarea id="require_field" class="inputs-ctrl-user user-front-ctrl">' + thisText + '</textarea><h5 class="required_error" class="user_errors" class="help-block"></h5></div>');
//             }
//         });

//         canvasUserBack.loadFromJSON(jsonBack, canvasUserBack.renderAll.bind(canvasUserBack), function (o, object) {
//             let thisText = object.text;
//             if (object.type === 'i-text') {
//                 $('.back-inputs-ctrl').append('<textarea class="inputs-ctrl-user user-back-ctrl">' + thisText + '</textarea>');
//             }
//         });
//     });

//     $(document).on('focus', '.front-inputs-ctrl .user-front-ctrl', function () {
//         let inputCtrlIndex = $(this).parents('.form_cntrl').index();
//         console.log(inputCtrlIndex);
//         inputCtrlIndex = inputCtrlIndex;
//         canvasUser.setActiveObject(canvasUser._objects[inputCtrlIndex]);
//         canvasUser.renderAll();
//     });

//     $(document).on('keyup', '.user-front-ctrl', function () {
//         let updatedTextVal = $(this).val();
//         canvasUser.getActiveObject().set('text', updatedTextVal);
//         $('.inputVal').val(updatedTextVal);
//         canvasUser.renderAll();
//     });

//     $(document).on('focus', '.user-back-ctrl', function () {
//         let inputCtrlIndex = $(this).index();
//         inputCtrlIndex = inputCtrlIndex;
//         canvasUserBack.setActiveObject(canvasUserBack._objects[inputCtrlIndex]);
//         canvasUserBack.renderAll();
//     });

//     $(document).on('keyup', '.user-back-ctrl', function () {
//         let updatedTextVal = $(this).val();
//         canvasUserBack.getActiveObject().set('text', updatedTextVal);
//         $('.inputVal').val(updatedTextVal);
//         canvasUserBack.renderAll();
//     });

// });