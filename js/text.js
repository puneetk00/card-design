$(function () {
    let inputVal, inputBox, topVal = 50, newInputVal, newTopVal = 80, rotateVal = 90;
    let activeObj = canvas.getActiveObject();
    let front = $('#front-view').css('display');
    $('.inputs-ctrl').each(function () {
        inputVal = $(this).val();
        inputBox = new fabric.IText(inputVal, {
            left: 50,
            top: topVal,
            width: '100%',
            fontSize: 20,
            fontFamily: 'arial',
            fontWeight: 'normal',
            fill: 'black',
            evented: true,
            noScaleCache: false,
            hasControl: false
        });
        topVal = topVal + 40;
        inputBox.set({
            shapeCanvas: 'texts',
            hasRotatingPoint: false
        });
        if (front === 'block') {
            canvas.add(inputBox);
        } else {
            canvasBack.add(inputBox);
        }
    });

    $('#front-add-field').on('click', function () {
        $(this).parent('.add-new-fields').append('<textarea class="inputs-ctrl new-added-field front-input">Enter Your Text</textarea>');
        newInputVal = $('#updateValue').val();
        newInputCtrl = new fabric.IText(newInputVal, {
            left: 250,
            top: newTopVal,
            width: '100%',
            fontSize: 20,
            fontFamily: 'arial',
            fontWeight: 'normal',
            fill: 'black',
            evented: true,
            noScaleCache: false
        });
        newTopVal = newTopVal + 40;
        newInputCtrl.set({
            shapeCanvas: 'texts',
            hasRotatingPoint: false
        });
        canvas.add(newInputCtrl);
        canvas.setActiveObject(newInputCtrl);
        canvas.renderAll();
    });

    $('#back-add-field').on('click', function () {
        $(this).parent('.add-new-fields').append('<textarea class="inputs-ctrl new-added-field back-input">Enter Your Text</textarea>');
        newInputVal = $('#updateValue').val();
        newInputCtrl = new fabric.IText(newInputVal, {
            left: 250,
            top: newTopVal,
            width: '100%',
            fontSize: 20,
            fontFamily: 'arial',
            fontWeight: 'normal',
            fill: 'black',
            evented: true,
            noScaleCache: false
        });
        newTopVal = newTopVal + 40;
        newInputCtrl.set({
            shapeCanvas: 'texts',
            hasRotatingPoint: false
        });
        canvasBack.add(newInputCtrl);
        canvasBack.setActiveObject(newInputCtrl);
        canvasBack.renderAll();
    });

    $(document).on('focus', '.inputs-ctrl', function () {
        let front = $('#front-view').css('display');
        let inputCtrlIndex = $(this).index();
        inputCtrlIndex = inputCtrlIndex - 1;
        if (front === 'block') {
            canvas.setActiveObject(canvas._objects[inputCtrlIndex]);
            canvas.renderAll();
        } else {
            canvasBack.setActiveObject(canvasBack._objects[inputCtrlIndex]);
            canvasBack.renderAll();
        }
    });

    $(document).on('keyup', '.inputs-ctrl', function () {
        let front = $('#front-view').css('display');
        let updatedTextVal = $(this).val();
        if (front === 'block') {
            canvas.getActiveObject().set('text', updatedTextVal);
            $('.inputVal').val(updatedTextVal);
            canvas.renderAll();
        } else {
            canvasBack.getActiveObject().set('text', updatedTextVal);
            $('.inputVal').val(updatedTextVal);
            canvasBack.renderAll();
        }
    });

    $('.inputVal').on('keyup', function () {
        let front = $('#front-view').css('display');
        let updatedTextVal = $(this).val();
        if (front === 'block') {
            canvas.getActiveObject().set('text', updatedTextVal);
            let ActiveObjectIndex = canvas.getObjects().indexOf(canvas.getActiveObject());
            $('.inputs-ctrl').eq(ActiveObjectIndex).val(updatedTextVal);
            canvas.renderAll();
        } else {
            canvasBack.getActiveObject().set('text', updatedTextVal);
            let ActiveObjectIndex = canvasBack.getObjects().indexOf(canvasBack.getActiveObject());
            $('.back-input').eq(ActiveObjectIndex).val(updatedTextVal);
            canvasBack.renderAll();
        }
    });

    function Copy() {
        canvas.getActiveObject().clone(function (cloned) {
            _clipboard = cloned;
        });
    }

    function Paste() {
        _clipboard.clone(function (clonedObj) {
            canvas.discardActiveObject();
            clonedObj.set({
                left: clonedObj.left,
                top: clonedObj.top + 50,
                evented: true,
                shapeCanvas: 'texts',
                hasRotatingPoint: false
            });
            if (clonedObj.type === 'activeSelection') {
                clonedObj.canvas = canvas;
                clonedObj.forEachObject(function (obj) {
                    canvas.add(obj);
                });
                clonedObj.setCoords();
            } else {
                canvas.add(clonedObj);
            }
            canvas.setActiveObject(clonedObj);
            canvas.requestRenderAll();
        });
    }

    function CopyBack() {
        canvasBack.getActiveObject().clone(function (cloned) {
            _clipboard = cloned;
        });
    }

    function PasteBack() {
        _clipboard.clone(function (clonedObj) {
            canvasBack.discardActiveObject();
            clonedObj.set({
                left: clonedObj.left,
                top: clonedObj.top + 50,
                evented: true,
                shapeCanvas: 'texts',
                hasRotatingPoint: false
            });
            if (clonedObj.type === 'activeSelection') {
                clonedObj.canvasBack = canvasBack;
                clonedObj.forEachObject(function (obj) {
                    canvasBack.add(obj);
                });
                clonedObj.setCoords();
            } else {
                canvasBack.add(clonedObj);
            }
            canvasBack.setActiveObject(clonedObj);
            canvasBack.requestRenderAll();
        });
    }

    $('.more-slide ul li a').on('click', function () {
        let front = $('#front-view').css('display');
        let activeObj = canvas.getActiveObject();
        let activeObjBack = canvasBack.getActiveObject();
        let controlAttr = $(this).attr('class');
        if (controlAttr === 'bold-font') {
            if (front === 'block') {
                if (activeObj.fontWeight === 'normal') {
                    activeObj.set({ fontWeight: 'bold' });
                } else {
                    activeObj.set({ fontWeight: 'normal' });
                }
            } else {
                if (activeObjBack.fontWeight === 'normal') {
                    activeObjBack.set({ fontWeight: 'bold' });
                } else {
                    activeObjBack.set({ fontWeight: 'normal' });
                }
            }

        } else if (controlAttr === 'italic-font') {
            if (front === 'block') {
                if (activeObj.fontStyle === 'normal') {
                    activeObj.set({ fontStyle: 'italic' });
                } else {
                    activeObj.set({ fontStyle: 'normal' });
                }
            } else {
                if (activeObjBack.fontStyle === 'normal') {
                    activeObjBack.set({ fontStyle: 'italic' });
                } else {
                    activeObjBack.set({ fontStyle: 'normal' });
                }
            }
        } else if (controlAttr === 'underline-font') {
            if (front === 'block') {
                if (activeObj.underline) {
                    activeObj.set({ underline: false });
                } else {
                    activeObj.set({ underline: true });
                }
            } else {
                if (activeObjBack.underline) {
                    activeObjBack.set({ underline: false });
                } else {
                    activeObjBack.set({ underline: true });
                }
            }
        } else if (controlAttr === 'delete-object') {
            if (front === 'block') {
                let activeObjIndex = canvas.getObjects().indexOf(canvas.getActiveObject());
                $('.inputs-ctrl').eq(activeObjIndex).remove();
                canvas.remove(canvas.getActiveObject());
            } else {
                let activeObjIndex = canvasBack.getObjects().indexOf(canvasBack.getActiveObject());
                $('.inputs-ctrl').eq(activeObjIndex).remove();
                canvasBack.remove(canvasBack.getActiveObject());
            }
        } else if (controlAttr === 'align-left') {
            if (front === 'block') {
                activeObj.set({ textAlign: 'left' });
            } else {
                activeObjBack.set({ textAlign: 'left' });
            }
        } else if (controlAttr === 'align-center') {
            if (front === 'block') {
                activeObj.set({ textAlign: 'center' });
            } else {
                activeObjBack.set({ textAlign: 'center' });
            }
        } else if (controlAttr === 'align-right') {
            if (front === 'block') {
                activeObj.set({ textAlign: 'right' });
            } else {
                activeObjBack.set({ textAlign: 'right' });
            }
        } else if (controlAttr === 'dublicate-copy') {
            if (front === 'block') {
                Copy();
                Paste();
            } else {
                CopyBack();
                PasteBack();
            }
        } else if (controlAttr === 'rotate-object') {
            if (front === 'block') {
                activeObj.rotate(rotateVal);
                rotateVal = rotateVal + 90;
            } else {
                activeObjBack.rotate(rotateVal);
                rotateVal = rotateVal + 90;
            }
        } else if (controlAttr === 'arrange-object') {
            if (front === 'block') {
                activeObj.bringForward();
            } else {
                activeObjBack.bringForward();
            }
        }
        canvas.renderAll();
        canvasBack.renderAll();
    });

    $('.more-slide ul li a').on('click', function () {
        let front = $('#front-view').css('display');
        let className = $(this).attr('class');
        let displayCheck = $('#' + className).css('display');
        if (displayCheck === 'block') {
            $('#' + className).slideUp();
        } else {
            $('.top-slide-container').slideUp();
            $('#' + className).slideDown();
        }

        if ($(this).attr('class') === 'text-shadow') {
            $('#colorpicker-shadow').change();
        }
        if ($(this).attr('class') === 'text-outline') {
            $('#colorpicker-outline').change();
            $('.text-outline-slider').input();
        }
    });

    $('.fontSizeInputVal').on('change', function () {
        let front = $('#front-view').css('display');
        let fSizeVal = $(this).val();
        $('.font-size').text(fSizeVal);
        $('.fontSizeRangeVal').val(fSizeVal);
        if (front === 'block') {
            canvas.getActiveObject().set({ fontSize: fSizeVal });
            canvas.renderAll();
        } else {
            canvasBack.getActiveObject().set({ fontSize: fSizeVal });
            canvasBack.renderAll();
        }
    });

    $('.fontSizeRangeVal').on('input', function () {
        let front = $('#front-view').css('display');
        let fSizeVal = $(this).val();
        $('.font-size').text(fSizeVal);
        $('.fontSizeInputVal').val(fSizeVal);
        if (front === 'block') {
            canvas.getActiveObject().set({ fontSize: fSizeVal });
            canvas.renderAll();
        } else {
            canvasBack.getActiveObject().set({ fontSize: fSizeVal });
            canvasBack.renderAll();
        }
    });

    $('.lineHeightInputVal').on('change', function () {
        let front = $('#front-view').css('display');
        let lineHeighVal = $(this).val();
        $('.line-height').text(lineHeighVal);
        $('.lineHeightRangeVal').val(lineHeighVal);
        if (front === 'block') {
            canvas.getActiveObject().set({ lineHeight: lineHeighVal });
            canvas.renderAll();
        } else {
            canvasBack.getActiveObject().set({ lineHeight: lineHeighVal });
            canvasBack.renderAll();
        }
    });

    $('.lineHeightRangeVal').on('input', function () {
        let front = $('#front-view').css('display');
        let lineHeighVal = $(this).val();
        $('.line-height').text(lineHeighVal);
        $('.lineHeightInputVal').val(lineHeighVal);
        if (front === 'block') {
            canvas.getActiveObject().set({ lineHeight: lineHeighVal });
            canvas.renderAll();
        } else {
            canvasBack.getActiveObject().set({ lineHeight: lineHeighVal });
            canvasBack.renderAll();
        }
    });

    $('.letterSpacingInputVal').on('input', function () {
        let front = $('#front-view').css('display');
        let letterSpacinghVal = $(this).val();
        $('.letter-spacing').text(letterSpacinghVal);
        $('.letterSpacingRangeVal').val(letterSpacinghVal);
        if (front === 'block') {
            canvas.getActiveObject().set({ charSpacing: letterSpacinghVal });
            canvas.renderAll();
        } else {
            canvasBack.getActiveObject().set({ charSpacing: letterSpacinghVal });
            canvasBack.renderAll();
        }
    });

    $('.letterSpacingRangeVal').on('input', function () {
        let front = $('#front-view').css('display');
        let letterSpacingVal = $(this).val();
        $('.letter-spacing').text(letterSpacingVal);
        $('.letterSpacingInputVal').val(letterSpacingVal);
        if (front === 'block') {
            canvas.getActiveObject().set({ charSpacing: letterSpacingVal });
            canvas.renderAll();
        } else {
            canvasBack.getActiveObject().set({ charSpacing: letterSpacingVal });
            canvasBack.renderAll();
        }
    });

    $('#colorpicker-full').on('change', function () {
        let front = $('#front-view').css('display');
        let textColorVal = $(this).val();
        if (front === 'block') {
            canvas.getActiveObject().set({ fill: '#' + textColorVal });
            canvas.renderAll();
        } else {
            canvasBack.getActiveObject().set({ fill: '#' + textColorVal });
            canvasBack.renderAll();
        }
    });

    $('#colorpicker-outline').on('change', function () {
        let front = $('#front-view').css('display');
        let textColorVal = $(this).val();
        if (front === 'block') {
            canvas.getActiveObject().set({ stroke: '#' + textColorVal });
            canvas.renderAll();
        } else {
            canvasBack.getActiveObject().set({ stroke: '#' + textColorVal });
            canvasBack.renderAll();
        }
    });

    $('.text-outline-slider').on('input', function () {
        let front = $('#front-view').css('display');
        let outlineWidth = $(this).val();
        if (front === 'block') {
            canvas.getActiveObject().set({ strokeWidth: outlineWidth });
            canvas.renderAll();
        } else {
            canvasBack.getActiveObject().set({ strokeWidth: outlineWidth });
            canvasBack.renderAll();
        }
    });

    $('#colorpicker-shadow').on('change', function () {
        let front = $('#front-view').css('display');
        let textShadowVal = $(this).val();
        if (front === 'block') {
            canvas.getActiveObject().set({
                shadow: new fabric.Shadow({
                    color: "#" + textShadowVal,
                    blur: 1,
                    offsetX: -4,
                    offsetY: 3
                })
            });
            canvas.renderAll();
        } else {
            canvasBack.getActiveObject().set({
                shadow: new fabric.Shadow({
                    color: "#" + textShadowVal,
                    blur: 1,
                    offsetX: -4,
                    offsetY: 3
                })
            });
            canvasBack.renderAll();
        }
    });

    $('.blur-shadow').on('input', function () {
        let front = $('#front-view').css('display');
        if (front === 'block') {
            let activeObj = canvas.getActiveObject();
            let sColor = activeObj.shadow.color;
            let sOffsetX = activeObj.shadow.offsetX;
            let sOffsetY = activeObj.shadow.offsetY;
            let blurShadowVal = $(this).val();
            canvas.getActiveObject().set({
                shadow: new fabric.Shadow({
                    color: sColor,
                    blur: blurShadowVal,
                    offsetX: sOffsetX,
                    offsetY: sOffsetY
                })
            });
            canvas.renderAll();
        } else {
            let activeObj = canvasBack.getActiveObject();
            let sColor = activeObj.shadow.color;
            let sOffsetX = activeObj.shadow.offsetX;
            let sOffsetY = activeObj.shadow.offsetY;
            let blurShadowVal = $(this).val();
            canvasBack.getActiveObject().set({
                shadow: new fabric.Shadow({
                    color: sColor,
                    blur: blurShadowVal,
                    offsetX: sOffsetX,
                    offsetY: sOffsetY
                })
            });
            canvasBack.renderAll();
        }
    });

    $('.offsetX-shadow').on('input', function () {
        let front = $('#front-view').css('display');
        if (front === 'block') {
            let activeObj = canvas.getActiveObject();
            let sColor = activeObj.shadow.color;
            let sBlur = activeObj.shadow.blur;
            let sOffsetY = activeObj.shadow.offsetY;
            let offsetXShadowVal = $(this).val();
            canvas.getActiveObject().set({
                shadow: new fabric.Shadow({
                    color: sColor,
                    blur: sBlur,
                    offsetX: offsetXShadowVal,
                    offsetY: sOffsetY
                })
            });
            canvas.renderAll();
        } else {
            let activeObj = canvasBack.getActiveObject();
            let sColor = activeObj.shadow.color;
            let sBlur = activeObj.shadow.blur;
            let sOffsetY = activeObj.shadow.offsetY;
            let offsetXShadowVal = $(this).val();
            canvasBack.getActiveObject().set({
                shadow: new fabric.Shadow({
                    color: sColor,
                    blur: sBlur,
                    offsetX: offsetXShadowVal,
                    offsetY: sOffsetY
                })
            });
            canvasBack.renderAll();
        }
    });


    $('.offsetY-shadows').on('input', function () {
        let front = $('#front-view').css('display');
        if (front === 'block') {
            let activeObj = canvas.getActiveObject();
            let sColor = activeObj.shadow.color;
            let sBlur = activeObj.shadow.blur;
            let sOffsetX = activeObj.shadow.offsetX;
            let offsetYShadowVal = $(this).val();
            canvas.getActiveObject().set({
                shadow: new fabric.Shadow({
                    color: sColor,
                    blur: sBlur,
                    offsetX: sOffsetX,
                    offsetY: offsetYShadowVal
                })
            });
            canvas.renderAll();
        } else {
            let activeObj = canvasBack.getActiveObject();
            let sColor = activeObj.shadow.color;
            let sBlur = activeObj.shadow.blur;
            let sOffsetX = activeObj.shadow.offsetX;
            let offsetYShadowVal = $(this).val();
            canvasBack.getActiveObject().set({
                shadow: new fabric.Shadow({
                    color: sColor,
                    blur: sBlur,
                    offsetX: sOffsetX,
                    offsetY: offsetYShadowVal
                })
            });
            canvasBack.renderAll();
        }
    });
});