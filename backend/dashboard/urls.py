from django.urls import path
from dashboard import views

urlpatterns = [
    path("<path:path>", views.DashboardView.as_view()),
    path("", views.DashboardView.as_view()),
]
