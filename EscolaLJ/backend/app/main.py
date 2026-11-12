"""Ponto de entrada da API da Escola de Futebol LJ.

Rodar (dentro da pasta backend, com o ambiente virtual ativado):
    uvicorn app.main:app --reload
"""

from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.router import api_router
from app.core.config import get_settings
from app.database import mongodb


@asynccontextmanager
async def lifespan(app: FastAPI):
    await mongodb.connect()
    yield
    await mongodb.disconnect()


settings = get_settings()

app = FastAPI(title=settings.app_name, version="0.1.0", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origin_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router)
