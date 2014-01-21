for (var i = 'A'.charCodeAt(0); i < 'Z'.charCodeAt(0); i++) {
    var k = String.fromCharCode(i);
    $('#normalKey').append('<option value="' + k + '">' + k + '</option>');
}

chrome.runtime.sendMessage({
    type: 'keySettings',
}, function(datas) {
    if (datas) {
        console.log('getKeySettings...');
        var sks = datas.specialKeys.split(',');
        $('#specialKeys-1 option[value="' + sks[0] + '"]').attr('selected', true);
        if (sks.length > 1) {
            $('#specialKeys-2 option[value="' + sks[1] + '"]').attr('selected', true);
        } else {
            $('#specialKeys-2 option[value="none"]').attr('selected', true);
        }

        var nk = datas.normalKey;
        $('#normalKey option[value="' + nk + '"]').attr('selected', true);
    }
});

$(document).on('change', function(event) {
    var sk1 = $('#specialKeys-1').val();
    var sk2 = $('#specialKeys-2').val();
    var specialKeys = sk1;
    if (sk2 !== 'none')
        specialKeys += ',' + sk2;
    var nk = $('#normalKey').val();

    chrome.runtime.sendMessage({
        type: 'saveKeySettings',
        specialKeys: specialKeys,
        normalKey: nk
    });
});