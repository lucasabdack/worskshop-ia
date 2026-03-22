# Guia de Deploy — Help App

Siga os passos nesta ordem. Cada serviço depende do anterior.

---

## 1. Neon (banco de dados)

1. Acesse [console.neon.tech](https://console.neon.tech) e crie uma conta
2. Clique em **New Project** → nomeie `helpdb` → escolha a região mais próxima (ex: `AWS us-east-2`)
3. No painel do projeto, vá em **Connection Details**
   - Copie a **Connection string (pooled)** → cole em `DATABASE_URL`
   - Copie a **Direct connection** → cole em `DATABASE_URL_UNPOOLED`
4. Crie o arquivo `.env` na raiz do projeto:

```bash
cp .env.example .env
# edite .env e preencha DATABASE_URL e DATABASE_URL_UNPOOLED
```

5. Gere o Prisma client e aplique as migrations:

```bash
npx prisma generate
npx prisma migrate deploy
```

> Se for a primeira vez, use `npx prisma migrate dev --name init` para criar o arquivo de migration.

---

## 2. Google OAuth

1. Acesse [console.cloud.google.com](https://console.cloud.google.com)
2. Crie um projeto (ou selecione um existente)
3. Vá em **APIs & Services → Credentials → Create Credentials → OAuth 2.0 Client ID**
4. Tipo: **Web application**
5. Em **Authorized redirect URIs** adicione:
   - `http://localhost:3000/api/auth/callback/google` (desenvolvimento)
   - `https://SEU-DOMINIO.vercel.app/api/auth/callback/google` (produção — preencher após o deploy)
6. Copie `Client ID` → `GOOGLE_CLIENT_ID`
7. Copie `Client Secret` → `GOOGLE_CLIENT_SECRET`

---

## 3. NEXTAUTH_SECRET

Gere uma chave segura:

```bash
openssl rand -base64 32
```

Cole o resultado em `NEXTAUTH_SECRET` no `.env`.

---

## 4. Testar localmente

```bash
npm run dev
```

Acesse `http://localhost:3000` — deve redirecionar para `/login`.

---

## 5. Vercel (deploy)

### 5a. Importar repositório

1. Acesse [vercel.com/new](https://vercel.com/new)
2. Conecte sua conta GitHub e importe o repositório `worskshop-ia`
3. Framework: **Next.js** (detectado automaticamente)
4. Clique em **Deploy** (vai falhar na primeira vez — normal, faltam as env vars)

### 5b. Configurar variáveis de ambiente

No painel do projeto na Vercel, vá em **Settings → Environment Variables** e adicione:

| Variável | Valor |
|---|---|
| `DATABASE_URL` | Connection string pooled do Neon |
| `DATABASE_URL_UNPOOLED` | Direct connection do Neon |
| `NEXTAUTH_SECRET` | Chave gerada com `openssl rand -base64 32` |
| `NEXTAUTH_URL` | `https://SEU-DOMINIO.vercel.app` |
| `GOOGLE_CLIENT_ID` | ID do Google Cloud Console |
| `GOOGLE_CLIENT_SECRET` | Secret do Google Cloud Console |

### 5c. Re-deploy

Após salvar as variáveis:
- Vá em **Deployments → ⋯ → Redeploy**

### 5d. Atualizar redirect URI do Google

Volte no Google Cloud Console e adicione o domínio Vercel real em **Authorized redirect URIs**:
```
https://SEU-DOMINIO.vercel.app/api/auth/callback/google
```

---

## 6. Migrations em produção

A cada mudança no schema Prisma, rode antes do deploy:

```bash
npx prisma migrate deploy
```

Ou configure no `package.json` para rodar automaticamente no build:

```json
"build": "prisma generate && prisma migrate deploy && next build"
```

---

## Checklist final

- [ ] Neon: projeto criado e `DATABASE_URL` copiada
- [ ] `prisma generate` rodou sem erros
- [ ] `prisma migrate dev --name init` criou a migration
- [ ] `.env` preenchido com todas as variáveis
- [ ] `npm run dev` funciona localmente
- [ ] Google OAuth configurado com redirect URI correto
- [ ] Variáveis adicionadas na Vercel
- [ ] Re-deploy feito e app acessível em produção
- [ ] Redirect URI do Google atualizado com domínio Vercel real
