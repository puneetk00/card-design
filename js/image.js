$(function () {
    /**For image upload only */
    // var webglBackend;
    // try {
    //     webglBackend = new fabric.WebglFilterBackend();
    // } catch (e) {
    //     console.log(e)
    // }
    // var canvas2dBackend = new fabric.Canvas2dFilterBackend()

    // $('.text-color-image').onclick = function () {
    //     if (this.checked) {
    //     fabric.filterBackend = webglBackend;
    //     } else {
    //         fabric.filterBackend = canvas2dBackend;
    //     }
    // };

    fabric.filterBackend = fabric.initFilterBackend();
    fabric.Object.prototype.transparentCorners = false;

    document.getElementById('file').addEventListener("change", function (e) {
        var file = e.target.files[0];
        var reader = new FileReader();
        reader.onload = function (f) {
            var data = f.target.result;
            fabric.Image.fromURL(data, function (img) {
                var oImg = img.set({
                    left: 250,
                    top: 100,
                    angle: 0,
                    shapeCanvas: 'image',
                    crossOrigin: "anonymous",
                    hasRotatingPoint: false
                });
                let front = $('#front-view').css('display');
                if (front === 'block') {
                    canvas.add(oImg);
                    canvas.renderAll();
                    $('#file').val('');
                    canvas.setActiveObject(oImg);
                } else {
                    canvasBack.add(oImg);
                    canvasBack.renderAll();
                    $('#file').val('');
                    canvasBack.setActiveObject(oImg);
                }
                /**Uploaded img data src */
                var dataURL = canvas.toDataURL({
                    format: 'png',
                    quality: 1,
                    crossOrigin: "anonymous"
                });
                var dataURLBack = canvasBack.toDataURL({
                    format: 'png',
                    quality: 1,
                    crossOrigin: "anonymous"
                });
            });
        };
        reader.readAsDataURL(file);
    });



    /**Replace File */
    var span = document.querySelector('#fileReplace');
    span.onchange = function (e) {
        var file = e.target.files[0];
        var reader = new FileReader();
        reader.onload = function (file) {
            addImage(file.target.result);
        }
        reader.readAsDataURL(file);
    }

    function addImage(imgLink) {
        let front = $('#front-view').css('display');
        fabric.Image.fromURL(imgLink, function (img) {
            var objs = canvas.getObjects();
            if (objs.length) {
                objs.forEach(function (e) {
                    if (e && e.type === 'image') {
                        e._element.src = imgLink;
                        if (front === 'block') {
                            canvas.renderAll();
                        } else {
                            canvasBack.renderAll();
                        }
                    }
                });
            } else {
                if (front === 'block') {
                    canvas.add(img);
                } else {
                    canvasBack.add(img);
                }
            }
        });
        $('.top-slide-container').css('display', 'none');
    }





    // /**For Background Image**/
    // document.getElementById('file2').addEventListener("change", function (e) {
    //     var file = e.target.files[0];
    //     var reader = new FileReader();
    //     reader.onload = function (f) {
    //         var data = f.target.result;
    //         fabric.Image.fromURL(data, function (img) {
    //             img.set({
    //                 angle: 0,
    //                 shapeCanvas: 'image',
    //                 selection: true,
    //                 hasRotatingPoint: false
    //             });
    //             canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
    //                 scaleX: canvas.width / img.width,
    //                 scaleY: canvas.height / img.height
    //             });
    //         });
    //     };
    //     reader.readAsDataURL(file);
    // });

    $('.love-move-object.lock').on('click', function () {
        let front = $('#front-view').css('display');
        $(this).css('display', 'none');
        $('a.love-move-object.unlock').css('display', 'block');
        if (front === 'block') {
            canvas.getActiveObject().set({
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
            canvas.renderAll();
        } else {
            canvasBack.getActiveObject().set({
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
            canvasBack.renderAll();
        }
    });

    $('.love-move-object.unlock').on('click', function () {
        let front = $('#front-view').css('display');
        $(this).css('display', 'none');
        $('a.love-move-object.lock').css('display', 'block');
        if (front === 'block') {
            canvas.getActiveObject().set({
                lockMovementX: false,
                lockMovementY: false,
                lockRotation: false,
                lockScalingFlip: false,
                lockScalingX: false,
                lockScalingY: false,
                lockSkewingX: false,
                lockSkewingY: false,
                lockUniScaling: false
            });
            canvas.renderAll();
        } else {
            canvasBack.getActiveObject().set({
                lockMovementX: false,
                lockMovementY: false,
                lockRotation: false,
                lockScalingFlip: false,
                lockScalingX: false,
                lockScalingY: false,
                lockSkewingX: false,
                lockSkewingY: false,
                lockUniScaling: false
            });
            canvasBack.renderAll();
        }
    });

    $('.image-filter-color').on('input', function () {
        let thisVal = $(this).val();
    });

    $('.image-filter-lightness').on('input', function () {
        let thisVal = $(this).val();
        var object = canvas.getActiveObject();
        var filter = new fabric.Image.filters.Brightness({
            brightness: parseFloat(thisVal)
        });
        object.filters.push(filter);
        object.applyFilters();
        canvas.renderAll();
    });


    $('.image-filter-saturation').on('input', function () {
        let thisVal = $(this).val();
        var object = canvas.getActiveObject();
        var filter = new fabric.Image.filters.Saturation({
            saturation: parseFloat(thisVal)
        });
        object.filters.push(filter);
        object.applyFilters(canvas.renderAll.bind(canvas));
        // canvas.renderAll();
    });

    $('.dublicate-copy-image').on('click', function () {
        let front = $('#front-view').css('display');
        var activeObject = canvas.getActiveObject();
        var activeObjectBack = canvasBack.getActiveObject();
        console.log(front);
        if (front === 'block') {
            activeObject.clone(function (cloned) {
                canvas.discardActiveObject();
                cloned.set({
                    top: cloned.top + 50,
                    evented: true,
                    hasRotatingPoint: false
                });
                if (cloned.type === 'activeSelection') {
                    // active selection needs a reference to the canvas.
                    cloned.canvas = canvas;
                    cloned.forEachObject(function (obj) {
                        canvas.add(obj);
                    });
                    cloned.setCoords();
                } else {
                    canvas.add(cloned);
                }
                canvas.setActiveObject(cloned);
                canvas.requestRenderAll();
            });
        } else {
            activeObjectBack.clone(function (cloned) {
                canvasBack.discardActiveObject();
                canvasBack.set({
                    top: cloned.top + 100,
                    evented: true,
                    hasRotatingPoint: false
                });
                if (cloned.type === 'activeSelection') {
                    // active selection needs a reference to the canvas.
                    canvasBack.canvasBack = canvasBack;
                    canvasBack.forEachObject(function (obj) {
                        canvasBack.add(obj);
                    });
                    cloned.setCoords();
                } else {
                    canvasBack.add(cloned);
                }
                canvasBack.setActiveObject(cloned);
                canvasBack.requestRenderAll();
            });
        }
    });

    $('.col-arrange a').on('click', function () {
        let thisClass = $(this).attr('class');
        let activeObj = canvas.getActiveObject();
        if (thisClass === 'b2f') {
            activeObj.bringToFront();
        } else if (thisClass === 'bf') {
            activeObj.bringForward();
        } else if (thisClass === 's2b') {
            activeObj.sendToBack();
        } else if (thisClass === 'sb') {
            activeObj.sendBackwards();
        }
        canvas.renderAll();
    });

});




