/* eslint no-console: 0 */
const fs = require('fs');
const path = require('path');

const handlebars = require('handlebars');
const layouts = require('handlebars-layouts');

const _merge = require('lodash/merge');
const beautify = require('beautify');
const chalk = require('chalk');
const globule = require('globule');
const mkdirp = require('mkdirp');

module.exports = (options) => {

    let cwd = process.cwd();

    let defaults = {
        helpers:  '**/*Helper.js',
        partials: '**/*Partial.hbs',
        layouts:  '**/layouts/**/*.hbs',
        flatten:  false
    };

    if (options.cwd) {
        cwd = path.join( cwd, options.cwd );
    }

    const logError = message => {
        console.log( message + chalk.bold.red(' ERROR'));
    }

    if (!options.src) {
        logError('Please provide the source directory of your handlebars files.');
        process.exit();
    }

    if (!options.dest) {
        logError('Please provide the target directory for your compiled files.');
        process.exit();
    }

    /**
     * Convert all the default values to arrays
     * This allows us to provide multiple source directories if necessary
     */

    defaults = _merge(defaults, options);
    const allowedArrays = [ 'data', 'helpers', 'partials', 'layouts' ];
    Object.keys(defaults).forEach( (key) => {
        if ( allowedArrays.includes(key) && typeof defaults[key] === 'string' ) {
            defaults[key] = [ path.join(cwd, defaults[key]) ];
        }
    });

    /**
     * Create a data object from json files
     * using the basename as the key
     */

    let data = {};
    if (defaults.data) {

        const files = globule.find(defaults.data);

        files.forEach( (file) => {

            const fileName = path.basename(file, '.json');
            const fileContents = fs.readFileSync(file, 'utf8');
            data[fileName] = JSON.parse(fileContents);

        });
    }

    if (defaults.context) {
        Object.keys(defaults.context).forEach( (key) => {
            data[key] = defaults.context[key];
        });
    }

    /**
     * Register Helpers
     *
     */

    layouts.register(handlebars);

    const helpers = globule.find(defaults.helpers);
    helpers.forEach( (file) => {
        require(file)(handlebars);
    });

    /**
     * Register Partials
     *
     */

    // Layouts are technically partials in Handlebars
    defaults.layouts.forEach( (layout) => {
        defaults.partials.push(layout);
    });

    const partials = globule.find(defaults.partials);
    partials.forEach( (file) => {

        const fileName = path.basename(file, '.hbs');
        const source = fs.readFileSync(file, 'utf8');

        handlebars.registerPartial(fileName, source);

    });

    /**
     * Compile Pages and save 'em to a directory
     *
     */

    let src;
    if (defaults.srcBase) {
        src = path.join(cwd, defaults.srcBase, defaults.src);
    }
    else {
        src = path.join(cwd, defaults.src);
    }

    const writeFile = (dest, src) => {

        fs.writeFileSync(dest, src);
        console.log( 'Saved compiled template to' + chalk.cyan.bold(' %s ') + chalk.green.bold('OK'), dest);

    };

    const files = globule.find(src);
    files.forEach( (file) => {

        file = path.normalize(file);
        const source = fs.readFileSync(file, 'utf8');

        data['file'] = file;
        data['page'] = _merge(data.page, {});

        const page = handlebars.compile(source);
        let output = page(data);
        output = beautify(output, { format: 'html' });

        let dest;
        if (defaults.flatten) {
            dest = path.join( cwd, defaults.dest );
        }
        else {
            const replacement = defaults.srcBase ? path.join(cwd, defaults.srcBase) : cwd;
            const pagePath = file.replace( replacement, '' );

            const pageDir = path.dirname( pagePath );
            dest = path.join( cwd, defaults.dest, pageDir );
        }

        const fileName = path.basename(file, '.hbs');
        const destFile = path.join( dest, `${fileName}.html` );

        if ( fs.existsSync(dest) ) {
            writeFile(destFile, output);
        }
        else {
            mkdirp.sync(dest);
            writeFile(destFile, output);
        }

    });

}
