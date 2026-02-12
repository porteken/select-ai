import sys

def read_chunk(filepath, start, end):
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            lines = f.readlines()
            
        total_lines = len(lines)
        # Adjust 1-based index to 0-based
        start_idx = max(0, start - 1)
        end_idx = min(total_lines, end)
        
        chunk = "".join(lines[start_idx:end_idx])
        
        output = f"""
--- FILE: {filepath} ({total_lines} lines) ---
--- SHOWING LINES {start} to {end} ---
{chunk}
--- END CHUNK ---
"""
        return output
    except Exception as e:
        return f"Error reading file: {str(e)}"

if __name__ == "__main__":
    # Usage: python3 smart_read.py <path> <start_line> <end_line>
    if len(sys.argv) < 4:
        print("Usage: python3 smart_read.py <path> <start> <end>")
        sys.exit(1)
        
    print(read_chunk(sys.argv[1], int(sys.argv[2]), int(sys.argv[3])))