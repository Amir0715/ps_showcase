from drf_spectacular.views import SpectacularRedocView, SpectacularSwaggerView, SpectacularAPIView
from rest_framework.routers import DefaultRouter
from django.urls import path, include

# здесь импортим наши вьюхи
from api import views as api_views 

# здесь их регаем
router = DefaultRouter()
router.register(r'categories', api_views.CategoryListApiView, basename='category')
router.register(r'products', api_views.ProductListApiView, basename='product')
# router.register(r'category_product', api_views.CategoryProductListApiView, basename='category_product')
# router.register(r'product_detail', api_views.ProductDetailListApiView, basename='product_detail')


urlpatterns = [
    path('schema/', SpectacularAPIView.as_view(), name='schema'),
    # Optional UI:
    path('swagger/', SpectacularSwaggerView.as_view(url_name='schema'),
         name='swagger-ui'),
    path('redoc/', SpectacularRedocView.as_view(url_name='schema'), name='redoc'),
    path('', include(router.urls))
]
