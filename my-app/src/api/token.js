

class TokenAPI {
    static async getCookie(name) {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.startsWith(name + '=')) {
                return cookie.substring(name.length + 1);
            }
        }
        return null;
    }
}
export default TokenAPI;



async function checkUserType() {
    const tokenValue = TokenAPI.getCookie('token');

    if (!tokenValue) {
        console.error('Token not found.');
        return;
    }

    const apiUrl = 'http://127.0.0.1:8000/api/check';
    const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
            'Authorization': `Token ${tokenValue}`,
            'Content-Type': 'application/json',
        }
    });

    if (response.ok) {
        const data = await response.json();
        const { value } = data;
        return value;
    } else {
        console.log('Error:', response.status);
    }
}
