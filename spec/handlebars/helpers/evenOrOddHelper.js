module.exports = function(Handlebars) {

    Handlebars.registerHelper('evenOrOdd', function (index) {
        return index % 2 === 0 ? 'even' : 'odd';
    });

};
