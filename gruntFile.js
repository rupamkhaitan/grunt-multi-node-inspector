/*global module*/
module.exports = function(grunt) {

  //lodash is needed instead of using grunt.util._ (it is deprecated)
  var _ = require('lodash');
  grunt.loadNpmTasks('grunt-node-inspector');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-open');
  grunt.loadNpmTasks('grunt-express-server');
  /**
   * Load in our build configuration file.
   */
  var userConfig = require( './build.config.js' );

  /**
   * This is the configuration object Grunt uses to give each plugin its 
   * instructions.
   */
  var taskConfig = {
    /**
     * We read in our `package.json` file so we can access the package name and
     * version. It's already there, so we don't repeat ourselves here.
     */
    pkg: grunt.file.readJSON("package.json"),
    watch: {
      gruntfile: {
        files: ['gruntFile.js']
      },
      node1: {
        files: [
          'src/node1.js',
        ],
        tasks: [
        ],
        options: {
          livereload: true,
          nospawn: true //Without this option specified express won't be reloaded
        }
      },
      node2: {
        files: [
          'src/node2.js'
        ],
        tasks: [
        ],
        options: {
          livereload: true,
          nospawn: true //Without this option specified express won't be reloaded
        }
      },
      node3: {
        files: [
          'src/node3.js'
        ],
        tasks: [
        ],
        options: {
          livereload: true,
          nospawn: true //Without this option specified express won't be reloaded
        }
      }
    },
    // Run some tasks in parallel to speed up the build process
    // default limit is 4 which we can increase
    concurrent: {
      debug: {
        tasks: [
          'nodemon:node_process1',
          'node-inspector:node1',
          'nodemon:node_process2',
          'node-inspector:node2',
          'nodemon:node_process3',
          'node-inspector:node3',
          'watch'
        ],
        options: {
          logConcurrentOutput: true,
          limit: 7
        }
      },
      node1:{
          tasks: [
          'nodemon:node_process1',
          'node-inspector:node1',
          'watch'
        ],
        options: {
          logConcurrentOutput: true,
          limit: 5
        }
      },
      node2:{
        tasks: [
          'nodemon:node_process2',
          'node-inspector:node2',
          'watch'
        ],
        options: {
          logConcurrentOutput: true,
          limit: 5
        }
      },
      node3:{
          tasks: [
          'nodemon:node_process3',
          'node-inspector:node3',
          'watch'
        ],
        options: {
          logConcurrentOutput: true,
          limit: 5
        }
      }
    },
    // Debugging with node inspector
    'node-inspector': {
      node1:{
        options: {
          'web-host': '<%= node_inspector.node_process1.ip %>',
          'web-port': '<%= node_inspector.node_process1.port %>',
          'debug-port': '<%= node_inspector.node_process1.debug_port %>',
          'save-live-edit': false,
          'no-preload': true,
          'stack-trace-limit': 4,
          'hidden': ['node_modules']
        }
      },
      node2:{
        options: {
          'web-host': '<%= node_inspector.node_process2.ip %>',
          'web-port': '<%= node_inspector.node_process2.port %>',
          'debug-port': '<%= node_inspector.node_process2.debug_port %>',
          'save-live-edit': false,
          'no-preload': true,
          'stack-trace-limit': 4,
          'hidden': ['node_modules']
        }
      },
      node3:{
        options: {
          'web-host': '<%= node_inspector.node_process3.ip %>',
          'web-port': '<%= node_inspector.node_process3.port %>',
          'debug-port': '<%= node_inspector.node_process3.debug_port %>',
          'save-live-edit': false,
          'no-preload': true,
          'stack-trace-limit': 4,
          'hidden': ['node_modules']
        }
      }

    },
    // Use nodemon to run server in debug mode without an initial breakpoint
    nodemon: {
      node_process1: {
        script: 'src/node1.js',
        options: {
          nodeArgs: ['--debug=<%= node_inspector.node_process1.debug_port %>'],
          /*env: {
            PORT: process.env.PORT || '<%= express_config.port %>'
          },*/
          callback: function (nodemon) {
            //get the node_inspector property value from build.config.js
            var node_inspector = grunt.config.get(["node_inspector"]);
            var url = node_inspector.node_process1.protocol+
                      node_inspector.node_process1.ip+':'+
                      node_inspector.node_process1.port+'/debug?port='+node_inspector.node_process1.debug_port;
            nodemon.on('log', function (event) {
              console.log(event.colour);
            });

            // opens browser on initial server start
            nodemon.on('config:update', function () {
              setTimeout(function () {
                require('open')(url);
              }, 500);
            });
          }
        }
      },
      node_process2:{
        script: 'src/node2.js',
        options: {
          nodeArgs: ['--debug=<%= node_inspector.node_process2.debug_port %>'],
          /*env: {
            PORT: process.env.PORT || '<%= express_config.port %>'
          },*/
          callback: function (nodemon) {
            //get the node_inspector property value from build.config.js
            var node_inspector = grunt.config.get(["node_inspector"]);
            var url = node_inspector.node_process2.protocol+
                      node_inspector.node_process2.ip+':'+
                      node_inspector.node_process2.port+'/debug?port='+node_inspector.node_process2.debug_port;
            nodemon.on('log', function (event) {
              console.log(event.colour);
            });

            // opens browser on initial server start
            nodemon.on('config:update', function () {
              setTimeout(function () {
                require('open')(url);
              }, 500);
            });
          }
        }
      },
      node_process3:{
        script: 'src/node3.js',
        options: {
          nodeArgs: ['--debug=<%= node_inspector.node_process3.debug_port %>'],
          /*env: {
            PORT: process.env.PORT || '<%= express_config.port %>'
          },*/
          callback: function (nodemon) {
            //get the node_inspector property value from build.config.js
            var node_inspector = grunt.config.get(["node_inspector"]);
            var url = node_inspector.node_process3.protocol+
                      node_inspector.node_process3.ip+':'+
                      node_inspector.node_process3.port+'/debug?port='+node_inspector.node_process3.debug_port;
            nodemon.on('log', function (event) {
              console.log(event.colour);
            });

            // opens browser on initial server start
            nodemon.on('config:update', function () {
              setTimeout(function () {
                require('open')(url);
              }, 500);
            });
          }
        }
      }
    },
    
    /**
     * The directories to delete when `grunt clean` is executed. Right now we delete
     * everything inside build, client/build & server/build folders
     */
    clean: {
      options:{
        force: true
      },
      build: {
        src:[
          '<%= build_dir %>/*'
        ]
      }
    }
  };

  // Grunt init configuration.
  grunt.initConfig(_.extend( taskConfig, userConfig ));

  
  grunt.registerTask('default','PUBLIC: the default task which installs and run our project.', ['build']);


  /* this task when executed 'grunt serve' will clean & build client/server and copy all
  *  contents inside top 'build' directory and run the node workers
  */
  grunt.registerTask('build', 'some description', function (target) {
    //debug all node instance
    if (target === 'debug') {
      return grunt.task.run([
        'concurrent:debug'
      ]);
    }

    else if (target === 'node_process1') {
      return grunt.task.run([
        'concurrent:node1'
      ]);
    }

    else if (target === 'node_process2') {
      return grunt.task.run([
        'concurrent:node2'
      ]);
    }

    else if (target === 'node_process3') {
      return grunt.task.run([
        'concurrent:node3'
      ]);
    }
  });
};
