from rest_framework import serializers
from drf_extra_fields.fields import Base64ImageField
from .models import SiteSettings, StatItem, Formation, AcademicEvent, GalleryImage, Testimonial, ExamResult, Inscription

class StatItemSerializer(serializers.ModelSerializer):
    id = serializers.CharField(source='frontend_id', required=False, allow_blank=True)
    
    class Meta:
        model = StatItem
        fields = ['id', 'value', 'label', 'icon']

class ExamResultSerializer(serializers.ModelSerializer):
    id = serializers.CharField(source='frontend_id', required=False, allow_blank=True)
    
    class Meta:
        model = ExamResult
        fields = ['id', 'year', 'program', 'result_text']

class FormationSerializer(serializers.ModelSerializer):
    id = serializers.CharField(source='frontend_id', required=False, allow_blank=True)
    # Represent image as URL when serializing, decode Base64 when parsing
    image = Base64ImageField(required=False, allow_null=True)
    admission_requirements = serializers.CharField(required=False, allow_blank=True)

    class Meta:
        model = Formation
        fields = ['id', 'title', 'description', 'objectives', 'career_prospects', 'admission_requirements', 'duration', 'level', 'domain', 'price', 'installments', 'features', 'image']

class AcademicEventSerializer(serializers.ModelSerializer):
    id = serializers.CharField(source='frontend_id', required=False, allow_blank=True)
    lieu = serializers.CharField(source='location', required=False, allow_blank=True)
    type = serializers.CharField(source='event_type', required=False, allow_blank=True)
    description = serializers.CharField(required=False, allow_blank=True)
    image = Base64ImageField(required=False, allow_null=True)

    class Meta:
        model = AcademicEvent
        fields = ['id', 'date', 'title', 'type', 'lieu', 'description', 'image']

class GalleryImageSerializer(serializers.ModelSerializer):
    id = serializers.CharField(source='frontend_id', required=False, allow_blank=True)
    url = Base64ImageField(source='image', required=False, allow_null=True)

    class Meta:
        model = GalleryImage
        fields = ['id', 'url', 'category', 'label']

class TestimonialSerializer(serializers.ModelSerializer):
    id = serializers.CharField(source='frontend_id', required=False, allow_blank=True)
    avatar = Base64ImageField(required=False, allow_null=True)

    class Meta:
        model = Testimonial
        fields = ['id', 'name', 'role', 'content', 'rating', 'avatar']

