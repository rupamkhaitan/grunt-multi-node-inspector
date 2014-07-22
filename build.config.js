/**
 * This file/module contains all configuration for the build process.
 */
module.exports = {
  
   /**
  * Node inspector config to set ip, port, debug_port & protocol
  */
  node_inspector:{
    node_process1:{
      protocol: 'http://',
      ip: 'localhost',
      port: 8080,
      debug_port: 5857
    },
    node_process2:{
      protocol: 'http://',
      ip: 'localhost',
      port: 8081,
      debug_port: 5858
    },
    node_process3:{
      protocol: 'http://',
      ip: 'localhost',
      port: 8082,
      debug_port: 5859
    }
  }
};
