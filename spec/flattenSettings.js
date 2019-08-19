const compiler = require('../index.js');

const flattenSettings = {
    cwd: 'spec/handlebars',
    data: [ 'data.json', 'pages/**/*.json' ],
    src: 'pages/**/*.hbs',
    dest: '/target/flatten',
    flatten: true
};

compiler(flattenSettings);
