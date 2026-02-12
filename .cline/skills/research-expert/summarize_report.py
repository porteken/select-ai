import sys
import datetime
import re

def summarize_text(text, topic, max_sentences=5):
    # Split text into sentences using common delimiters
    sentences = re.split(r'(?<!\w\.\w.)(?<![A-Z][a-z]\.)(?<=\.|\?|\!)\s', text)
    
    # Extract keywords from topic
    keywords = set(word.lower() for word in re.findall(r'\b\w+\b', topic))
    
    # Score sentences based on keyword presence
    scored_sentences = []
    for sentence in sentences:
        score = sum(1 for word in re.findall(r'\b\w+\b', sentence.lower()) if word in keywords)
        if score > 0: # Only consider sentences with at least one keyword
            scored_sentences.append((score, sentence))
            
    # Sort sentences by score in descending order
    scored_sentences.sort(key=lambda x: x[0], reverse=True)
    
    # Get top sentences
    summary_sentences = [s[1] for s in scored_sentences[:max_sentences]]
    
    if not summary_sentences:
        # Fallback to first few sentences if no keywords found
        summary_sentences = sentences[:max_sentences]

    return "\n".join(summary_sentences) + ("\n...[summary truncated]..." if len(summary_sentences) < len(sentences) and len(sentences) > max_sentences else "")

if __name__ == "__main__":
    # Usage: python3 summarize_report.py <topic> <content> [--max_sentences <num>]
    
    args = sys.argv[1:]
    
    if len(args) < 2:
        print("Usage: python3 summarize_report.py <topic> <content> [--max_sentences <num>]")
        sys.exit(1)

    topic = args[0]
    raw_content = args[1]
    
    max_sentences = 5 # Default
    
    i = 2
    while i < len(args):
        if args[i] == "--max_sentences" and i + 1 < len(args):
            try:
                max_sentences = int(args[i+1])
                if max_sentences <= 0:
                    raise ValueError
            except ValueError:
                print("Error: --max_sentences must be a positive integer.")
                sys.exit(1)
            i += 1
        i += 1
    
    date_str = datetime.datetime.now().strftime("%Y-%m-%d")
    
    summary = summarize_text(raw_content, topic, max_sentences)
    
    report = f"""
# Research Note: {topic}
**Date:** {date_str}

## Key Findings (Summarized)
{summary}

## Analysis
- [ ] Verified Source
- [ ] Relevancy Score: High
"""
    print(report)