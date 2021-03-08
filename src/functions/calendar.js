import TaskInfo from '^/TaskInfo'

function hookCalendarTask() {
  if (document.querySelectorAll(".MBPlus_finishedTaskBlock").length > 0 || document.querySelectorAll(".MBPlus_waitingTaskBlock").length > 0 || document.querySelectorAll(".MBPlus_lateTaskBlock").length > 0 || document.querySelectorAll(".MBPlus_simpleTaskBlock").length > 0) {
    return
  };
  $("a.fc-day-grid-event").each(function () {
    let a = $(this).attr('href').split("/"),
      b = a[a.length - 1],
      c = a[a.length - 3],
      getInfo = TaskInfo(c, b);
    $(this).append(`<div class='labels-set'>${getInfo.querySelector(".labels-set").innerHTML}</div>`);
    if (getInfo.querySelectorAll(".dropbox-status.submitted").length > 0) {
      $(this).addClass("MBPlus_finishedTaskBlock")
    } else if (getInfo.querySelectorAll(".dropbox-status.upcoming").length > 0) {
      $(this).addClass("MBPlus_waitingTaskBlock")
    } else if (getInfo.querySelectorAll(".dropbox-status.past-due").length > 0) {
      $(this).addClass("MBPlus_lateTaskBlock")
    } else {
      $(this).addClass("MBPlus_simpleTaskBlock")
    }
  })
}

function throttle(fn, delay) {
  var timer;
  return function () {
      var _this = this;
      var args = arguments;
      if (timer) {
          return;
      }
      timer = setTimeout(function () {
          fn.apply(_this, args);
          timer = null; // 在delay后执行完fn之后清空timer，此时timer为假，throttle触发可以进入计时器
      }, delay)
  }
}

export default () => {
  $("body").on('DOMSubtreeModified', ".fc-view", throttle(() => {
    hookCalendarTask()
  }, 100))
}