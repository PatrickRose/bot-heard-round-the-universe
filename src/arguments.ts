export interface ArgumentMatcher {
    matches(args: string[]): boolean;
}
