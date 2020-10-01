const onPreBuild = require('./index').onPreBuild;

describe('onPreBuild', () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...OLD_ENV };
  });

  afterEach(() => {
    process.env = OLD_ENV;
  });

  describe('with site name ENV overrides', () => {
    it('sets ENV vars to the correct values', async () => {
      process.env.SITE_NAME = 'site-a';
      process.env.DATABASE_URL = 'https://dev.com';
      process.env.SITE_A_DATABASE_URL = 'https://site-a.com';
      await onPreBuild();

      expect(process.env.DATABASE_URL).toBe(process.env.SITE_A_DATABASE_URL);
    });
  });

  describe('without ENV overrides', () => {
    it('does not change ENV vars', async () => {
      process.env.SITE_NAME = 'site-a';
      process.env.DATABASE_URL = 'https://dev.com';
      process.env.SITE_B_DATABASE_URL = 'https://dontsetme.com';
      await onPreBuild();

      expect(process.env.DATABASE_URL).toBe('https://dev.com');
    });
  });
});
