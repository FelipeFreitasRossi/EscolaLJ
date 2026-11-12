"""Respostas de erro padronizadas.

Todo erro da API sai no mesmo formato:
    {"error": {"code": "...", "message": "...", "details": [...]}}

Erros inesperados nunca expõem detalhes internos (stack trace, mensagens do
banco); o detalhe vai só para o log do servidor.
"""

import logging

from fastapi import FastAPI, Request, status
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse
from starlette.exceptions import HTTPException as StarletteHTTPException

logger = logging.getLogger("escola_lj")


def _body(code: str, message: str, details: list | None = None) -> dict:
    error: dict = {"code": code, "message": message}
    if details:
        error["details"] = details
    return {"error": error}


def register_error_handlers(app: FastAPI) -> None:
    @app.exception_handler(StarletteHTTPException)
    async def http_error(_: Request, exc: StarletteHTTPException) -> JSONResponse:
        code = {404: "not_found", 405: "method_not_allowed", 401: "unauthorized", 403: "forbidden", 409: "conflict"}.get(
            exc.status_code, "http_error"
        )
        message = exc.detail if isinstance(exc.detail, str) else "Erro na requisição."
        return JSONResponse(status_code=exc.status_code, content=_body(code, message), headers=getattr(exc, "headers", None))

    @app.exception_handler(RequestValidationError)
    async def validation_error(_: Request, exc: RequestValidationError) -> JSONResponse:
        details = [
            {"field": ".".join(str(p) for p in err.get("loc", []) if p != "body"), "message": err.get("msg", "")}
            for err in exc.errors()
        ]
        return JSONResponse(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            content=_body("validation_error", "Alguns dados enviados são inválidos.", details),
        )

    @app.exception_handler(Exception)
    async def unexpected_error(request: Request, exc: Exception) -> JSONResponse:
        logger.exception("Erro inesperado em %s %s", request.method, request.url.path)
        return JSONResponse(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            content=_body("internal_error", "Ocorreu um erro inesperado. Tente novamente em instantes."),
        )
