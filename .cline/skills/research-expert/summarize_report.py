import sys
import datetime

def clean_text(text):
    # logic to strip excessive newlines or noise
    lines = [line.strip() for line in text.split('\n') if line.strip()]
    return "\n".join(lines[:50]) + "\n...[truncated for tokens]..."

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Usage: python3 summarize_report.py <topic> <content>")
        sys.exit(1)

    topic = sys.argv[1]
    raw_content = sys.argv[2]
    
    date_str = datetime.datetime.now().strftime("%Y-%m-%d")
    
    report = f"""
# Research Note: {topic}
**Date:** {date_str}

## Key Findings (Extracted)
{clean_text(raw_content)}

## Analysis
- [ ] Verified Source
- [ ] Relevancy Score: High
"""
    print(report)