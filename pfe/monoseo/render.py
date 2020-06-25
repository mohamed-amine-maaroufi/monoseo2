from io import BytesIO, StringIO
from django.http import HttpResponse
from django.template.loader import get_template
import xhtml2pdf.pisa as pisa
from django.core.files.storage import FileSystemStorage
import os
from random import randint


class Render:

    @staticmethod
    def render(path, params):

        print ("##### 1 ")
        template = get_template(path)
        print ("##### 2 ")
        html = template.render(params)
        print ("##### 3 ")
        response = BytesIO()

        print ("##### 4 ")
        pdf = pisa.pisaDocument(BytesIO(html.encode("UTF-8")), response)
        #pdf = pisa.pisaDocument(StringIO(html.encode("UTF-8")), response, encoding='UTF-8')"""


        print ("##### 5 ")
        if not pdf.err:
            print ("##### 6 ")
            return HttpResponse(response.getvalue(), content_type='application/pdf')
            print ("##### 7 ")
        else:
            return HttpResponse("Error Rendering PDF", status=400)



    @staticmethod
    def render_to_file(path, params,name_report):
        try:

            print ("***** 1")
            template = get_template(path)
            print ("***** 2")
            html = template.render(params)
            print ("***** 3")
            #file_name = "{0}-{1}.pdf".format(params['request'].user.first_name, randint(1, 1000000))
            file_name = name_report
            print ("***** 4")
            file_path = os.path.join(os.path.abspath(os.path.dirname("__file__")), "reports", file_name)
            print ("***** 5")
            with open(file_path, 'wb') as pdf:
                print ("***** 6")
                pisa.pisaDocument(BytesIO(html.encode("UTF-8")), pdf)
                print ("***** 7")
            return [file_name, file_path]
        except:
            return HttpResponse("cannot save this PDF", status=400)
            pass