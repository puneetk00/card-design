$(function () {
    /**Preview Card */
    $('.preview-card').on('click', function () {
        $('.card-preview-display').css('display', 'block');
        $('body').addClass('overlay');
        saveImg();
    });
    $('a.close-card-preview').on('click', function () {
        $('.card-preview-display').css('display', 'none');
        $('body').removeClass('overlay');
    });

    function saveImg() {
        document.getElementById('front-preview-img').src = canvas.toDataURL({ multiplier: 2 });
        document.getElementById('back-preview-img').src = canvasBack.toDataURL({ multiplier: 2 });
    }

    $('.save-design').on('click', function () {
        console.log('Front Card -', JSON.stringify(canvas));
        console.log('Back Card -', JSON.stringify(canvasBack));
        console.log('Front Card Image Output -', canvas.toDataURL({ multiplier: 2 }));
        console.log('Back Card Image Output -', canvasBack.toDataURL({ multiplier: 2 }));
    });

    $('.final-output').on('click', function () {
        console.log('Front User Card -', JSON.stringify(canvasUser));
        console.log('Back User Card -', JSON.stringify(canvasUserBack));
        console.log('Front User Card Image Output -', canvasUser.toDataURL({ multiplier: 2 }));
        console.log('Back User Card Image Output -', canvasUserBack.toDataURL({ multiplier: 2 }));
    });
});