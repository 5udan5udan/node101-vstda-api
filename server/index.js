const app = require('./app');
const PORT = 8484;

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
