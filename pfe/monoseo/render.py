from io import BytesIO
from django.http import HttpResponse
from django.template.loader import get_template
import xhtml2pdf.pisa as pisa
import os
from random import randint


class Render:

    @staticmethod
    def render(path, params):
        template = get_template(path)
        html = template.render(params)
        response = BytesIO()
        pdf = pisa.pisaDocument(BytesIO(html.encode("UTF-8")), response)
        if not pdf.err:
            return HttpResponse(response.getvalue(), content_type='application/pdf')
        else:
            return HttpResponse("Error Rendering PDF", status=400)

    @staticmethod
    def render_to_file(path, params,name_report):
        template = get_template(path)
        html = template.render(params)
        #file_name = "{0}-{1}.pdf".format(params['request'].user.first_name, randint(1, 1000000))
        file_name = name_report
        file_path = os.path.join(os.path.abspath(os.path.dirname("__file__")), "reports", file_name)
        with open(file_path, 'wb') as pdf:
            pisa.pisaDocument(BytesIO(html.encode("UTF-8")), pdf)
        return [file_name, file_path]