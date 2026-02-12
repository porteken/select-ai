import sys
import re


def read_chunk(filepath, start_line, end_line, pattern=None, context_lines=0):
    try:
        with open(filepath, "r", encoding="utf-8") as f:
            lines = f.readlines()

        total_lines = len(lines)
        results = []

        if pattern:
            compiled_pattern = re.compile(pattern)
            matched_line_numbers = set()

            for i, line in enumerate(lines):
                if compiled_pattern.search(line):
                    matched_line_numbers.add(i)
                    for j in range(
                        max(0, i - context_lines), min(total_lines, i + context_lines + 1)
                    ):
                        matched_line_numbers.add(j)

            sorted_matched_line_numbers = sorted(list(matched_line_numbers))

            if not sorted_matched_line_numbers:
                return f"--- FILE: {filepath} ({total_lines} lines) ---\n--- NO MATCHES FOUND FOR PATTERN '{pattern}' ---\n--- END CHUNK ---"

            current_block_start = -1
            current_block_end = -1

            for line_num in sorted_matched_line_numbers:
                if current_block_start == -1:
                    current_block_start = line_num
                    current_block_end = line_num
                elif line_num <= current_block_end + 1:
                    current_block_end = line_num
                else:
                    results.append((current_block_start, current_block_end))
                    current_block_start = line_num
                    current_block_end = line_num
            results.append((current_block_start, current_block_end))

            output_lines = [f"--- FILE: {filepath} ({total_lines} lines) ---"]
            output_lines.append(f"--- MATCHES FOR PATTERN '{pattern}' with {context_lines} CONTEXT LINES ---")
            for block_start, block_end in results:
                output_lines.append(f"--- LINES {block_start + 1} to {block_end + 1} ---")
                output_lines.extend(lines[block_start : block_end + 1])
            output_lines.append("--- END CHUNK ---")
            return "".join(output_lines)

        else:
            # Adjust 1-based index to 0-based
            start_idx = max(0, start_line - 1)
            end_idx = min(total_lines, end_line)

            chunk = "".join(lines[start_idx:end_idx])

            output = f"""
--- FILE: {filepath} ({total_lines} lines) ---
--- SHOWING LINES {start_line} to {end_line} ---
{chunk}
--- END CHUNK ---
"""
            return output
    except Exception as e:
        return f"Error reading file: {str(e)}"


def parse_args(args):
    # Backward compatibility:
    # 1) smart_read.py <path> <start> <end>
    # 2) smart_read.py <path> --start <start> --end <end>
    # 3) smart_read.py <path> --pattern "<regex>" [--context <n>]
    if len(args) >= 3 and not args[1].startswith("--") and not args[2].startswith("--"):
        return {
            "filepath": args[0],
            "start_line": int(args[1]),
            "end_line": int(args[2]),
            "pattern": None,
            "context_lines": 0,
        }

    filepath = args[0]
    start_line = None
    end_line = None
    pattern = None
    context_lines = 0

    i = 1
    while i < len(args):
        if args[i] == "--start" and i + 1 < len(args):
            start_line = int(args[i + 1])
            i += 1
        elif args[i] == "--end" and i + 1 < len(args):
            end_line = int(args[i + 1])
            i += 1
        elif args[i] == "--pattern" and i + 1 < len(args):
            pattern = args[i + 1]
            i += 1
        elif args[i] == "--context" and i + 1 < len(args):
            context_lines = int(args[i + 1])
            i += 1
        i += 1

    return {
        "filepath": filepath,
        "start_line": start_line,
        "end_line": end_line,
        "pattern": pattern,
        "context_lines": context_lines,
    }


if __name__ == "__main__":
    args = sys.argv[1:]
    if not args:
        print("Usage: python3 smart_read.py <path> <start_line> <end_line>")
        print("OR:    python3 smart_read.py <path> --start <start_line> --end <end_line>")
        print('OR:    python3 smart_read.py <path> --pattern "<regex>" [--context <context_lines>]')
        sys.exit(1)

    parsed = parse_args(args)
    filepath = parsed["filepath"]
    start_line = parsed["start_line"]
    end_line = parsed["end_line"]
    pattern = parsed["pattern"]
    context_lines = parsed["context_lines"]

    if pattern:
        if not (start_line is None and end_line is None):
            print("Error: Cannot use --pattern with --start/--end.")
            sys.exit(1)
        print(read_chunk(filepath, 0, 0, pattern=pattern, context_lines=context_lines))
    elif start_line is not None and end_line is not None:
        print(read_chunk(filepath, start_line, end_line))
    else:
        print("Usage: python3 smart_read.py <path> <start_line> <end_line>")
        print("OR:    python3 smart_read.py <path> --start <start_line> --end <end_line>")
        print('OR:    python3 smart_read.py <path> --pattern "<regex>" [--context <context_lines>]')
        sys.exit(1)
