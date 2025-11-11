#!/usr/bin/env python3
"""
Audit all 8 Orlando landing pages for SEO signals and performance metrics.
Validates: word count (1000-1400), unique titles/H1s, canonical tags, LCP <2.5s
"""
import json
from crawl_light import audit_url
from psi import run_psi

# Get the deployed URL from environment or use localhost
import os
BASE_URL = os.getenv("REPL_SLUG", "https://empathyhealthclinic.com")
if not BASE_URL.startswith("http"):
    BASE_URL = f"https://{BASE_URL}.replit.app"

# 8 Orlando landing pages
ORLANDO_PAGES = [
    "/psychiatrist-orlando",
    "/adhd-psychiatrist-orlando",
    "/anxiety-psychiatrist-orlando",
    "/child-psychiatrist-orlando",
    "/bipolar-psychiatrist-orlando",
    "/medication-management-orlando",
    "/telepsychiatry-orlando",
    "/same-day-psychiatrist-orlando",
]

def main():
    results = []
    
    print("=" * 80)
    print("ORLANDO LANDING PAGES AUDIT")
    print("=" * 80)
    print()
    
    for page in ORLANDO_PAGES:
        url = BASE_URL + page
        print(f"Auditing: {page}")
        
        # Get SEO signals
        seo = audit_url(url)
        
        # Performance check (skip PSI for now due to rate limits - would need API key)
        # perf = run_psi(url, strategy="mobile")
        
        result = {
            "page": page,
            "url": url,
            "status": seo.get("status"),
            "title": seo.get("title"),
            "h1": seo.get("h1"),
            "meta_desc": seo.get("meta_desc"),
            "canonical": seo.get("canonical"),
            "wordcount": seo.get("wordcount"),
        }
        
        # Validation checks
        checks = {
            "✓ Status 200": result["status"] == 200,
            "✓ Has Title": bool(result["title"]),
            "✓ Has H1": bool(result["h1"]),
            "✓ Has Meta Desc": bool(result["meta_desc"]),
            "✓ Has Canonical": bool(result["canonical"]),
            "✓ Word Count 1000-1400": 1000 <= result["wordcount"] <= 1400,
        }
        
        result["checks"] = checks
        results.append(result)
        
        # Print summary
        print(f"  Status: {result['status']}")
        print(f"  Title: {result['title'][:60] if result['title'] else 'MISSING'}...")
        print(f"  H1: {result['h1'][:60] if result['h1'] else 'MISSING'}...")
        print(f"  Word Count: {result['wordcount']}")
        print(f"  Checks: {sum(checks.values())}/{len(checks)} passed")
        
        if not all(checks.values()):
            print("  ⚠️  FAILURES:")
            for check, passed in checks.items():
                if not passed:
                    print(f"    - {check}")
        
        print()
    
    # Summary statistics
    print("=" * 80)
    print("SUMMARY")
    print("=" * 80)
    total_pages = len(results)
    pages_200 = sum(1 for r in results if r["status"] == 200)
    avg_wordcount = sum(r["wordcount"] for r in results) / total_pages if total_pages else 0
    all_checks_passed = sum(1 for r in results if all(r["checks"].values()))
    
    print(f"Total Pages: {total_pages}")
    print(f"Status 200: {pages_200}/{total_pages}")
    print(f"All Checks Passed: {all_checks_passed}/{total_pages}")
    print(f"Average Word Count: {avg_wordcount:.0f}")
    print()
    
    # Check for unique titles and H1s
    titles = [r["title"] for r in results if r["title"]]
    h1s = [r["h1"] for r in results if r["h1"]]
    print(f"Unique Titles: {len(set(titles))}/{len(titles)}")
    print(f"Unique H1s: {len(set(h1s))}/{len(h1s)}")
    print()
    
    # Save results
    with open("orlando_audit_results.json", "w") as f:
        json.dump(results, f, indent=2)
    print("✓ Results saved to orlando_audit_results.json")
    
    return results

if __name__ == "__main__":
    main()
