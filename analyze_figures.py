import os
import re
from pathlib import Path

directory = r"c:\Users\09323351\Documents\reduxtraveler\regions\mid-atlantic\new-york\new-york-city"
results = {}

for filename in sorted(os.listdir(directory)):
    if not filename.endswith('.html'):
        continue
    
    filepath = os.path.join(directory, filename)
    
    with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()
    
    # Find main-article div boundaries
    main_article_match = re.search(r'<div class="main-article">(.*?)</div>', content, re.DOTALL)
    
    if main_article_match:
        main_article_content = main_article_match.group(1)
        main_article_start = content.find('<div class="main-article">')
        main_article_end = main_article_start + len(main_article_match.group(0))
        
        # Find all figure elements with class="third-party-img" inside main-article
        figures = []
        for match in re.finditer(r'<figure class="third-party-img"[^>]*>(.*?)</figure>', main_article_content, re.DOTALL):
            fig_start = main_article_start + match.start()
            fig_end = main_article_start + match.end()
            
            # Extract image alt text or description
            fig_text = match.group(1)
            alt_match = re.search(r'alt="([^"]*)"', fig_text)
            alt_text = alt_match.group(1) if alt_match else "No alt text"
            
            # Get line number
            line_num = content[:fig_start].count('\n') + 1
            
            figures.append({
                'line': line_num,
                'alt': alt_text
            })
        
        if figures:
            results[filename] = figures

# Display results
print("=" * 80)
print("FILES WITH <figure class=\"third-party-img\"> INSIDE <div class=\"main-article\">")
print("=" * 80)

if results:
    for i, filename in enumerate(sorted(results.keys()), 1):
        figures = results[filename]
        print(f"\n{i}. FILENAME: {filename}")
        print(f"   Count: {len(figures)} figure(s) in main-article")
        print(f"   Details:")
        for j, fig in enumerate(figures, 1):
            print(f"      - Line {fig['line']}: {fig['alt']}")
else:
    print("\nNO FILES FOUND with <figure class=\"third-party-img\"> inside <div class=\"main-article\">")

print("\n" + "=" * 80)
print(f"TOTAL FILES NEEDING DOM REORGANIZATION: {len(results)}")
print("=" * 80)
