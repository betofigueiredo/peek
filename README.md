<h1 align="center">PEEK</h1>
<p align="center">
  <i>A lightweight web tool for debugging HTTP requests.</i>
  <br/><br/>
  <a href="https://github.com/betofigueiredo/peek/blob/main/LICENSE"><img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge&labelColor=363a4f&color=a6da95"></a>
  <br/><br/>
  <img src="https://github.com/user-attachments/assets/31477825-7108-4b2f-8b9b-99f3afd3c95c" alt="Preview" width="100%"/>
</p>

<br />

<h2> :zap: Overview</h2>

PEEK is a browser-based debugging tool that helps developers inspect and analyze HTTP requests. Simply load a JSON file containing an array of request data, and use the search and filtering capabilities to quickly find and debug integration issues.

<br />

<h2> :arrow_forward: Usage</h2>

1. Open PEEK in your browser
2. Load a JSON file containing your HTTP requests data
3. Use the search and filter tools to find specific requests
4. Click on any request to view detailed information

<br />

<h2> :page_facing_up: JSON Format</h2>

Your JSON file should contain an array of request objects with the following structure:

```typescript
type Request = {
  id: string;
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  endpoint: string;
  status: number;
  timestamp: string;
  responseTimeInMS: number;
  response: Record<string, unknown>;
}
```

Example:

```json
[
  {
    "id": "4e0c9d70-3fg3-7h06-c0fg-i16d6243e0e0",
    "method": "PUT",
    "status": 200,
    "responseTimeInMS": 278,
    "timestamp": "2025-11-05T20:19:05.234Z",
    "endpoint": "https://api.cloud.com.br/rest/01/users/21742",
    "response": {
      "id": "21742",
      "name": "MARIA APARECIDA SOUZA",
      "userName": "maria.aparecida",
      "externalId": "2",
      "phone": "+55 21 99876-5432",
      "email": "maria.aparecida@mail.com.br",
      "active": true,
      "groups": [],
      "roles": [],
      "title": "GERENTE",
      "department": "FINANCEIRO",
      "updatedAt": "2025-11-05T20:19:05.234Z"
    }
  },
  {
    "id": "0k6i5j36-9lm9-3n62-i6lm-o72j2809k6k6",
    "method": "PATCH",
    "status": 200,
    "responseTimeInMS": 198,
    "timestamp": "2025-11-05T20:26:34.012Z",
    "endpoint": "https://api.cloud.com.br/rest/01/users/21741",
    "response": {
      "id": "21741",
      "name": "PAULO CÉSAR MOREIRA DA SILVA",
      "userName": "paulo.cesar",
      "externalId": "1",
      "phone": "+55 11 91234-5678",
      "email": "paulo.cesar@mail.com.br",
      "active": false,
      "groups": [],
      "roles": [],
      "title": "GERENCIA",
      "department": "OPERACOES",
      "updatedAt": "2025-11-05T20:26:34.012Z"
    }
  }
]
```

<br />

<h2> 📃 License</h2>

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

<br />
