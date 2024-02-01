# test_script.py
from views import generate_pdf_and_send_email


def test_function():
    # Predefined data
    title = "Test Title"
    user_id = "123"
    reason = "Test report content."
    date = "2024-01-15"

    # Call the function with predefined data
    generate_pdf_and_send_email(title, user_id, reason, date)

# Run the test function
test_function()