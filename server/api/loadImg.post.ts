import path from 'node:path';
import { writeFile } from 'node:fs/promises';
import { randomUUID } from 'node:crypto';

import { FileType, createLoadImageDir } from '~/server/utils/createLoadImageDir';

export default defineEventHandler(async (event) => {
  try {
    const files = await readMultipartFormData(event);

    // Если файлы не пришли
    if (!files) {
      throw createError({
        statusCode: 400,
        statusMessage: 'File is invalid',
        message: 'Файлов нет',
      });
    }

    await createLoadImageDir(FileType.IMAGES);

    const file = files[0];

    const filename = randomUUID() + '-' + file.filename;
    const filePath = path.join(process.cwd(), 'public', FileType.IMAGES, filename);
    await writeFile(filePath, file.data);

    return filename;
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Something went wrong',
      message: 'Что-то пошло не так',
    });
  }
});
