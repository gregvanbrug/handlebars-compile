# handlebars-compile

A tiny app to compile Handlebars to HTML.

## Example usage

```
const compile = require('handlebars-compile');

const settings = {
    src: 'handlebars/**/*.hbs'
    dest: 'target/html'
};

compile(settings);
```

For additional usage examples, see `/spec`;

## Options

### context
Type: Object  
Default: `None`

Global data object.

### cwd
Type: String  
Default: The process current working directory

### data
Type: String || Array  
Default: `None`

The set of JSON you'd like to use as your data set.

For each provided file, the primary key to access it's data is the basename of the JSON file.

### helpers
Type: String || Array  
Default: `'**/*Helper.js'`

Paths to the directories of your Handlebars helpers.

### partials
Type: String || Array  
Default: `'**/*Partials.js'`

Paths to the directories of your Handlebars partials.

### layouts
Type: String || Array  
Default: `'**/layouts/**/*.hbs'`

Paths to the directories of your layout files.

Refer to [handlebars-layouts](https://www.npmjs.com/package/handlebars-layouts) for usage.

### src
Type: String  
Default: `None`  
This option is required.

Paths to the directories of the files you'd like to compile.

### srcBase
Type: String  
Default: `None`

The directory from which src patterns should be matched. This is stripped from the dest directory.

### dest
Type: String  
Default: `None`  
This option is required.

Path to the directory where the compiled html should be saved.

### flatten
Type: Boolean  
Default: `false`

If the compiled files should saved to a flatten directory or if they should maintain the src directory structure.
