const compiler = require('../index.js');

const minSettings = {
    cwd: 'spec/handlebars',
    src: 'pages/**/*.hbs',
    dest: '/target/minSettings'
};

compiler(minSettings);
