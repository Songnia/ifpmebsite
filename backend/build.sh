#!/bin/bash

# Installation des dépendances Python
echo "📦 Installation des dépendances..."
pip install -r requirements.txt

# Application des migrations de la base de données
echo "🗄️ Application des migrations..."
python3.12 manage.py makemigrations --noinput
python3.12 manage.py migrate --noinput

# Collecte des fichiers statiques pour l'admin Django
echo "🎨 Collecte des fichiers statiques..."
python3.12 manage.py collectstatic --noinput --clear

echo "✅ Build terminé avec succès !"