class SiteSettingsSerializer(serializers.ModelSerializer):
    # Base64 Images
    logo = Base64ImageField(required=False, allow_null=True)
    
    # Custom CamelCase naming mappings to match frontend
    siteName = serializers.CharField(source='site_name', required=False)
    whatsappNumber = serializers.CharField(source='whatsapp_number', required=False)
    registrationFee = serializers.CharField(source='registration_fee', required=False, allow_blank=True)
    
    primaryColor = serializers.CharField(source='primary_color', required=False)
    secondaryColor = serializers.CharField(source='secondary_color', required=False)
    accentColor = serializers.CharField(source='accent_color', required=False)
    backgroundColor = serializers.CharField(source='background_color', required=False)
    textColor = serializers.CharField(source='text_color', required=False)
    
    tagline = serializers.CharField(required=False, allow_blank=True)
    description = serializers.CharField(required=False, allow_blank=True)
    email = serializers.EmailField(required=False, allow_blank=True)
    phone = serializers.CharField(required=False, allow_blank=True)
    address = serializers.CharField(required=False, allow_blank=True)
    city = serializers.CharField(required=False, allow_blank=True)
    country = serializers.CharField(required=False, allow_blank=True)

    # A propos
    aboutDescription = serializers.CharField(source='about_description', required=False, allow_blank=True)
    history = serializers.CharField(required=False, allow_blank=True)
    mission = serializers.CharField(required=False, allow_blank=True)
    foundationYear = serializers.CharField(source='foundation_year', required=False, allow_blank=True)
    aboutImage = Base64ImageField(source='about_image', required=False, allow_null=True)

    flashInfo = serializers.JSONField(source='flash_info', required=False)
    hero = serializers.JSONField(source='hero_content', required=False)
    socials = serializers.JSONField(required=False)
    enabledSections = serializers.JSONField(source='enabled_sections', required=False)

    # Nested Lists
    stats = StatItemSerializer(many=True, required=False)
    examResults = ExamResultSerializer(source='exam_results', many=True, required=False)
    formations = FormationSerializer(many=True, required=False)
    events = AcademicEventSerializer(many=True, required=False)
    gallery = GalleryImageSerializer(many=True, required=False)
    testimonials = TestimonialSerializer(many=True, required=False)

    class Meta:
        model = SiteSettings
        fields = [
            'siteName', 'tagline', 'description', 'logo', 'whatsappNumber', 'registrationFee',
            'primaryColor', 'secondaryColor', 'accentColor', 'backgroundColor', 'textColor',
            'email', 'phone', 'address', 'city', 'country',
            'aboutDescription', 'history', 'mission', 'foundationYear', 'aboutImage',
            'socials', 'hero', 'flashInfo', 'enabledSections', 'total_visitors',
            'stats', 'examResults', 'formations', 'events', 'gallery', 'testimonials'
        ]

    # Maps frontend field names to model field names for nested items
    FIELD_MAP = {
        'url': 'image',      # GalleryImage: frontend sends 'url', model has 'image'
        'type': 'event_type', # AcademicEvent: frontend sends 'type', model has 'event_type'
        'lieu': 'location',  # AcademicEvent: frontend sends 'lieu', model has 'location'
    }

    def _sync_nested(self, instance, nested_data, manager, model_class, serializer_class):
        # Keeps the db items in sync with the frontend submitted payload
        if nested_data is None:
            return

        # Pluck out current items
        current_items = {item.frontend_id: item for item in manager.all() if item.frontend_id}
        updated_frontend_ids = []

        for index, item_data in enumerate(nested_data):
            frontend_id = item_data.get('frontend_id') # Serializer maps 'id' -> 'frontend_id'
            if frontend_id and frontend_id in current_items:
                # Update existing
                item = current_items[frontend_id]
                for attr, value in item_data.items():
                    if attr != 'frontend_id':
                        model_attr = self.FIELD_MAP.get(attr, attr)
                        setattr(item, model_attr, value)
                item.order = index
                item.save()
                updated_frontend_ids.append(frontend_id)
            else:
                # Create new — remap field names for model compatibility
                sanitized_data = {}
                for k, v in item_data.items():
                    model_attr = self.FIELD_MAP.get(k, k)
                    sanitized_data[model_attr] = v
                
                sanitized_data['settings'] = instance
                sanitized_data['order'] = index
                model_class.objects.create(**sanitized_data)
                if frontend_id:
                    updated_frontend_ids.append(frontend_id)

        # Delete any items that were removed in the frontend
        manager.exclude(frontend_id__in=updated_frontend_ids).delete()

    def update(self, instance, validated_data):
        # Extract nested collections
        stats_data = validated_data.pop('stats', None)
        exam_results_data = validated_data.pop('exam_results', None)
        formations_data = validated_data.pop('formations', None)
        events_data = validated_data.pop('events', None)
        gallery_data = validated_data.pop('gallery', None)
        testimonials_data = validated_data.pop('testimonials', None)

        # Update base fields
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        # Update nested collections
        self._sync_nested(instance, stats_data, instance.stats, StatItem, StatItemSerializer)
        self._sync_nested(instance, exam_results_data, instance.exam_results, ExamResult, ExamResultSerializer)
        self._sync_nested(instance, formations_data, instance.formations, Formation, FormationSerializer)
        self._sync_nested(instance, events_data, instance.events, AcademicEvent, AcademicEventSerializer)
        self._sync_nested(instance, gallery_data, instance.gallery, GalleryImage, GalleryImageSerializer)
        self._sync_nested(instance, testimonials_data, instance.testimonials, Testimonial, TestimonialSerializer)

        return instance

class InscriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Inscription
        fields = [
            'id', 'first_name', 'last_name', 'email', 'phone', 
            'formation', 'status_type', 'message', 'status', 'created_at'
        ]
        read_only_fields = ['id', 'created_at']
