import { DefaultTheme } from 'styled-components';
import { TaskSize } from '../types/tasks';

export const TASK_SIZE_COLORS: Record<TaskSize, keyof DefaultTheme['colors']> = {
  P: 'success',      // Verde - Pequeno (rápido/fácil)
  M: 'igmaYellow',   // Amarelo - Médio (moderado)
  G: 'warning',      // Laranja - Grande (precisa atenção)
  GG: 'danger',      // Vermelho - Muito Grande (complexo)
  EXGG: 'dark'       // Escuro - Extra Grande (muito complexo)
};

export function getTaskSizeColor(size: TaskSize, theme: DefaultTheme): string {
  return theme.colors[TASK_SIZE_COLORS[size]];
}

export function getTaskSizeDescription(size: TaskSize): string {
  const descriptions: Record<TaskSize, string> = {
    P: 'Pequeno - Até 2 horas',
    M: 'Médio - Até 1 dia',
    G: 'Grande - Até 3 dias',
    GG: 'Muito Grande - Até 1 semana',
    EXGG: 'Extra Grande - Mais de 1 semana'
  };
  return descriptions[size];
}

export const TASK_SIZES_ORDERED: TaskSize[] = ['P', 'M', 'G', 'GG', 'EXGG'];

export function isValidTaskSize(size: string): size is TaskSize {
  return TASK_SIZES_ORDERED.includes(size as TaskSize);
}