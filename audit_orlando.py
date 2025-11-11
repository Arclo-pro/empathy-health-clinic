#!/usr/bin/env python3
"""
Quick audit of 8 Orlando landing pages - SEO signals only (no PSI due to rate limits)
"""
import json
import sys
sys.path.insert(0, '/home/runner/workspace')

from crawl_light import audit_url

# Using localhost for testing
BASE_URL = "http://localhost:5000"

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
    print("=" * 80)
    print("ORLANDO LANDING PAGES SEO AUDIT")
    print("=" * 80)
    print()
    
    results = []
    
    for page in ORLANDO_PAGES:
        url = BASE_URL + page
        print(f"Auditing: {page}")
        
        # Get SEO signals
        seo = audit_url(url)
        
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
            "Status 200": result["status"] == 200,
            "Has Title": bool(result["title"]),
            "Has H1": bool(result["h1"]),
            "Has Meta Desc": bool(result["meta_desc"]),
            "Has Canonical": bool(result["canonical"]),
            "Word Count 1000-1400": 1000 <= result["wordcount"] <= 1400 if result["wordcount"] else False,
            "Title Contains Orlando": "Orlando" in (result["title"] or ""),
            "H1 Contains Service": any(kw in (result["h1"] or "").lower() for kw in ["psychiatrist", "adhd", "anxiety", "child", "bipolar", "medication", "telepsychiatry", "same"]),
        }
        
        result["checks"] = checks
        results.append(result)
        
        # Print details
        print(f"  Status: {result['status']}")
        print(f"  Title: {result['title'][:70] if result['title'] else 'MISSING'}...")
        print(f"  H1: {result['h1'][:70] if result['h1'] else 'MISSING'}...")
        print(f"  Meta Desc: {result['meta_desc'][:60] if result['meta_desc'] else 'MISSING'}...")
        print(f"  Canonical: {result['canonical'] if result['canonical'] else 'MISSING'}")
        print(f"  Word Count: {result['wordcount']}")
        
        passed = sum(checks.values())
        total = len(checks)
        print(f"  Checks: {passed}/{total} passed")
        
        if passed < total:
            print(f"  ⚠️  FAILURES:")
            for check, status in checks.items():
                if not status:
                    print(f"    ✗ {check}")
        
        print()
    
    # Summary
    print("=" * 80)
    print("SUMMARY")
    print("=" * 80)
    total_pages = len(results)
    pages_200 = sum(1 for r in results if r["status"] == 200)
    avg_wordcount = sum(r["wordcount"] for r in results if r["wordcount"]) / total_pages if total_pages else 0
    all_checks_passed = sum(1 for r in results if all(r["checks"].values()))
    
    print(f"Total Pages: {total_pages}")
    print(f"Status 200: {pages_200}/{total_pages}")
    print(f"All Checks Passed: {all_checks_passed}/{total_pages}")
    print(f"Average Word Count: {avg_wordcount:.0f}")
    print()
    
    # Check for unique titles and H1s
    titles = [r["title"] for r in results if r["title"]]
    h1s = [r["h1"] for r in results if r["h1"]]
    unique_titles = len(set(titles))
    unique_h1s = len(set(h1s))
    
    print(f"Unique Titles: {unique_titles}/{len(titles)} {'✓' if unique_titles == len(titles) else '✗ DUPLICATE TITLES!'}")
    print(f"Unique H1s: {unique_h1s}/{len(h1s)} {'✓' if unique_h1s == len(h1s) else '✗ DUPLICATE H1s!'}")
    print()
    
    # Word count distribution
    wordcounts = [r["wordcount"] for r in results if r["wordcount"]]
    if wordcounts:
        print(f"Word Count Range: {min(wordcounts)} - {max(wordcounts)}")
        pages_in_target = sum(1 for wc in wordcounts if 1000 <= wc <= 1400)
        print(f"Pages in 1000-1400 range: {pages_in_target}/{len(wordcounts)}")
    print()
    
    # Save results
    with open("orlando_audit_results.json", "w") as f:
        json.dump(results, f, indent=2)
    print("✓ Results saved to orlando_audit_results.json")
    
    # Exit with error if any checks failed
    if all_checks_passed < total_pages:
        print(f"\n⚠️  {total_pages - all_checks_passed} pages have issues that need attention!")
        return 1
    else:
        print("\n✓ All pages passed quality checks!")
        return 0

if __name__ == "__main__":
    sys.exit(main())
