import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { type ReactNode, useState } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { SelectFilter } from './select-filter';

// Mock next/image - filter out Next.js specific props
vi.mock('next/image', () => ({
  default: (properties: { alt: string; src: string; unoptimized?: boolean }) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { alt, unoptimized, ...rest } = properties;
    // eslint-disable-next-line @next/next/no-img-element
    return <img alt={alt} {...rest} />;
  },
}));

// Mock ResizeObserver properly as a class
class MockResizeObserver {
  disconnect = vi.fn();
  observe = vi.fn();
  unobserve = vi.fn();
}
globalThis.ResizeObserver = MockResizeObserver as unknown as typeof ResizeObserver;

// Mock IntersectionObserver properly as a class
class MockIntersectionObserver {
  disconnect = vi.fn();
  observe = vi.fn();
  takeRecords = vi.fn().mockReturnValue([]);
  unobserve = vi.fn();
}
globalThis.IntersectionObserver =
  MockIntersectionObserver as unknown as typeof IntersectionObserver;

// Mock window.matchMeglobalThis
Object.defineProperty(globalThis, 'matchMedia', {
  value: vi.fn().mockImplementation((query: string) => ({
    addEventListener: vi.fn(),
    addListener: vi.fn(),
    dispatchEvent: vi.fn(),
    matches: false,
    media: query,
    onchange: undefined,
    removeEventListener: vi.fn(),
    removeListener: vi.fn(),
  })),
  writable: true,
});

// Helper to render with wrapper
function renderWithProvider(ui: React.ReactElement) {
  return render(ui, { wrapper: TestWrapper });
}

// Create a test wrapper with QueryClient
function TestWrapper({ children }: Readonly<{ children: ReactNode }>) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: false,
          },
        },
      })
  );
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}

