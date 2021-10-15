from rest_framework import serializers
from catalog.models import Category, Product


class FilterCategoryListSerializer(serializers.ListSerializer):
    '''
    Вывод только корневых категорий
    '''

    def to_representation(self, data):
        data = data.filter(parent=None)
        return super().to_representation(data)


class RecursiveSrializer(serializers.Serializer):
    '''
    Рекурсивная сериалазиация потомков
    '''

    def to_representation(self, value):
        serializer = self.parent.parent.__class__(value, context=self.context)
        return serializer.data


class ProductListSerializer(serializers.ModelSerializer):
    '''
    Полный вывод всех продуктов без категорий 
    '''
    class Meta:
        model = Product
        fields = (
            'id', 'name', 'slug', 'price', 'description', 'price',
            'stock', 'available', 'incarousel', 'inbanner', 'created_at', 'updated_at'
        )


class CategoryListSerializer(serializers.ModelSerializer):
    '''
    Полный вывод всех категорий и под-категорий без продуктов
    '''
    children = RecursiveSrializer(many=True, required=False)
    # products = ProductListSerializer(many=True)

    class Meta:
        list_serializer_class = FilterCategoryListSerializer
        model = Category
        fields = ('id', 'name', 'slug', 'children')

