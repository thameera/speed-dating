(function() {
  var save = function() {
    return true;
  };

  var goback = function() {
    var gui = require('nw.gui');
    var win = gui.Window.get().window;
    win.location = 'index.html';
  };

  $('#save').click(function() {
    if (!save()) return;
    goback();
  });

  $('#cancel').click(goback);
})();

