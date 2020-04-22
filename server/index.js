const express = require('express');
const path = require('path');
const port = process.env.PORT || 4260;
const app = express();

const destinationDir = path.join(__dirname, '../dist/proy-ng9');

//Hosting from dist folder
app.use(express.static(destinationDir));
console.log(`Express hosting from ${destinationDir}`);
app.get('*', (req, res) =>{
    res.sendFile(path.join(destinationDir, 'index.html'));
});
console.log(`Serverving index.html `);

app.listen(port, ()=>console.log(`Server is running from port ${port}`));