from django.urls.conf import path
from . import views

app_name = 'catalog'

urlpatterns = [
    path('', views.index,name='index')
]
