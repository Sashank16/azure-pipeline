const express = require('express');
const app = express();
const port = 3001;

// Password generation function
function generatePassword(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
    let password = '';
    
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        password += characters[randomIndex];
    }
    
    return password;
}

// Route to serve the HTML with embedded CSS and JavaScript
app.get('/', (req, res) => {
    const html = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Password Generator</title>
            <style>
                /* Basic reset */
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f4f4f9;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                }
                .container {
                    text-align: center;
                    background-color: #ffffff;
                    padding: 30px;
                    border-radius: 8px;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                }
                h1 {
                    color: #333;
                    margin-bottom: 20px;
                }
                input {
                    padding: 10px;
                    margin: 10px 0;
                    border-radius: 4px;
                    border: 1px solid #ccc;
                    width: 100%;
                    max-width: 200px;
                }
                button {
                    padding: 10px 20px;
                    background-color: #007bff;
                    color: #fff;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                    font-size: 16px;
                }
                button:hover {
                    background-color: #0056b3;
                }
                #result {
                    margin-top: 20px;
                }
                #passwordDisplay {
                    font-weight: bold;
                    color: #007bff;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>Password Generator</h1>
                <p>Click the button to generate a random password.</p>
                <input type="number" id="passwordLength" placeholder="Enter password length" min="6" max="32" />
                <button onclick="generatePassword()">Generate Password</button>
                <div id="result">
                    <p>Your Password: <span id="passwordDisplay"></span></p>
                </div>
            </div>
            <script>
                function generatePassword() {
                    const length = document.getElementById('passwordLength').value || 12;
                    fetch(\`/generate-password?length=\${length}\`)
                        .then(response => response.json())
                        .then(data => {
                            document.getElementById('passwordDisplay').innerText = data.password;
                        })
                        .catch(error => {
                            console.error('Error:', error);
                        });
                }
            </script>
        </body>
        </html>
    `;
    res.send(html);
});

// Endpoint to generate password for AJAX request
app.get('/generate-password', (req, res) => {
    const length = parseInt(req.query.length) || 12;
    const password = generatePassword(length);
    res.json({ password });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
