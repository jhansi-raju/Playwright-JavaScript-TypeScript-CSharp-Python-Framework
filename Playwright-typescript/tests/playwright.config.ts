import { defineConfig } from '@playwright/test';

export default defineConfig({
    projects: [
        {
            name: 'UnicefLoginTest',
            testMatch: 'UnicefLoginTest.spec.ts',
        },
        {
            name: 'Approval',
            testMatch: 'Approval.spec.ts',
        },
                {
                    name: 'Publish',
                    testMatch: 'Publish.spec.ts',
                },
    ],
    workers: 1, // Ensure tests run sequentially
});
