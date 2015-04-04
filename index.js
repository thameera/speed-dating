(function() {
  var States = {RUNNING: 0, PAUSED: 1, STOPPED: 2};
  var Hats = {WORK: 0, REST: 1};
  // Current state
  var st = {};


  var db = (function() {
    var tasks = localStorage.tasks || '["Task 1", "Task 2"]';
    tasks = JSON.parse(tasks);
    var workTimeMin = Number(localStorage.workTimeMin || '0');
    var workTimeSec = Number(localStorage.workTimeSec || '0');
    var restTimeMin = Number(localStorage.restTimeMin || '0');
    var restTimeSec = Number(localStorage.restTimeSec || '0');

    return {
      getTaskById: function(id) {
        return tasks[id] || '';
      },

      taskCount: tasks.length,

      workTime: (workTimeMin * 60 + workTimeSec) * 1000,

      restTime: (restTimeMin * 60 + restTimeSec) * 1000
    };
  })();

  var initState = function() {
    st = {
      state: States.STOPPED,
      hat: Hats.REST,
      prevElapsedTime: 0,
      curStreakStartTime: 0,
      targetTime: 0,
      taskId: -1
    };
    updateTimer(0);
    updateTask('');
  };

  var nextTask = function() {
    document.getElementById('beep').play();
    st.prevElapsedTime = 0;
    st.curStreakStartTime = Date.now();

    if (st.hat === Hats.WORK) {

      st.hat = Hats.REST;
      updateTask('Rest');
      st.targetTime = db.restTime;

    } else {

      st.hat = Hats.WORK;
      st.taskId++;
      if (st.taskId >= db.taskCount) {
        st.taskId = 0;
      }
      updateTask(db.getTaskById(st.taskId));

      st.targetTime = db.workTime;

    }

    tick();
  };

  var updateTimer = function(timeRemaining) {
    var secs = Math.floor(timeRemaining / 1000);
    var mins = Math.floor(secs / 60);
    secs -= mins * 60;
    minStr = mins.toFixed(0).toString();
    secStr = _.padLeft(secs.toFixed(0).toString(), 2, '0');
    $('#countdown').text(minStr + ' : ' + secStr);
  };

  var updateTask = function(task) {
    $('#task').text(task);
  };

  var updateRunButton = function() {
    var iconStr = st.state === States.RUNNING ? 'pause' : 'play';
    $('#run').html('<i class="fa fa-' + iconStr + '"></i>');
  };

  var tick = function() {
    if (st.state !== States.RUNNING) return;

    var now = Date.now();
    var totalTime = st.prevElapsedTime + now - st.curStreakStartTime;
    var timeRemaining = st.targetTime - totalTime;
    if (timeRemaining < 0) timeRemaining = 0;

    if (timeRemaining === 0) nextTask();
    else updateTimer(timeRemaining);
  };

  /*** Event listeners ***/
  $('#run').click(function() {
    var btn = $('#run');
    if (st.state === States.STOPPED) {

      st.state = States.RUNNING;
      nextTask();

    } else if (st.state === States.RUNNING) {

      st.state = States.PAUSED;

    } else { // States.PAUSED

      st.state = States.RUNNING;

    }

    updateRunButton();
  });

  $('#stop').click(function() {
    initState();
    updateRunButton();
  });

  $('#edit').click(function() {
    var gui = require('nw.gui');
    var win = gui.Window.get().window;
    win.location = 'edit.html';
  });

  /*** Start here ***/
  initState();

  setInterval(tick, 200);
})();

