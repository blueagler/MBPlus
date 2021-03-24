import dashboard from '&/dashboard'
import task from '&/task'
import global from '^/global'
import calendar from '&/calendar'
import { DropboxFileViewButton as hookfile } from '^/file'

export default () => {
  switch (document.querySelector("body").getAttribute("data-path")) {
  case "student/dashboard/show":
    dashboard();
      break;
  case "student/classes/classes/show":
    dashboard();
    break;
  case "student/classes/core_tasks/show":
    task();
    break;
  case "student/calendars/show":
    calendar();
      break;
  case "student/classes/calendars/show":
    calendar();
    break;
  case "student/classes/files/index":
    hookfile();
    break;
  }
  global()
}