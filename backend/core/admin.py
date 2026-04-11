from django.contrib import admin
from .models import SiteSettings, Formation, AcademicEvent, StatItem, GalleryImage, Testimonial

@admin.register(SiteSettings)
class SiteSettingsAdmin(admin.ModelAdmin):
    list_display = ['site_name', 'email', 'city', 'country']

@admin.register(Formation)
class FormationAdmin(admin.ModelAdmin):
    list_display = ['title', 'level', 'domain', 'price', 'order']
    list_editable = ['order']

@admin.register(AcademicEvent)
class AcademicEventAdmin(admin.ModelAdmin):
    list_display = ['title', 'date', 'event_type', 'location']

@admin.register(StatItem)
class StatItemAdmin(admin.ModelAdmin):
    list_display = ['label', 'value', 'icon', 'order']
    list_editable = ['order']

@admin.register(GalleryImage)
class GalleryImageAdmin(admin.ModelAdmin):
    list_display = ['label', 'category', 'order']

@admin.register(Testimonial)
class TestimonialAdmin(admin.ModelAdmin):
    list_display = ['name', 'role', 'rating', 'order']
