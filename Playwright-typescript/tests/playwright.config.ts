import { defineConfig } from '@playwright/test';

export default defineConfig({
    projects: [
        {
            name: 'UnicefLoginTest',
            testMatch: 'UnicefLoginTest.spec.ts',
        },
        {
            name: 'ApprovalAndPublish',
            testMatch: 'ApprovalAndPublish.spec.ts',
        },
    ],
    workers: 1, // Ensure tests run sequentially
});
