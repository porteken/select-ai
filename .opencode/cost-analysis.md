# Cost Projection (Claude 4.5 Sonnet Spend Only)

Assumptions:

- Devstral 2 Small cost: `$0` (free).
- Claude 4.5 Sonnet pricing:
  - Input: `$3 / 1M tokens`
  - Output: `$15 / 1M tokens`
- Spend model:
  - `cost = (input_tokens / 1_000_000 * 3) + (output_tokens / 1_000_000 * 15)`

## Per-Task Claude Cost

Baseline (loose routing + broad context):

- Input: `20,000`
- Output: `4,000`
- Cost: `(20,000/1M*3) + (4,000/1M*15) = $0.12`

Optimized (strict routing + lean handoff):

- Input: `6,000`
- Output: `1,200`
- Cost: `(6,000/1M*3) + (1,200/1M*15) = $0.036`

Per complex-task reduction: `~70%`

## Monthly Example

Assume `500` total tasks/month.

Baseline profile:

- `25%` routed to Claude -> `125` tasks
- Monthly Claude cost: `125 * 0.12 = $15.00`

Optimized profile:

- `10%` routed to Claude -> `50` tasks
- Monthly Claude cost: `50 * 0.036 = $1.80`

Estimated monthly savings: `$13.20` (`~88%` lower Claude spend).

## Why Savings Improve

- Default model stays on free Devstral.
- Routing threshold prevents unnecessary Claude usage.
- Claude receives minimal context and no default MCP expansion.
- Debugging search uses built-in `websearch` instead of extra MCP tool overhead.
