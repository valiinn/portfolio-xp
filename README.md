# Portfólio Luiz Vale — Desktop Windows XP

Portfólio em Next.js (App Router + TypeScript) com a identidade visual do Windows XP: uma tela só, sem scroll de página, onde cada parte do currículo é uma janela.

## Recursos

- Tela de login → área de trabalho → menu Iniciar, barra de tarefas e relógio
- Ícones da área de trabalho (duplo clique abre; em telas de toque, um toque)
- Janelas arrastáveis, redimensionáveis (8 bordas), minimizar / maximizar / fechar, foco por z-index
- Barra de tarefas com alternância de janelas; menus Arquivo/Exibir/Ajuda funcionais
- Responsivo: no celular as janelas ocupam a tela inteira (estilo app)
- API Node (route handler): `GET /api/curriculo` retorna o currículo em JSON
- Sons: por padrão são sintetizados (Web Audio). Se existirem arquivos em `public/sounds/` com os nomes abaixo (`.flac`, `.mp3`, `.wav` ou `.ogg`), eles são usados no lugar: `Windows XP Startup` (login), `Windows Navigation Start` (clique), `Windows XP Logoff Sound`, `Windows XP Shutdown`, `Windows XP Minimize`, `Windows XP Restore`. Botão de mudo na bandeja.

## Rodando

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Deploy (GitHub Pages)

O site é exportado como estático (`output: "export"`). O workflow em `.github/workflows/deploy.yml` publica em cada push na `main`, usando `NEXT_PUBLIC_BASE_PATH=/<nome-do-repo>`. Localmente (`npm run dev`) não precisa de nada.

## Aviso

Projeto pessoal, sem afiliação com a Microsoft. "Windows" e "Windows XP" são marcas da Microsoft; os ícones e sons no estilo XP pertencem aos seus respectivos donos.

## Ícones

Os ícones estilo Windows XP vêm do pacote [react-old-icons](https://github.com/gsnoopy/react-old-icons) (MIT). As imagens usadas foram copiadas para [public/icons](public/icons) (servidas localmente, sem depender de CDN). O mapa de nomes fica em [src/data/icons.ts](src/data/icons.ts) e o componente é `XpIcon`. Para trocar um ícone, baixe o `.webp` desejado para `public/icons` e atualize o mapa.

## Editando o conteúdo

Todo o currículo está em [src/data/curriculo.ts](src/data/curriculo.ts). Para criar uma nova janela, adicione uma entrada em [src/components/apps/meta.ts](src/components/apps/meta.ts) e o componente em [src/components/apps/registry.ts](src/components/apps/registry.ts).
