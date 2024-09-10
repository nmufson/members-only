module.exports = {
  files: ['public/**/*', 'views/**/*', 'styles/**/*', 'scripts/**/*'], // Watch all files and subdirectories
  proxy: 'localhost:3000', // Your server's address
  port: 3002, // Browsersync's port
  open: false, // Set to true if you want the browser to open automatically
};
