# 🚀 Início Rápido - Sistema Excursão

## ✅ Repositório Criado com Sucesso!

**URL do Repositório:** https://github.com/thiago2515df/excursao

---

## 📦 O que foi feito

✅ **Código organizado e corrigido**
- Sistema de upload de imagens funcionando com storage local
- Correção de erros de banco de dados (campos TEXT → MEDIUMTEXT para suportar múltiplas fotos)
- Configuração completa para deploy no Railway

✅ **Repositório GitHub criado**
- Nome: `excursao`
- Visibilidade: Público
- Código completo commitado e enviado

✅ **Documentação completa**
- README.md com instruções detalhadas
- DEPLOY_RAILWAY.md com guia passo a passo
- .env.example com variáveis de ambiente necessárias

---

## 🚢 Próximos Passos: Deploy no Railway

### Opção 1: Deploy Automático (Mais Fácil)

1. **Acesse o Railway**
   - Vá para: https://railway.app
   - Faça login com sua conta GitHub

2. **Crie Novo Projeto**
   - Clique em "New Project"
   - Selecione "Deploy from GitHub repo"
   - Escolha o repositório `excursao`

3. **Configure Variáveis de Ambiente**
   
   No painel do Railway, adicione estas variáveis:
   
   ```
   PORT=3000
   NODE_ENV=production
   PUBLIC_URL=https://sua-url.railway.app
   JWT_SECRET=<gere-uma-chave-forte>
   ```
   
   **Para gerar JWT_SECRET:**
   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```

4. **Aguarde o Deploy**
   - Railway fará build e deploy automaticamente
   - Você receberá uma URL pública (ex: `https://excursao-production.up.railway.app`)

5. **Atualize PUBLIC_URL**
   - Copie a URL fornecida pelo Railway
   - Volte em "Variables" e atualize `PUBLIC_URL` com a URL real
   - Salve e aguarde redeploy automático

6. **Pronto!** 🎉
   - Acesse a URL e teste o sistema

---

### Opção 2: Deploy via CLI

```bash
# Instalar Railway CLI
npm install -g @railway/cli

# Login
railway login

# Clonar repositório
git clone https://github.com/thiago2515df/excursao.git
cd excursao

# Inicializar projeto Railway
railway init

# Configurar variáveis
railway variables set PORT=3000
railway variables set NODE_ENV=production
railway variables set JWT_SECRET=$(node -e "console.log(require('crypto').randomBytes(32).toString('hex'))")

# Deploy
railway up

# Obter URL
railway domain

# Atualizar PUBLIC_URL com a URL fornecida
railway variables set PUBLIC_URL=https://sua-url.railway.app

# Redeploy
railway up
```

---

## 🔍 Verificações Importantes

### ✅ Checklist Pré-Deploy

- [x] Repositório criado no GitHub
- [x] Código completo commitado
- [x] .gitignore configurado
- [x] railway.json presente
- [x] nixpacks.toml presente
- [x] README.md completo
- [x] Sistema de storage local implementado
- [x] Correções de banco de dados aplicadas

### ✅ Checklist Pós-Deploy

- [ ] Variáveis de ambiente configuradas
- [ ] PUBLIC_URL atualizado com URL real
- [ ] Sistema acessível via URL
- [ ] Upload de fotos funcionando
- [ ] Imagens aparecem corretamente
- [ ] Propostas sendo salvas no banco

---

## 🐛 Problemas Comuns e Soluções

### Imagens não aparecem

**Causa:** PUBLIC_URL não configurado ou incorreto

**Solução:**
```bash
railway variables set PUBLIC_URL=https://sua-url-correta.railway.app
```

### Build falhou

**Causa:** Dependências não instaladas

**Solução:** Verifique os logs no Railway e certifique-se de que `nixpacks.toml` está correto

### Erro 502

**Causa:** Aplicação não rodando na porta correta

**Solução:** Verifique se `PORT=3000` está configurado nas variáveis de ambiente

---

## 📚 Documentação Completa

Para informações detalhadas, consulte:

- **README.md** - Visão geral do projeto e instalação local
- **DEPLOY_RAILWAY.md** - Guia completo de deploy no Railway
- **.env.example** - Exemplo de variáveis de ambiente

---

## 🎯 Funcionalidades do Sistema

- ✅ Criação de propostas de viagem personalizadas
- ✅ Upload de foto de capa (sem limite de tamanho)
- ✅ Upload de múltiplas fotos do hotel
- ✅ Cálculo automático de valores e parcelas
- ✅ Compartilhamento de propostas com clientes
- ✅ Painel administrativo
- ✅ Design responsivo

---

## 💡 Dicas

1. **Backup do Banco de Dados**
   - O SQLite está no diretório `data/`
   - Faça backup regularmente do arquivo `proposta-viagem.db`

2. **Domínio Personalizado**
   - Configure no painel do Railway em "Settings" → "Domains"

3. **Monitoramento**
   - Use `railway logs` para ver logs em tempo real
   - Monitore uso de recursos no painel do Railway

4. **Custos**
   - Railway oferece $5 de crédito gratuito por mês
   - Suficiente para aplicações pequenas/médias

---

## 📞 Suporte

- **Documentação Railway:** https://docs.railway.app
- **Discord Railway:** https://discord.gg/railway
- **Repositório:** https://github.com/thiago2515df/excursao

---

## 🎉 Tudo Pronto!

Seu sistema está pronto para ser deployado no Railway. Siga os passos acima e em poucos minutos você terá sua aplicação rodando em produção!

**Boa sorte!** 🚀
