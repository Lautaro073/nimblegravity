export const API_BASE_URL = 'https://botfilter-h5ddh6dye8exb7ha.centralus-01.azurewebsites.net';

export const API_ENDPOINTS = {
  GET_CANDIDATE: '/api/candidate/get-by-email',
  GET_JOBS: '/api/jobs/get-list',
  APPLY_TO_JOB: '/api/candidate/apply-to-job',
} as const;

export const GITHUB_REPO_REGEX = /^https:\/\/github\.com\/[\w-]+\/[\w.-]+$/;
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
