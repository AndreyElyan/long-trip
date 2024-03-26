import { ValidFormats } from '@helpers/imageValidFormats';

describe('ValidFormats', () => {
  const url
    = 'https://firebasestorage.googleapis.com/v0/b/long-trip-4985d.appspot.com/o/profile-image%2Fc89a28ab-e8b0-4026-b662-9fe8912397f69219004419421042296.jpg?alt=media&token=cc5281a9-a5a2-4bfc-8d23-3157a4cb36e4';

  it('should be defined', () => {
    expect(ValidFormats).toBeDefined();
  });

  it('should be able to get image format', () => {
    const validFormats = new ValidFormats();

    const imageFormat = validFormats.getFormat(url);

    expect(imageFormat).toEqual('jpg');
  });

  it('should be able to get valid formats', () => {
    const validFormats = new ValidFormats();

    const validFormatsList = validFormats.getValidFormats();

    expect(validFormatsList).toEqual([
      'jpg',
      'png',
      'jpeg',
      'webp',
      'svg',
      'tiff',
      'bmp',
      'ico',
      'heic',
      'heif',
      'avif',
    ]);
  });

  it('should be able to check if format is valid', () => {
    const validFormats = new ValidFormats();

    const imageFormat = validFormats.getFormat(url);

    expect(validFormats.isValidFormat(imageFormat)).toEqual(true);
  });
});
