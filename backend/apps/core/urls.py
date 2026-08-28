from django.urls import path

from . import views

app_name = "core"

urlpatterns = [
    path("health/", views.health, name="health"),
    path("homepage/", views.homepage_stats, name="homepage-stats"),
]
