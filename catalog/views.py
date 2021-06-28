from django.views.generic import ListView, DetailView
from django.views.generic.base import View

from catalog.models import Console, Game, Product
from django.shortcuts import render
import random


class IndexView(View):
    def get(self, request):
        carousel_game = Game.objects.filter(in_carousel=True)
        carousel_console = Console.objects.filter(in_carousel=True)

        context = {
            "carousel": {
                "games": carousel_game,
                "consoles": carousel_console,
                "lenght": range(len(carousel_game) + len(carousel_console)),
            }
        }
        return render(request, "index/index.html", context)


class ProductListView(ListView):
    def get_queryset(self):
        return super().get_queryset().filter(available=True)

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        query_set = self.get_queryset()

        result_set = []
        i = 0
        while i < query_set.count():
            r = random.randint(2, 5)
            tmp = []
            if r > query_set.count() - i:
                r = query_set.count() - i
            for set in range(r):
                tmp.append(query_set[i])
                i += 1

            result_set.append(tmp)

        print(result_set)
        context["product_sets"] = result_set
        return context


class ConsoleListView(ProductListView):
    model = Console
    template_name = "products.html"

    def get_queryset(self):
        return super().get_queryset().filter(available=True)

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        query_set = self.get_queryset()

        result_set = []
        i = 0
        while i < query_set.count():
            r = random.randint(2, 5)
            tmp = []
            if r > query_set.count() - i:
                r = query_set.count() - i
            for set in range(r):
                tmp.append(query_set[i])
                i += 1

            result_set.append(tmp)

        print(result_set)
        context["product_sets"] = result_set
        return context


class GameListView(ListView):
    model = Game
    template_name = "products.html"

    def get_queryset(self):
        return super().get_queryset().filter(available=True)

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        query_set = self.get_queryset()

        result_set = []
        i = 0
        while i < query_set.count():
            r = random.randint(2, 5)
            tmp = []
            if r > query_set.count() - i:
                r = query_set.count() - i
            for set in range(r):
                tmp.append(query_set[i])
                i += 1

            result_set.append(tmp)
        context["product_sets"] = result_set
        return context


class ConsoleDetailView(DetailView):
    model = Console
    template_name = "product.html"
    context_object_name = "item"
    pk_url_kwarg = "console_pk"


class GameDetailView(DetailView):
    model = Game
    template_name = "product.html"
    context_object_name = "item"
    pk_url_kwarg = "game_pk"
