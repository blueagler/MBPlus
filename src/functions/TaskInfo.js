function getItem(arr, obj) {
  arrFor: for (var i = 0; i < arr.length; i++) {
    for (var n in obj)
      if (arr[i][n] != obj[n]) continue arrFor;
    return arr[i];
  }
};
function requestInfo(c, d, e) {
  $.ajax({
    async: false,
    url: `https://${window.location.host}/student/classes/${c}/events/${d}/hint`
  }).success(function (data) {
    result = new DOMParser().parseFromString(data, "text/html");
    if (e) {
      TIC = TIC.filter((item) => {
        return !(c.includes(item.class) && d.includes(item.id))
      })
    }
    TIC.push({
      "class": c,
      "id": d,
      "timestamp": new Date().getTime(),
      "data": data
    });
    localStorage.setItem("taskInfoCache", JSON.stringify(TIC))
  })
};
if (localStorage.getItem("taskInfoCache") === null) {
  localStorage.setItem("taskInfoCache", JSON.stringify([]));
};
let result,
  timestamp = new Date().getTime(),
  TIC = JSON.parse(localStorage.getItem("taskInfoCache"));
export default (c, d) => {
  if (getItem(TIC, {
    "class": c,
    "id": d
  }) === undefined) {
    requestInfo(c, d, 0)
  } else if (timestamp - parseInt(getItem(TIC, {
    "class": c,
    "id": d
  }).timestamp) > 3600000) {
    requestInfo(c, d, 1)
  } else {
    result = new DOMParser().parseFromString(getItem(TIC, {
      "class": c,
      "id": d
    }).data, "text/html")
  }
  return result
};