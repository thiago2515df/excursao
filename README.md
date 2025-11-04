# Sistema de Propostas de Viagem - Excursão

Sistema completo para criação e gerenciamento de propostas de viagem personalizadas, desenvolvido com React, TypeScript, Node.js e SQLite.

## 🚀 Funcionalidades

- ✅ Criação de propostas de viagem personalizadas
- ✅ Upload de foto de capa (sem limite de tamanho)
- ✅ Upload de múltiplas fotos do hotel
- ✅ Cálculo automático de valores e parcelas
- ✅ Compartilhamento de propostas com clientes
- ✅ Painel administrativo completo
- ✅ Sistema de autenticação
- ✅ Banco de dados SQLite (sem necessidade de servidor externo)
- ✅ Armazenamento local de imagens
- ✅ Design responsivo (mobile e desktop)

## 🛠️ Tecnologias

### Frontend
- **React 19** - Framework UI
- **TypeScript** - Tipagem estática
- **Vite** - Build tool
- **TailwindCSS** - Estilização
- **tRPC** - Type-safe API
- **React Query** - Gerenciamento de estado

### Backend
- **Node.js** - Runtime
- **Express** - Framework web
- **tRPC** - API type-safe
- **Drizzle ORM** - ORM para SQLite
- **SQLite** - Banco de dados

## 📋 Pré-requisitos

- Node.js 18 ou superior
- pnpm (gerenciador de pacotes)

## 🔧 Instalação Local

### 1. Clonar o repositório

```bash
git clone https://github.com/seu-usuario/excursao.git
cd excursao
```

### 2. Instalar dependências

```bash
pnpm install
```

### 3. Configurar variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
# Porta do servidor
PORT=3000

# URL pública (para desenvolvimento local)
PUBLIC_URL=http://localhost:3000

# Chave secreta JWT (gere uma chave forte)
JWT_SECRET=sua-chave-secreta-aqui

# Ambiente
NODE_ENV=development
```

### 4. Iniciar em modo desenvolvimento

```bash
pnpm dev
```

O sistema estará disponível em `http://localhost:3000`

## 🚢 Deploy no Railway

### Opção 1: Deploy via GitHub (Recomendado)

