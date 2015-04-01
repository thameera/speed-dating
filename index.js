(function() {
  var States = {RUNNING: 0, PAUSED: 1, STOPPED: 2};
  var Hats = {WORK: 0, REST: 1};
  // Current state
  var st = {
    state: States.STOPPED,
    hat: Hats.REST,
    prevElapsedTime: 0,
    curStreakStartTime: 0,
    targetTime: 0,
    taskId: -1
  };


  var getTaskById = function(id) {
    var tasks = ['a', 'b', 'c'];
    return tasks[id];
  };

  var getTaskCount = function() {
    return 3;
  };

  var nextTask = function() {
    console.log('Next task()');

    st.prevElapsedTime = 0;
    st.curStreakStartTime = Date.now();

    if (st.hat === Hats.WORK) {

      st.hat = Hats.REST;
      updateTask('Rest');
      st.targetTime = 2 * 1000;

    } else {

      st.hat = Hats.WORK;
      st.taskId++;
      if (st.taskId >= getTaskCount()) {
        st.taskId = 0;
      }
      updateTask(getTaskById(st.taskId));

      st.targetTime = 5 * 1000; // 15 secs

    }

    tick();
  };

  var updateTimer = function(timeRemaining) {
    var secs = timeRemaining / 1000;
    var mins = Math.floor(secs / 60);
    secs -= mins * 60;
    minStr = mins.toFixed(0).toString();
    secStr = _.padLeft(secs.toFixed(0).toString(), 2, '0');
    $('#countdown').text(minStr + ' : ' + secStr);
  };

  var updateTask = function(task) {
    $('#task').text(task);
  };

  var updateUI = function() {
  };

  var tick = function() {
    if (st.state !== States.RUNNING) return;

    var now = Date.now();
    var totalTime = st.prevElapsedTime + now - st.curStreakStartTime;
    var timeRemaining = st.targetTime - totalTime;
    if (timeRemaining < 0) timeRemaining = 0;

    updateTimer(timeRemaining);

    if (timeRemaining === 0) nextTask();
  };

  $('#run').click(function() {
    var btn = $('#run');
    if (st.state === States.STOPPED) {

      st.state = States.RUNNING;
      nextTask();
      btn.text('Pause');

    } else if (st.state === States.RUNNING) {

      st.state = States.PAUSED;
      btn.text('Resume');

    } else { // States.PAUSED

      st.state = States.RUNNING;
      btn.text('Pause');

    }
  });

  setInterval(tick, 200);
})();

