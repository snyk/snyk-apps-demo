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
      }).toThrow('Missing required arguments: authToken');
    });

    it('should throw error for org id not provided', () => {
      expect(() => {
        run('--auth-token=test');
      }).toThrow('Missing required arguments: orgId');
    });

    it('should throw error for scopes not providied', () => {
      expect(() => {
        run('--auth-token=test --org-id=test');
      }).toThrow('Missing required arguments: scopes');
    });

    it('should throw error for name not providied', () => {
      expect(() => {
        run('--auth-token=test --org-id=test --scopes=org.read');
      }).toThrow('Missing required argument: name');
    });

    it('should not throw error when all required args provided', () => {
      expect(() => {
        run('--auth-token=test --org-id=test --scopes=org.read --name=test');
      }).not.toThrow('Missing required argument');
    });

    it('should not throw error when redirectUris also provided', () => {
      expect(() => {
        run('--auth-token=test --org-id=test --redirect-uris=http://test.com --scopes=org.read --name=test');
      }).not.toThrow();
    });
  });
});
