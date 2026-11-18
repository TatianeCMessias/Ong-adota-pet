# 🐾 ONG Adota Pet

Aplicação web moderna, inclusiva e 100% responsiva para a **ONG Adota Pet**, desenvolvida com **HTML5 Semântico**, **CSS3 Avançado (Mobile-First)** e **React.jsx (Vite)**.

O site foi projetado e testado para funcionar com perfeição em **smartphones, tablets e computadores desktop**.

---
## LINK - [Vercel](https://ong-adota-pets.vercel.app/)

## 🚀 Como Executar o Projeto

No terminal do seu computador (na pasta do projeto `C:\Users\tatia\Desktop\Projetos\Ong-adota-pet`):

### 1. Iniciar o servidor de desenvolvimento
```bash
npm run dev
```
O servidor iniciará em `http://localhost:3000` (ou porta indicada no terminal). Abra o link no seu navegador.

### 2. Gerar a versão de produção
```bash
npm run build
```
Os arquivos otimizados e minificados serão gerados na pasta `/dist`.

### 3. Visualizar a versão de produção localmente
```bash
npm run preview
```

---

## 📱 Responsividade (Mobile, Tablet & Desktop)

- **Mobile (< 640px):**
  - Menu lateral gaveta (*drawer navigation*) com botão hambúrguer acessível.
  - Grade de pets em coluna única com botões de toque confortáveis (> 44px).
  - Formulário e modais adaptados à largura da tela do celular.
  - Carregamento rápido e imagens otimizadas com *lazy-loading*.
- **Tablet (640px - 1024px):**
  - Catálogo em grade de 2 colunas.
  - Passos da adoção e depoimentos distribuídos em 2 colunas.
  - Formulário com campos duplos em linha (*form-row*).
- **Desktop (> 1024px):**
  - Barra de navegação fixa com efeito *glassmorphism* (blur) e botões de ação rápida.
  - Banner hero amplo com cartões flutuantes e estatísticas de resgate.
  - Filtros dinâmicos em barra horizontal integrada.
  - Catálogo em grade de 3 a 4 colunas.
  - Rodapé completo em 4 colunas com links, dados de contato e inscrição na newsletter.

---

## 🏷️ HTML5 Semântico & Acessibilidade

O projeto segue rigorosamente as boas práticas de HTML semântico e WCAG:
- `<header role="banner">` com link invisível acessível (`.skip-link`) para saltar ao conteúdo principal via teclado.
- `<nav role="navigation">` com atributos ARIA (`aria-label`, `aria-expanded`).
- `<main id="conteudo-principal">` agrupando as seções lógicas da aplicação.
- `<section>` com títulos associados (`aria-labelledby`).
- `<article>` para cada card de animal e depoimento.
- `<figure>` e `<figcaption>` / `alt` descritivos em todas as fotos de animais.
- `<dialog role="dialog" aria-modal="true">` para a visualização de detalhes e para o formulário.
- `<form>`, `<fieldset>`, `<legend>`, `<label htmlFor="...">` para estrutura de formulário semântica.
- `<details>` e `<summary>` para o acordeão nativo de Perguntas Frequentes (FAQ).
- `<address>` para localização e contatos da ONG.
- `<footer role="contentinfo">` com dados cadastrais e links de rodapé.

---

## ✨ Funcionalidades Interativas (React)

1. **Filtros e Busca em Tempo Real:**
   - Busca textual por nome, raça ou temperamento do pet.
   - Filtro por espécie (Cachorros / Gatos).
   - Filtro por porte (Pequeno, Médio, Grande).
   - Filtro por sexo (Macho / Fêmea).
   - Filtro por faixa etária (Filhotes, Adultos, Idosos).
   - Botão para limpar filtros e contador de resultados encontrados.
2. **Sistema de Favoritos com Persistência:**
   - O usuário pode favoritar pets e a seleção fica salva no `localStorage` do navegador.
3. **Modal de Detalhes do Animal:**
   - Exibe prontuário veterinário completo (castrado, vacinado, vermifugado, microchipado).
   - Mostra histórico de resgate e traços de personalidade.
4. **Formulário de Proposta de Adoção:**
   - Validação de campos, regras de posse responsável e feedback de envio.
5. **Seção de Doações com PIX Instantâneo:**
   - Botão de "Copiar Chave PIX" com confirmação visual e QR Code.
6. **Sistema de Notificações Toast:**
   - Mensagens flutuantes suaves para favoritos, cópia de chave e envio de formulário.

---

## 📂 Estrutura de Arquivos

```
Ong-adota-pet/
├── index.html                
├── package.json               
├── vite.config.js             
├── .gitignore
├── README.md
├── src/
│   ├── main.jsx              
│   ├── App.jsx                 
│   ├── index.css               
│   ├── data/
│   │   └── pets.js             
│   └── components/
│       ├── Header.jsx          
│       ├── Hero.jsx           
│       ├── PetFilters.jsx    
│       ├── PetCard.jsx         
│       ├── PetGrid.jsx         
│       ├── PetModal.jsx        
│       ├── AdoptionFormModal.jsx 
│       ├── HowItWorks.jsx      
│       ├── StoriesSection.jsx  
│       ├── DonationSection.jsx 
│       ├── FaqSection.jsx      
│       ├── Footer.jsx          
│       └── Toast.jsx          
```
