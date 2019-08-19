module.exports = function(Handlebars) {

    Handlebars.registerHelper('button', function (options) {

        var style = options.hash.style,
            color = options.hash.color,
            href  = options.hash.href,
            icon  = options.hash.icon;

        var data = {
            color: color ? 'button-' + color : 'button-blue',
            href: href ? href : null,
            icon: icon ? 'icon-' + icon : '',
            tag: options.hash.href ? 'a' : 'button',
            text: new Handlebars.SafeString( options.fn(this) ),
            style: style ? 'button-' + style : 'button'
        };

        var template = Handlebars.compile( Handlebars.partials.buttonPartial );
        return template(data);

    });

};
