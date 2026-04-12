#!/bin/bash

# Mise à jour de pip et installation des dépendances avec python3.12
echo "📦 Installation des dépendances avec python3.12..."
python3.12 -m pip install --upgrade pip
python3.12 -m pip install -r requirements.txt

# Application des migrations
echo "🗄️ Application des migrations..."
python3.12 manage.py makemigrations --noinput
python3.12 manage.py migrate --noinput

# Collecte des fichiers statiques
echo "🎨 Collecte des fichiers statiques..."
python3.12 manage.py collectstatic --noinput --clear

# Créer un dossier staticfiles pour satisfaire Vercel
mkdir -p staticfiles

echo "✅ Build terminé avec succès !"
