# YOUWARE.md - Página de Links Instagram "Móveis Madeirão"

Este é um projeto React de página de links profissional para Instagram, desenvolvido especificamente para a empresa de móveis de madeira de demolição "Móveis Madeirão", com design rústico e sofisticado.

## Visão Geral do Projeto

**Tipo de Projeto**: Página de Links Instagram para empresa de móveis rústicos
**Tecnologias**: React 18, TypeScript, Vite, Tailwind CSS, Framer Motion
**Design**: Estética rústica e profissional com paleta de cores terrosas
**Responsividade**: Mobile-first design otimizado para dispositivos móveis

## Características Implementadas

### Design Rústico e Profissional
- **Paleta de cores**: Tons de marrom, bege e âmbar que remetem à madeira de demolição
- **Background**: Textura de madeira autêntica com overlay gradient para profundidade
- **Tipografia**: Combinação de fonts serif (Playfair Display) para títulos e sans-serif (Inter) para texto
- **Elementos visuais**: Bordas arredondadas, sombras suaves e efeitos que simulam acabamento rústico

### Funcionalidades Principais
- **4 Links destacados** com ícones personalizados:
  - Carrinho de compras (🛒) - Para loja online
  - Telefone (📞) - Para contato direto
  - WhatsApp (💬) - Para atendimento via WhatsApp
  - Localização (📍) - Para endereço da loja física
- **Header elegante** com logo "Móveis Madeirão" e tagline
- **Footer informativo** com localização e usuário do Instagram
- **Animações suaves** de entrada e hover usando Framer Motion

### Experiência do Usuário
- **Design responsivo** mobile-first
- **Animações de carregamento** progressivas para cada elemento
- **Efeitos hover** interativos nos links
- **Transições suaves** entre estados
- **Acessibilidade** com contraste adequado e elementos focáveis

## Estrutura do Projeto

### Arquivos Principais
- `src/App.tsx` - Componente principal da página de links
- `src/index.css` - Estilos customizados com classes utilitárias
- Textura de madeira hospedada em CDN para performance

### Paleta de Cores Utilizada
- **Primárias**: Âmbar e tons terrosos (#F59E0B, #92400E, #451A03)
- **Secundárias**: Bege e off-white para contraste (#FEF3C7, #FFFBEB)
- **Backgrounds**: Gradients com overlay de madeira para profundidade

## Arquitetura e Conteúdo

### Organização dos Links
Os links são declarados em `src/data/appConfig.ts`, no array `linksData`. Cada objeto segue a interface `LinkData` (`src/types/LinkTypes.ts`) com campos como `title`, `url`, `description`, `colorTheme`, `bgImage`, `priority` e metadados de acessibilidade. Utilize `getSortedLinks()` para obter a listagem apresentada na página.

### Configuração de Tema e Identidade
O objeto `appConfig` em `src/data/appConfig.ts` centraliza informações como `companyInfo`, `contactInfo`, paleta `themeColors` e handles sociais. Alterar esse objeto atualiza dados exibidos no cabeçalho e footers.

### Componentização
`src/App.tsx` orquestra os principais componentes:
- **HeaderSection**: renderiza a logo e introdução com animações.
- **AsymmetricalGrid**: compõe o grid de cards utilizando `linksData`.
- **EnhancedLinkCard**: estilização e interação de cada link.
- **ModernFooter**: apresenta informações de contato e localização.

Animacões utilizam `framer-motion`, enquanto a textura de fundo vem de `src/assets/wood-texture-hq.jpg`.

## Comandos de Desenvolvimento

### Comandos Essenciais
- **Instalar dependências**: `npm install`
- **Build de produção**: `npm run build`
- **Preview do build**: `npm run preview`
- **Limpar saída**: `npm run clean` (remove `dist/`)

### Processo de Deploy
1. Instale dependências (`npm install`)
2. Gere o build (`npm run build`)
3. Sirva o conteúdo estático de `dist/`

## Características Técnicas

### Performance
- **Lazy loading** de animações
- **Otimização de imagens** via CDN
- **Bundle otimizado** com code splitting automático
- **CSS otimizado** com purging automático via Tailwind

### Animações
- **Framer Motion** para animações fluidas
- **Staggered animations** para entrada sequencial dos elementos
- **Hover effects** customizados para interatividade
- **Loading states** visuais para melhor UX

### Responsividade
- **Mobile-first approach** - otimizado para smartphones
- **Breakpoints** adaptativos para tablet e desktop
- **Touch-friendly** - botões e links dimensionados adequadamente
- **Viewport flexibility** - adaptável a diferentes tamanhos de tela

## Considerações de Design

### Conceito Visual
O design reflete a identidade de uma empresa de móveis de madeira de demolição através de:
- **Autenticidade rústica** sem perder profissionalismo
- **Texturas naturais** que remetem ao material principal
- **Cores quentes** que transmitem acolhimento
- **Tipografia equilibrada** entre tradição e modernidade

### UX/UI Principles
- **Hierarquia visual clara** com elementos bem definidos
- **Contraste adequado** para legibilidade em todos os dispositivos
- **Espaçamento generoso** para respiração visual
- **Call-to-actions evidentes** para maximizar conversões

## Manutenção e Updates

### Atualizações de Conteúdo
- Links podem ser atualizados facilmente no arquivo `App.tsx`
- Textos e informações de contato são facilmente editáveis
- Imagens podem ser substituídas mantendo as proporções

### Melhorias Futuras Sugeridas
- Integração com analytics para tracking de clicks
- Adição de mais redes sociais se necessário
- Sistema de tema para diferentes sazonalidades
- Integração com CMS para updates não-técnicos

## Compatibilidade
- **Browsers**: Chrome, Firefox, Safari, Edge (versões modernas)
- **Dispositivos**: iOS, Android, Desktop
- **Acessibilidade**: WCAG 2.1 AA compliance básico
- **SEO**: Meta tags básicas implementadas