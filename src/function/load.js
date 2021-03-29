import dashboard from "&/dashboard";
import task from "&/task";
import global from "^/global";
import calendar from "&/calendar";
import { DropboxFileViewButton as hookfile } from "^/file";

export default () => {
  const load = {
    "student/dashboard/show": dashboard,
    "student/classes/classes/show": dashboard,
    "student/classes/core_tasks/show": task,
    "student/calendars/show": calendar,
    "student/classes/calendars/show": calendar,
    "student/classes/files/index": hookfile,
  };
  load[document.querySelector("body").getAttribute("data-path")]();
  global();
};
