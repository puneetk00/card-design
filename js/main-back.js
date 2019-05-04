$(function () {
    canvasBack = new fabric.Canvas('back', {
        selection: false
    });
    fabric.isWebglSupported(fabric.textureSize);
    canvasBack.setWidth(mxWidth);
    canvasBack.setHeight(mxHeight);
    canvas.backgroundColor = "#ffffff";
    fabric.Object.prototype.transparentCorners = false;
    let activeObj = canvasBack.getActiveObject();
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
        canvasBack.renderAll();
    });

    canvasBack.observe('object:modified', function () {
        console.log('modified');
    });
    canvasBack.observe('object:moving', function (e) {
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
    canvasBack.observe('object:scaling', function () {
        console.log('scaling');
    });
    canvasBack.observe('object:skewing', function () {
        console.log('skewing');
    });
    canvasBack.observe('object:moved', function () {
        console.log('moved');
    });
    canvasBack.observe('object:scaled', function () {
        console.log('scaled');
    });
    canvasBack.observe('object:rotating', function () {
        console.log('rotating');
    });
    canvasBack.observe('object:rotated', function () {
        console.log('rotated');
    });
    canvasBack.observe('object:skewed', function () {
        console.log('skewed');
    });
    canvasBack.observe('object:modified', function () {
        console.log('modified');
    });
    canvasBack.observe('object:selected', function (e) {
        console.log('selected');
        let targetLeftVal = e.target.oCoords.tr.x;
        if (canvasBack.getActiveObject().shapeCanvas === 'texts') {
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
            console.log(targetLeftVal);
            if (targetLeftVal < 315) {
                $('#imageEditOptions').css({
                    display: 'block',
                    top: e.target.oCoords.tr.y - 75,
                    left: e.target.oCoords.tr.x
                });
            } else {
                console.log(e.target.oCoords.tr.y);
                $('#imageEditOptions').css({
                    display: 'block',
                    top: e.target.oCoords.tr.y - 75,
                    left: 315
                });
            }
        }
        switchFunction();
    });
    canvasBack.observe('selection:cleared', function () {
        console.log('cleared');
        $('.more-slide ul').animate({ right: '0' });
        $('.canvas-editing-options').hide();
    });
    canvasBack.observe('selection:updated', function (e) {
        console.log('updated');
        $('.more-slide ul').animate({ right: '0' });
        let targetLeftVal = e.target.oCoords.tr.x;
        if (canvasBack.getActiveObject().shapeCanvas === 'texts') {
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
    canvasBack.observe('mouse:up', function () {
        // console.log('mouse:up');
    });
    canvasBack.observe('mouse:down', function () {
        // console.log('mouse:down');
    });
    canvasBack.observe('mouse:move', function () {
        // console.log('mouse:move');
    });
    canvasBack.observe('mouse:over', function () {
        // console.log('mouse:over');
    });
    canvasBack.observe('mouse:out', function () {
        // console.log('mouse:out');
    });

    function switchFunction() {
        let activeObjBack = canvasBack.getActiveObject();
        var activeCanvasObject = null;
        if (!!canvasBack.getActiveObject()) {
            var activeObjectfind = canvasBack.getActiveObject().shapeCanvas;
            switch (activeObjectfind) {
                case 'texts': {
                    $('.inputVal').val(activeObjBack.text);
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

    initCenteringGuidelines(canvasBack);
    initAligningGuidelines(canvasBack);
});