import '%/ViewFile.css'

const elements = {
  ViewFile: '<svg viewBox="0 0 40 40"><path d="M39.605 39.605a1.83 1.83 0 0 1-1.65.35l-6-6c.36-.31 1.69-1.63 2-2l6 6a1.83 1.83 0 0 1-.35 1.65zm-13.65-3.65a10 10 0 1 1 9.99-10.01 9.9 9.9 0 0 1-9.99 10.01zm0-18a8 8 0 1 0 8 8 7.8 7.8 0 0 0-8-8zm2-6h-6a4.238 4.238 0 0 1-4-4v-6h-14a2.119 2.119 0 0 0-2 2v26a2.119 2.119 0 0 0 2 2h11a14.539 14.539 0 0 0 2 2h-13a4.238 4.238 0 0 1-4-4v-26a4.238 4.238 0 0 1 4-4h16l10 10v4c-.58-.45-1.35-.33-2-.67v-1.33zm-8-9v5a2.119 2.119 0 0 0 2 2h5z"></path></svg>',
  Close: '<svg viewBox="0 0 30 30"><path d="M23 9l-6 6 6 6 1 1a2.444 2.444 0 011 1.24A1.763 1.763 0 0123.236 25 2.437 2.437 0 0122 24l-1-1-6-6-6 6-1 1a2.439 2.439 0 01-1.235 1A1.764 1.764 0 015 23.24 2.449 2.449 0 016 22l1-1 6-6-6-6-1-1a2.449 2.449 0 01-1-1.24A1.764 1.764 0 016.765 5 2.439 2.439 0 018 6l1 1 6 6 6-6 1-1a2.437 2.437 0 011.236-1A1.763 1.763 0 0125 6.76 2.444 2.444 0 0124 8z"></path></svg>',
  Loading: '<svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M500.914065 101.849403m-101.850403 0a101.850403 101.850403 0 1 0 203.700806 0 101.850403 101.850403 0 1 0-203.700806 0Z"></path><path d="M254.163511 187.508901m-96.031438 0a96.031437 96.031437 0 1 0 192.062875 0 96.031437 96.031437 0 1 0-192.062875 0Z"></path><path d="M120.713293 381.395765m-90.210472 0a90.210471 90.210471 0 1 0 180.420943 0 90.210471 90.210471 0 1 0-180.420943 0Z"></path><path d="M118.049308 609.722427m-84.390505 0a84.390506 84.390506 0 1 0 168.781011 0 84.390506 84.390506 0 1 0-168.781011 0Z"></path><path d="M224.002687 786.127394m-78.570539 0a78.57054 78.57054 0 1 0 157.141079 0 78.57054 78.57054 0 1 0-157.141079 0Z"></path><path d="M418.803546 889.708787m-72.750574 0a72.750574 72.750574 0 1 0 145.501148 0 72.750574 72.750574 0 1 0-145.501148 0Z"></path><path d="M626.851327 877.857856m-66.931608 0a66.931608 66.931608 0 1 0 133.863216 0 66.931608 66.931608 0 1 0-133.863216 0Z"></path><path d="M800.334311 762.483532m-61.110642 0a61.110642 61.110642 0 1 0 122.221283 0 61.110642 61.110642 0 1 0-122.221283 0Z"></path><path d="M889.516788 587.14856m-55.290676 0a55.290676 55.290676 0 1 0 110.581352 0 55.290676 55.290676 0 1 0-110.581352 0Z"></path><path d="M888.602793 408.896604m-49.47071 0a49.47071 49.47071 0 1 0 98.94142 0 49.47071 49.47071 0 1 0-98.94142 0Z"></path><path d="M818.663203 260.047476m-43.650744 0a43.650744 43.650744 0 1 0 87.301488 0 43.650744 43.650744 0 1 0-87.301488 0Z"></path><path d="M708.18485 159.990063m-37.829778 0a37.829778 37.829778 0 1 0 75.659557 0 37.829778 37.829778 0 1 0-75.659557 0Z"></path></svg>'
};

