#### Setup

```bash
npm install && npm start
```

#### Security

- helmet
- cors
- xss-clean  
- express-rate-limit

Swagger UI

```yaml
/jobs/{id}:
  parameters:
    - in: path
      name: id
      schema:
        type: string
      required: true
      description: the job id
```
