export const cn = (
  ...classes: Array<string | false | null | undefined>
): string => classes.filter(Boolean).join(' ');

export const currentYear = (): number => new Date().getFullYear();
