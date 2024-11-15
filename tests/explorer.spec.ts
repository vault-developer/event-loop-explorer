import { test, expect } from '@playwright/test';

test.describe('Explorer', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/');
	});

	test('Run synchronous loop', async ({ page }) => {
		const exampleSelect = await page.getByTestId('example-select');

		await exampleSelect.click();
		await page.getByTestId('example-menu-item').nth(0).click();
		await expect(exampleSelect.locator('input')).toHaveValue('synchronous');
		await page.getByTestId('run-button').click();
		await expect(page.getByTestId('speed-slider')).toBeVisible();
	});

	test('Run task queue loop', async ({ page }) => {
		const exampleSelect = await page.getByTestId('example-select');

		await exampleSelect.click();
		await page.getByTestId('example-menu-item').nth(1).click();
		await expect(exampleSelect.locator('input')).toHaveValue('tasks queue');
		await page.getByTestId('run-button').click();
		await expect(page.getByTestId('speed-slider')).toBeVisible();
	});

	test('Run callstack loop', async ({ page }) => {
		const exampleSelect = await page.getByTestId('example-select');

		await exampleSelect.click();
		await page.getByTestId('example-menu-item').nth(2).click();
		await expect(exampleSelect.locator('input')).toHaveValue('callstack');
		await page.getByTestId('run-button').click();
		await expect(page.getByTestId('speed-slider')).toBeVisible();
	});

	test('Run microtasks loop', async ({ page }) => {
		const exampleSelect = await page.getByTestId('example-select');

		await expect(exampleSelect.locator('input')).toHaveValue('microtasks');
		await page.getByTestId('run-button').click();
		await expect(page.getByTestId('speed-slider')).toBeVisible();
	});

	test('Run request animation frame loop', async ({ page }) => {
		const exampleSelect = await page.getByTestId('example-select');

		await exampleSelect.click();
		await page.getByTestId('example-menu-item').nth(4).click();
		await expect(exampleSelect.locator('input')).toHaveValue(
			'requestAnimationFrame'
		);
		await page.getByTestId('run-button').click();
		await expect(page.getByTestId('speed-slider')).toBeVisible();
	});

	test('Run everything loop', async ({ page }) => {
		const exampleSelect = await page.getByTestId('example-select');

		await exampleSelect.click();
		await page.getByTestId('example-menu-item').nth(5).click();
		await expect(exampleSelect.locator('input')).toHaveValue('everything');
		await page.getByTestId('run-button').click();
		await expect(page.getByTestId('speed-slider')).toBeVisible();
	});

	test('Visit github repo link', async ({ page, context }) => {
		const [repoPage] = await Promise.all([
			context.waitForEvent('page'),
			page.getByTestId('github-repo-link').click(),
		]);

		await repoPage.waitForLoadState();

		expect(repoPage.url()).toBe(
			'https://github.com/vault-developer/event-loop-explorer'
		);
	});
});
