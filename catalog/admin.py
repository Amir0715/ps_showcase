from django.contrib import admin
from .models import Console, ConsoleModel, Game, Genre, GameGallery, ConsoleGallery


class GenreAdmin(admin.ModelAdmin):
    list_display = ['name', 'slug']
    prepopulated_fields = {'slug': ('name',)}

admin.site.register(Genre, GenreAdmin)

admin.site.register(GameGallery)
admin.site.register(ConsoleGallery)
class ConsoleModelAdmin(admin.ModelAdmin):
    list_display = ['name', 'slug']
    prepopulated_fields = {'slug': ('name',)}

admin.site.register(ConsoleModel, ConsoleModelAdmin)

class ConsoleAdmin(admin.ModelAdmin):
    list_display = ['id', 'name','console_model', 'price', 'volume', 'number_of_gamepads', 'available', 'stock', 'in_carousel', 'created_at', 'updated_at']
    list_filter = ['available', 'created_at', 'updated_at', 'console_model', 'in_carousel']
    list_editable = ['price', 'stock', 'available', 'in_carousel']

admin.site.register(Console, ConsoleAdmin)

class GameAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'type', 'console_model','price', 'available', 'stock', 'in_carousel', 'created_at', 'updated_at']
    list_filter = ['available', 'created_at', 'updated_at', 'console_model', 'type', 'in_carousel']
    list_editable = ['price', 'stock', 'available', 'in_carousel']

admin.site.register(Game, GameAdmin)
