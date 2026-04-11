"""
Seed script – populates the Django database with the default IFPMEB configuration.
Run: python manage.py shell < seed.py
"""
import os, django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'ifpmeb_backend.settings')
django.setup()

from core.models import SiteSettings, StatItem, Formation, AcademicEvent, GalleryImage, Testimonial

# ---- Get or create the singleton config ----
config, created = SiteSettings.objects.get_or_create(pk=1)

config.site_name     = "IFPMEB"
config.tagline       = "Une formation d'excellence pour votre avenir professionnel"
config.description   = "Institut de Formation Spécialisé au Togo, proposant des filières certifiantes en Banque, Finance et Gestion."
config.whatsapp_number = "+228 90 00 00 00"
config.primary_color   = "#1d3557"
config.secondary_color = "#ffb703"
config.accent_color    = "#457b9d"
config.background_color = "#ffffff"
config.text_color       = "#1d3557"
config.email    = "admission@ifpmeb.tg"
config.phone    = "+228 22 21 00 00"
config.address  = "Quartier Administratif"
config.city     = "Lomé"
config.country  = "Togo"
config.socials  = {
    "facebook": "https://facebook.com/ifpmeb",
    "instagram": "",
    "twitter":   "",
    "youtube":   "",
    "linkedin":  ""
}
config.hero_content = {
    "eyebrow":  "Bienvenue à l'IFPMEB",
    "title":    "Une formation d'excellence pour votre avenir professionnel",
    "subtitle": "Découvrez nos programmes certifiants et donnez un élan décisif à votre carrière.",
    "backgroundImage": ""
}
config.enabled_sections = {
    "hero": True, "stats": True, "formations": True,
    "events": True, "gallery": True, "testimonials": True, "contact": True
}
config.save()
print(f"✅ SiteSettings {'créé' if created else 'mis à jour'}")

# ---- Stats ----
StatItem.objects.filter(settings=config).delete()
stats = [
    ("s1", "95%",    "Taux de réussite",        "🎓"),
    ("s2", "500+",   "Étudiants formés",         "👨‍🎓"),
    ("s3", "15",     "Formations certifiantes",  "📋"),
    ("s4", "10 ans", "D'expérience",             "📅"),
]
for i, (fid, val, lbl, icon) in enumerate(stats):
    StatItem.objects.create(settings=config, frontend_id=fid, value=val, label=lbl, icon=icon, order=i)
print(f"✅ {len(stats)} Statistiques créées")

# ---- Formations ----
Formation.objects.filter(settings=config).delete()
formations = [
    dict(frontend_id="f1", title="Gestion de Banque",
         description="Formation complète aux métiers de la banque et du crédit.",
         duration="2 ans", level="BAC+2 (BTS)", domain="Banque & Finance",
         price="450 000 FCFA",
         features=["Stage garanti", "Logiciel bancaire", "Anglais des affaires"]),
    dict(frontend_id="f2", title="Comptabilité Gestion",
         description="Maîtrisez les outils comptables et la gestion d'entreprise.",
         duration="2 ans", level="BAC+2 (BTS)", domain="Gestion",
         price="400 000 FCFA",
         features=["Logiciel SAGE", "Fiscalité appliquée"]),
    dict(frontend_id="f3", title="Marketing & Commerce",
         description="Devenez expert en stratégie commerciale et marketing digital.",
         duration="2 ans", level="BAC+2 (BTS)", domain="Commerce",
         price="420 000 FCFA",
         features=["CRM en pratique", "Communication digitale"]),
]
for i, f in enumerate(formations):
    Formation.objects.create(settings=config, order=i, **f)
print(f"✅ {len(formations)} Formations créées")

# ---- Events ----
AcademicEvent.objects.filter(settings=config).delete()
events = [
    dict(frontend_id="e1", title="Journée Portes Ouvertes",
         date="15 Oct 2026", event_type="Événement",
         location="Campus IFPMEB Lomé",
         description="Venez découvrir nos locaux et échanger avec nos professeurs."),
    dict(frontend_id="e2", title="Concours d'Entrée BTS",
         date="05 Nov 2026", event_type="Concours",
         location="Campus IFPMEB Lomé",
         description="Inscrivez-vous au concours d'entrée pour la rentrée 2027."),
]
for i, e in enumerate(events):
    AcademicEvent.objects.create(settings=config, order=i, **e)
print(f"✅ {len(events)} Événements créés")

# ---- Testimonials ----
Testimonial.objects.filter(settings=config).delete()
testimonials = [
    dict(frontend_id="t1", name="Améyo K.", role="Diplômée BTS Banque 2024",
         content="Une formation rigoureuse qui m'a permis de trouver un emploi dès la fin de mon stage.",
         rating=5),
    dict(frontend_id="t2", name="Koffi A.", role="Diplômé BTS Comptabilité 2023",
         content="L'équipe pédagogique est disponible et les cours sont orientés pratique. Je recommande vivement.",
         rating=5),
]
for i, t in enumerate(testimonials):
    Testimonial.objects.create(settings=config, order=i, **t)
print(f"✅ {len(testimonials)} Témoignages créés")

print("\n🚀 Base de données initialisée avec succès !")
