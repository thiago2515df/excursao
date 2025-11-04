# Guia de Deploy no Railway

Este guia explica como fazer deploy do Sistema de Propostas de Viagem no Railway.

## 📋 Pré-requisitos

1. Conta no [Railway](https://railway.app) (gratuita)
2. Conta no GitHub
3. Repositório do projeto no GitHub

## 🚀 Método 1: Deploy via Interface Web (Recomendado)

### Passo 1: Preparar o Repositório

1. Certifique-se de que o código está no GitHub
2. Verifique se o arquivo `railway.json` está presente na raiz
3. Verifique se o arquivo `nixpacks.toml` está presente na raiz

### Passo 2: Criar Projeto no Railway

1. Acesse [Railway](https://railway.app)
2. Faça login com sua conta GitHub
3. Clique em **"New Project"**
4. Selecione **"Deploy from GitHub repo"**
5. Escolha o repositório `excursao`
6. Railway começará o deploy automaticamente

### Passo 3: Configurar Variáveis de Ambiente

1. No painel do Railway, clique no seu projeto
2. Vá para a aba **"Variables"**
3. Adicione as seguintes variáveis:

```
PORT=3000
NODE_ENV=production
JWT_SECRET=<gere-uma-chave-forte>
PUBLIC_URL=<será-preenchido-depois>
```

**Para gerar JWT_SECRET:**

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Passo 4: Obter URL Pública

1. Após o deploy, Railway fornecerá uma URL pública
2. Exemplo: `https://excursao-production.up.railway.app`
3. Copie esta URL

### Passo 5: Atualizar PUBLIC_URL

1. Volte para **"Variables"**
2. Edite a variável `PUBLIC_URL`
3. Cole a URL fornecida pelo Railway
4. Exemplo: `PUBLIC_URL=https://excursao-production.up.railway.app`
5. Salve

### Passo 6: Redeploy (se necessário)

Se o sistema não reiniciar automaticamente:

1. Vá para a aba **"Deployments"**
2. Clique em **"Redeploy"**

### Passo 7: Testar

1. Acesse a URL fornecida pelo Railway
2. Teste a criação de uma proposta
3. Teste o upload de fotos
4. Verifique se as imagens aparecem corretamente

## 🚀 Método 2: Deploy via Railway CLI

### Passo 1: Instalar Railway CLI

```bash
npm install -g @railway/cli
```

### Passo 2: Login

```bash
railway login
```

Isso abrirá o navegador para autenticação.

### Passo 3: Inicializar Projeto

```bash
cd excursao
railway init
```

Escolha **"Create a new project"** e dê um nome (ex: `excursao`).

### Passo 4: Configurar Variáveis de Ambiente

```bash
# Gerar JWT_SECRET
JWT_SECRET=$(node -e "console.log(require('crypto').randomBytes(32).toString('hex'))")

# Configurar variáveis
railway variables set PORT=3000
railway variables set NODE_ENV=production
railway variables set JWT_SECRET=$JWT_SECRET
```

### Passo 5: Deploy

```bash
railway up
```

Aguarde o build e deploy completarem.

### Passo 6: Obter URL

```bash
railway domain
```

Isso mostrará a URL pública do seu projeto.

### Passo 7: Atualizar PUBLIC_URL

```bash
railway variables set PUBLIC_URL=https://sua-url.railway.app
```

Substitua pela URL real fornecida.

### Passo 8: Redeploy

```bash
railway up
```

## 🔧 Configurações Avançadas

### Domínio Personalizado

1. No painel do Railway, vá para **"Settings"**
2. Clique em **"Domains"**
3. Clique em **"Add Custom Domain"**
4. Siga as instruções para configurar seu domínio

Depois, atualize a variável `PUBLIC_URL`:

```bash
railway variables set PUBLIC_URL=https://seu-dominio.com
```

### Aumentar Recursos

Por padrão, Railway fornece:
- 512MB RAM
- 1 vCPU
- 1GB storage

Para aumentar (plano pago):
1. Vá para **"Settings"** → **"Resources"**
2. Ajuste conforme necessário

### Logs

Ver logs em tempo real:

```bash
railway logs
```

Ou no painel web: **"Deployments"** → Clique no deployment → **"Logs"**

### Banco de Dados

O SQLite está incluído no projeto e funcionará automaticamente. Os dados são persistidos no volume do Railway.

**⚠️ IMPORTANTE:** Faça backup regular do banco de dados!

Para fazer backup:

```bash
# Via Railway CLI
railway run sqlite3 data/proposta-viagem.db .dump > backup.sql
```

## 📊 Monitoramento

### Verificar Status

```bash
railway status
```

### Verificar Uso de Recursos

No painel web:
1. Vá para **"Metrics"**
2. Veja CPU, RAM, Network

### Alertas

Configure alertas no painel:
1. **"Settings"** → **"Notifications"**
2. Configure alertas por email ou webhook

## 🐛 Solução de Problemas

### Build Falhou

**Erro comum:** `pnpm: command not found`

**Solução:** Verifique se `nixpacks.toml` está configurado corretamente.

### Aplicação não inicia

**Verifique logs:**

```bash
railway logs
```

**Causas comuns:**
- Variável `PORT` não configurada
- Erro no build
- Dependências faltando

### Imagens não aparecem

**Causa:** `PUBLIC_URL` não configurado ou incorreto

**Solução:**

```bash
railway variables set PUBLIC_URL=https://sua-url-correta.railway.app
railway up
```

### Erro 502 Bad Gateway

**Causa:** Aplicação não está rodando na porta correta

**Solução:** Verifique se a variável `PORT` está configurada como `3000`

### Banco de dados vazio após deploy

**Causa:** Railway criou novo volume

**Solução:** Importe dados do backup:

```bash
railway run sqlite3 data/proposta-viagem.db < backup.sql
```

## 💰 Custos

### Plano Gratuito (Hobby)

- $5 de crédito gratuito por mês
- Suficiente para aplicações pequenas
- Sem cartão de crédito necessário

### Plano Pago (Developer)

- $10/mês + uso
- Mais recursos e créditos inclusos
- Suporte prioritário

### Estimativa de Uso

Para uma aplicação de propostas de viagem com tráfego moderado:
- **CPU:** ~$2-5/mês
- **RAM:** ~$1-3/mês
- **Network:** ~$0-2/mês
- **Total:** ~$3-10/mês

## 🔒 Segurança

### Checklist de Segurança

- ✅ `JWT_SECRET` é uma chave forte e aleatória
- ✅ `NODE_ENV=production` está configurado
- ✅ Variáveis sensíveis não estão no código
- ✅ HTTPS está habilitado (automático no Railway)
- ✅ Backup regular do banco de dados

### Boas Práticas

1. **Nunca commite `.env` no Git**
2. **Use variáveis de ambiente para secrets**
3. **Faça backup do banco regularmente**
4. **Monitore os logs para erros**
5. **Configure alertas de uptime**

## 📞 Suporte

### Documentação Railway

- [Docs Oficiais](https://docs.railway.app)
- [Discord](https://discord.gg/railway)
- [GitHub](https://github.com/railwayapp)

### Problemas do Projeto

- Verifique os logs: `railway logs`
- Consulte o README.md do projeto
- Revise as variáveis de ambiente

## ✅ Checklist de Deploy

- [ ] Código está no GitHub
- [ ] `railway.json` está presente
- [ ] `nixpacks.toml` está presente
- [ ] Projeto criado no Railway
- [ ] Variáveis de ambiente configuradas
- [ ] `PUBLIC_URL` configurado com URL correta
- [ ] Deploy concluído com sucesso
- [ ] Aplicação acessível via URL
- [ ] Upload de fotos funcionando
- [ ] Imagens aparecem corretamente
- [ ] Banco de dados funcionando
- [ ] Backup configurado

## 🎉 Pronto!

Seu sistema de propostas de viagem está agora rodando no Railway!

Próximos passos:
1. Configure um domínio personalizado (opcional)
2. Configure backup automático
3. Monitore uso e performance
4. Compartilhe com seus clientes!

---

**Última atualização:** Novembro 2025
