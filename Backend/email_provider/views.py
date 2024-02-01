from django.http import HttpResponse
from django.core.mail import send_mail, EmailMessage
from reportlab.pdfgen import canvas
from django.conf import settings
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
def generate_pdf_and_send_email(request):
    print(50 * '-')
    print(request)
    print(50 * '-')
    title = request.POST.get('title', '')
    user_id = request.POST.get('user_id', '')
    reason = request.POST.get('reason', '')
    date = request.POST.get('date', '')

    # Generate PDF
    response = HttpResponse(content_type='application/pdf')
    response['Content-Disposition'] = f'attachment; filename=report.pdf'

    with open("report.pdf", "wb+") as pdf_content:
        p = canvas.Canvas(pdf_content)
        page_width, page_height = letter

        # Get the width and height of the text
        text_width = p.stringWidth(content, "Helvetica", 12)
        text_height = 12  # Assuming font size is 12

        x_center = (page_width - text_width) / 2
        p.setLineWidth(.3)
        print(p.getAvailableFonts())
        p.setFont('Helvetica-Bold', 27)
        p.setFillColorRGB(0, 255, 127)
        p.drawString(220, 750, 'EASY QUEST')
        p.setFillColorRGB(0, 0, 0)
        p.setFont('Helvetica-Bold', 20)
        p.drawString(270, 700, 'EDIT : FACIAL PAIN ASYMMETRY')
        p.save()

    with open(f"report.pdf", "rb") as f:
        pdf_content = f.read()

    message = EmailMessage(
        subject="Your Email Subject",
        body="Your email body message",
        from_email=settings.EMAIL_HOST_USER,
        to=["kazmaho35@gmail.com"],
    )
    message.attach(filename=f"report_{date}.pdf", content=pdf_content, mimetype="application/pdf")
    message.send()
    send_mail(
        'Report PDF',
        'Attached is the report PDF.',
        settings.EMAIL_HOST_USER,
        ['kazmaho35@gmail.com'],
        fail_silently=False,
        html_message='hello!',

    )

    return HttpResponse('Email sent successfully')
