from django.urls import path
from .views import notes,notes_detail,complete_todo

urlpatterns = [
    path('notes/',notes,name='notes'),
    path('notes/<int:pk>/',notes_detail,name='notes_detail'),
    path('complete_todo/',complete_todo,name='complete_todo'),
]
