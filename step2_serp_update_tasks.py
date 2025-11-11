#!/usr/bin/env python3
"""
Step 2: SERP Update Tasks
Fetches live SERP rankings from the Node.js API and generates CSV reports
"""

import requests
import csv
import time
import sys

BASE_URL = "http://localhost:5000"

# 12 Orlando target keywords
ORLANDO_KEYWORDS = [
    "psychiatrist orlando",
    "psychiatry orlando",
    "child psychiatrist orlando",
    "adhd psychiatrist orlando",
    "anxiety psychiatrist orlando",
    "bipolar psychiatrist orlando",
    "medication management orlando",
    "telepsychiatry orlando",
    "same day psychiatrist orlando",
    "psychiatrist orlando accepts cigna",
    "psychiatrist orlando accepts bcbs",
    "psychiatrist orlando accepts umr",
]

def fetch_serp_ranking(keyword):
    """Fetch SERP ranking for a single keyword"""
    try:
        response = requests.get(f"{BASE_URL}/api/serp/ranking", params={"q": keyword})
        response.raise_for_status()
        return response.json()
    except Exception as e:
        print(f"Error fetching ranking for '{keyword}': {e}", file=sys.stderr)
        return None

def generate_serp_ranks_csv():
    """Generate serp_ranks.csv with live rankings"""
    print("Fetching SERP rankings for 12 Orlando keywords...")
    print("(This will take ~20 seconds with rate limiting)\n")
    
    results = []
    
    for i, keyword in enumerate(ORLANDO_KEYWORDS, 1):
        print(f"[{i}/12] Checking: {keyword}")
        data = fetch_serp_ranking(keyword)
        
        if data:
            results.append({
                'keyword': keyword,
                'position': data.get('position') or 'Not in top 20',
                'url': data.get('url') or 'N/A',
                'healing_psychiatry_position': data.get('competitor_positions', {}).get('healingpsychiatryflorida.com') or 'N/A',
                'mymindcare_position': data.get('competitor_positions', {}).get('mymindcarecenter.com') or 'N/A',
                'orlando_health_position': data.get('competitor_positions', {}).get('orlandohealth.com') or 'N/A',
            })
        
        # Rate limiting
        if i < len(ORLANDO_KEYWORDS):
            time.sleep(1.5)
    
    # Write CSV
    with open('serp_ranks.csv', 'w', newline='') as f:
        writer = csv.DictWriter(f, fieldnames=[
            'keyword', 'position', 'url',
            'healing_psychiatry_position', 'mymindcare_position', 'orlando_health_position'
        ])
        writer.writeheader()
        writer.writerows(results)
    
    print(f"\n✅ Generated serp_ranks.csv ({len(results)} keywords)")
    return results

def generate_enriched_tasks():
    """Generate tasks_enriched.csv with SEO recommendations"""
    print("\nGenerating enriched SEO tasks...")
    
    # Fetch serp rankings first
    serp_data = {}
    for keyword in ORLANDO_KEYWORDS:
        data = fetch_serp_ranking(keyword)
        if data:
            serp_data[keyword] = data
        time.sleep(1.5)
    
    tasks = []
    
    for keyword, data in serp_data.items():
        position = data.get('position')
        url = data.get('url')
        
        # Generate suggested URL
        slug = keyword.replace(' ', '-').replace('accepts', 'takes')
        suggested_url = f"https://empathyhealthclinic.com/{slug}/"
        
        # Determine task type and rationale
        if position is None:
            task_type = 'create-landing'
            rationale = 'Not ranking in top 20 - create dedicated Orlando landing page'
            rank_on_wrong_url = False
        elif position <= 3:
            task_type = 'supporting-blog'
            rationale = f'Position {position} (Top 3) - defend with supporting content and internal links'
            rank_on_wrong_url = False
        elif position <= 10:
            task_type = 'improve-landing'
            rationale = f'Position {position} (Page 1) - optimize title/meta/content to push into Top 3'
            rank_on_wrong_url = False
        else:
            task_type = 'improve-landing'
            rationale = f'Position {position} (Page 2+) - significantly improve content and on-page SEO'
            rank_on_wrong_url = url and suggested_url and (url.lower().replace('https://', '').replace('www.', '') != suggested_url.lower().replace('https://', '').replace('www.', ''))
        
        tasks.append({
            'target_query': keyword,
            'serp_position': position or 'Not in top 20',
            'serp_url': url or 'N/A',
            'suggested_url': suggested_url,
            'rank_on_wrong_url': rank_on_wrong_url,
            'type': task_type,
            'rationale': rationale,
            'priority': 'high' if position is None or position > 10 else 'medium' if position > 3 else 'low'
        })
    
    # Write CSV
    with open('tasks_enriched.csv', 'w', newline='') as f:
        writer = csv.DictWriter(f, fieldnames=[
            'target_query', 'serp_position', 'serp_url', 'suggested_url',
            'rank_on_wrong_url', 'type', 'rationale', 'priority'
        ])
        writer.writeheader()
        writer.writerows(tasks)
    
    print(f"✅ Generated tasks_enriched.csv ({len(tasks)} tasks)")
    return tasks

def main():
    print("=" * 60)
    print("SERP Analysis & Task Generation")
    print("=" * 60)
    print()
    
    # Check if server is running
    try:
        requests.get(f"{BASE_URL}/api/serp/ranking?q=test", timeout=2)
    except:
        print("❌ Error: Server not running on localhost:5000")
        print("Please start the application first: npm run dev")
        sys.exit(1)
    
    # Generate reports
    serp_results = generate_serp_ranks_csv()
    enriched_tasks = generate_enriched_tasks()
    
    print("\n" + "=" * 60)
    print("Summary")
    print("=" * 60)
    
    # Count rankings
    ranking_count = sum(1 for r in serp_results if r['position'] != 'Not in top 20')
    print(f"\nRanking in top 20: {ranking_count}/{len(ORLANDO_KEYWORDS)} keywords")
    
    # Show ranking keywords
    if ranking_count > 0:
        print("\nCurrently ranking:")
        for r in serp_results:
            if r['position'] != 'Not in top 20':
                print(f"  - {r['keyword']}: #{r['position']}")
    
    print("\nTask breakdown:")
    task_types = {}
    for task in enriched_tasks:
        task_types[task['type']] = task_types.get(task['type'], 0) + 1
    
    for task_type, count in task_types.items():
        print(f"  - {task_type}: {count}")
    
    print("\n✅ Complete! Files generated:")
    print("  - serp_ranks.csv")
    print("  - tasks_enriched.csv")

if __name__ == "__main__":
    main()
