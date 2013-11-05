Test Generator
===========

It will generates .js file of specific module in module specific folder.
The generated js file will contain jasmine test, which is generated from a .yml file.

This is in progress state.

Available Command:

rake generate:js:barcode

Prerequisite
============

Generator use node js-beautify module to beautify the code.

Use npm to install js-beautify.
npm -g install js-beautify
