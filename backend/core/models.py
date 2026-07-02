from django.db import models
from django.core.exceptions import ValidationError

class SiteSettings(models.Model):
    # Singleton Model ensuring only one config exists
    def save(self, *args, **kwargs):
        if not self.pk and SiteSettings.objects.exists():
            raise ValidationError("There can be only one SiteSettings instance")
        return super().save(*args, **kwargs)

    # Informations
    site_name = models.CharField(max_length=255, default="IFPMEB")
    tagline = models.CharField(max_length=500, blank=True)
    description = models.TextField(blank=True)
    logo = models.ImageField(upload_to="branding/", blank=True, null=True)
    whatsapp_number = models.CharField(max_length=50, blank=True)
    registration_fee = models.CharField(max_length=100, blank=True)
    
    # À Propos Content
    about_description = models.TextField(blank=True)
    history = models.TextField(blank=True)
    mission = models.TextField(blank=True)
    foundation_year = models.CharField(max_length=10, blank=True)
    about_image = models.ImageField(upload_to="about/", blank=True, null=True)

    # Couleurs institutionnelles
    primary_color = models.CharField(max_length=20, default="#1d3557")
    secondary_color = models.CharField(max_length=20, default="#ffb703")
    accent_color = models.CharField(max_length=20, default="#457b9d")
    background_color = models.CharField(max_length=20, default="#ffffff")
    text_color = models.CharField(max_length=20, default="#1d3557")

    # Admin / Contact admission
    email = models.EmailField(blank=True)
    phone = models.CharField(max_length=50, blank=True)
    address = models.CharField(max_length=255, blank=True)
    city = models.CharField(max_length=100, blank=True)
    country = models.CharField(max_length=100, blank=True)

    # Section / Content JSON Fields avoiding heavy schemas for simple values
    socials = models.JSONField(default=dict, blank=True)
    hero_content = models.JSONField(default=dict, blank=True)
    flash_info = models.JSONField(default=dict, blank=True)
    enabled_sections = models.JSONField(default=dict, blank=True)
    total_visitors = models.PositiveIntegerField(default=0)

    def __str__(self):
        return "Global Site Configuration"

class StatItem(models.Model):
    settings = models.ForeignKey(SiteSettings, on_delete=models.CASCADE, related_name="stats")
    frontend_id = models.CharField(max_length=100, blank=True) # Helps frontend reconcile local states
    value = models.CharField(max_length=100)
    label = models.CharField(max_length=255)
    icon = models.CharField(max_length=50, blank=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']

class Formation(models.Model):
    settings = models.ForeignKey(SiteSettings, on_delete=models.CASCADE, related_name="formations")
    frontend_id = models.CharField(max_length=100, blank=True)
    title = models.CharField(max_length=255)
    description = models.TextField() # Now labeled "Présentation" in UI
    objectives = models.TextField(blank=True) # "Objectifs pédagogiques"
    career_prospects = models.TextField(blank=True) # "Débouchés professionnels"
    admission_requirements = models.TextField(blank=True) # "Conditions d'admission / Constitution des dossiers"
    duration = models.CharField(max_length=100)
    level = models.CharField(max_length=100)
    domain = models.CharField(max_length=100)
    price = models.CharField(max_length=100)
    installments = models.JSONField(default=list, blank=True)
    features = models.JSONField(default=list)
    image = models.ImageField(upload_to="formations/", blank=True, null=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']

class AcademicEvent(models.Model):
    settings = models.ForeignKey(SiteSettings, on_delete=models.CASCADE, related_name="events")
    frontend_id = models.CharField(max_length=100, blank=True)
    title = models.CharField(max_length=255)
    date = models.CharField(max_length=100)
    event_type = models.CharField(max_length=100)
    location = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    image = models.ImageField(upload_to="events/", blank=True, null=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']

class GalleryImage(models.Model):
    settings = models.ForeignKey(SiteSettings, on_delete=models.CASCADE, related_name="gallery")
    frontend_id = models.CharField(max_length=100, blank=True)
    image = models.ImageField(upload_to="gallery/")
    category = models.CharField(max_length=100)
    label = models.CharField(max_length=255, blank=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']

class Testimonial(models.Model):
    settings = models.ForeignKey(SiteSettings, on_delete=models.CASCADE, related_name="testimonials")
    frontend_id = models.CharField(max_length=100, blank=True)
    name = models.CharField(max_length=255)
    role = models.CharField(max_length=255)
    content = models.TextField()
    rating = models.IntegerField(default=5)
    avatar = models.ImageField(upload_to="testimonials/", blank=True, null=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']
class ExamResult(models.Model):
    settings = models.ForeignKey(SiteSettings, on_delete=models.CASCADE, related_name="exam_results")
    frontend_id = models.CharField(max_length=100, blank=True)
    year = models.CharField(max_length=10)
    program = models.CharField(max_length=255)
    result_text = models.CharField(max_length=255) # e.g. "145 étudiants admis"
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']

class Inscription(models.Model):
    STATUS_CHOICES = [
        ('En attente', 'En attente'),
        ('Contacté', 'Contacté'),
        ('Inscrit', 'Inscrit'),
    ]

    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=50)
    formation = models.CharField(max_length=255)
    status_type = models.CharField(max_length=100, blank=True) # "Étudiant", "Professionnel", etc.
    message = models.TextField(blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='En attente')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.first_name} {self.last_name} - {self.formation}"
