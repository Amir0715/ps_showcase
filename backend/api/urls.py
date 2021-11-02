from drf_spectacular.views import SpectacularRedocView, SpectacularSwaggerView, SpectacularAPIView
from rest_framework.routers import DefaultRouter
from django.urls import path, include

# здесь импортим наши вьюхи
from api import views as api_views 

# здесь их регаем
router = DefaultRouter()
router.register(r'categories', api_views.CategoryListApiView, basename='category')
router.register(r'all_categories', api_views.AllCategoryListApiView, basename='all_category')
router.register(r'products', api_views.ProductListApiView, basename='product')
router.register(r'images', api_views.GalleryListApiView, basename='images')

urlpatterns = [
    path('schema/', SpectacularAPIView.as_view(), name='schema'),
    # Optional UI:
    path('swagger/', SpectacularSwaggerView.as_view(url_name='schema'),
         name='swagger-ui'),
    path('redoc/', SpectacularRedocView.as_view(url_name='schema'), name='redoc'),
    path("auth/", include('djoser.urls')),
    path("auth/", include('djoser.urls.authtoken')),
    path("auth/", include('djoser.urls.jwt')),
    path('', include(router.urls))
]
