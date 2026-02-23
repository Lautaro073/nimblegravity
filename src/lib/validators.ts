import { GITHUB_REPO_REGEX, EMAIL_REGEX } from './constants';
import i18n from '@/i18n';

export const validateEmail = (email: string): boolean => {
  return EMAIL_REGEX.test(email);
};

export const validateGithubUrl = (url: string): boolean => {
  return GITHUB_REPO_REGEX.test(url);
};

export const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }
  if (typeof error === 'string') {
    return error;
  }
  return i18n.t('errors.unexpected');
};
