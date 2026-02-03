import type { Question, Type, LocaleCode } from '../types/quiz';

export const answerKeyToLocale: Record<string, LocaleCode> = {
  'answers.english': 'en',
  'answers.french': 'fr',
  'answers.german': 'de',
  'answers.spanish': 'es',
};

function normalizeType(apiType?: string): Type {
  if (apiType === 'multiple-select') return 'multiple';
  if (apiType === 'bubble') return 'bubble';
  return 'single';
}

function getDefaultSelectedValue(type: Type): string | string[] | null {
  if (type === 'multiple' || type === 'bubble') return [];
  return null;
}

function transformQuestions(apiData: any): Question[] {
  if (!Array.isArray(apiData)) return [];

  return apiData.map((item: any, index: number): Question => {
    const type = normalizeType(item.type);
    
    return {
      id: item.id ?? index + 1,
      type,
      titleKey: item.question,
      subtitleKey: item.subtitle || undefined,
      options: item.answers.map((answer: string, i: number) => ({
        id: String(i + 1),
        labelKey: answer,
      })),
      selectedValue: item.selectedValue ?? getDefaultSelectedValue(type),
    };
  });
}

export async function fetchQuestions(): Promise<Question[]> {

  const apiUrl = 'https://quiz-api-fdez.onrender.com/api/questions';

  const res = await fetch(apiUrl);

  if (!res.ok) throw new Error('Failed to fetch');

  const json = await res.json();
  return transformQuestions(json);
}