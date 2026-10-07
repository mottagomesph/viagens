# Madrid em Órbitas

Site de bolso da viagem Europa26: um bairro por dia, horários só do que tem hora marcada.
**Exemplo:** dados fictícios, só para aprovar o molde.

- Endereço: https://mottagomesph.github.io/viagens/Europa26/Prototipo/
- Página única (`index.html`) com estilos, dados e fonte embutidos; nada externo no carregamento.
  As únicas saídas são os links do Google Maps e do My Maps.
- **Uso offline:** abra uma vez com internet; o service worker guarda página, ícones e fotos
  (cache `europa26-prototipo-v7`). Toda nova publicação troca o número do cache.
- Gerado por `gerar-site.py` a partir do arquivo de passagem da cidade. Não editar o `index.html` à mão.
- Versão de 07/10/2026.

## Créditos das fotos

- `img/capa.jpg`: Alvaro Bernal, Unsplash (foto d5vpK2XFF5E), licença Unsplash
- `img/dia0.jpg`: Recortes da mesma foto da capa (só para o exemplo)
- `img/dia1.jpg`: Recortes da mesma foto da capa (só para o exemplo)
- `img/dia2.jpg`: Recortes da mesma foto da capa (só para o exemplo)
- `img/dia3.jpg`: Recortes da mesma foto da capa (só para o exemplo)
- `img/dia4.jpg`: Recortes da mesma foto da capa (só para o exemplo)

## Fonte

Nome da cidade na fonte Chelsea, recortada só com as letras usadas e embutida na página.
