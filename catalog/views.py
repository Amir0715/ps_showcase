from django.views.generic import ListView, DetailView
from django.views.generic.base import View

from catalog.models import Product
from django.shortcuts import render
import random


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


class IndexView(View):
    template_name = 'index/index.html'

    def get(self, request):
        return render(request, self.template_name)

class GameDetailView(View):
    template_name = "game/game_detail.html"

    def get(self, request):
        return render(request, self.template_name)
