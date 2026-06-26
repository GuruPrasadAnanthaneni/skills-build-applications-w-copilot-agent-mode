# Build Applications with GitHub Copilot Agent Mode

<img src="https://octodex.github.com/images/Professortocat_v2.png" align="right" height="200px" />

Hey GuruPrasadAnanthaneni!

Mona here. I'm done preparing your exercise. Hope you enjoy! 💚

Remember, it's self-paced so feel free to take a break! ☕️

[![](https://img.shields.io/badge/Go%20to%20Exercise-%E2%86%92-1f883d?style=for-the-badge&logo=github&labelColor=197935)](https://github.com/GuruPrasadAnanthaneni/skills-build-applications-w-copilot-agent-mode/issues/1)

## Frontend environment

The React frontend uses `import.meta.env.VITE_CODESPACE_NAME` to build the API base URL.
If `VITE_CODESPACE_NAME` is unset, the app safely falls back to `http://localhost:8000/api`.

Create `octofit-tracker/frontend/.env.local` with:

```env
VITE_CODESPACE_NAME=<your-codespace-name>
```

This enables API requests against:

```text
https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/[component]/
```

