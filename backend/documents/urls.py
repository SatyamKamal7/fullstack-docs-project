from django.urls import path
from .views import document_list_create, document_delete

urlpatterns = [
    path("", document_list_create),             # GET, POST
    path("<int:pk>/", document_delete),         # DELETE
]