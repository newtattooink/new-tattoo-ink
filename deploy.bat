@echo off
echo 🔄 Iniciando deploy...

git add .

set /p msg="📦 Escreva a mensagem do commit: "
git commit -m "%msg%"

git push origin main

echo ✅ Deploy enviado para o GitHub. A Vercel já está atualizando seu site!
pause