1. Faça push do código para o GitHub
2. Acesse [Railway](https://railway.app)
3. Clique em "New Project" → "Deploy from GitHub repo"
4. Selecione o repositório `excursao`
5. Configure as variáveis de ambiente:
   - `PORT`: 3000
   - `PUBLIC_URL`: URL fornecida pelo Railway (ex: `https://excursao-production.up.railway.app`)
   - `JWT_SECRET`: Gere uma chave forte
   - `NODE_ENV`: production

6. Railway detectará automaticamente o `package.json` e fará o deploy

### Opção 2: Deploy via Railway CLI

```bash
# Instalar Railway CLI
npm install -g @railway/cli

# Login
railway login

# Criar novo projeto
railway init

# Deploy
railway up

# Configurar variáveis de ambiente
railway variables set PUBLIC_URL=https://seu-dominio.railway.app
railway variables set JWT_SECRET=sua-chave-secreta
railway variables set NODE_ENV=production
```

### Configuração do Railway

O Railway executará automaticamente:

```bash
# Build
pnpm install
pnpm build

# Start
pnpm start
```

## 📁 Estrutura do Projeto

```
excursao/
├── client/                    # Frontend React + TypeScript
│   ├── src/
│   │   ├── components/        # Componentes React
│   │   ├── pages/             # Páginas da aplicação
│   │   ├── hooks/             # Custom hooks
│   │   └── lib/               # Utilitários
│   └── public/                # Arquivos públicos
│
├── server/                    # Backend Node.js + Express
│   ├── _core/                 # Funcionalidades core
│   │   ├── index.ts           # Servidor Express
│   │   ├── trpc.ts            # Configuração tRPC
│   │   └── ...
│   ├── routers.ts             # Rotas da API
│   ├── db.sqlite.ts           # Funções do banco de dados
│   └── storage-local.ts       # Sistema de armazenamento local
│
├── drizzle/                   # Schema e migrações do banco
│   ├── schema.sqlite.ts       # Definição das tabelas
│   └── migrations/            # Migrações SQL
│
├── data/                      # Banco de dados SQLite
│   └── proposta-viagem.db     # Arquivo do banco de dados
│
├── storage/                   # Arquivos enviados (fotos)
│   └── proposals/             # Fotos das propostas
│
├── package.json               # Dependências do projeto
├── tsconfig.json              # Configuração TypeScript
├── vite.config.ts             # Configuração Vite
└── drizzle.config.sqlite.ts   # Configuração Drizzle ORM
```

## 💻 Scripts Disponíveis

```bash
# Desenvolvimento
pnpm dev              # Inicia servidor de desenvolvimento

# Build
pnpm build            # Compila frontend e backend para produção

# Produção
pnpm start            # Inicia servidor em modo produção

# Utilitários
pnpm check            # Verifica tipos TypeScript
pnpm format           # Formata código com Prettier
pnpm db:push          # Gera e aplica migrações do banco
```

## 🔒 Segurança

### Gerar JWT_SECRET

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Recomendações

1. **Sempre use HTTPS em produção**
2. **Gere uma chave JWT_SECRET forte e única**
3. **Faça backup regular do banco de dados**
4. **Não commite o arquivo `.env` no Git**

## 📊 Banco de Dados

O sistema usa **SQLite** como banco de dados, que é armazenado localmente no arquivo `data/proposta-viagem.db`.

### Backup

```bash
# Criar backup
cp data/proposta-viagem.db data/proposta-viagem.db.backup

# Restaurar backup
cp data/proposta-viagem.db.backup data/proposta-viagem.db
```

### Migrações

O sistema usa **Drizzle ORM** para gerenciar o schema do banco de dados.

```bash
# Gerar e aplicar migrações
pnpm db:push
```

## 📸 Sistema de Upload de Imagens

O sistema usa **armazenamento local** para salvar imagens:

- **Foto de capa**: Salva em `storage/proposals/{userId}/`
- **Fotos do hotel**: Múltiplas fotos salvas no mesmo diretório
- **Limite de tamanho**: 500MB por arquivo
- **Formatos suportados**: JPG, PNG, GIF, WebP

### Estrutura de Storage

```
storage/
└── proposals/
    └── 1/
        ├── 1234567890-foto1.jpg
        ├── 1234567891-foto2.jpg
        └── ...
```

## 🐛 Solução de Problemas

### Erro: "Cannot find module"

```bash
pnpm install
```

### Erro: "Port already in use"

Altere a porta no arquivo `.env`:

```env
PORT=3001
```

### Imagens não aparecem

Verifique se a variável `PUBLIC_URL` está configurada corretamente no `.env`:

```env
PUBLIC_URL=https://seu-dominio.railway.app
```

### Erro de permissão em arquivos

```bash
chmod -R 755 .
chmod -R 777 storage/ data/
```

## 📝 Variáveis de Ambiente

| Variável | Descrição | Exemplo |
|----------|-----------|---------|
| `PORT` | Porta do servidor | `3000` |
| `PUBLIC_URL` | URL pública da aplicação | `https://excursao.railway.app` |
| `JWT_SECRET` | Chave secreta para JWT | `abc123...` |
| `NODE_ENV` | Ambiente de execução | `production` ou `development` |

## 🚀 Próximos Passos

Após o deploy:

1. ✅ Acesse a URL fornecida pelo Railway
2. ✅ Teste a criação de uma proposta
3. ✅ Faça upload de fotos
4. ✅ Compartilhe a proposta com um cliente
5. ✅ Configure um domínio personalizado (opcional)

## 📞 Suporte

Para problemas ou dúvidas:

1. Verifique a documentação incluída no projeto
2. Consulte os logs do Railway: `railway logs`
3. Verifique os arquivos de documentação na pasta raiz

## 📄 Licença

MIT

## 🎉 Créditos

Desenvolvido com ❤️ para facilitar a criação de propostas de viagem personalizadas.

---

**Versão**: 1.0.0  
**Data**: Novembro 2025
