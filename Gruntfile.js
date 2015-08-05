module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    exec: {
      test: {
        cmd: 'jest --verbose'
      }
    },
    browserify: {
      './public/build/bundle.js': './client/main.js'
    },
    watch: {
      files: ['client/**/*.js'],
      tasks: ['browserify']
    }
  });

  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-exec');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['exec:test', 'browserify', 'watch']);
};
