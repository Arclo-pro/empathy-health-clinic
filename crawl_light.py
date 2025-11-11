import requests, re
from urllib.parse import urljoin, urlparse
import urllib3
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

HDR = {"User-Agent":"Mozilla/5.0 (+light-crawler)"}

def fetch(url):
    # Use HTTPS and disable SSL verification for localhost testing
    if url.startswith("http://localhost"):
        url = url.replace("http://", "https://")
    r = requests.get(url, headers=HDR, timeout=30, verify=False, allow_redirects=True)
    return r.status_code, r.text, r.headers.get("content-type","")

def extract(html):
    # very light, regex-based (good enough for signals)
    title = re.search(r"<title>(.*?)</title>", html, re.I|re.S)
    h1 = re.search(r"<h1[^>]*>(.*?)</h1>", html, re.I|re.S)
    desc = re.search(r'<meta[^>]+name=["\']description["\'][^>]+content=["\'](.*?)["\']', html, re.I)
    canon = re.search(r'<link[^>]+rel=["\']canonical["\'][^>]+href=["\'](.*?)["\']', html, re.I)
    text = re.sub(r"<(script|style)[\s\S]*?</\1>", "", html, flags=re.I)
    words = re.sub("<[^>]+>"," ", text)
    words = re.sub(r"\s+"," ", words).strip().split(" ")
    wc = len([w for w in words if w and len(w)>1])
    return {
        "title": (title.group(1).strip() if title else None),
        "h1": (re.sub("<.*?>","",h1.group(1)).strip() if h1 else None),
        "meta_desc": (desc.group(1).strip() if desc else None),
        "canonical": (canon.group(1).strip() if canon else None),
        "wordcount": wc
    }

def audit_url(url):
    try:
        sc, html, ctype = fetch(url)
        data = extract(html) if sc==200 and "text/html" in ctype.lower() else {"title":None,"h1":None,"meta_desc":None,"canonical":None,"wordcount":0}
        data.update({"url":url,"status":sc})
        return data
    except Exception:
        return {"url":url,"status":None,"title":None,"h1":None,"meta_desc":None,"canonical":None,"wordcount":0}
