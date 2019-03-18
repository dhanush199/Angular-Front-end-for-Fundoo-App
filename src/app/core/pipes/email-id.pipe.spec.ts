import { EmailIdPipe } from './email-id.pipe';

describe('EmailIdPipe', () => {
  it('create an instance', () => {
    const pipe = new EmailIdPipe();
    expect(pipe).toBeTruthy();
  });
});
