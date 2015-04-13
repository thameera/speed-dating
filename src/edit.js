(function() {
  var tasks;

  /*
   * Loads current settings
   */
  var load = function() {
    $('#workmin').val( localStorage.workTimeMin || 0 );
    $('#worksec').val( localStorage.workTimeSec || 0 );
    $('#restmin').val( localStorage.restTimeMin || 0 );
    $('#restsec').val( localStorage.restTimeSec || 0 );
    tasks = JSON.parse(localStorage.tasks || '[]');

    $('#addable').addableInput({initValues: tasks});
    $('#addable').on('textChange', function(e, vals) {
      tasks = _.compact(vals);
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

  /*** Event listeners ***/
  $('#save').click(function() {
    if (!save()) return;
    goback();
  });

  $('#cancel').click(goback);

  /*** Start here ***/
  load();
})();

