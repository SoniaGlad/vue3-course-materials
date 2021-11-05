import { formatAsIsoDate, formatAsLocalDate } from './dateFormatters.js';

export function useDateFormatters() {
  return {
    formatAsLocalDate,
    formatAsIsoDate,
  };
}
