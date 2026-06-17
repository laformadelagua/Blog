# Opciones para el blog de Almu

Requisitos: gratuito, sin necesidad de saber programar, fácil de mantener (añadir/borrar archivos y categorías).

---

## 1. Notion (página pública) — Recomendación principal

Notion permite publicar cualquier página como sitio web con un enlace público. La estructura de categorías y subcategorías encaja perfectamente: las páginas anidadas funcionan como categorías, y las listas de enlaces son triviales. Para añadir o borrar un archivo, ella simplemente edita la página como si fuera un documento de Word.

**Pros:**
- Cero pasos técnicos tras la configuración inicial
- Cambios instantáneos (no hay "despliegue")
- Se puede editar desde el móvil
- Integración trivial con Google Drive: pegar el enlace y listo
- Gratuito (el plan free es suficiente)

**Contras:**
- La URL será `notion.so/su-nombre/nombre-blog` (no se puede personalizar sin pago)
- Notion tiene su propia identidad visual (no es 100% personalizable)

---

## 2. Google Sites

Básicamente "PowerPoint para webs". Drag and drop, gratuito con cuenta de Google, e integración nativa con Drive (puede incrustar carpetas enteras). Crea una página por categoría y el menú de navegación se genera automáticamente.

**Pros:**
- Totalmente gratuito con Google
- Sin pasos técnicos
- Integración nativa con Google Drive
- Muy fácil de aprender

**Contras:**
- Diseño más rígido y menos atractivo que Notion
- Menos flexible para estructuras con subcategorías anidadas

---

## 3. GitHub Pages + archivo YAML (propuesta de Rubén)

Un único archivo `contenido.yml` describe toda la estructura del blog. Cada vez que se edita y se hace push a GitHub, una acción automática regenera el sitio. El resultado visual es completamente personalizable.

```yaml
categorias:
  - nombre: Lengua
    archivos:
      - titulo: Ficha de lectura 1
        enlace: https://drive.google.com/...
    subcategorias:
      - nombre: Lengua EXTRA
        archivos:
          - titulo: Actividades extra nivel 1
            enlace: https://drive.google.com/...
```

**Pros:**
- Gratuito, dominio `usuario.github.io` (o dominio propio sin coste)
- Diseño completamente personalizable
- Control total sobre la estructura

**Contras:**
- Requiere aprender unos pocos comandos de git (`git add`, `git commit`, `git push`)
- La barrera inicial es real: si algo falla (credenciales, conflicto), depende de Rubén para resolverlo
- Los cambios no son instantáneos (la acción tarda ~1 minuto)

---

## 4. Blogger / Blogspot

Gratuito, de Google, con interfaz sencilla. Uno de los sitios de inspiración lo usa. Funciona, pero está pensado para entradas de blog cronológicas, no para una colección estructurada de recursos.

**Pros:**
- Gratuito, conocido, de Google
- Sin configuración técnica

**Contras:**
- El paradigma "entrada de blog" no encaja bien con "lista de archivos por categoría"
- La edición de estructura (categorías, subcategorías) es incómoda
- El resultado visual puede ser anticuado

---

## 5. Linktree (y similares)

Uno de los sitios de inspiración lo usa. Perfecto para listas planas de enlaces, pero las subcategorías son un problema: el plan gratuito no ofrece una forma elegante de jerarquizar contenido.

**Pros:**
- Extremadamente simple de usar
- Sin configuración

**Contras:**
- No está pensado para categorías y subcategorías
- El plan gratuito es muy limitado en estructura y personalización
- Acabaría siendo una lista enorme sin organización real

---

## Conclusión

| Opción | Sin código | Gratis | Subcategorías | Cambios instantáneos |
|---|---|---|---|---|
| Notion | ✅ | ✅ | ✅ | ✅ |
| Google Sites | ✅ | ✅ | ✅ | ✅ |
| GitHub Pages + YAML | ⚠️ (3 comandos git) | ✅ | ✅ | ❌ (~1 min) |
| Blogger | ✅ | ✅ | ⚠️ | ✅ |
| Linktree | ✅ | ⚠️ | ❌ | ✅ |

**Si quieres cero fricción técnica → Notion.**
**Si quieres control total sobre el diseño y estás dispuesto a enseñarle 3 comandos de git → GitHub Pages.**
