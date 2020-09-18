import { SanitizePermissionsPipe } from './sanitize-permissions.pipe';

describe('SanitizePermissionsPipe', () => {
  it('create an instance', () => {
    const pipe = new SanitizePermissionsPipe();
    expect(pipe).toBeTruthy();
  });
});
