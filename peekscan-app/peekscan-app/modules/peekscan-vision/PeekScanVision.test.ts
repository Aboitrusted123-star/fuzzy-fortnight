import PeekScanVision from './index';

describe('PeekScanVision', () => {
  it('is defined', () => {
    expect(PeekScanVision).toBeDefined();
  });

  it('preprocessAndDecode should be a function', () => {
    expect(typeof PeekScanVision.preprocessAndDecode).toBe('function');
  });

  // Since we cannot run native code in the Jest environment without mocks,
  // we document how the developer should test it.
  /*
  it('decodes a base64 image', async () => {
    const mockBase64 = '...';
    const result = await PeekScanVision.preprocessAndDecode(mockBase64);
    expect(result).toHaveProperty('results');
    expect(result).toHaveProperty('source');
  });
  */
});
