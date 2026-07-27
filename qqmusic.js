[MITM]
hostname = u6.y.qq.com

[rewrite_local]
^https:\/\/u6\.y\.qq\.com\/cgi-bin\/musics\.fcg\?.*EveryDaySignLvzScore url script-request-header https://raw.githubusercontent.com/MaYIHEI/paperclip/refs/heads/main/app/qqmusic/qqmusic.js

[task_local]
20 9 * * * https://raw.githubusercontent.com/MaYIHEI/paperclip/refs/heads/main/app/qqmusic/qqmusic.js, tag=QQ音乐签到, img-url=https://raw.githubusercontent.com/MaYIHEI/pin/refs/heads/main/app/qqmusic.png, enabled=true
