import sys
import datetime
import re

def summarize_text(text, topic, max_sentences=5):
    # Input validation
    if not text or not isinstance(text, str):
        return ""
    if not topic or not isinstance(topic, str):
        return text[:200] + ("..." if len(text) > 200 else "")
    
    # Split text into sentences using improved delimiters
    sentences = [s.strip() for s in re.split(r'(?<!\w\.\w.)(?<![A-Z][a-z]\.)(?<=[.?!])\s+', text) if s.strip()]
    
    if not sentences:
        return text[:200] + ("..." if len(text) > 200 else "")
    
    # Extract keywords from topic using improved word pattern
    keywords = {word.lower() for word in re.findall(r"\b[\w'-]+\b", topic) if len(word) > 2}
    
    # Score sentences based on keyword presence
    scored_sentences = []
    for sentence in sentences:
        # Improved word matching that handles apostrophes and hyphens
        words_in_sentence = {word.lower() for word in re.findall(r"\b[\w'-]+\b", sentence)}
        score = len(words_in_sentence.intersection(keywords))
        if score > 0:  # Only consider sentences with at least one keyword
            scored_sentences.append((score, sentence))
            
    # Sort sentences by score in descending order
    scored_sentences.sort(key=lambda x: x[0], reverse=True)
    
    # Get top sentences
    summary_sentences = [s[1] for s in scored_sentences[:max_sentences]]
    
    if not summary_sentences:
        # Fallback to first few sentences if no keywords found
        summary_sentences = sentences[:max_sentences]
    
    # Improved truncation message logic
    truncation_msg = ""
    if len(summary_sentences) < len(sentences) and len(sentences) > max_sentences:
        truncation_msg = "\n...[summary truncated]..."
    
    return "\n".join(summary_sentences) + truncation_msg

if __name__ == "__main__":
    # Usage: python3 summarize_report.py <topic> <content> [--max_sentences <num>]
    
    args = sys.argv[1:]
    
    if len(args) < 2:
        print("Usage: python3 summarize_report.py <topic> <content> [--max_sentences <num>]")
        sys.exit(1)

    topic = args[0]
    raw_content = args[1]
    
    # Input validation
    if not raw_content:
        print("Error: Content cannot be empty.")
        sys.exit(1)
    
    max_sentences = 5  # Default
    
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
    
    try:
        date_str = datetime.datetime.now().strftime("%Y-%m-%d")
        summary = summarize_text(raw_content, topic, max_sentences)
        
        if not summary:
            summary = "No summary could be generated from the provided content."
        
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
    except Exception as e:
        print(f"Error generating summary: {e}")
        sys.exit(1)