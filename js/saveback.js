    $(function () {

    })
    //loop back card 
    var id;
    var counterId = 0;
    let loadObj = localStorage.getItem('obj');
    let parseObj = JSON.parse(loadObj) || [];
    console.log(parseObj);
    for (let i = 1; i <= parseObj.length; i++) {
        var stringBackCard = '<div class="backViewItem" id="back_id' + i + '"><div class="item-content">' +
            '<p>BackCard' + i + '</p></div></div>';
        $('.backView').append(stringBackCard);
        // $('#back-add-field').parent('.add-new-fields').append('<div class="form_group"><div class="text_field"> <textarea id="fname_id" class="inputs-ctrl" name="comment" required="required">Enter Your Text</textarea></div> <div class="checkbox_wrapper"><input type="checkbox" name="form_validate_field" class="formcheckID" /><label></label>  <a href="javascript: void(0)" class="remove"><img src="images/del.png" style="width:15px;height:20px;background-position: center center" /></a></div></div>');
    }

    // end back cards scripts

    //form check remove
    let fieldArray = []
    var user_err = false;
    // var cls = $('.back-inputs-ctrl .form_cntrl .require_field_back').attr('class');
    // var ind = $.inArray(cls, fieldArray);
    function _checkForm() {
        var user_err = false;

        $(".formcheckID").on('click', function () {
            let indexOfCheck = $(this).parents().parents().index();
           // alert(indexOfCheck);
            let indexOff = fieldArray.indexOf(indexOfCheck);
            if (indexOff > -1) {
                fieldArray.splice(indexOff, 1)
            }
            else {
                fieldArray.push(indexOfCheck)
            }
            console.log(fieldArray);

            if ($(this).is(':checked')) {

                // alert("checked");
                console.log('called2')

                user_err = true;
                _frmValidate();
                // $('.required_error').show();
            } else {
                console.log('called1')
                user_err = true;
                // $('.required_error').hide();
            }
        });
        $('.required_error').hide();
    }
    function _frmValidate() {

        var requiredField = $('.require_field').val();
        var fname_id = $('.require_field_back').val();
        console.log(fname_id);
        console.log(requiredField)
        console.log(user_err, 'user_err')

        if (requiredField.length == '') {
            $(".required_error").show();
            $(".required_error").html("**please fill the required field");
            $(".required_error").focus();
            $(".required_error").css({
                color: '#FF0000',
                marginBottom: '10px',
                marginTop: '-10px',
                padding: '0px 0px 5px'
            })
            if (require_field_back.length > 0) {
                $(".required_error").hide();
                $(".required_error").html('');
                user_err = false;
            }
            return false;
        } else if (fname_id.length == '') {
            $(".required_error").show();
            $(".required_error").html("**please fill the required field");
            $(".required_error").focus();
            $(".required_error").css({
                color: '#FF0000',
                marginBottom: '10px',
                marginTop: '-10px',
                padding: '0px 0px 5px'
            })
            if (fname_id.length > 0) {
                $(".required_error").hide();
                $(".required_error").html('');
                user_err = false;
            }

            return false;
        } else if (fname_id.length > 0 || requiredField.length > 0) {
            $(".required_error").hide();
            $(".required_error").html("");
            $("#require_field_back").focus();
            $("#require_field").focus();
            console.log(user_err, 'user_err')

            user_err = false;
            return false;
        } else {
            if (requiredField.length > 0 || fname_id.length > 0) {
                console.log(user_err, 'user_err')

                $('.required_error').hide();
            }

        }


    }
    function _removeItem() {

        $('.card-editing-area-wrapper .form_group a').on('click', function (event) {
            alert('clicked');
            var activeObj = canvasBack.getActiveObject();
            let backNew = $('#back-view').css('display');
            let controlAttrNew = $(this).attr('class');
            let back = $('#back-view').css('display');
            let inputCtrlIndex = $(this).parents().parents().index();
            console.log(inputCtrlIndex);
            inputCtrlIndex = inputCtrlIndex - 1;
            if (back === 'block') {
                canvasBack.setActiveObject(canvasBack._objects[inputCtrlIndex]);
                canvasBack.renderAll();
                if (controlAttrNew === 'remove') {
                    if (backNew === 'block') {
                        let activeObjIndex = canvasBack.getObjects().indexOf(canvasBack.getActiveObject());
                        $(this).parents('.add-new-fields').find('.form_group').eq(activeObjIndex).remove();
                        canvasBack.remove(canvasBack.getActiveObject());
                        canvas.remove(canvas.getActiveObject());
                    } else {
                        let activeObjIndex = canvasBack.getObjects().indexOf(canvasBack.getActiveObject());
                        $(this).parents('.add-new-fields').find('.form_group').eq(activeObjIndex).remove();
                        canvasBack.remove(canvasBack.getActiveObject());
                        canvas.remove(canvas.getActiveObject());
                    }
                }
            } else {
                canvasBack.setActiveObject(canvasBack._objects[inputCtrlIndex]);
                canvasBack.renderAll();
            }



            canvasBack.setActiveObject(activeObj);
            canvasBack.renderAll();
            canvasBack.renderAll();

        });
    }
    // localstoare script
    $(function () {
    })

    //form check remove end
    $('#saveBackMore').on('click', function () {
        _saveMoreBackCard();
        _removeItem();
        _checkForm();
        _frmValidate();
    });

    var counter = 0;
    var current = localStorage.getItem('current');
    function _saveMoreBackCard() {

        counter++;
        console.log(counter);
        if (counter == 1) {

            let jsonOne = canvasBack.toJSON();
            // alert('clicked');
            localStorage.setItem('json1Save', JSON.stringify(jsonOne));
            let loadJsonOne = localStorage.getItem('json1Save');
            let data = JSON.parse(loadJsonOne);
            parseObj.push(data);
            canvasBack.clear();
            $("div#back-view-text.add-new-fields").find('.form_group').remove();
            console.log(parseObj);
        } else if (counter == 2) {

            let jsonTwo = canvasBack.toJSON();
            // alert('clicked');
            localStorage.setItem('json2Save', JSON.stringify(jsonTwo));
            let loadJsonTwo = localStorage.getItem('json2Save');
            let data1 = JSON.parse(loadJsonTwo);
            parseObj.push(data1);
            canvasBack.clear();
            $("div#back-view-text.add-new-fields").find('.form_group').remove();
            console.log(parseObj);
        } else if (counter == 3) {

            let jsonThree = canvasBack.toJSON();
            // alert('clicked');
            localStorage.setItem('json3Save', JSON.stringify(jsonThree));
            let loadJsonThree = localStorage.getItem('json3Save');
            let data2 = JSON.parse(loadJsonThree);
            parseObj.push(data2);

            canvasBack.clear();
            $("div#back-view-text.add-new-fields").find('.form_group').remove();
            console.log(parseObj);
        } else if (counter == 4) {

            let jsonFour = canvasBack.toJSON();
            // alert('clicked');
            localStorage.setItem('json4Save', JSON.stringify(jsonFour));
            let loadJsonFour = localStorage.getItem('json4Save');
            let data3 = JSON.parse(loadJsonFour);
            parseObj.push(data3);
            canvasBack.clear();
            $("div#back-view-text.add-new-fields").find('.form_group').remove();
            console.log(parseObj);
        } else if (counter == 5) {

            let jsonFive = canvasBack.toJSON();
            // alert('clicked');
            localStorage.setItem('json5Save', JSON.stringify(jsonFive));
            let loadJsonFive = localStorage.getItem('json5Save');
            let data4 = JSON.parse(loadJsonFive);
            parseObj.push(data4);
            canvasBack.clear();
            $("div#back-view-text.add-new-fields").find('.form_group').remove();
            console.log(parseObj);
        } else if (counter == 6) {

            let jsonSix = canvasBack.toJSON();
            // alert('clicked');
            localStorage.setItem('json6Save', JSON.stringify(jsonSix));
            let loadJsonSix = localStorage.getItem('json6Save');
            let data5 = JSON.parse(loadJsonSix);
            parseObj.push(data5);
            canvasBack.clear();
            $("div#back-view-text.add-new-fields").find('.form_group').remove();
            console.log(parseObj);
        } else if (counter == 7) {

            let jsonSeven = canvasBack.toJSON();
            // alert('clicked');
            localStorage.setItem('json7Save', JSON.stringify(jsonSeven));
            let loadJsonSix = localStorage.getItem('json7Save');
            let data6 = JSON.parse(loadJsonSix);
            parseObj.push(data6);
            canvasBack.clear();
            $("div#back-view-text.add-new-fields").find('.form_group').remove();
            console.log(parseObj);
        }

        localStorage.setItem('obj', JSON.stringify(parseObj));




    }







    $(function () {
        $('.backViewItem').on('click', function () {
            // alert('clicked')
            id = $(this).attr('id');
            id = id.slice(-1);
            console.log(id);



            localStorage.setItem('current', id);
            $("div#back-view-text.add-new-fields").find('.form_group').remove();

            //   console.log(backFormOne);
            canvasBack.clear();
            let key = `json${id}Save`
            console.log(key);
            var loadJsonOne = localStorage.getItem(key);
            canvasBack.loadFromJSON(loadJsonOne, canvas.renderAll.bind(canvasBack));
            var data = JSON.parse(loadJsonOne);
            // console.log(data.objects);
            for (let i = 1; i <= data.objects.length; i++) {
                $('#back-add-field').parent('.add-new-fields').append('<div class="form_group"><div class="text_field"> <textarea id="fname_id" class="inputs-ctrl" name="comment" required="required">Enter Your Text</textarea></div> <div class="checkbox_wrapper"><input type="checkbox" name="form_validate_field" class="formcheckID" /><label></label>  <a href="javascript: void(0)" class="remove"><img src="images/del.png" style="width:15px;height:20px;background-position: center center" /></a></div></div>');
            }

            _removeItem();
            _checkForm();
            _frmValidate();


        })

        $(document).on('focus', '.inputs-ctrl', function () {
            let backOne = $('#back-view').css('display');
            let inputCtrlIndex = $(this).parents().parents().index();
            console.log(inputCtrlIndex);
            inputCtrlIndex = inputCtrlIndex - 1;
            if (backOne === 'block') {
                canvasBack.setActiveObject(canvasBack._objects[inputCtrlIndex]);
                canvasBack.renderAll();
            } else {
                canvas.setActiveObject(canvas._objects[inputCtrlIndex]);
                canvas.renderAll();
            }



        });
    })
