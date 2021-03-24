import TaskInfo from '^/TaskInfo'

function hookCalendarTask() {
  if (!(document.querySelectorAll(".MBPlus_finishedTaskBlock").length > 0 || document.querySelectorAll(".MBPlus_waitingTaskBlock").length > 0 || document.querySelectorAll(".MBPlus_lateTaskBlock").length > 0 || document.querySelectorAll(".MBPlus_simpleTaskBlock").length > 0)) {
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
    });
    window.dispatchEvent(new Event("resize"))
  }
}

export default () => {
  $(".fc-view").change(hookCalendarTask)
}