function sumbit(event) {
    const price_min_value = $("#price_min", event.data.forms[0]).val();
    const price_max_value = $("#price_max", event.data.forms[0]).val();
    const genre_value = $("#genre", event.data.forms[1]).val();
    var paramsString = "";
    var searchParams = new URLSearchParams(paramsString);
    if (price_min_value) {
        searchParams.append('price_min', price_min_value);
    }
    if (price_max_value) {
        searchParams.append('price_max', price_max_value);
    }
    if (genre_value) {
        searchParams.append('genre', genre_value);
    }
    window.location.href = `?${searchParams.toString()}`;
}

$(document).ready(() => {
    var forms = $('.filter_group');
    var submit = $('#submit');
    $('#reset').click((e) => {
        forms.trigger('reset');
        window.location.href = window.location.pathname;
    });
    $(submit).click({ "forms": forms }, sumbit);
    const searchString = new URLSearchParams(window.location.search);
    for (const [key, value] of searchString) {
        $(`#${key}`).val(value);
    }
});

