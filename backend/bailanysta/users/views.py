from django.shortcuts import render

# Create your views here.
from .models import Profile, Post, Comment
from .serializers import PostSerializer, UserSerializer,ProfileSerializer
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated,AllowAny

from django.contrib.auth.models import User

class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

class ProfileView(generics.RetrieveAPIView):
    serializer_class = ProfileSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user.profile
    
class PostListCreate(generics.ListCreateAPIView):
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        user = self.request.user
        # Check if the query parameter 'all_posts' is set to 'true'
        if self.request.query_params.get('all_posts') == 'true':
            return Post.objects.all()  # Fetch posts from all users
        else:
            return Post.objects.filter(user=user)  

    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(user=self.request.user)
        else:
            print(serializer.errors)

class PostDelete(generics.DestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Post.objects.filter(user=user)
    
class PostRetrieve(generics.RetrieveAPIView):
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Post.objects.filter(user=user)
