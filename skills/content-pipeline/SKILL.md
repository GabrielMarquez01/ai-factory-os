---
name: content-pipeline
description: Pipeline técnico de creación de contenido inspirado en inference.sh (Prompt -> Imagen -> Copy -> Resize).
---

# Content Pipeline Skill

Esta skill implementa el flujo técnico para transformar una idea en activos listos para redes sociales.

## 🏗 Estructura del Pipeline

1.  **Input**: Descripción del contenido y plataforma destino.
2.  **Nodo de Imagen**: Genera el visual usando `generate_image`.
3.  **Nodo de Copy**: Genera el texto persuasivo basado en la descripción de la imagen.
4.  **Nodo de Formatos**: Ajusta la salida para las dimensiones requeridas.

## 🚀 Flujo de Ejecución (DAG)

- `generate_image(prompt="{{input.description}}")`
- `marketing-digital(input="{{input.description}}", image_desc="{{image.output}}")`
- `estilo-visual(apply_to="output")`

## ⚙️ Integración
Esta skill debe ser invocada por el `creative-director` para la generación técnica de los activos.
