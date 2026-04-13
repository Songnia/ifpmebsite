# Plan de Test Manuel - Audit Commando XSCHOOL

## Phase 1 : Sécurité & Authentification (La Frontière)
*Objectif : Garantir que l'accès administratif est verrouillé et robuste.*

- [ ] **1.1 Test d'intrusion par URL directe**
    - **Exemple** : Copiez `http://localhost:5173/admin?view=builder`, déconnectez-vous totalement, puis collez l'URL.
    - **Attendu** : Redirection vers Login.
- [ ] **1.2 Test de "Brute Force" simpliste**
    - **Exemple** : Tentez de vous connecter avec `admin` / `123456`.
    - **Attendu** : Message "Identifiants incorrects".
- [ ] **1.3 Test de persistance de session**
    - **Exemple** : Connectez-vous, allez sur "Builder". Fermez le navigateur. Rouvrez sur `/admin`.
    - **Attendu** : Resté sur "Builder" (?view=builder).

### 🚩 Scénarios Alternatifs (Détection d'erreurs)
- [ ] **A1 : Injection de script dans le Login**
    - **Action** : Dans le champ email du login, tapez `<script>alert('hack')</script>@test.com`.
    - **Attendu** : Le système doit soit bloquer l'entrée, soit traiter le texte comme une simple chaîne (pas d'alerte JS).
- [ ] **A2 : Capture de l'erreur réseau (Simulation)**
    - **Action** : Coupez votre connexion internet (ou passez en mode "Offline" dans l'inspecteur F12) et tentez de vous connecter.
    - **Attendu** : Un message d'erreur clair type "Erreur réseau" ou "Impossible de joindre le serveur".

---

## Phase 2 : Site Builder & Design (Le Caméléon)
*Objectif : Valider que le moteur de personnalisation ne perd aucune donnée.*

- [ ] **2.1 Le Test de la "Mémoire Courte" (F5)**
    - **Exemple** : Allez à **Branding**. Changez une couleur. **NE SAUVEGARDEZ PAS**. Appuyez sur **F5**.
    - **Attendu** : Retour à l'étape "Branding".
- [ ] **2.2 Le Test du Contraste "IFPMEB"**
    - **Exemple** : Appliquez le preset "IFPMEB".
    - **Attendu** : Le texte sur le bouton Or #FDB913 doit rester bien lisible.

### 🚩 Scénarios Alternatifs (Détection d'erreurs)
- [ ] **B1 : Valeur Hexadécimale invalide**
    - **Action** : Dans le champ de texte de la couleur primaire, tapez `Z12345` (valeur non hexadécimale).
    - **Attendu** : Le site ne doit pas planter. Idéalement, il ignore la valeur ou revient à la précédente.
- [ ] **B2 : Caractères extrêmes dans le nom du site**
    - **Action** : Mettez un nom de site de 200 caractères ou avec des emojis : `Mon Ecole 🎓 🔥 🚀`.
    - **Attendu** : Vérifiez que l'aperçu du Header ne se casse pas et que le texte passe à la ligne ou se tronque proprement.

---

## Phase 3 : Données & Inscriptions (Le Greffier)
*Objectif : Vérifier l'intégrité des formulaires et des résultats.*

- [ ] **3.1 Test de filtrage "Année Fantôme"**
    - **Exemple** : Cherchez l'année `2020` sur la page Résultats.
    - **Attendu** : Message "Aucun résultat trouvé".
- [ ] **3.2 Test de centrage du bouton (Fix CSS)**
    - **Exemple** : Vérifiez le centrage du bouton Inscription en mode mobile.

### 🚩 Scénarios Alternatifs (Détection d'erreurs)
- [ ] **C1 : Formulaire incomplet**
    - **Action** : Sur la page Inscription, ne remplissez que le nom et tentez de valider.
    - **Attendu** : Le navigateur doit empêcher l'envoi et entourer les champs rouges obligatoires.
- [ ] **C2 : Doubles clics frénétiques**
    - **Action** : Cliquez 5 fois très vite sur le bouton "S'inscrire".
    - **Attendu** : Une seule inscription doit être envoyée (le bouton doit devenir gris/désactivé après le 1er clic).

---

## Phase 4 : Parcours Utilisateur (L'Explorateur)
*Objectif : Fluidité de la navigation.*

- [ ] **4.1 Test de la "Téléportation" vers le haut**
    - **Exemple** : Footer -> "À Propos".
    - **Attendu** : Arrivée en haut de page.

### 🚩 Scénarios Alternatifs (Détection d'erreurs)
- [ ] **D1 : Bouton "Précédent" du navigateur**
    - **Action** : Naviguez : Accueil -> Inscription -> Résultats. Utilisez le bouton "Précédent" de votre souris ou navigateur.
    - **Attendu** : Retour fluide à la page Inscription sans erreur de chargement.
- [ ] **D2 : Lien Mort (404)**
    - **Action** : Tapez manuellement une URL qui n'existe pas : `[site]/page-qui-n-existe-pas`.
    - **Attendu** : Affichage de votre page 404 personnalisée avec un bouton "Retour à l'accueil".

---

## Phase 5 : Mobile First (La Poche)

### 🚩 Scénarios Alternatifs (Détection d'erreurs)
---

## Phase 6 : Stress Tests & Limites du Système (Expert)
*Objectif : Vérifier la robustesse face aux données massives et aux restrictions de plan.*

- [ ] **6.1 Le Test des "Limites de Plan"**
    - **Exemple** : Si votre offre actuelle limite le portfolio à 10 photos, essayez d'en ajouter une 11ème.
    - **Attendu** : Une fenêtre d'alerte (UpgradeDialog) doit apparaître bloquant l'action.
- [ ] **6.2 Le Test de la "Crainte de l'Oubli" (Dirty State)**
    - **Exemple** : Dans le Builder, tapez un seul caractère dans un champ. Vérifiez si le bouton "Sauvegarder" s'allume. Supprimez ce caractère.
    - **Attendu** : Le bouton "Sauvegarder" doit s'éteindre à nouveau (le système comprend que le contenu est identique à l'original).
- [ ] **6.3 Le Test de Suppression Cascade**
    - **Exemple** : Créez une catégorie "Test" dans le Portfolio, ajoutez-y 2 photos. Supprimez la catégorie "Test".
    - **Attendu** : Vérifiez que les photos ne font pas planter le site (soit elles disparaissent, soit elles restent mais sont "orphelines" proprement).

### 🚩 Scénarios Alternatifs (Détection d'erreurs)
- [ ] **F1 : Le Buffet de Données (Stress Test)**
    - **Action** : Copiez-collez un texte de 50 pages dans un champ "Description de formation".
    - **Attendu** : Le site ne doit pas "freezer" (geler). La mise en page doit rester stable sans déborder du cadre.
- [ ] **F2 : Upload d'un format corrompu**
    - **Action** : Essayez de charger un fichier `.txt` renommé en `.jpg` dans le portfolio.
    - **Attendu** : Le système doit renvoyer une erreur de format ou refuser l'ajout sans crash.
- [ ] **F3 : Conflit de dialogue**
    - **Action** : Ouvrez un menu de sélection (ex: Catégorie), et sans le fermer, cliquez sur "Ajouter" pour ouvrir une fenêtre modale par-dessus.
    - **Attendu** : Le premier menu doit se fermer proprement sans bloquer l'écran.