from django.urls.conf import path
from . import views

app_name = "catalog"

urlpatterns = [
    path("", views.IndexView.as_view(), name="index"),
    path("detail/<slug:game>", views.GameDetailView.as_view(), name="detail"),
    path("games/", views.GameListView.as_view(), name="game_list"),
    path("games/<slug:category>", views.GameListView.as_view(), name="game_list"),
]
