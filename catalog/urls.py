from django.urls.conf import path
from . import views

app_name = 'catalog'

urlpatterns = [
    path('', views.IndexView.as_view(), name='index'),
    path('consoles/<int:console_pk>', views.ConsoleDetailView.as_view(), name='console_view'),
    path('games/<int:game_pk>', views.GameDetailView.as_view(), name='game_view'),
    path('consoles/', views.ConsoleListView.as_view(), name='consoles'),
    path('games/', views.GameListView.as_view(), name='games'),
] 
