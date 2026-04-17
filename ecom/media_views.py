import logging
from pathlib import Path

from django.conf import settings
from django.http import Http404, HttpResponseRedirect
from django.templatetags.static import static as static_url
from django.utils._os import safe_join
from django.views.static import serve


logger = logging.getLogger(__name__)


def serve_local_media(request, path):
    if not getattr(settings, "SERVE_MEDIA_LOCALLY", False):
        raise Http404("Local media serving is disabled.")

    try:
        full_path = Path(safe_join(settings.MEDIA_ROOT, path))
    except ValueError as exc:
        raise Http404("Invalid media path.") from exc

    if full_path.is_file():
        return serve(request, path, document_root=settings.MEDIA_ROOT, show_indexes=False)

    fallback_static_path = getattr(settings, "MEDIA_FALLBACK_STATIC_PATH", "")
    if fallback_static_path:
        logger.warning("Missing media file requested: %s", full_path)
        return HttpResponseRedirect(static_url(fallback_static_path))

    raise Http404(f'"{full_path}" does not exist')
