from django.contrib import admin
from .models import AttributeValue, Gallery, Product, Category, Cart, CartProduct, CategoryAttribute


class GenreAdmin(admin.ModelAdmin):
    list_display = ['name', 'slug']
    prepopulated_fields = {'slug': ('name',)}


admin.site.register(Gallery)
class ConsoleModelAdmin(admin.ModelAdmin):
    list_display = ['name', 'slug']
    prepopulated_fields = {'slug': ('name',)}

class ConsoleAdmin(admin.ModelAdmin):
    list_display = ['id', 'name','console_model', 'price', 'volume', 'number_of_gamepads', 'available', 'stock', 'in_carousel', 'created_at', 'updated_at']
    list_filter = ['available', 'created_at', 'updated_at', 'console_model', 'in_carousel']
    list_editable = ['price', 'stock', 'available', 'in_carousel']

class GameAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'type', 'console_model','price', 'available', 'stock', 'in_carousel', 'created_at', 'updated_at']
    list_filter = ['available', 'created_at', 'updated_at', 'console_model', 'type', 'in_carousel']
    list_editable = ['price', 'stock', 'available', 'in_carousel']


admin.site.register(Product)
admin.site.register(Category)
admin.site.register(CartProduct)
admin.site.register(Cart)
admin.site.register(CategoryAttribute)
admin.site.register(AttributeValue)