describe('SelectFilter', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders with placeholder', () => {
    renderWithProvider(<SelectFilter onChange={vi.fn()} placeholder="Search users..." value="" />);

    expect(screen.getByRole('button')).toHaveTextContent('Search users...');
  });

  it('renders with custom label', () => {
    renderWithProvider(<SelectFilter label="Employee" onChange={vi.fn()} value="" />);

    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('opens dropdown when clicked', async () => {
    const user = userEvent.setup();
    renderWithProvider(<SelectFilter onChange={vi.fn()} value="" />);

    const trigger = screen.getByRole('button');
    await user.click(trigger);

    // Wait for the dropdown to open and show search input
    await waitFor(() => {
      expect(screen.getByPlaceholderText('Search User...')).toBeInTheDocument();
    });
  });

  it('shows loading state initially', async () => {
    const user = userEvent.setup();
    renderWithProvider(<SelectFilter onChange={vi.fn()} value="" />);

    const trigger = screen.getByRole('button');
    await user.click(trigger);

    // Should show loading initially
    await waitFor(() => {
      expect(screen.getByText('Loading...')).toBeInTheDocument();
    });
  });

  it('displays users after loading', async () => {
    const user = userEvent.setup();
    renderWithProvider(<SelectFilter onChange={vi.fn()} value="" />);

    const trigger = screen.getByRole('button');
    await user.click(trigger);

    // Wait for users to load - first wait for loading to finish then check for users
    await waitFor(() => {
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    });

    // Check that users are rendered
    await waitFor(() => {
      expect(screen.getByText('User 1')).toBeInTheDocument();
    });

    expect(screen.getByText('User 2')).toBeInTheDocument();
  });

  it('filters users when typing in search', async () => {
    const user = userEvent.setup();
    renderWithProvider(<SelectFilter onChange={vi.fn()} value="" />);

    const trigger = screen.getByRole('button');
    await user.click(trigger);

    // Wait for users to load
    await waitFor(() => {
      expect(screen.getByText('User 1')).toBeInTheDocument();
    });

    // Type in search input
    const searchInput = screen.getByPlaceholderText('Search User...');
    await user.type(searchInput, 'User 5');

    // Wait for filtered results
    await waitFor(() => {
      expect(screen.getByText('User 5')).toBeInTheDocument();
    });
  });

  it('selects a user when clicked', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    renderWithProvider(<SelectFilter onChange={onChange} value="" />);

    const trigger = screen.getByRole('button');
    await user.click(trigger);

    // Wait for users to load
    await waitFor(() => {
      expect(screen.getByText('User 1')).toBeInTheDocument();
    });

    // Click on the text "User 1" to select it
    await user.click(screen.getByText('User 1'));

    // Verify onChange was called with user id
    await waitFor(() => {
      expect(onChange).toHaveBeenCalledWith('user-1');
    });
  });

  it('displays selected user in trigger after opening dropdown', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    renderWithProvider(<SelectFilter onChange={onChange} value="user-1" />);

    // Initially shows placeholder because data hasn't been fetched yet
    expect(screen.getByRole('button')).toHaveTextContent('Search users...');

    // Open dropdown to fetch data
    await user.click(screen.getByRole('button'));

    // Wait for the component to fetch and display the selected user
    await waitFor(
      () => {
        const button = screen.getByRole('button');
        expect(button.textContent).toContain('User 1');
      },
      { timeout: 3000 }
    );
  });

  it('clears selection when X button is clicked', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    // Render with a selected value
    renderWithProvider(<SelectFilter onChange={onChange} value="user-1" />);

    // Open dropdown to fetch data first
    await user.click(screen.getByRole('button'));

    // Wait for component to load with selected value
    await waitFor(
      () => {
        const button = screen.getByRole('button');
        expect(button.textContent).toContain('User 1');
      },
      { timeout: 3000 }
    );

    // Find and click the X icon (clear button)
    const xIcon = document.querySelector('.lucide-x');
    if (xIcon) {
      await user.click(xIcon);
    }

    // Verify onChange was called with empty string
    expect(onChange).toHaveBeenCalledWith('');
  });

  it('is disabled when disabled prop is true', () => {
    renderWithProvider(<SelectFilter disabled onChange={vi.fn()} value="" />);

    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('does not show clear button when clearable is false', () => {
    renderWithProvider(<SelectFilter clearable={false} onChange={vi.fn()} value="user-1" />);

    // Should not have X icon when clearable is false
    expect(document.querySelector('.lucide-x')).not.toBeInTheDocument();
  });

  it('shows no users found when search has no results', async () => {
    const user = userEvent.setup();
    renderWithProvider(<SelectFilter onChange={vi.fn()} value="" />);

    const trigger = screen.getByRole('button');
    await user.click(trigger);

    // Wait for initial load
    await waitFor(() => {
      expect(screen.getByText('User 1')).toBeInTheDocument();
    });

    // Type a query that won't match any users
    const searchInput = screen.getByPlaceholderText('Search User...');
    await user.clear(searchInput);
    await user.type(searchInput, 'xyznonexistent');

    // Should show no users found after search
    await waitFor(
      () => {
        expect(screen.getByText('No users found')).toBeInTheDocument();
      },
      { timeout: 2000 }
    );
  });

  it('applies custom width', () => {
    renderWithProvider(<SelectFilter onChange={vi.fn()} value="" width="500px" />);

    const container = screen.getByRole('button').parentElement;
    expect(container).toHaveStyle({ width: '500px' });
  });

  it('applies custom className', () => {
    renderWithProvider(<SelectFilter className="custom-class" onChange={vi.fn()} value="" />);

    const container = screen.getByRole('button').parentElement;
    expect(container).toHaveClass('custom-class');
  });

  it('shows scroll for more indicator when has more pages', async () => {
    const user = userEvent.setup();
    renderWithProvider(<SelectFilter onChange={vi.fn()} value="" />);

    const trigger = screen.getByRole('button');
    await user.click(trigger);

    // Wait for users to load
    await waitFor(() => {
      expect(screen.getByText('User 1')).toBeInTheDocument();
    });

    // Should show scroll for more indicator (since there are 100 users and page size is 10)
    expect(screen.getByText('Scroll for more')).toBeInTheDocument();
  });
});
