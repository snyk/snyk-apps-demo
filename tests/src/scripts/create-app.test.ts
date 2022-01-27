import { run } from '../../helper';

/**
 * Test for create app script
 */
describe('Create App', () => {
  /**
   * Input validation tests
   */
  describe('cli test: input validation', () => {
    it('should throw error for auth token not provided', () => {
      expect(() => {
        run('');
      }).toThrow();
    });

    it('should throw error for org id not provided', () => {
      const result = run('--auth-token=test');
      expect(result).toContain(
        'Arguments --auth-token, --org-id, --redirect-uris, --scopes, --name, are all required if using the command without the --file argument',
      );
    });

    it('should throw error for scopes not providied', () => {
      const result = run('--auth-token=test --org-id=test');
      expect(result).toContain(
        'Arguments --auth-token, --org-id, --redirect-uris, --scopes, --name, are all required if using the command without the --file argument',
      );
    });

    it('should throw error for name not providied', () => {
      const result = run('--auth-token=test --org-id=test --scopes=apps:beta');
      expect(result).toContain(
        'Arguments --auth-token, --org-id, --redirect-uris, --scopes, --name, are all required if using the command without the --file argument',
      );
    });

    it('should not throw error when all required args provided', () => {
      const result = run('--auth-token=test --org-id=test --scopes=apps:beta --name=test');
      expect(result).toContain(
        'Arguments --auth-token, --org-id, --redirect-uris, --scopes, --name, are all required if using the command without the --file argument',
      );
    });

    it('should print error to console for token not valid', () => {
      const result = run(
        '--auth-token=test --org-id=test --redirect-uris=http://test.com --scopes=apps:beta --name=test',
      );
      expect(result).toContain('Error creating app');
      expect(result).toContain('Unauthorized');
      expect(result).toContain('401');
    });

    it('should print error to console when file not found', () => {
      const result = run('--auth-token=test --file=./something/snyk-app.yaml');
      expect(result).toContain('ENOENT: no such file or directory');
    });
  });
});
