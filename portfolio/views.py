from django.shortcuts import render

def single_page(request):
    """Single page website with all sections"""
    return render(request, 'portfolio/single_page.html')
