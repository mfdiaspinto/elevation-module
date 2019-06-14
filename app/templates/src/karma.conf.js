// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage-istanbul-reporter'),
      require('karma-mocha-reporter'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    client: {
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    coverageIstanbulReporter: {
      dir: require('path').join(__dirname, '../coverage'),
      reports: ['html', 'lcovonly'],
      fixWebpackSourcePaths: true
    },
    htmlReporter: {
      outputDir: 'karma_html',
      /* where to put the reports */
      templatePath: null,
      /* set if you moved jasmine_template.html */
      focusOnFailures: true,
      /* reports show failures on start */
      namedFiles: false,
      /* name files instead of creating sub-directories */
      pageTitle: null,
      /* page title for reports; browser info by default */
      urlFriendlyName: false,
      /* simply replaces spaces with _ for files/dirs */
      reportName: 'report-summary-filename',
      /* report summary filename; browser info by default */
    },
    reporters: ['progress', 'kjhtml', 'mocha'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false
  });
};