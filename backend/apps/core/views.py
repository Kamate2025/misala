from rest_framework.decorators import api_view
from rest_framework.response import Response


@api_view(["GET"])
def health(request):
    """Simple liveness check used by nginx/monitoring and the React app."""
    return Response({"status": "ok", "service": "misala-backend"})


@api_view(["GET"])
def homepage_stats(request):
    """
    Placeholder headline numbers for the MISALA homepage hero.

    These are static for now since only the homepage exists; once profiles,
    opportunities, and matches are modeled, this will read from the DB.
    """
    data = {
        "platform": "MISALA",
        "tagline": "Your professional operating system for Africa's opportunities.",
        "stats": [
            {"label": "Opportunity types matched", "value": "8+"},
            {"label": "Focus markets", "value": "Uganda & DRC"},
            {"label": "Model", "value": "Portfolio \u2192 AI Match \u2192 Career Growth"},
        ],
    }
    return Response(data)
