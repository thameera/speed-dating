module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('src/package.json'),
    nodewebkit: {
      options: {
        appName: 'Speed Dating',
        build_dir: './dist',
        version: 'v0.12.0',
        // specifiy what to build
        mac: true,
        win: true,
        linux: true
      },
      src: './src/**/*'
    },
  });

  grunt.loadNpmTasks('grunt-node-webkit-builder');

  grunt.registerTask('default', ['nodewebkit']);
};

