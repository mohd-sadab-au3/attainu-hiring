function maxFreq(details) {


    const obj = {};
    details.forEach(elem => obj[elem] = obj[elem] ? obj[elem] + 1 : 1);

    let max = 0, res = '';

    Object.keys(obj).forEach(key => {
        if (obj[key] > max && key) {
            max = obj[key];
            res = key;
        }
    })
    console.log("max freq", res);


    return (res);
}


$(function (e) {

    $('form').on('submit', async function (e) {

        e.preventDefault();

        console.log($('input'));
        const obj = {};
        $('input:text').each(function (index, elem) {

            obj[index] = $(this).val();
        });

        console.log(obj);

        const details = [];

        for (let key = 0; key < 5; key++) {

            obj[key] = obj[key].toLowerCase().replace(/\b[a-z]/g, function (letter) {
                return letter.toUpperCase();
            });
            const data = $.ajax({
                url: `http://localhost:8000/state/${obj[key]}`,
                type: 'GET',
                success: function (data) {
                    details.push(data);
                    console.log(details);
                    if (details.length === 5) {
                        const freqOccour = maxFreq(details);
                        $('#result').empty();
                        $("#result").append(`<h3 class="text-center ">Most Frequent: ${freqOccour}</h3>`)



                    }
                }
            })

        }

    })



})