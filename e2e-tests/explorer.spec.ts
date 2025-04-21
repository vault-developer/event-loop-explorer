import { test, expect } from '@playwright/test';

test.describe('Explorer', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/');
	});

	test('Running tasks queue', async ({ page }) => {
		const select = page.getByRole('combobox');
		const option = page.getByRole('option', { name: 'tasks queue' });
		const slider = page.getByRole('slider');
		const script = page.getByText('script');
		const tasksQueue = page
			.getByTestId('info-container')
			.filter({ has: script });

		const run = page.getByRole('button', { name: 'RUN' });
		const stop = page.getByRole('button', { name: 'STOP' });
		const pause = page.getByRole('button', { name: 'PAUSE' });
		const resume = page.getByRole('button', { name: 'RESUME' });

		// Controls: idle state
		await expect(select).toBeVisible();
		await expect(run).toBeVisible();
		await expect(stop).not.toBeVisible();
		await expect(pause).not.toBeVisible();
		await expect(resume).not.toBeVisible();
		await expect(slider).not.toBeVisible();

		await select.click();
		await option.click();
		await expect(select).toContainText('tasks queue');
		await run.click();

		// Controls: running state
		await expect(slider).toBeVisible();
		await expect(stop).toBeVisible();
		await expect(pause).toBeVisible();
		await expect(select).not.toBeVisible();
		await expect(run).not.toBeVisible();
		await expect(resume).not.toBeVisible();

		await pause.click();

		// Controls: paused state
		await expect(slider).toBeVisible();
		await expect(stop).toBeVisible();
		await expect(resume).toBeVisible();
		await expect(select).not.toBeVisible();
		await expect(pause).not.toBeVisible();
		await expect(run).not.toBeVisible();

		// Populating queue
		await expect(script).toBeVisible();
		await expect(tasksQueue).toBeVisible();

		await stop.click();

		// Controls: initial idle state
		await expect(select).toBeVisible();
		await expect(run).toBeVisible();
		await expect(stop).not.toBeVisible();
		await expect(pause).not.toBeVisible();
		await expect(resume).not.toBeVisible();
		await expect(slider).not.toBeVisible();

		// Cleared queue
		await expect(script).not.toBeVisible();
	});

	test('Visit github repo link', async ({ page, context }) => {
		const [repoPage] = await Promise.all([
			context.waitForEvent('page'),
			page.getByRole('link').click(),
		]);

		await repoPage.waitForLoadState();

		expect(repoPage.url()).toBe(
			'https://github.com/vault-developer/event-loop-explorer'
		);
	});
});
