import '%/file.css'
import { ViewFile, Close, Loading } from '^/Icon'

function DetailFileViewButton() {
  if (document.querySelectorAll(".redactor-styles a[data-name]").length > 0) {
    function generate(name, url, top) {
      return `<div class="MBPlus_detailFileViewButton" style="top:${top}px" data-link="${url}" data-name="${name}">${ViewFile}</div>`
    };
    $(".redactor-styles a[data-name]").each(function () {
      $(".content-block").append(`${generate($(this).text(),$(this).attr('href'),$(this)[0].getBoundingClientRect().top)}`)
    });
    $(".MBPlus_detailFileViewButton").click(function () {
      viewFile($(this).attr("data-name"), $(this).attr("data-link"))
    });
    $(window).resize(function () {
      $(".MBPlus_detailFileViewButton").each(function () {
        $(this).css("left", `${$(this).parent()[0].getBoundingClientRect().right-110}px`);
      });
    });
    $("button.navbar-toggle").click(function () {
      window.dispatchEvent(new Event("resize"))
    });
    window.dispatchEvent(new Event("resize"))
  }
};

function ResourceFileViewButton() {
  if (document.querySelectorAll("a.file-name").length > 0) {
    function generate(name, url) {
      return `<div class="MBPlus_resourceFileViewButton" data-link="${url}" data-name="${name}">${ViewFile}</div>`
    };
    $("a.file-name").each(function () {
      $(this).parent().parent().parent().prepend(`${generate($(this).text(),$(this).attr('href'))}`)
    });
    $(".MBPlus_resourceFileViewButton").click(function () {
      viewFile($(this).attr("data-name"), $(this).attr("data-link"))
    });
  }
};

function DropboxFileViewButton() {
  if (document.querySelectorAll("div.row.file").length > 0) {
    function generate(name, url) {
      return `<div class="MBPlus_dropboxFileViewButton" data-link="${url}" data-name="${name}">${ViewFile}</div>`
    }
    $("div.row.file").each(function () {
      const info = JSON.parse($(this).attr("data-ec3-info"));
      $(this).append(`${generate(info["name"],info["download_url"])}`)
    });
    $(".MBPlus_dropboxFileViewButton").click(function () {
      viewFile($(this).attr("data-name"), $(this).attr("data-link"))
    });
  }
};

function viewFile(name, url) {
  const type = name.split('.').pop().toLowerCase();
  const officetype = ["doc", "docx", "csv", "xls", "xlsx", "ppt", "pptx"];
  const imagetype = ["jpg", "jpeg", "gif", "png", "webp", "HEIC", "heic"];
  const videotype = ["mp4", "MP4", "MOV", "mov"];
  $('body').append(`<div class="MBPlus_ViewWindow"><div id="MBPlus_ViewClose">${Close}</div>${Loading}<div id="MBPlus_ViewContainer"></div></div>`);
  $("#MBPlus_ViewClose").click(function () {
    $(".MBPlus_ViewWindow").remove()
  });
  $.each(officetype, (index, item) => {
    if (type.indexOf(item) != -1) {
      const officeapi = 'https://view.officeapps.live.com/op/view.aspx?wdStartOn=1&wdEmbedCode=0&src=';
      $("#MBPlus_ViewContainer").append(`<iframe src="${officeapi}${encodeURIComponent(url)}"></iframe>`);
      return false
    }
  });
  $.each(videotype, (index, item) => {
    if (type.indexOf(item) != -1) {
      function play() {
        new DPlayer({
          container: document.getElementById('MBPlus_ViewContainer'),
          video: {
            url: url
          },
          autoplay: 1,
          loop: 1,
          screenshot: 1,
          hotkey: 1,
          airplay: 1,
          preload: 1,
          volume: 1
        });
      }
      if (typeof (window.DPlayer) === "object") {
        play()
      } else {
        $.getScript("https://cdn.jsdelivr.net/gh/liujunhao-github/mgtvplayer@latest/dplayer.min.js", play);
      }
      return false
    }
  });
  $.each(imagetype, (index, item) => {
    if (type.indexOf(item) != -1) {
      $("#MBPlus_ViewContainer").append(`<img/>`)
      if (url.indexOf(".heic") != -1 || url.indexOf(".HEIC") != -1) {
        function htp() {
          fetch(url).then((res) => res.blob()).then((blob) => heic2any({
            blob,
            toType: "image/jpeg",
              quality: 1
          })).then((conversionResult) => {
            var url = URL.createObjectURL(conversionResult);
            $("#MBPlus_ViewContainer>img").attr("src", url)
          });
        }
        if (typeof (window.heic2any) === "function") {
          htp()
        } else {
          $.getScript('https://cdn.jsdelivr.net/npm/heic2any@0.0.3/dist/heic2any.min.js', () => htp());
        }
      } else {
        $("#MBPlus_ViewContainer>img").attr("src", url)
      }
      return false
    }
  });
  if (type.indexOf("pdf") != -1) {
    function preview() {
      var adobeDCView = new AdobeDC.View({
        clientId: "2d3dfaf9c9c743c69b101602a5e5a45d",
        divId: "MBPlus_ViewContainer"
      });
      adobeDCView.previewFile({
        content: {
          location: {
            url: url
          }
        },
        metaData: {
          fileName: name
        }
      }, {
        defaultViewMode: "FIT_PAGE",
        dockPageControls: false
      });
    }
    if (typeof (window.AdobeDC) === "object") {
      preview()
    } else {
      $.getScript("https://documentcloud.adobe.com/view-sdk/main.js", () => document.addEventListener("adobe_dc_view_sdk.ready", () => preview()));
    }
  }
};
export {
  DetailFileViewButton, ResourceFileViewButton, DropboxFileViewButton, viewFile
}