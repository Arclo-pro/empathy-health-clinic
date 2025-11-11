import os, requests, time

API = "https://www.googleapis.com/pagespeedonline/v5/runPagespeed"
KEY = os.getenv("PSI_API_KEY")

def run_psi(url, strategy="mobile"):
    params = {"url": url, "strategy": strategy, "category": "performance"}
    if KEY: params["key"] = KEY
    r = requests.get(API, params=params, timeout=60)
    r.raise_for_status()
    j = r.json()
    cat = j["lighthouseResult"]["categories"]["performance"]["score"] * 100
    aud = j["lighthouseResult"]["audits"]
    # guard against missing keys
    def m(a,k,f=float):
        try:
            return f(a[k]["numericValue"])
        except Exception:
            return None
    return {
        "url": url,
        "perf_score": round(cat,1),
        "lcp_ms": m(aud, "largest-contentful-paint"),
        "cls": m(aud, "cumulative-layout-shift"),
        "tbt_ms": m(aud, "total-blocking-time"),
        "speed_index_ms": m(aud, "speed-index"),
        "interactive_ms": m(aud, "interactive"),
    }

def batch_psi(urls, pause=2.0):
    out=[]
    for u in urls:
        try:
            out.append(run_psi(u))
        except Exception:
            out.append({"url":u,"perf_score":None,"lcp_ms":None,"cls":None,"tbt_ms":None,"speed_index_ms":None,"interactive_ms":None})
        time.sleep(pause)
    return out
