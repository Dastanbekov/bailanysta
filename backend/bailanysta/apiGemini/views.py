from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from dotenv import load_dotenv
import os
from google import genai
from google.genai import types
load_dotenv()
api_key = os.getenv("GEMINI_API_KEY")
client = genai.Client(api_key=api_key)


class GeminiAPIView(APIView):

    def post(self, request, *args, **kwargs):
        prompt = request.data.get('prompt')

        if not prompt:
            return Response({'error': 'Prompt is required.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            response = client.models.generate_content(
                model='gemini-1.5-flash-latest',
                contents=prompt
            )

            return Response({'response': response.text}, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
