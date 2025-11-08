import fs from 'node:fs/promises';
import { createServerFn } from '@tanstack/react-start';

export const getRequestById = createServerFn({
  method: 'GET',
})
  .inputValidator((data: { requestId: string }) => data)
  .handler(async ({ data }) => {
    const currentPath = process.cwd();
    const file = await fs
      .readFile(`${currentPath}/src/example-data/example.json`, 'utf-8')
      .then(JSON.parse);
    return file.find((req: { id: string }) => req.id === data.requestId);
  });
