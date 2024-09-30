from django.shortcuts import render
from .models import Todo
from .serializers import TodoSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
# Create your views here.

@api_view(["GET","POST"])
def notes(request):
    if request.method == 'GET':
        todos = Todo.objects.all()
        serializer = TodoSerializer(todos,many=True)
        return Response(serializer.data)
    elif request.method == "POST":
        serializer = TodoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        return Response(serializer.errors)
    
@api_view(["GET","PUT","DELETE"])
def notes_detail(request,pk):
    try:
        note = Todo.objects.get(pk=pk)
    except Todo.DoesNotExist:
        return Response(status=status.HTTP_400_BAD_REQUEST)
    if request.method == 'GET':
        serializer = TodoSerializer(note)
        return Response(serializer.data)
    elif request.method == "PUT":
        serializer = TodoSerializer(note,data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors,status=status.HTTP_204_NO_CONTENT)
    elif request.method == 'DELETE':
        note.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
@api_view(['POST'])
def complete_todo(request):
    todo_id = request.data.get('todo_id')
    try:
        todo = Todo.objects.get(id=todo_id)
        todo.completed = not todo.completed
        todo.save()
        return Response("Todo Updated Successfully!")
    except Todo.DoesNotExist:
        return Response (status=status.HTTP_404_NOT_FOUND)