function DetailFileViewButton() {
  if (document.querySelectorAll(".redactor-styles a[data-name]").length > 0) {
    function generate(name, url, top) {
      return `<div class="MBPlus_detailFileViewButton" style="top:${top}px" data-link="${url}" data-name="${name}">${elements.ViewFile}</div>`
    };
    $(".redactor-styles a[data-name]").each(function () {
      $(".content-block").append(`${generate($(this).text(),$(this).attr('href'),$(this)[0].getBoundingClientRect().top)}`)
    });
    $(".MBPlus_detailFileViewButton").click(function () {
      viewFile($(this).attr("data-name"), $(this).attr("data-link"))
    });
    $(window).resize(function () {
      $(".MBPlus_detailFileViewButton").each(function () {
        $(this).css("left",`${$(this).parent()[0].getBoundingClientRect().right-110}px`);
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
      return `<div class="MBPlus_resourceFileViewButton" data-link="${url}" data-name="${name}">${elements.ViewFile}</div>`
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
      return `<div class="MBPlus_dropboxFileViewButton" data-link="${url}" data-name="${name}">${elements.ViewFile}</div>`
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

function viewOffice(url) {
  const officeapi = 'https://view.officeapps.live.com/op/view.aspx?wdStartOn=1&wdEmbedCode=0&src=';

  function generate(url, api) {
    return `<div class="MBPlus_officeViewWindow"><div>${elements.Close}</div><iframe src="${api}${encodeURIComponent(url)}"></iframe></div>`
  };
  $('body').append(`${generate(url,officeapi)}`);
  $(".MBPlus_officeViewWindow>div").click(function () {
    $(this).parent().remove()
  });
};

function viewImage(url) {
  $('body').append(`<div class="MBPlus_imageViewWindow"><div>${elements.Close}</div><img></img>${elements.Loading}</div>`);
  $(".MBPlus_imageViewWindow>div").click(function () {
    $(this).parent().remove()
  });
  if (url.indexOf(".heic") != -1 || url.indexOf(".HEIC") != -1) {
    function htp() {
      fetch(url).then((res) => res.blob()).then((blob) => heic2any({
        blob,
        toType: "image/jpeg",
          quality: 1
      })).then((conversionResult) => {
        var url = URL.createObjectURL(conversionResult);
        $(".MBPlus_imageViewWindow>img").attr("src", url)
      });
    }
    if (typeof (window.heic2any) === "function") {
      htp()
    } else {
      $.getScript('https://cdn.jsdelivr.net/npm/heic2any@0.0.3/dist/heic2any.min.js', () => htp());
    }
  } else {
    $(".MBPlus_imageViewWindow>img").attr("src", url)
  }
};

function viewPdf(name, url) {
  $('body').append(`<div class="MBPlus_pdfViewWindow"><div>${elements.Close}</div><div id="MBPlus_pdfViewContainer"></div>${elements.Loading}</div>`);
  $(".MBPlus_pdfViewWindow>div:first-child").click(function () {
    $(this).parent().remove()
  });
  function preview() {
    var adobeDCView = new AdobeDC.View({
      clientId: "2d3dfaf9c9c743c69b101602a5e5a45d",
      divId: "MBPlus_pdfViewContainer"
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
};

function viewFile(name, url) {
  const type = name.split('.').pop().toLowerCase();
  const officetype = ["doc", "docx", "csv", "xls", "xlsx", "ppt", "pptx"];
  const imagetype = ["jpg", "jpeg", "gif", "png", "webp", "HEIC", "heic"];
  $.each(officetype, (index, item) => {
    if (type.indexOf(item) != -1) {
      viewOffice(url)
      return false
    }
  });
  $.each(imagetype, (index, item) => {
    if (type.indexOf(item) != -1) {
      viewImage(url)
      return false
    }
  });
  if (type.indexOf("pdf") != -1) {
    viewPdf(name, url)
  }
};
export default () => {
  DetailFileViewButton();
  ResourceFileViewButton();
  DropboxFileViewButton();
  $("input[value='Upload Files']").click(function () {
    let [a, b, c] = [window.location.pathname.split("/"), a[a.length - 1], a[a.length - 3]];
    let TIC = JSON.parse(localStorage.getItem("taskInfoCache")).filter((item) => {
      return !(c.includes(item.class) && b.includes(item.id))
    });
    localStorage.setItem("taskInfoCache", JSON.stringify(TIC))
  })
}