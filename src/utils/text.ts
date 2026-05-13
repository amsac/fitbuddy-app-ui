export const splitPipes = (value?: string) =>
  (value ?? '')
    .split('|')
    .map((item) => item.trim())
    .filter(Boolean);

export const templateIdOf = (template: { id?: number; templateId?: number }) => template.templateId ?? template.id ?? 0;
