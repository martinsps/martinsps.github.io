Imágenes de portada de las noticias.

1) Descarga la imagen del post de LinkedIn (clic derecho → Guardar imagen) y
   guárdala aquí, p. ej.:  public/news/concesion-proyecto-nova.jpg

2) En el .md de la noticia (src/content/news/es|en/<slug>.md) añade en el
   frontmatter:

       cover: /news/concesion-proyecto-nova.jpg

   La ruta empieza por /news/ (sin "public"). La misma imagen sirve para las
   versiones ES y EN; cada idioma referencia la suya en su propio .md.

La imagen se muestra como miniatura 16:9 en la tarjeta de la lista y a tamaño
completo en la página del artículo.
