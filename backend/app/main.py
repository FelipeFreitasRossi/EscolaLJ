"""Ponto de entrada da API da Escola de Futebol LJ.

Rodar (dentro da pasta backend, com o ambiente virtual ativado):
    python -m uvicorn app.main:app --reload
"""

from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.router import api_router
from app.core.config import get_settings
from app.core.errors import register_error_handlers
from app.database import mongodb


@asynccontextmanager
async def lifespan(app: FastAPI):
    await mongodb.connect()
    yield
    await mongodb.disconnect()


settings = get_settings()
is_production = settings.environment == "production"

app = FastAPI(
    title=settings.app_name,
    version="0.2.0",
    description="API de reservas e conteúdo da Escola de Futebol LJ.",
    lifespan=lifespan,
    # A documentação interativa (Swagger) fica disponível só fora de produção.
    docs_url=None if is_production else "/docs",
    redoc_url=None,
    openapi_url=None if is_production else "/openapi.json",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origin_list,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PATCH", "DELETE"],
    allow_headers=["Authorization", "Content-Type"],
)

register_error_handlers(app)
app.include_router(api_router)
