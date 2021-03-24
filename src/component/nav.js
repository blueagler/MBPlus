import { Flash } from '^/Icon'
import { SettingButton }  from '&/setting'

const NavList = [
    {title: "OneNote",url: "https://onenote.partner.office365.cn/notebooks"}, 
    {title: "Outlook",url: "https://partner.outlook.cn/mail/"}
];

function GenerateButton(title,url) {
    return `<li><a href="${url}" target="_blank">${Flash}<span style="color:#4b8ffa">${title}</span></a></li>`
};
export default () => {
    let list = NavList.reverse();
    $("ul.nav.navbar-nav.navbar-right").prepend(SettingButton)
    $.each(list, function(index, item) {
        $("ul.nav.navbar-nav.navbar-right").prepend(GenerateButton(item.title, item.url))
    })
}