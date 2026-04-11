from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework import generics
from django.db.models import F
from .models import SiteSettings, Inscription
from .serializers import SiteSettingsSerializer, InscriptionSerializer

def get_or_create_config():
    config = SiteSettings.objects.first()
    if not config:
        config = SiteSettings.objects.create()
    return config

class SiteConfigView(APIView):
    def get_permissions(self):
        if self.request.method == 'GET':
            return [AllowAny()]
        return [IsAuthenticated()]

    def get(self, request):
        config = get_or_create_config()
        serializer = SiteSettingsSerializer(config, context={'request': request})
        return Response(serializer.data)

    def patch(self, request):
        config = get_or_create_config()
        serializer = SiteSettingsSerializer(config, data=request.data, partial=True, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)

class InscriptionListView(generics.ListCreateAPIView):
    queryset = Inscription.objects.all()
    serializer_class = InscriptionSerializer

    def get_permissions(self):
        if self.request.method == 'POST':
            return [AllowAny()]
        return [IsAuthenticated()]

class MeView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        return Response({
            "id": user.id,
            "username": user.username,
            "email": user.email,
            "first_name": user.first_name,
            "last_name": user.last_name,
        })

class TrackVisitView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        config = get_or_create_config()
        SiteSettings.objects.filter(pk=config.pk).update(total_visitors=F('total_visitors') + 1)
        config.refresh_from_db()
        return Response({"total_visitors": config.total_visitors})
