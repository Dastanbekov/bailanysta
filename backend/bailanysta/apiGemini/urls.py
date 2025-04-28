from django.urls import path
from .views import GeminiAPIView

urlpatterns = [
    path('gemini/', GeminiAPIView.as_view(), name='gemini-api'),
]
