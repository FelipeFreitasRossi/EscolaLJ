"""Junta todas as rotas da API sob o prefixo /api."""

from fastapi import APIRouter

from app.api.routes import health

api_router = APIRouter(prefix="/api")
api_router.include_router(health.router)
