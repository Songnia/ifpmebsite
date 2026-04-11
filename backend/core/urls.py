from django.urls import path
from .views import SiteConfigView, InscriptionListView, MeView, TrackVisitView

urlpatterns = [
    path('config/', SiteConfigView.as_view(), name='site-config'),
    path('inscriptions/', InscriptionListView.as_view(), name='inscriptions-list'),
    path('auth/me/', MeView.as_view(), name='auth-me'),
    path('track-visit/', TrackVisitView.as_view(), name='track-visit'),
]
