import time
from django.utils.deprecation import MiddlewareMixin
from django.http import HttpResponse
from django.conf import settings
from django.http import JsonResponse

class LoggingMiddleware(MiddlewareMixin):
    def process_request(self, request):
        request.start_time = time.time()

    def process_response(self, request, response):
        duration = time.time() - request.start_time
        print(f'Request para {request.path} levaram {duration:.2f} segundos')
        return response
    
class RequestTempoLimiteMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response
        self.timeout_seconds = 10

    def __call__(self, request):
        start_time = time.time()
        response = self.get_response(request)
        
        duration = time.time() - start_time
        if duration > self.timeout_seconds:
            return JsonResponse({'error': 'Tempo de processamento excedido'}, status=504)
        return response
    
class ManutencaoMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response
        self.exempt_paths = ['/admin/']

    def __call__(self, request):
        if settings.MAINTENANCE_MODE:
            if not any(request.path.startswith(path) for path in self.exempt_paths):
                return HttpResponse( 'Erro: Serviço em manutenção \n'
                    'Mensagem: Estamos realizando atualizações. Volte em breve!',
                    status=503
                )
        response = self.get_response(request)
        return response
