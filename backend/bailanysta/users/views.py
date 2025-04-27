from django.shortcuts import render

# Create your views here.
from .models import Profile, Post, Comment
from .serializers import PostSerializer, UserSerializer,ProfileSerializer,CommentSerializer
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated,AllowAny
from rest_framework.response import Response

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

class PostLikeToggle(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, post_id, *args, **kwargs):
        try:
            post = Post.objects.get(id=post_id)
        except Post.DoesNotExist:
            return Response({"error": "Post not found"}, status=404)

        # Toggle like
        if request.user in post.likes.all():
            post.likes.remove(request.user)
            return Response({"message": "Like removed"}, status=200)
        else:
            post.likes.add(request.user)
            return Response({"message": "Like added"}, status=200)

    def get_queryset(self):
        user = self.request.user
        return Post.objects.filter(user=user)
    

class CommentListCreate(generics.ListCreateAPIView):
    serializer_class = CommentSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        post_id = self.kwargs['post_id']
        return Comment.objects.filter(post_id=post_id)

    def perform_create(self, serializer):
        post = Post.objects.get(id=self.kwargs['post_id'])
        user = self.request.user
        serializer.save(post=post, user=user)

    def post(self, request, *args, **kwargs):
        # Here we can handle both creating and listing at the same time
        return super().post(request, *args, **kwargs)