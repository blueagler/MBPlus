import TaskInfo from '^/TaskInfo'

function HookTask() {
  if (!(document.querySelectorAll(".MBPlus_finishedTaskBlock").length > 0 || document.querySelectorAll(".MBPlus_waitingTaskBlock").length > 0 || document.querySelectorAll(".MBPlus_lateTaskBlock").length > 0 || document.querySelectorAll(".MBPlus_simpleTaskBlock").length > 0)) {
    $("li[event_id]").each(function () {
      let a = $(this)[0].children[1].children[0].href.split("/"),
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
}
export default () => {
    HookTask()
}