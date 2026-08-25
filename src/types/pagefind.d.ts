declare module '/pagefind/pagefind.js' {
  export interface PagefindSearchResult {
    data(): Promise<{ url: string; meta: { title?: string }; excerpt?: string }>;
  }
  export interface PagefindSearchResponse {
    results: PagefindSearchResult[];
  }
  export function search(term: string): Promise<PagefindSearchResponse>;
  export function options(opts: { baseUrl: string }): void;
}
