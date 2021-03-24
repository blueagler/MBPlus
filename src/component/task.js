import { Start as Celebrate } from '^/celebrate'
import { DetailFileViewButton as hookdetail, ResourceFileViewButton as hookresource, DropboxFileViewButton as hookdropbox } from '^/file'

export default () => {
  hookdetail(),
  hookresource(),
  hookdropbox();
  $(".edit_dropbox").on("submit",() => {
    Celebrate(10000);
    let [a, b, c] = [window.location.pathname.split("/"), a[a.length - 1], a[a.length - 3]];
    let TIC = JSON.parse(localStorage.getItem("taskInfoCache")).filter((item) => {
      return !(c.includes(item.class) && b.includes(item.id))
    });
      localStorage.setItem("taskInfoCache", JSON.stringify(TIC))
  });
  
}