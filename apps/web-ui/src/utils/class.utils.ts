export function csn(...classNames: (string | boolean | null | undefined)[]): string {
  return classNames.filter(Boolean).join(' ');
}
