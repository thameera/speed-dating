(function() {
  /*
   * Loads current settings
   */
  var load = function() {
    $('#workmin').val( localStorage.workTimeMin || 0 );
    $('#worksec').val( localStorage.workTimeSec || 0 );
    $('#restmin').val( localStorage.restTimeMin || 0 );
    $('#restsec').val( localStorage.restTimeSec || 0 );
    $('#bell').val( localStorage.bellSound || 'bell1.wav');
    var tasks = localStorage.tasks || '[]';
    tasks = JSON.parse(tasks);
    var inputs = $('.add-tasks-section input');
    var block = $('.input-group');
    tasks.forEach(function(task, i) {
      $(inputs[i]).val(task);
      if (i >= inputs.length){
        $('<div><input class="pure-input-1-5" type="text" id="input" value=' + task +'> <a class="fa fa-remove rem-new" href="#"></a></div>').appendTo(block);
      }
    });
  };

  /*
   * Saves settings in local storage
   */
  var save = function() {
    localStorage.workTimeMin = $('#workmin').val();
    localStorage.workTimeSec = $('#worksec').val();
    localStorage.restTimeMin = $('#restmin').val();
    localStorage.restTimeSec = $('#restsec').val();
    localStorage.bellSound = $('#bell').val();
    var tasks = [];
    $('.add-tasks-section input').each(function(i, el) {
      tasks.push( $(el).val().trim() );
    });
    tasks = _.compact(tasks);
    localStorage.tasks = JSON.stringify(tasks);
    return true;
  };

  /*
   * Return to main screen
   */
  var goback = function() {
    var gui = require('nw.gui');
    var win = gui.Window.get().window;
    win.location = 'index.html';
  };

  /*
  * Add more tasks
  */

  $('#add-new').click(function() {
    var block = $('.input-group');
    $('<div><input class="pure-input-1-5" type="text" id="input"/> <a class="fa fa-remove rem-new" href="#"></a></div>').appendTo(block);
  });

  $('.input-group').on('click', '.rem-new', function(){
    $(this).parent().remove();
  });

  /*** Event listeners ***/
  $('#save').click(function() {
    if (!save()) return;
    goback();
  });

  $('#cancel').click(goback);

  /*** Start here ***/
  load();
})();

