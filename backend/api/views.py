# from api.filters import CategoryFilter
from api.serializer import *
from rest_framework import viewsets, permissions


class CategoryListApiView(viewsets.ModelViewSet):
    '''
    Полный вывод всех категорий и под-категорий без продуктов
    '''
    serializer_class = CategoryListSerializer
    queryset = Category.objects.all()
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


class ProductListApiView(viewsets.ModelViewSet):
    '''
    Полный вывод всех продуктов без категорий 
    '''
    serializer_class = ProductListSerializer
    queryset = Product.objects.all()
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class AllCategoryListApiView(viewsets.ModelViewSet):
    '''
    Полный вывод всех категорий и под-категорий без продуктов на одном уровне
    '''
    serializer_class = AllCategoryListSerializer
    queryset = Category.objects.all()
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

# class GalleryListApiView(viewsets.ModelViewSet):
#     '''
#     Полный вывод всех фотографий
#     '''
#     serializer_class = GalleryListSerializer
#     queryset = Gallery.objects.all()
#     permission_classes = [permissions.IsAuthenticatedOrReadOnly]
