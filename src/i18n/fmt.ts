/** Fills `{name}` placeholders: fmt('{count} avions', { count: 3 }). Unknown names are left as is. */
export function fmt(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (match, name: string) => (name in values ? String(values[name]) : match))
}
