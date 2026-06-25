# Registro de Agentes y Nivel de Autonomía

> Documento vivo. Actualizar cada vez que un agente cambia de nivel.
> Ver `skills/modelo-l0-l1-l2/SKILL.md` para entender los niveles.

## Niveles de Autonomía

| Nivel | Significado | Supervisión |
|-------|------------|-------------|
| **L0** | Borrador — propone, humano aprueba cada paso | Total |
| **L1** | Piloto — ejecuta, humano aprueba el resultado | Por corrida |
| **L2** | Certificado — ejecuta y reporta solo si hay problema | Mínima |

## Agentes Activos

| Agente | Función | Nivel Actual | Certificado Por | Fecha | Corridas Exitosas |
|--------|---------|-------------|----------------|-------|-------------------|
| _agrega tu primer agente aquí_ | | L0 | | | 0 |

## Circuit Breakers (Aplican a TODOS los niveles)

Los siguientes eventos detienen cualquier agente automáticamente:

```
🔴 DETENER SIEMPRE:
- Gasto de dinero no autorizado
- Claims médicos, legales o financieros sin validación
- Exposición de datos de usuarios (especialmente menores)
- Error repetido 3+ veces consecutivas
- Tasa de fallo > 20% en las últimas 10 corridas
- Comportamiento fuera del scope documentado del agente
```

## Historial de Certificaciones

| Fecha | Agente | De | A | Razón |
|-------|--------|-----|---|-------|
| | | | | |

## Cómo Registrar un Agente Nuevo

1. Agrega una fila a la tabla de "Agentes Activos" con nivel L0
2. Define su SKILL.md en `skills/nombre-agente/`
3. Crea su harness en `skills/nombre-agente/harness.md`
4. Ejecuta mínimo 10 corridas supervisadas antes de considerar L1
