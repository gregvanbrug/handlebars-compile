const compiler = require('../index.js');

const contextSettings = {
    context: {
        namespace: 'bar'
    },
    data: 'spec/**/*.json',
    srcBase: 'spec/handlebars/pages',
    src: '**/*.hbs',
    dest: '/target/context'
};

compiler(contextSettings);
