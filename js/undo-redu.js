$(function () {
    /*var canvasDemo = (function () {
        //var canvas = new fabric.Canvas('canvas', { backgroundColor: "#f5deb3" });
        var _config = {
            canvasState: [],
            currentStateIndex: -1,
            undoStatus: false,
            redoStatus: false,
            undoFinishedStatus: 1,
            redoFinishedStatus: 1,
            undoButton: document.getElementById('undo'),
            redoButton: document.getElementById('redo'),
        };

        canvas.on(
            'object:modified', function () {
                updateCanvasState();
            }
        );

        canvas.on(
            'object:added', function () {
                updateCanvasState();
            }
        );

        // var addObject = function () {
        //     var rect = new fabric.Rect({
        //         left: 100,
        //         top: 100,
        //         fill: 'red',
        //         width: 200,
        //         height: 200
        //     });
        //     canvas.add(rect);
        //     canvas.setActiveObject(rect);
        //     canvas.renderAll();
        // }

        var updateCanvasState = function () {
            if ((_config.undoStatus == false && _config.redoStatus == false)) {
                var jsonData = canvas.toJSON();
                var canvasAsJson = JSON.stringify(jsonData);
                if (_config.currentStateIndex < _config.canvasState.length - 1) {
                    var indexToBeInserted = _config.currentStateIndex + 1;
                    _config.canvasState[indexToBeInserted] = canvasAsJson;
                    var numberOfElementsToRetain = indexToBeInserted + 1;
                    _config.canvasState = _config.canvasState.splice(0, numberOfElementsToRetain);
                } else {
                    _config.canvasState.push(canvasAsJson);
                }
                _config.currentStateIndex = _config.canvasState.length - 1;
                if ((_config.currentStateIndex == _config.canvasState.length - 1) && _config.currentStateIndex != -1) {
                    _config.redoButton.disabled = "disabled";
                }
            }
        }

        var undo = function () {
            if (_config.undoFinishedStatus) {
                if (_config.currentStateIndex == -1) {
                    _config.undoStatus = false;
                }
                else {
                    if (_config.canvasState.length >= 1) {
                        _config.undoFinishedStatus = 0;
                        if (_config.currentStateIndex != 0) {
                            _config.undoStatus = true;
                            canvas.loadFromJSON(_config.canvasState[_config.currentStateIndex - 1], function () {
                                var jsonData = JSON.parse(_config.canvasState[_config.currentStateIndex - 1]);
                                canvas.renderAll();
                                _config.undoStatus = false;
                                _config.currentStateIndex -= 1;
                                _config.undoButton.removeAttribute("disabled");
                                if (_config.currentStateIndex !== _config.canvasState.length - 1) {
                                    _config.redoButton.removeAttribute('disabled');
                                }
                                _config.undoFinishedStatus = 1;
                            });
                        }
                        else if (_config.currentStateIndex == 0) {
                            canvas.clear();
                            _config.undoFinishedStatus = 1;
                            _config.undoButton.disabled = "disabled";
                            _config.redoButton.removeAttribute('disabled');
                            _config.currentStateIndex -= 1;
                        }
                    }
                }
            }
        }

        var redo = function () {
            if (_config.redoFinishedStatus) {
                if ((_config.currentStateIndex == _config.canvasState.length - 1) && _config.currentStateIndex != -1) {
                    _config.redoButton.disabled = "disabled";
                } else {
                    if (_config.canvasState.length > _config.currentStateIndex && _config.canvasState.length != 0) {
                        _config.redoFinishedStatus = 0;
                        _config.redoStatus = true;
                        canvas.loadFromJSON(_config.canvasState[_config.currentStateIndex + 1], function () {
                            var jsonData = JSON.parse(_config.canvasState[_config.currentStateIndex + 1]);
                            canvas.renderAll();
                            _config.redoStatus = false;
                            _config.currentStateIndex += 1;
                            if (_config.currentStateIndex != -1) {
                                _config.undoButton.removeAttribute('disabled');
                            }
                            _config.redoFinishedStatus = 1;
                            if ((_config.currentStateIndex == _config.canvasState.length - 1) && _config.currentStateIndex != -1) {
                                _config.redoButton.disabled = "disabled";
                            }
                        });
                    }
                }
            }
        }

        return {
            // addObject: addObject,
            undoButton: _config.undoButton,
            redoButton: _config.redoButton,
            undo: undo,
            redo: redo,
        }
    })();

    canvasDemo.undoButton.addEventListener('click', function () {
        canvasDemo.undo();
    });

    canvasDemo.redoButton.addEventListener('click', function () {
        canvasDemo.redo();
    });
    // canvasDemo.addObject();*/

    /*
undo redo commandhistory with canvas
*/

    // var canvas = new fabric.Canvas('fabriccanvas');
    canvas.counter = 0;
    // var newleft = 0;
    canvas.selection = false;

    // addrect = function addrect(top, left, width, height, fill) {
    //     canvas.add(new fabric.Rect({
    //         top: document.getElementById("fabriccanvas").height,
    //         name: 'rectangle ' + window.counter,
    //         left: 0 + newleft,
    //         width: 100,
    //         height: 100,
    //         fill: '#' + (0x1000000 + (Math.random()) * 0xffffff).toString(16).substr(1, 6),
    //         //fix attributes applied for all rects
    //         opacity: 0.75,
    //         lockRotation: true,
    //         originX: 'left',
    //         originY: 'bottom',
    //         cornerSize: 15,
    //         hasRotatingPoint: false,
    //         perPixelTargetFind: true,
    //         minScaleLimit: 1
    //     }));
    //     updateModifications(true);
    //     canvas.counter++;
    //     newleft += 100;
    // }
    var state = [];
    var mods = 0;
    canvas.on(
        'object:modified', function () {
            updateModifications(true);
        },
        'object:added', function () {
            updateModifications(true);
        });

    function updateModifications(savehistory) {
        if (savehistory === true) {
            myjson = JSON.stringify(canvas);
            state.push(myjson);
        }
    }

    undo = function undo() {
        if (mods < state.length) {
            canvas.clear().renderAll();
            canvas.loadFromJSON(state[state.length - 1 - mods - 1], canvas.renderAll.bind(canvas));

            canvas.renderAll();
            //console.log("geladen " + (state.length-1-mods-1));
            //console.log("state " + state.length);
            mods += 1;
            //console.log("mods " + mods);
        }
    }

    redo = function redo() {
        if (mods > 0) {
            canvas.clear().renderAll();
            canvas.loadFromJSON(state[state.length - 1 - mods + 1], canvas.renderAll.bind(canvas));
            canvas.renderAll();
            //console.log("geladen " + (state.length-1-mods+1));
            mods -= 1;
            //console.log("state " + state.length);
            //console.log("mods " + mods);
        }
    }

    // clearcan = function clearcan() {
    //     canvas.clear().renderAll();
    //     newleft = 0;
    // }
    // document.getElementById('imgLoader').onchange = function handleImage(e) {
    //     var reader = new FileReader();
    //     reader.onload = function (event) {
    //         console.log('fdsf');
    //         var imgObj = new Image();
    //         imgObj.src = event.target.result;
    //         imgObj.onload = function () {
    //             // start fabricJS stuff

    //             var image = new fabric.Image(imgObj);
    //             image.set({
    //                 left: 5,
    //                 top: 5,


    //             });
    //             //image.scale(getRandomNum(0.1, 0.25)).setCoords();
    //             canvas.add(image);

    //             // end fabricJS stuff
    //         }

    //     }
    //     reader.readAsDataURL(e.target.files[0]);
    // }

    $('#undo').on('click', function () {
        undo();
    });
    $('#redo').on('click', function () {
        redo();
    });
});