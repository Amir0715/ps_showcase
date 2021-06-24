from django.contrib import admin
from .models import Console, ConsoleModel, Game, Genre, Gallery


class GenreAdmin(admin.ModelAdmin):
    list_display = ['name', 'slug']
    prepopulated_fields = {'slug': ('name',)}

admin.site.register(Genre, GenreAdmin)

admin.site.register(Gallery)
# class ProductAdmin(admin.ModelAdmin):
#     list_display = ['name', 'slug', 'price', 'stock', 'available', 'created_at', 'updated_at']
#     list_filter = ['available', 'created_at', 'updated_at']
#     list_editable = ['price', 'stock', 'available']
#     prepopulated_fields = {'slug': ('name',)}

# admin.site.register(Product, ProductAdmin)
class ConsoleModelAdmin(admin.ModelAdmin):
    list_display = ['name', 'slug']
    prepopulated_fields = {'slug': ('name',)}

admin.site.register(ConsoleModel, ConsoleModelAdmin)

class ConsoleAdmin(admin.ModelAdmin):
    list_display = ['name', 'slug','console_model', 'price', 'volume', 'number_of_gamepads', 'stock', 'available', 'created_at', 'updated_at']
    list_filter = ['available', 'created_at', 'updated_at', 'console_model']
    list_editable = ['price', 'stock', 'available']
    prepopulated_fields = {'slug': ('name',)}

admin.site.register(Console, ConsoleAdmin)

class GameAdmin(admin.ModelAdmin):
    list_display = ['name', 'slug', 'type', 'console_model', 'available', 'price', 'stock', 'created_at', 'updated_at']
    list_filter = ['available', 'created_at', 'updated_at', 'console_model', ]
    list_editable = ['price', 'stock', 'available']
    prepopulated_fields = {'slug': ('name',)}

admin.site.register(Game, GameAdmin)
