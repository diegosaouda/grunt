module.exports = function(grunt) {
	
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
      
    //clean dir
    clean: {
      build: { src: ['build/*'] },
      temp: { src: ['<%= pkg.temp %>'] }
    },
          
    //comentado por que está usando o usemin, ou seja, o use min está usando o uglify
    //min js
    //uglify: {
    //  build: { //nome da target
    //    files: [{
    //      expand: true,
    //      cwd: '<%= pkg.temp %>/concat/js',
    //      src: '**/*.js',
    //      dest: '<%= pkg.buildJs %>'
    //    }]
    //  }
    //},
    
    //renomear os arquivos para cache no navegador
    //o nome do arquivo vai com um hash
    rev: {
      build: { //nome da target
        files: {
          src: [
            '<%= pkg.buildJs %>/{,*/}*.js',
            'build/styles/{,*/}*.css',
            'build/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
            'build/styles/fonts/*'
          ]
        }
      }
    },
    
    //comentado por que está usando o usemin, ou seja, o use min está usando o concat
    //concatena os arquivos
    //o exemplo abaixo são arquivo de mesma igualdade
    //concat: {
    //  build: {
    //    files: {
    //      '<%= pkg.temp %>/concat/js/jquerys.js': ['<%= pkg.srcJs %>/jquery.js', '<%= pkg.srcJs %>/jquery.form.js'],
    //      '<%= pkg.temp %>/concat/js/controllers.js': ['<%= pkg.srcJs %>/controller1.js', '<%= pkg.srcJs %>/controller2.js'],
    //      '<%= pkg.temp %>/concat/js/models.js': ['<%= pkg.srcJs %>/model1.js', '<%= pkg.srcJs %>/model2.js'],
    //    },
    //  }
    //},
    
    //validar o javascript (code style)
    //o arquivo de configuração está no .jshintrc
    //os arquivos que não devem ser validados estão em .jshintrcignore
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish') //tipo de saida do jshint
      },
      src: [
        '<%= pkg.srcJs %>/{,*/}*.js'
      ]
    },
    
    
    //criar um servidor web for preview, testes, com acesso no browser
    connect: {
      options: {
        port: 9000,
        hostname: '0.0.0.0',
        livereload: 35729
      },
      livereload: {
        options: {
          open: true,
          base: [
            'src'
          ]
        }
      },
      
      build: {
        options: {
          base: 'build'
        }
      }
    },
    
    watch: {
      livereload: {
        // '**' is used to include all subdirectories
        // and subdirectories of subdirectories, and so on, recursively.
        files: ['src/**/*'],
        // In our case, we don't configure any additional tasks,
        // since livereload is built into the watch task,
        // and since the browser refresh is handled by the snippet.
        // Any other tasks to run (e.g. compile CoffeeScript) go here:
        tasks:[],
        options: {
           livereload: '<%= connect.options.livereload %>'
        }
      }
    },
    
    //Lib usemin e useminPrepare lê o html e  faz o min, concat, de acordo com a tag especificada
    useminPrepare: {
      html: 'src/index.html',
      options: {
        dest: 'build'
      }
    },
    
    usemin: {
      html: ['build/{,*/}*.html'],
      options: {
        assetsDirs: ['build']
      }
    },
    
    
    //copia arquivos para o dist
    copy: {
      build: {
        files: [{
          expand: true,
          dot: true,
          cwd: 'src',
          dest: 'build',
          src: [
            '*.html',
          ]
        }]
      }
    },
    
    //realiza o min dos html
    htmlmin: {
      build: {
        options: {
          collapseWhitespace: true,
          collapseBooleanAttributes: true,
          removeComments: true,
          removeCommentsFromCDATA: true,
          removeOptionalTags: true,
          removeAttributeQuotes: false,
          removeRedundantAttributes: true,
          useShortDoctype: true        
        },
        files: [{
          expand: true,
          cwd: 'build',
          src: ['*.html'],
          dest: 'build'
        }]
      }
    },
  
    
  });
 
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-rev');
  grunt.loadNpmTasks('grunt-usemin');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  
  
  //tarefas a serem executadas
  grunt.registerTask('default', [
    'clean:build',
    'copy:build',
    'useminPrepare',
    'jshint',
    'concat', 
    'uglify', 
    'rev', 
    'usemin',
    'htmlmin',
    'clean:temp'
  ]);
  
  //tarefa de preview
  grunt.registerTask('server', [
    'connect:livereload',
    'watch:livereload'
  ]);
  
  //tarefa de preview
  grunt.registerTask('server:build', [
    'default',
    'connect:build',
    'watch:livereload'
  ]);
  
  
  
};