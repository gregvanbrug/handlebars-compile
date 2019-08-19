const compiler = require('../index.js');

const srcBaseSettings = {
    data: 'spec/**/*.json',
    srcBase: 'spec/handlebars/pages',
    src: '**/*.hbs',
    dest: '/target/srcBase'
};

compiler(srcBaseSettings);
