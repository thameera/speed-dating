(function() {
  /*
   * Loads current settings
   */
  var load = function() {
    $('#workmin').val( localStorage.workTimeMin || 0 );
    $('#worksec').val( localStorage.workTimeSec || 0 );
    $('#restmin').val( localStorage.restTimeMin || 0 );
    $('#restsec').val( localStorage.restTimeSec || 0 );
    var tasks = localStorage.tasks || '[]';
    tasks = JSON.parse(tasks);
    var inputs = $('.add-tasks-section input');
    tasks.forEach(function(task, i) {
      $(inputs[i]).val(task);
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

  /*** Event listeners ***/
  $('#save').click(function() {
    if (!save()) return;
    goback();
  });

  $('#cancel').click(goback);

  /*** Start here ***/
  load();
})();

