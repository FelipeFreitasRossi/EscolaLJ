# Escola de Futebol LJ — Website + Reservas

Site institucional e plataforma de reservas de quadras da Escola de Futebol LJ (São Carlos/SP).

| Parte | Tecnologias | Porta |
|---|---|---|
| `frontend/` | React, TypeScript, Vite, Tailwind CSS, Framer Motion, GSAP | 5173 |
| `backend/` | Python, FastAPI, Uvicorn, Pydantic, MongoDB Atlas | 8000 |

## Primeira instalação (Windows CMD)

### Backend
```cmd
cd /d C:\Users\User\Desktop\EscolaLJ\backend
python -m venv .venv
.venv\Scripts\activate.bat
python -m pip install -r requirements.txt
copy .env.example .env
```

### Frontend
```cmd
cd /d C:\Users\User\Desktop\EscolaLJ\frontend
npm install
```

## Rodar no dia a dia (dois terminais CMD no VS Code)

**Terminal 1 — backend**
```cmd
cd /d C:\Users\User\Desktop\EscolaLJ\backend
.venv\Scripts\activate.bat
uvicorn app.main:app --reload
```
API: http://127.0.0.1:8000/api/health · Documentação: http://127.0.0.1:8000/docs

**Terminal 2 — frontend**
```cmd
cd /d C:\Users\User\Desktop\EscolaLJ\frontend
npm run dev
```
Site: http://localhost:5173

Para parar um servidor: `Ctrl + C` no terminal dele.
