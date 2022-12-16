import $ from 'jquery';

const LoadHtmlSuccessCallBacks = []

export function onLoadHtmlSuccess(callback) { // passa uma função como parametro para adicionar uma unica vez
    if(!LoadHtmlSuccessCallBacks.includes(callback)) {
        LoadHtmlSuccessCallBacks.push(callback)
    }
}

function loadIncludes(parent) {
    if(!parent) parent = 'body'
    $(parent).find('[wm-include]').each(function(i, e) {
        const url = $(e).attr('wm-include')
        $.ajax({
            url,
            success(data) {
                $(e).html(data)
                $(e).removeAttr('wm-include')

                //Esta pegando cada uma das callback e pegando os dados de js dentro do HTML
                LoadHtmlSuccessCallBacks.forEach(callback => callback(data))
                loadIncludes(e)
            }
        })
    })
}

loadIncludes()