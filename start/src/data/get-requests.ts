import fs from 'node:fs/promises';
import { createServerFn } from '@tanstack/react-start';
import type { RequestData } from '@/types/request-data';

export const getRequests = createServerFn({
  method: 'GET',
})
  .inputValidator((data: { search: { q: string } }) => data)
  .handler(async ({ data }) => {
    // Load file
    const currentPath = process.cwd();
    const fileDataRaw = await fs.readFile(
      `${currentPath}/src/example-data/example.json`,
      'utf-8',
    );
    const fileData = await JSON.parse(fileDataRaw);

    // Search
    const searchQuery = data.search.q;
    // Process data
    const result: Array<Omit<RequestData, 'response'>> = [];

    for (const r of fileData as Array<RequestData>) {
      const responseStr = JSON.stringify(r.response);

      // Search
      const matchesQuery = searchQuery
        ? responseStr.toLowerCase().includes(searchQuery.toLowerCase())
        : true;
      if (!matchesQuery) {
        continue;
      }

      // Add preview and remove response
      r.preview = responseStr.substring(0, 300);
      delete r.response;
      result.push(r);
    }

    return result;
  });
