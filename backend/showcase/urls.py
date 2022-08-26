from django.contrib import admin
from django.urls import path
from django.urls.conf import include
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    path("admin/", admin.site.urls, name="admin"),
    path("api/", include("api.urls")),
    path("dashboard/", include("dashboard.urls")),
    path("", include("catalog.urls")),
]

# Для формирования маршрута для медиа файлов, только в отладочном режиме
if settings.DEBUG:
    urlpatterns += [path('__debug__/', include('debug_toolbar.urls'))]
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
